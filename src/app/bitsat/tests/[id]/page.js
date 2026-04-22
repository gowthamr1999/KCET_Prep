'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getBitsatPaper, bitsatRankBands } from '@/data/bitsatQuestions';

function safeNumber(value, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

// ── Helpers ─────────────────────────────────────────────────
function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const SECTION_META = {
  Physics:          { color: '#9aa7b3', bg: 'rgba(154,167,179,0.14)', icon: '⚛️' },
  Chemistry:        { color: '#96aba1', bg: 'rgba(150,171,161,0.14)', icon: '🧪' },
  Mathematics:      { color: '#a5a0b2', bg: 'rgba(165,160,178,0.14)', icon: '📐' },
  English:          { color: '#b5a98a', bg: 'rgba(181,169,138,0.14)',  icon: '📖' },
  'Logical Reasoning': { color: '#a77f85', bg: 'rgba(167,127,133,0.14)', icon: '🧩' },
};

function predictRank(score) {
  if (score < 0) return bitsatRankBands[bitsatRankBands.length - 1];
  for (const band of bitsatRankBands) {
    if (score >= band.minScore && score <= band.maxScore) return band;
  }
  return bitsatRankBands[bitsatRankBands.length - 1];
}

// ── Main Component ───────────────────────────────────────────
export default function BitsatTestPage() {
  const params = useParams();
  const paper  = getBitsatPaper(params.id);
  const { questions, duration, correctMarks, wrongMarks, totalMarks } = paper;

  const TOTAL_SECS = duration * 60;

  const [phase,     setPhase]    = useState('intro');  // 'intro' | 'test' | 'result'
  const [answers,   setAnswers]  = useState({});        // { qId: optionIndex }
  const [flagged,   setFlagged]  = useState(new Set());
  const [current,   setCurrent]  = useState(0);
  const [timeLeft,  setTimeLeft] = useState(TOTAL_SECS);
  const [timeTaken, setTimeTaken]= useState(0);
  const [activeSection, setActiveSection] = useState('Physics');
  const [isPaused, setIsPaused] = useState(false);
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  const [insight, setInsight] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [isSyncingInsight, setIsSyncingInsight] = useState(false);
  const [insightError, setInsightError] = useState('');
  const [isSavedResult, setIsSavedResult] = useState(false);

  const timerRef = useRef(null);

  // Unique sections in order
  const sections = [...new Set(questions.map(q => q.subject))];

  const submitTest = useCallback(() => {
    clearInterval(timerRef.current);
    setIsPaused(false);
    setTimeTaken(TOTAL_SECS - timeLeft);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [timeLeft, TOTAL_SECS]);

  useEffect(() => {
    if (phase !== 'test' || isPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); submitTest(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, isPaused, submitTest]);

  useEffect(() => {
    if (phase !== 'test') setIsPaused(false);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'result' || isSavedResult) return;

    let ignore = false;

    async function syncInsight() {
      try {
        setIsSyncingInsight(true);
        setInsightError('');

        const correctNow = questions.filter(q => answers[q.id] === q.correct).length;
        const wrongNow = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
        const scoreNow = correctNow * correctMarks + wrongNow * wrongMarks;
        const sectionStatsNow = sections.map(sec => {
          const qs = questions.filter(q => q.subject === sec);
          const c = qs.filter(q => answers[q.id] === q.correct).length;
          const w = qs.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
          const u = qs.length - c - w;
          return {
            sec,
            total: qs.length,
            correct: c,
            wrong: w,
            unattempted: u,
            pct: Math.round((c / qs.length) * 100),
          };
        });

        const response = await fetch('/api/bitsat-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paperId: paper.id,
            paperName: paper.title,
            candidateName: userName,
            score: scoreNow,
            totalMarks,
            timeTaken,
            sectionStats: sectionStatsNow,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || 'Unable to fetch BITSAT standing right now.');
        }

        const lbResponse = await fetch(`/api/leaderboard?examType=bitsat&paperId=${paper.id}`);
        const lbData = await lbResponse.json();

        if (!ignore) {
          setInsight(data);
          if (lbResponse.ok) {
            setLeaderboard(Array.isArray(lbData?.leaderboard) ? lbData.leaderboard : []);
            setLeaderboardError('');
          } else {
            setLeaderboard([]);
            setLeaderboardError(lbData?.error || 'Unable to load leaderboard right now.');
          }
          setIsSavedResult(true);
        }
      } catch (err) {
        if (!ignore) {
          setInsightError(err.message || 'Unable to fetch BITSAT standing right now.');
          setIsSavedResult(true);
        }
      } finally {
        if (!ignore) setIsSyncingInsight(false);
      }
    }

    syncInsight();
    return () => {
      ignore = true;
    };
  }, [
    phase,
    isSavedResult,
    paper.id,
    paper.title,
    totalMarks,
    timeTaken,
    answers,
    correctMarks,
    wrongMarks,
    questions,
    sections,
    userName,
  ]);

  // ── Scoring ────────────────────────────────────────────────
  const correct    = questions.filter(q => answers[q.id] === q.correct).length;
  const wrong      = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
  const unattempted = questions.length - correct - wrong;
  const score      = correct * correctMarks + wrong * wrongMarks;   // +3/−1

  // Section-wise breakdown
  const sectionStats = sections.map(sec => {
    const qs = questions.filter(q => q.subject === sec);
    const c  = qs.filter(q => answers[q.id] === q.correct).length;
    const w  = qs.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
    const u  = qs.length - c - w;
    return { sec, total: qs.length, correct: c, wrong: w, unattempted: u,
             pct: Math.round((c / qs.length) * 100) };
  });

  // ── Navigation helpers ─────────────────────────────────────
  function jumpToSection(sec) {
    if (isPaused) return;
    const idx = questions.findIndex(q => q.subject === sec);
    if (idx !== -1) { setCurrent(idx); setActiveSection(sec); }
  }

  function handleOption(qId, optIdx) {
    if (isPaused) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  }
  function clearAnswer(qId) {
    if (isPaused) return;
    setAnswers(prev => { const n = { ...prev }; delete n[qId]; return n; });
  }
  function toggleFlag(qId) {
    if (isPaused) return;
    setFlagged(prev => {
      const n = new Set(prev);
      n.has(qId) ? n.delete(qId) : n.add(qId);
      return n;
    });
  }

  const q = questions[current];
  const meta = SECTION_META[q?.subject] || { color: '#fff', bg: 'rgba(255,255,255,0.1)', icon: '❓' };
  const timerPct  = (timeLeft / TOTAL_SECS) * 100;
  const timerColor = timerPct > 33 ? '#9cb4ab' : timerPct > 10 ? '#b5a98a' : '#a77f85';

  // ── INTRO SCREEN ───────────────────────────────────────────
  if (phase === 'intro') return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        <div className="glass-panel" style={{ padding: '36px', maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>BITSAT Mock Test</div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }} className="text-gradient">{paper.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{paper.description}</p>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              ['Questions', questions.length],
              ['Duration',  '3 Hours'],
              ['Max Marks', paper.totalMarks],
              ['Correct',   `+${correctMarks}`],
              ['Wrong',     `${wrongMarks}`],
              ['Unattempt', '0'],
            ].map(([k, v]) => (
              <div key={k} style={styles.statBox}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: v === `+${correctMarks}` ? '#9cb4ab' : v === `${wrongMarks}` ? '#a77f85' : '#fff' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Section breakdown */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Section Breakdown
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sections.map(sec => {
                const cnt = questions.filter(q => q.subject === sec).length;
                const m   = SECTION_META[sec] || {};
                return (
                  <div key={sec} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: m.bg, borderRadius: '10px', border: `1px solid ${m.color}33` }}>
                    <span aria-hidden="true">{m.icon}</span>
                    <span style={{ flex: 1, fontWeight: 600, fontSize: '0.88rem' }}>{sec}</span>
                    <span style={{ fontWeight: 700, color: m.color }}>{cnt} Qs</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Instructions</h2>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 2, paddingLeft: '20px' }}>
              <li>Each correct answer: <strong style={{ color: '#9cb4ab' }}>+3 marks</strong></li>
              <li>Each wrong answer: <strong style={{ color: '#a77f85' }}>−1 mark</strong> (negative marking!)</li>
              <li>Unattempted questions: <strong>0 marks</strong></li>
              <li>Timer auto-submits when 3 hours expire</li>
              <li>Flag questions for later review using the flag button</li>
              <li>Use section tabs to jump between Physics / Chemistry / Maths / English / Logic</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="bitsat-name" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Name (for leaderboard)
            </label>
            <input
              id="bitsat-name"
              value={userName}
              onChange={(e) => { setUserName(e.target.value); if (nameError) setNameError(''); }}
              placeholder="Enter your name"
              maxLength={50}
              style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${nameError ? '#a77f85' : 'rgba(255,255,255,0.14)'}`, borderRadius: '10px', color: '#fff', fontFamily: 'inherit', fontSize: '0.94rem' }}
            />
            {nameError && <p style={{ marginTop: '8px', color: '#a77f85', fontSize: '0.8rem' }}>{nameError}</p>}
          </div>

          <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '16px' }}
            onClick={() => {
              const cleanName = userName.trim();
              if (!cleanName) {
                setNameError('Please enter your name before starting the test.');
                return;
              }
              setUserName(cleanName.slice(0, 50));
              setNameError('');
              setLeaderboard([]);
              setLeaderboardError('');
              setPhase('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
            Begin Test →
          </button>
        </div>
      </main>
    </>
  );

  // ── RESULT SCREEN ──────────────────────────────────────────
  if (phase === 'result') {
    const rankPred = predictRank(score);
    const penalty  = wrong * Math.abs(wrongMarks);

    return (
      <>
        <Navbar />
        <main id="main-content" style={styles.main}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>
            Test Results — <span className="text-gradient">{paper.title}</span>
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Candidate: <span style={{ color: '#fff', fontWeight: 700 }}>{userName || 'Anonymous'}</span>
          </p>

          {/* Score card */}
          <section aria-label="Score overview" className="glass-panel" style={{ padding: '32px', marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Your BITSAT Score</div>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: score >= 0 ? '#9cb4ab' : '#a77f85', lineHeight: 1 }}>
              {score}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>out of {totalMarks}</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', textAlign: 'left' }}>
              {[
                { label: 'Correct',      value: correct,         color: '#9cb4ab' },
                { label: 'Wrong',        value: wrong,           color: '#a77f85' },
                { label: 'Unattempted',  value: unattempted,     color: '#8e8e9f' },
                { label: 'Penalty',      value: `-${penalty}`,   color: '#a77f85' },
                { label: 'Accuracy',     value: `${correct + wrong > 0 ? Math.round(correct / (correct + wrong) * 100) : 0}%`, color: '#a5a0b2' },
                { label: 'Time Taken',   value: formatTime(timeTaken), color: '#b5a98a' },
              ].map(({ label, value, color }) => (
                <div key={label} style={styles.statBox}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color }}>{value}</div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="leaderboard-heading" className="glass-panel" style={{ padding: '28px', marginBottom: '20px' }}>
            <h2 id="leaderboard-heading" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>🏆 Leaderboard (This Test)</h2>
            {leaderboardError && <p style={{ color: '#a77f85', fontSize: '0.85rem', marginBottom: '10px' }}>{leaderboardError}</p>}
            {!leaderboard.length && !leaderboardError && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No leaderboard entries yet.</p>
            )}
            {!!leaderboard.length && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaderboard.slice(0, 10).map((row) => (
                  <div key={`${row.rank}-${row.name}-${row.score}`} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto auto', gap: '10px', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: row.name === userName ? 'rgba(156,180,171,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${row.name === userName ? 'rgba(156,180,171,0.32)' : 'rgba(255,255,255,0.08)'}` }}>
                    <span style={{ fontWeight: 800, color: '#b5a98a' }}>#{row.rank}</span>
                    <span style={{ fontWeight: 600 }}>{row.name}</span>
                    <span style={{ fontWeight: 700, color: '#9cb4ab' }}>{row.score}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '60px', textAlign: 'right' }}>
                      {row.timeTaken == null ? '--:--' : formatTime(row.timeTaken)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Rank prediction */}
          {rankPred && (
            <section aria-labelledby="rank-heading" className="glass-panel" style={{ padding: '28px', marginBottom: '20px', border: '1px solid rgba(156,180,171,0.24)' }}>
              <h2 id="rank-heading" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px' }}>🎯 Rank Prediction</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                <div style={styles.predBox}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimated Rank</div>
                  <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#a5a0b2' }}>{rankPred.rankRange}</div>
                </div>
                <div style={{ ...styles.predBox, gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Likely Admission</div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{rankPred.admission}</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '14px' }}>
                ⚠️ Based on BITSAT 2021–2025 cutoffs. Exact cutoffs vary year to year.
              </p>
            </section>
          )}

          {/* Benchmark + standing */}
          <section aria-labelledby="standing-heading" className="glass-panel" style={{ padding: '28px', marginBottom: '20px' }}>
            <h2 id="standing-heading" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px' }}>🏁 Standing & Previous Best</h2>
            {isSyncingInsight && <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>Syncing with leaderboard data...</p>}
            {insightError && <p style={{ color: '#a77f85', fontSize: '0.86rem' }}>{insightError}</p>}
            {insight && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div style={styles.predBox}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>This Test Rank</div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#b5a98a' }}>
                      #{safeNumber(insight?.testStanding?.rank, 1)} / {safeNumber(insight?.testStanding?.attempts, 1)}
                    </div>
                  </div>
                  <div style={styles.predBox}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>This Test Percentile</div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#9cb4ab' }}>
                      {safeNumber(insight?.testStanding?.percentile, 100)}%
                    </div>
                  </div>
                  <div style={styles.predBox}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Previous Best (Overall)</div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#a5a0b2' }}>
                      {safeNumber(insight?.previousBestOverall, 0)} / {totalMarks}
                    </div>
                  </div>
                  <div style={styles.predBox}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global Percentile</div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#9aa7b3' }}>
                      {safeNumber(insight?.globalStanding?.percentile, 100)}%
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginBottom: '14px' }}>
                  {insight.benchmarkNote}
                </p>
                {!!insight.previousBestBySubject?.length && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    {insight.previousBestBySubject.map((subjectRow) => (
                      <div key={subjectRow.subject} style={styles.statBox}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{subjectRow.subject}</div>
                        <div style={{ marginTop: '6px', fontWeight: 700, color: '#fff' }}>
                          You: {safeNumber(subjectRow.currentSectionScore, 0)}
                        </div>
                        <div style={{ marginTop: '2px', color: '#b5a98a', fontWeight: 700, fontSize: '0.88rem' }}>
                          Previous Best: {safeNumber(subjectRow.previousBestScore, 0)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          {/* Section-wise analysis */}
          <section aria-labelledby="section-analysis-heading" className="glass-panel" style={{ padding: '28px', marginBottom: '20px' }}>
            <h2 id="section-analysis-heading" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px' }}>Section-wise Analysis</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sectionStats.map(({ sec, total, correct: c, wrong: w, unattempted: u, pct }) => {
                const m = SECTION_META[sec] || { color: '#fff' };
                return (
                  <div key={sec}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 700 }}>{sec} <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({total} Qs)</span></span>
                      <span style={{ color: m.color, fontWeight: 700 }}>{pct}% accuracy</span>
                    </div>
                    <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(c / total) * 100}%`, background: '#9cb4ab' }} title={`Correct: ${c}`} />
                      <div style={{ width: `${(w / total) * 100}%`, background: '#a77f85' }} title={`Wrong: ${w}`} />
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)' }} title={`Unattempted: ${u}`} />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: '#9cb4ab' }}>✓ {c}</span>
                      <span style={{ color: '#a77f85' }}>✗ {w}</span>
                      <span>− {u}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Full review */}
          <section aria-labelledby="review-heading">
            <h2 id="review-heading" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Question Review</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {questions.map((q, idx) => {
                const given   = answers[q.id];
                const correct = given === q.correct;
                const skipped = given === undefined;
                const m       = SECTION_META[q.subject] || { color: '#fff' };
                const borderCol = skipped ? 'rgba(255,255,255,0.08)' : correct ? 'rgba(0,245,212,0.3)' : 'rgba(255,90,126,0.3)';
                return (
                  <article key={q.id} className="glass-panel" style={{ padding: '20px', borderLeft: `3px solid ${borderCol}` }}
                    aria-label={`Question ${idx + 1}: ${skipped ? 'skipped' : correct ? 'correct' : 'incorrect'}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Q{idx + 1}</span>
                      <span style={{ fontSize: '0.75rem', color: m.color, fontWeight: 700, background: m.bg, padding: '2px 10px', borderRadius: '20px' }}>{q.subject}</span>
                    </div>
                    <p style={{ fontWeight: 600, marginBottom: '14px', lineHeight: 1.6 }}>{q.text}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {q.options.map((opt, oi) => {
                        const isCorrect = oi === q.correct;
                        const isGiven   = oi === given;
                        let bg = 'rgba(255,255,255,0.03)';
                        let border = 'rgba(255,255,255,0.07)';
                        let col = 'var(--text-muted)';
                        if (isCorrect)       { bg = 'rgba(156,180,171,0.12)';  border = '#9cb4ab'; col = '#9cb4ab'; }
                        if (isGiven && !isCorrect) { bg = 'rgba(167,127,133,0.12)'; border = '#a77f85'; col = '#a77f85'; }
                        return (
                          <div key={oi} style={{ padding: '8px 14px', background: bg, border: `1px solid ${border}`, borderRadius: '8px', fontSize: '0.86rem', color: col }}>
                            <span style={{ fontWeight: 700, marginRight: '8px' }}>{String.fromCharCode(65 + oi)}.</span>{opt}
                            {isCorrect && <span aria-label="correct answer" style={{ marginLeft: '8px' }}>✓</span>}
                            {isGiven && !isCorrect && <span aria-label="your wrong answer" style={{ marginLeft: '8px' }}>✗</span>}
                          </div>
                        );
                      })}
                    </div>
                    {q.explanation && (
                      <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(165,160,178,0.10)', borderRadius: '8px', border: '1px solid rgba(165,160,178,0.24)', fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        <strong style={{ color: '#a5a0b2' }}>Explanation: </strong>{q.explanation}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
            <button className="btn-primary" onClick={() => { setAnswers({}); setFlagged(new Set()); setCurrent(0); setTimeLeft(TOTAL_SECS); setIsPaused(false); setInsight(null); setLeaderboard([]); setLeaderboardError(''); setInsightError(''); setIsSyncingInsight(false); setIsSavedResult(false); setPhase('intro'); }}>
              Retake Test
            </button>
            <Link href="/bitsat/tests"><button className="btn-secondary">All BITSAT Tests</button></Link>
            <Link href="/bitsat"><button className="btn-secondary">Rank Predictor</button></Link>
          </div>
        </main>
      </>
    );
  }

  // ── TEST SCREEN ────────────────────────────────────────────
  const progressPct = (Object.keys(answers).length / questions.length) * 100;

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Sticky header */}
        <div role="banner" aria-label="Test controls" style={styles.stickyBar}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {paper.title} — Q{current + 1}/{questions.length}
            </div>
            {/* Progress bar */}
            <div role="progressbar" aria-valuenow={Math.round(progressPct)} aria-valuemin={0} aria-valuemax={100}
              aria-label={`${Math.round(progressPct)}% answered`}
              style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--accent-secondary)', borderRadius: '2px', transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* Timer */}
          <div aria-live="polite" aria-label={`Time remaining: ${formatTime(timeLeft)}`}
            style={{ fontWeight: 800, fontSize: '1.3rem', color: timerColor, minWidth: '90px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(timeLeft)}
          </div>

          <button
            className="btn-secondary"
            onClick={() => setIsPaused(prev => !prev)}
            style={{ padding: '10px 16px', fontSize: '0.86rem' }}
            aria-label={isPaused ? 'Resume test timer' : 'Pause test timer'}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <button className="btn-primary" onClick={submitTest} style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            Submit
          </button>
        </div>

        {isPaused && (
          <div className="glass-panel" style={{ margin: '16px 24px 0', padding: '14px 16px', border: '1px solid rgba(181,169,138,0.35)', color: '#b5a98a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ fontSize: '0.88rem' }}>Test paused. Timer is stopped and interactions are locked.</span>
            <button className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }} onClick={() => setIsPaused(false)}>
              Resume Test
            </button>
          </div>
        )}

        {/* Section tabs */}
        <div role="tablist" aria-label="Jump to section" style={styles.sectionTabs}>
          {sections.map(sec => {
            const m   = SECTION_META[sec] || { color: '#fff' };
            const cnt = questions.filter(q => q.subject === sec).length;
            const ans = questions.filter(q => q.subject === sec && answers[q.id] !== undefined).length;
            return (
              <button key={sec} role="tab"
                aria-selected={activeSection === sec}
                aria-label={`${sec}: ${ans} of ${cnt} answered`}
                onClick={() => jumpToSection(sec)}
                disabled={isPaused}
                style={{
                  ...styles.sectionTab,
                  borderBottom: `2px solid ${activeSection === sec ? m.color : 'transparent'}`,
                  color: activeSection === sec ? m.color : 'var(--text-muted)',
                }}>
                <span aria-hidden="true">{m.icon}</span> {sec.replace('Logical Reasoning', 'Logic')}
                <span style={{ marginLeft: '6px', fontSize: '0.72rem', background: activeSection === sec ? `${m.color}22` : 'rgba(255,255,255,0.05)', padding: '1px 6px', borderRadius: '20px' }}>
                  {ans}/{cnt}
                </span>
              </button>
            );
          })}
        </div>

        <div style={styles.testLayout}>
          {/* Question area */}
          <section aria-label={`Question ${current + 1}`} style={styles.questionArea}>
            {/* Negative marking reminder */}
            <div style={{ padding: '8px 14px', background: 'rgba(167,127,133,0.1)', border: '1px solid rgba(167,127,133,0.26)', borderRadius: '8px', fontSize: '0.78rem', color: '#a77f85', marginBottom: '16px' }}>
              ⚠️ Negative marking active: +{correctMarks} correct · {wrongMarks} wrong · 0 skipped
            </div>

            {/* Subject badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ background: meta.bg, color: meta.color, padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, border: `1px solid ${meta.color}44` }}>
                <span aria-hidden="true">{meta.icon}</span> {q.subject}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Q{current + 1} of {questions.length}</span>
            </div>

            {/* Question text */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '16px' }}>
              <p style={{ fontWeight: 600, lineHeight: 1.8, fontSize: '1rem' }}>{q.text}</p>
            </div>

            {/* Options */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend className="sr-only">Select your answer for question {current + 1}</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} role="group">
                {q.options.map((opt, oi) => {
                  const selected = answers[q.id] === oi;
                  return (
                    <label key={oi} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 18px',
                      background: selected ? `${meta.color}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selected ? meta.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '12px', cursor: 'pointer', transition: 'all 0.15s', lineHeight: 1.6,
                    }}>
                      <input type="radio" name={`q-${q.id}`} value={oi} checked={selected}
                        onChange={() => handleOption(q.id, oi)}
                        disabled={isPaused}
                        style={{ marginTop: '3px', accentColor: meta.color }} />
                      <span style={{ fontWeight: 600, color: selected ? meta.color : 'var(--text-muted)', minWidth: '20px' }}>
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      <span style={{ color: selected ? '#fff' : 'var(--text-muted)' }}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button onClick={() => toggleFlag(q.id)}
                aria-pressed={flagged.has(q.id)}
                aria-label={flagged.has(q.id) ? 'Unflag question' : 'Flag for review'}
                disabled={isPaused}
                style={{ ...styles.controlBtn, color: flagged.has(q.id) ? '#b5a98a' : 'var(--text-muted)', borderColor: flagged.has(q.id) ? '#b5a98a' : 'rgba(255,255,255,0.1)' }}>
                {flagged.has(q.id) ? '🚩 Flagged' : '⚑ Flag'}
              </button>
              {answers[q.id] !== undefined && (
                <button onClick={() => clearAnswer(q.id)} aria-label="Clear answer"
                  disabled={isPaused}
                  style={{ ...styles.controlBtn, color: '#a77f85', borderColor: 'rgba(167,127,133,0.32)' }}>
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button onClick={() => !isPaused && setCurrent(c => Math.max(0, c - 1))} disabled={current === 0 || isPaused}
                className="btn-secondary" style={{ padding: '10px 24px', opacity: (current === 0 || isPaused) ? 0.4 : 1 }}
                aria-label="Previous question">
                ← Previous
              </button>
              <button onClick={() => !isPaused && setCurrent(c => Math.min(questions.length - 1, c + 1))}
                disabled={current === questions.length - 1 || isPaused}
                className="btn-primary" style={{ padding: '10px 24px', opacity: (current === questions.length - 1 || isPaused) ? 0.4 : 1 }}
                aria-label="Next question">
                Next →
              </button>
            </div>
          </section>

          {/* Question palette sidebar */}
          <aside aria-label="Question palette" style={styles.palette}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Question Palette
            </h2>

            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {[
                { color: meta.color,                       label: 'Current' },
                { color: '#9cb4ab',                        label: 'Answered' },
                { color: 'rgba(255,255,255,0.1)',          label: 'Not visited' },
                { color: '#b5a98a',                        label: 'Flagged' },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <div style={{ width: '10px', height: '10px', background: color, borderRadius: '2px' }} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>

            {/* Section groups */}
            {sections.map(sec => {
              const secQs = questions.map((q, i) => ({ ...q, idx: i })).filter(q => q.subject === sec);
              const m     = SECTION_META[sec] || { color: '#fff' };
              return (
                <div key={sec} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: m.color, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {sec.replace('Logical Reasoning', 'Logic')}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {secQs.map(({ id, idx }) => {
                      const isCurrent  = idx === current;
                      const isAnswered = answers[id] !== undefined;
                      const isFlagged  = flagged.has(id);
                      let bg     = 'rgba(255,255,255,0.06)';
                      let border = 'rgba(255,255,255,0.1)';
                      let color  = 'var(--text-muted)';
                      if (isCurrent)  { bg = m.color; border = m.color; color = '#fff'; }
                      else if (isFlagged) { bg = 'rgba(181,169,138,0.16)'; border = '#b5a98a'; color = '#b5a98a'; }
                      else if (isAnswered) { bg = 'rgba(156,180,171,0.16)'; border = '#9cb4ab'; color = '#9cb4ab'; }
                      return (
                        <button key={id} onClick={() => { if (!isPaused) { setCurrent(idx); setActiveSection(sec); } }}
                          disabled={isPaused}
                          aria-label={`Go to question ${idx + 1}${isFlagged ? ' (flagged)' : ''}${isAnswered ? ' (answered)' : ''}`}
                          aria-current={isCurrent ? 'true' : undefined}
                          style={{ width: '30px', height: '30px', borderRadius: '6px', background: bg, border: `1px solid ${border}`, color, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Score preview */}
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Score</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: score >= 0 ? '#9cb4ab' : '#a77f85' }}>{score} / {totalMarks}</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                {correct} correct · {wrong} wrong · −{wrong * Math.abs(wrongMarks)} pts
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: { padding: '20px 40px 60px', maxWidth: '900px', margin: '0 auto' },
  statBox: { padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' },
  predBox: { padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' },
  stickyBar: {
    position: 'sticky', top: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '12px 24px', background: 'rgba(5,5,15,0.92)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  sectionTabs: {
    display: 'flex', gap: '0', overflowX: 'auto',
    padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(5,5,15,0.7)', scrollbarWidth: 'none',
  },
  sectionTab: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '12px 14px', background: 'none', border: 'none', borderBottom: '2px solid transparent',
    cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'inherit',
    whiteSpace: 'nowrap', transition: 'color 0.15s',
  },
  testLayout: {
    display: 'flex', gap: '20px', alignItems: 'flex-start',
    padding: '20px 24px', maxWidth: '1200px', margin: '0 auto',
  },
  questionArea: { flex: 1, minWidth: 0 },
  palette: {
    width: '220px', flexShrink: 0, position: 'sticky', top: '130px',
    padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.07)', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto',
  },
  controlBtn: {
    padding: '8px 16px', background: 'transparent', borderRadius: '8px',
    border: '1px solid', cursor: 'pointer', fontSize: '0.83rem', fontFamily: 'inherit', fontWeight: 600,
  },
};
