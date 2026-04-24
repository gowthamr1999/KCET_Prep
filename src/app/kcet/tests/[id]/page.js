'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getKcetPaper } from '@/data/kcetQuestions';
import { estimateKcetRank, kcetResearchSignals } from '@/lib/kcetPredictor';
import { getScoreHistory, getStanding, saveAttempt } from '@/lib/kcetScoreHistory';

// Helpers
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function subjectColor(subject) {
  if (subject === 'Physics')     return { bg: 'rgba(154,167,179,0.14)', border: 'rgba(154,167,179,0.32)', text: '#9aa7b3' };
  if (subject === 'Chemistry')   return { bg: 'rgba(181,169,138,0.14)', border: 'rgba(181,169,138,0.32)', text: '#b5a98a' };
  if (subject === 'Mathematics') return { bg: 'rgba(165,160,178,0.14)', border: 'rgba(165,160,178,0.32)', text: '#a5a0b2' };
  return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)', text: '#f0f0f5' };
}

// 80 minutes per subject — matches real KCET paper structure
const SUBJECT_DURATION = 80 * 60;

// Main Component
export default function KcetTestPage() {
  const params = useParams();
  const paper = getKcetPaper(params.id);

  const questions = paper.questions;
  const subjects  = useMemo(() => [...new Set(questions.map(q => q.subject))], [questions]);

  const [phase, setPhase]       = useState('intro'); // intro | test | result
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState({});       // { questionId: optionIndex }
  const [flagged, setFlagged]   = useState({});       // { questionId: bool }
  const [timeTaken, setTimeTaken] = useState(0);
  const [rankEstimate, setRankEstimate] = useState(null);
  const [history, setHistory] = useState(() => getScoreHistory());
  const [standing, setStanding] = useState(null);
  const [isSavedResult, setIsSavedResult] = useState(false);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardError, setLeaderboardError] = useState('');

  // Per-subject timers: each subject gets SUBJECT_DURATION seconds
  const [subjectTimers, setSubjectTimers] = useState(
    () => Object.fromEntries(subjects.map(s => [s, SUBJECT_DURATION]))
  );
  // Subjects whose time has run out (answers locked)
  const [lockedSubjects, setLockedSubjects] = useState(new Set());
  const activeSubject = subjects[activeSubjectIndex] || subjects[0];

  useEffect(() => {
    if (phase !== 'test') return;

    // Ensure the question panel is visible immediately after starting the test.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const handleSelect = (qId, optIdx) => {
    if (phase !== 'test') return;
    const qSubject = questions.find(q => q.id === qId)?.subject;
    if (qSubject !== activeSubject) return;
    if (lockedSubjects.has(qSubject)) return; // time up for this subject
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  function handleSubmit() {
    setIsSavedResult(false);
    setPhase('result');
  }

  const completeCurrentSubject = useCallback(() => {
    if (phase !== 'test') return;

    setLockedSubjects(prev => {
      if (prev.has(activeSubject)) return prev;
      const next = new Set(prev);
      next.add(activeSubject);
      return next;
    });

    if (activeSubjectIndex >= subjects.length - 1) {
      handleSubmit();
      return;
    }

    const nextSubjectIndex = activeSubjectIndex + 1;
    const nextSubject = subjects[nextSubjectIndex];
    const nextIdx = questions.findIndex(q => q.subject === nextSubject);
    setActiveSubjectIndex(nextSubjectIndex);
    if (nextIdx !== -1) setCurrent(nextIdx);
  }, [phase, activeSubject, activeSubjectIndex, subjects, questions]);

  // Tick only the active subject timer (sequential subject-wise mode)
  useEffect(() => {
    if (phase !== 'test') return;
    const id = setInterval(() => {
      setSubjectTimers(prev => {
        const currentTime = prev[activeSubject] ?? SUBJECT_DURATION;
        const nextTime = Math.max(0, currentTime - 1);

        if (currentTime <= 1) {
          clearInterval(id);
          setTimeout(() => completeCurrentSubject(), 0);
        }

        return {
          ...prev,
          [activeSubject]: nextTime,
        };
      });
      setTimeTaken(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [phase, activeSubject, completeCurrentSubject]);

  // Results calculation
  const calcResults = () => {
    let correct = 0, wrong = 0, unattempted = 0;
    const perSubject = {};
    questions.forEach(q => {
      const sub = q.subject;
      if (!perSubject[sub]) perSubject[sub] = { correct: 0, wrong: 0, total: 0 };
      perSubject[sub].total++;
      if (answers[q.id] === undefined) { unattempted++; }
      else if (answers[q.id] === q.correct) { correct++; perSubject[sub].correct++; }
      else { wrong++; perSubject[sub].wrong++; }
    });
    return { correct, wrong, unattempted, perSubject };
  };

  useEffect(() => {
    if (phase !== 'result' || isSavedResult) return;

    let ignore = false;

    async function finalizeResult() {
      let correct = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correct) correct++;
      });
      const score = correct;
      const kcetEquivalent = (score / paper.totalMarks) * 180;
      const difficulty = paper.id >= 10 ? 'hard' : 'moderate';

      const estimate = estimateKcetRank({
        kcetMarks: kcetEquivalent,
        boardMarks: 270,
        paperDifficulty: difficulty,
        candidateGrowthPct: kcetResearchSignals.defaults.candidateGrowthPct,
        repeaterPct: kcetResearchSignals.defaults.repeaterPct,
      });

      const nextHistory = saveAttempt({
        paperId: paper.id,
        score,
        totalMarks: paper.totalMarks,
        timeTaken,
        userName,
      });

      // Fire-and-forget to server — does not block UI
      fetch('/api/track-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperId: paper.id,
          paperName: paper.name,
          score,
          totalMarks: paper.totalMarks,
          timeTaken,
          examType: 'kcet',
          candidateName: userName,
        }),
      }).catch(() => { /* silently ignore if offline */ });

      const lbResponse = await fetch(`/api/leaderboard?examType=kcet&paperId=${paper.id}`);
      const lbData = await lbResponse.json();

      if (!ignore) {
        setRankEstimate(estimate);
        setHistory(nextHistory);
        setStanding(getStanding(nextHistory, score));
        if (lbResponse.ok) {
          setLeaderboard(Array.isArray(lbData?.leaderboard) ? lbData.leaderboard : []);
          setLeaderboardError('');
        } else {
          setLeaderboard([]);
          setLeaderboardError(lbData?.error || 'Unable to load leaderboard right now.');
        }
        setIsSavedResult(true);
      }
    }

    finalizeResult();

    return () => {
      ignore = true;
    };
  }, [phase, isSavedResult, paper.id, paper.totalMarks, paper.name, timeTaken, userName, questions, answers]);

  // Intro screen
  if (phase === 'intro') {
    return (
      <>
        <Navbar />
        <main style={{ padding: '40px', maxWidth: '760px', margin: '0 auto' }}>
          <Link href="/kcet/tests" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Back to KCET Tests
          </Link>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={styles.subjectBadgeIntro}>KCET Mock Test</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '12px', lineHeight: 1.3 }}>
                {paper.title}
              </h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>{paper.description}</p>
            </div>
            <div style={styles.infoGrid}>
              {[
                ['Questions', `${questions.length} (${subjects.join(' + ')})`],
                ['Duration', `80 min × ${subjects.length} subjects`],
                ['Total Marks', `${paper.totalMarks}`],
                ['Marking', '+1 correct, 0 wrong'],
                ['Negative Marking', 'None'],
                ['Language', 'English'],
              ].map(([k, v]) => (
                <div key={k} style={styles.infoRow}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={styles.subjectBreakdown}>
              {subjects.map(sub => {
                const c = subjectColor(sub);
                const count = questions.filter(q => q.subject === sub).length;
                return (
                  <div key={sub} style={{ ...styles.subjectChip, background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                    {sub}: {count} Qs
                  </div>
                );
              })}
            </div>
            <div style={styles.instructionBox}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-primary)' }}>📌 Instructions</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <li>• Once started, the timer cannot be paused.</li>
                <li>• You will attempt one subject at a time in sequence.</li>
                <li>• Use the flag button to mark questions for review.</li>
                <li>• You can change your answer only while the current subject is active.</li>
                <li>• Each subject auto-locks when its timer ends.</li>
              </ul>
            </div>
            <div style={{ padding: '14px 18px', background: 'rgba(140,154,149,0.08)', border: '1px solid rgba(140,154,149,0.24)', borderRadius: '12px', marginBottom: '16px', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--accent-primary)' }}>⏱ Subject-wise timing (sequential mode):</strong><br />
              {subjects.map((s, i) => {
                const c = subjectColor(s);
                return <span key={s} style={{ color: c.text, fontWeight: 600 }}>{i > 0 ? ' · ' : ''}{s}: 80 min</span>;
              })}<br />
              <span style={{ fontSize: '0.8rem' }}>Only one subject timer runs at a time. You automatically move to the next subject after finishing or when time ends.</span>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="kcet-name" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Your Name (for leaderboard)
              </label>
              <input
                id="kcet-name"
                value={userName}
                onChange={(e) => { setUserName(e.target.value); if (nameError) setNameError(''); }}
                maxLength={50}
                placeholder="Enter your name"
                style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${nameError ? '#a77f85' : 'rgba(255,255,255,0.14)'}`, borderRadius: '10px', color: '#fff', fontFamily: 'inherit', fontSize: '0.94rem' }}
              />
              {nameError && <p style={{ marginTop: '8px', color: '#a77f85', fontSize: '0.82rem' }}>{nameError}</p>}
            </div>
            {history.length > 0 && (
              <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Previous attempts on this device:</strong> {history.length}<br />
                <span>Best score so far: {Math.max(...history.map(item => Number(item.score) || 0))}/{paper.totalMarks}</span>
              </div>
            )}
            <button className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', marginTop: '8px' }}
              onClick={() => {
                const cleanName = userName.trim();
                if (!cleanName) {
                  setNameError('Please enter your name before starting the test.');
                  return;
                }
                setAnswers({});
                setFlagged({});
                setCurrent(questions.findIndex(q => q.subject === subjects[0]));
                setTimeTaken(0);
                setSubjectTimers(Object.fromEntries(subjects.map(s => [s, SUBJECT_DURATION])));
                setLockedSubjects(new Set());
                setActiveSubjectIndex(0);
                setUserName(cleanName.slice(0, 50));
                setNameError('');
                setLeaderboard([]);
                setLeaderboardError('');
                setIsSavedResult(false);
                setPhase('test');
              }}>
              Start Test →
            </button>
          </div>
        </main>
      </>
    );
  }

  // Result screen
  if (phase === 'result') {
    const { correct, wrong, unattempted, perSubject } = calcResults();
    const score = correct;
    const fallbackEstimate = estimateKcetRank({
      kcetMarks: (score / paper.totalMarks) * 180,
      boardMarks: 270,
      paperDifficulty: paper.id >= 10 ? 'hard' : 'moderate',
      candidateGrowthPct: kcetResearchSignals.defaults.candidateGrowthPct,
      repeaterPct: kcetResearchSignals.defaults.repeaterPct,
    });
    const effectiveEstimate = rankEstimate || fallbackEstimate;
    const effectiveStanding = standing || getStanding(history, score);

    return (
      <>
        <Navbar />
        <main style={{ padding: '20px 40px 60px', maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
            Test <span className="text-gradient">Results</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{paper.title}</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '-20px', marginBottom: '22px' }}>
            Candidate: <span style={{ color: '#fff', fontWeight: 700 }}>{userName || 'Anonymous'}</span>
          </p>

          {/* Score Overview */}
          <div style={styles.resultGrid}>
            <div className="glass-panel" style={styles.scoreCard}>
              <div style={styles.scoreBig}>{score}</div>
              <div style={{ color: 'var(--text-muted)' }}>out of {paper.totalMarks}</div>
              <div style={styles.scorePercent}>{((score / paper.totalMarks) * 100).toFixed(1)}%</div>
            </div>
            <div style={styles.statsColumn}>
              {[
                ['✅ Correct', correct, '#9cb4ab'],
                ['❌ Wrong', wrong, '#a77f85'],
                ['⬜ Unattempted', unattempted, '#8e8e9f'],
                ['⏱ Time Taken', `${formatTime(timeTaken)}`, '#b5a98a'],
              ].map(([label, val, color]) => (
                <div key={label} className="glass-panel" style={{ ...styles.statRow, borderLeft: `3px solid ${color}` }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</span>
                  <span style={{ fontWeight: 700, color, fontSize: '1.1rem' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ ...styles.rankCard, marginTop: '8px', borderColor: 'rgba(156,180,171,0.24)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>🏁 Standing Tracker</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Previous Best</span><span style={styles.standingValue}>{effectiveStanding.previousBest ?? '-'} / {paper.totalMarks}</span></div>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Attempts</span><span style={styles.standingValue}>{effectiveStanding.totalAttempts}</span></div>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Average Score</span><span style={styles.standingValue}>{effectiveStanding.averageScore ? effectiveStanding.averageScore.toFixed(1) : '-'}</span></div>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Percentile</span><span style={styles.standingValue}>{effectiveStanding.percentile.toFixed(1)}%</span></div>
            </div>
          </div>

          <div className="glass-panel" style={{ ...styles.rankCard, borderColor: 'rgba(181,169,138,0.3)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>🏆 Leaderboard (This Test)</h2>
            {leaderboardError && <p style={{ color: '#a77f85', fontSize: '0.85rem', marginBottom: '8px' }}>{leaderboardError}</p>}
            {!leaderboard.length && !leaderboardError && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No leaderboard entries yet.</p>
            )}
            {!!leaderboard.length && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaderboard.slice(0, 10).map((row) => (
                  <div key={`${row.rank}-${row.name}-${row.score}`} style={{ display: 'grid', gridTemplateColumns: '42px 1fr auto auto', gap: '10px', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: row.name === userName ? 'rgba(156,180,171,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${row.name === userName ? 'rgba(156,180,171,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
                    <span style={{ color: '#b5a98a', fontWeight: 800 }}>#{row.rank}</span>
                    <span style={{ fontWeight: 600 }}>{row.name}</span>
                    <span style={{ color: '#9cb4ab', fontWeight: 700 }}>{row.score}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', minWidth: '58px', textAlign: 'right' }}>{row.timeTaken == null ? '--:--' : formatTime(row.timeTaken)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rank Prediction */}
          <div className="glass-panel" style={{ ...styles.rankCard, borderColor: 'rgba(165,160,178,0.32)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '4px' }}>🎯 KCET Rank Prediction</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              50:50 formula + trend factors: paper difficulty, candidate growth, repeaters
            </p>
            <div style={styles.rankDisplay}>
              <div>
                <div style={styles.rankValue}>{effectiveEstimate.estimatedRankRange}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Estimated Rank</div>
              </div>
              <div style={styles.rankDivider} />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>{effectiveEstimate.colleges}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Likely Admission at</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '16px', lineHeight: 1.6 }}>
              Combined score index: {effectiveEstimate.adjustedIndex.toFixed(2)} | Difficulty: {effectiveEstimate.factors.paperDifficulty} | Candidate growth: {effectiveEstimate.factors.candidateGrowthPct}% | Reappearing candidates: {effectiveEstimate.factors.repeaterPct}%.
            </p>
          </div>

          {/* Subject Analysis */}
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', marginTop: '32px' }}>📊 Subject-wise Analysis</h2>
          <div style={styles.subjectGrid}>
            {subjects.map(sub => {
              const data = perSubject[sub] || { correct: 0, wrong: 0, total: 0 };
              const attempted = data.correct + data.wrong;
              const accuracy = attempted > 0 ? ((data.correct / attempted) * 100).toFixed(0) : 0;
              const c = subjectColor(sub);
              return (
                <div key={sub} className="glass-panel" style={{ padding: '24px', borderTop: `2px solid ${c.border}` }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '16px', color: c.text }}>{sub}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={styles.subStat}><span style={{ color: 'var(--text-muted)' }}>Correct</span><span style={{ color: '#9cb4ab', fontWeight: 700 }}>{data.correct}/{data.total}</span></div>
                    <div style={styles.subStat}><span style={{ color: 'var(--text-muted)' }}>Wrong</span><span style={{ color: '#a77f85', fontWeight: 700 }}>{data.wrong}</span></div>
                    <div style={styles.subStat}><span style={{ color: 'var(--text-muted)' }}>Accuracy</span><span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>{accuracy}%</span></div>
                  </div>
                  <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(data.correct / data.total) * 100}%`, background: c.text, borderRadius: '8px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question Review */}
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '32px 0 16px' }}>🔍 Question Review</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              const isAttempted = userAns !== undefined;
              const borderColor = !isAttempted ? '#8e8e9f' : isCorrect ? '#9cb4ab' : '#a77f85';
              return (
                <div key={q.id} className="glass-panel" style={{ padding: '20px', borderLeft: `3px solid ${borderColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: subjectColor(q.subject).text }}>
                      Q{idx + 1} · {q.subject}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: !isAttempted ? '#8e8e9f' : isCorrect ? '#9cb4ab' : '#a77f85' }}>
                      {!isAttempted ? 'Skipped' : isCorrect ? '+1 ✓' : '0 ✗'}
                    </span>
                  </div>
                  <p style={{ marginBottom: '12px', lineHeight: 1.5 }}>{q.text}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {q.options.map((opt, i) => {
                      const isCorrectOpt = i === q.correct;
                      const isUserOpt    = i === userAns;
                      let bg = 'transparent', bdr = '1px solid rgba(255,255,255,0.08)';
                      if (isCorrectOpt)            { bg = 'rgba(156,180,171,0.12)'; bdr = '1px solid rgba(156,180,171,0.45)'; }
                      if (isUserOpt && !isCorrect) { bg = 'rgba(167,127,133,0.12)'; bdr = '1px solid rgba(167,127,133,0.45)'; }
                      return (
                        <div key={i} style={{ padding: '8px 12px', borderRadius: '8px', background: bg, border: bdr, fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{opt}</span>
                          {isCorrectOpt && <span style={{ color: '#9cb4ab' }}>✓ Correct</span>}
                          {isUserOpt && !isCorrect && <span style={{ color: '#a77f85' }}>✗ Your answer</span>}
                        </div>
                      );
                    })}
                  </div>
                  {q.explanation && (
                    <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center' }}>
            <Link href="/kcet/tests"><button className="btn-secondary">← All Tests</button></Link>
            <button className="btn-primary" onClick={() => { setAnswers({}); setFlagged({}); setCurrent(0); setTimeTaken(0); setSubjectTimers(Object.fromEntries(subjects.map(s => [s, SUBJECT_DURATION]))); setLockedSubjects(new Set()); setActiveSubjectIndex(0); setRankEstimate(null); setStanding(null); setLeaderboard([]); setLeaderboardError(''); setIsSavedResult(false); setPhase('intro'); }}>
              Retake Test
            </button>
            <Link href="/kcet"><button className="btn-secondary">Rank Predictor →</button></Link>
          </div>
        </main>
      </>
    );
  }

  // Test screen
  const activeQuestionIndices = questions
    .map((item, idx) => (item.subject === activeSubject ? idx : -1))
    .filter(idx => idx !== -1);
  const safeCurrent = activeQuestionIndices.includes(current) ? current : (activeQuestionIndices[0] ?? 0);
  const q = questions[safeCurrent];
  const answered = Object.keys(answers).length;
  const currentSubjectTime = subjectTimers[activeSubject] ?? SUBJECT_DURATION;
  const timerPct   = (currentSubjectTime / SUBJECT_DURATION) * 100;
  const timerColor = currentSubjectTime < 5 * 60 ? '#a77f85' : currentSubjectTime < 15 * 60 ? '#b5a98a' : 'var(--accent-secondary)';
  const isCurrentLocked = lockedSubjects.has(activeSubject);
  const activePosition = activeQuestionIndices.indexOf(safeCurrent);
  const isFirstInSubject = activePosition <= 0;
  const isLastInSubject = activePosition === activeQuestionIndices.length - 1;
  const totalSubjects = subjects.length;

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
        {/* Top Bar */}
        <div style={{ ...styles.topBar }} className="glass-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{paper.title}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>KCET Mock | Paper {params.id}</span>
            <span style={{ color: 'var(--accent-secondary)', fontSize: '0.74rem', fontWeight: 700 }}>
              Subject {activeSubjectIndex + 1} of {totalSubjects}: {activeSubject}
            </span>
          </div>
          <div style={{ flex: 1, margin: '0 20px' }}>
            {/* Per-subject timer bars */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              {subjects.map(sub => {
                const t   = subjectTimers[sub] ?? SUBJECT_DURATION;
                const pct = (t / SUBJECT_DURATION) * 100;
                const col = sub === activeSubject ? timerColor : lockedSubjects.has(sub) ? '#a77f85' : 'rgba(255,255,255,0.2)';
                const c   = subjectColor(sub);
                return (
                  <div key={sub} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: sub === activeSubject ? c.text : 'var(--text-muted)', marginBottom: '2px', fontWeight: sub === activeSubject ? 700 : 400 }}>
                      <span>{sub.slice(0, 4)}</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{lockedSubjects.has(sub) ? 'Locked' : formatTime(t)}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: lockedSubjects.has(sub) ? 'rgba(167,127,133,0.3)' : c.text, borderRadius: '2px', transition: 'width 1s linear' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: 'right', minWidth: '110px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{formatTime(currentSubjectTime)}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{activeSubject} remaining</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{answered}/{questions.length} answered</div>
          </div>
          <button className="btn-primary" style={{ marginLeft: '16px', padding: '10px 20px', fontSize: '0.9rem' }}
            onClick={() => { if (window.confirm('Submit the test? You cannot change answers after submission.')) handleSubmit(); }}>
            Submit
          </button>
        </div>

        <div style={styles.testLayout}>
          {/* Question Area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Subject tabs */}
            <div style={styles.subjectTabs}>
              {subjects.map((sub, si) => {
                const c = subjectColor(sub);
                const isCurrent = activeSubject === sub;
                const isLocked = lockedSubjects.has(sub);
                const isFuture = si > activeSubjectIndex;
                return (
                  <button key={sub}
                    style={{ ...styles.subjectTab, background: isCurrent ? c.bg : 'transparent', border: `1px solid ${isCurrent ? c.border : 'transparent'}`, color: isCurrent ? c.text : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'default' }}>
                    {sub}
                    {isLocked
                      ? <span style={{ fontSize: '0.65rem', color: '#a77f85', fontWeight: 700 }}>🔒 Locked</span>
                      : isFuture
                        ? <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>Up Next</span>
                        : <span style={{ fontSize: '0.65rem', color: isCurrent ? c.text : 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{formatTime(subjectTimers[sub] ?? SUBJECT_DURATION)}</span>
                    }
                  </button>
                );
              })}
            </div>

            {/* Question */}
            <div className="glass-panel" style={styles.questionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Q {safeCurrent + 1}/{questions.length}</span>
                  <span style={{ ...styles.subjectBadgeInline, ...(() => { const c = subjectColor(q.subject); return { background: c.bg, border: `1px solid ${c.border}`, color: c.text }; })() }}>
                    {q.subject}
                  </span>
                </div>
                <button onClick={() => toggleFlag(q.id)}
                  style={{ background: flagged[q.id] ? 'rgba(181,169,138,0.15)' : 'transparent', border: `1px solid ${flagged[q.id] ? 'rgba(181,169,138,0.45)' : 'rgba(255,255,255,0.15)'}`, borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', color: flagged[q.id] ? '#b5a98a' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {flagged[q.id] ? '🚩 Flagged' : '⚑ Flag'}
                </button>
              </div>
              {isCurrentLocked && (
                <div style={{ padding: '10px 14px', background: 'rgba(167,127,133,0.12)', border: '1px solid rgba(167,127,133,0.32)', borderRadius: '10px', marginBottom: '14px', fontSize: '0.85rem', color: '#a77f85', fontWeight: 600 }}>
                  🔒 Time up for {q.subject}. Answers are locked for this section.
                </div>
              )}
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px', fontWeight: 500 }}>{q.text}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map((opt, i) => {
                  const sel = answers[q.id] === i;
                  return (
                    <div key={i} onClick={() => !isCurrentLocked && handleSelect(q.id, i)} style={{
                      cursor: isCurrentLocked ? 'not-allowed' : 'pointer',
                      padding: '14px 18px', borderRadius: '12px',
                      background: sel ? 'rgba(95,118,111,0.18)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${sel ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}`,
                      display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.15s ease',
                    }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${sel ? 'var(--accent-primary)' : 'rgba(255,255,255,0.3)'}`, background: sel ? 'var(--accent-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <div style={{ width: '10px', height: '10px', background: 'white', borderRadius: '50%' }} />}
                      </div>
                      <span style={{ lineHeight: 1.4 }}>{opt}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
                <button className="btn-secondary" disabled={isFirstInSubject} onClick={() => setCurrent(activeQuestionIndices[activePosition - 1])}
                  style={{ opacity: isFirstInSubject ? 0.4 : 1, cursor: isFirstInSubject ? 'not-allowed' : 'pointer' }}>
                  ← Previous
                </button>
                {answers[q.id] !== undefined && (
                  <button onClick={() => !isCurrentLocked && setAnswers(prev => { const n = { ...prev }; delete n[q.id]; return n; })}
                    disabled={isCurrentLocked}
                    style={{ background: 'transparent', border: '1px solid rgba(167,127,133,0.4)', borderRadius: '20px', padding: '8px 16px', cursor: isCurrentLocked ? 'not-allowed' : 'pointer', opacity: isCurrentLocked ? 0.5 : 1, color: '#a77f85', fontSize: '0.85rem' }}>
                    Clear Answer
                  </button>
                )}
                <button className="btn-primary"
                  onClick={() => {
                    if (!isLastInSubject) {
                      setCurrent(activeQuestionIndices[activePosition + 1]);
                      return;
                    }
                    if (window.confirm(`Finish ${activeSubject} and move to the next subject?`)) {
                      completeCurrentSubject();
                    }
                  }}
                  style={{ opacity: 1, cursor: 'pointer' }}>
                  {isLastInSubject ? (activeSubjectIndex === subjects.length - 1 ? 'Finish & Submit' : `Finish ${activeSubject} →`) : 'Next →'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Question Palette */}
          <div style={styles.palette}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Question Palette
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {subjects.map((sub, si) => {
                  const subQs = questions.filter(q2 => q2.subject === sub);
                  const c = subjectColor(sub);
                  const isActiveSub = sub === activeSubject;
                  const isFutureSub = si > activeSubjectIndex;
                  return (
                    <div key={sub}>
                      <div style={{ fontSize: '0.75rem', color: isActiveSub ? c.text : 'var(--text-muted)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {sub} {isFutureSub ? '(up next)' : (!isActiveSub ? '(locked)' : '')}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {subQs.map((sq) => {
                          const globalIdx = questions.indexOf(sq);
                          const isAns    = answers[sq.id] !== undefined;
                          const isFlagged = flagged[sq.id];
                          const isCur    = globalIdx === safeCurrent;
                          return (
                            <button key={sq.id} onClick={() => { if (isActiveSub) setCurrent(globalIdx); }}
                              disabled={!isActiveSub}
                              style={{
                                width: '34px', height: '34px', borderRadius: '8px', border: 'none', cursor: isActiveSub ? 'pointer' : 'not-allowed', fontSize: '0.8rem', fontWeight: 700,
                                background: isCur ? 'var(--accent-primary)' : isAns ? 'rgba(156,180,171,0.22)' : 'rgba(255,255,255,0.06)',
                                color: isCur ? 'white' : isAns ? '#9cb4ab' : 'var(--text-muted)',
                                opacity: isActiveSub ? 1 : 0.45,
                                outline: isFlagged ? '2px solid #b5a98a' : 'none',
                                outlineOffset: '1px',
                              }}>
                              {globalIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
                {[
                  ['■', 'var(--accent-primary)', 'Current'],
                  ['■', 'rgba(156,180,171,0.42)', 'Answered'],
                  ['■', 'rgba(255,255,255,0.06)', 'Not visited'],
                  ['□', '#b5a98a', 'Flagged'],
                ].map(([icon, color, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ color }}>{icon}</span>{label}
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ width: '100%', marginTop: '20px', padding: '12px' }}
                onClick={() => { if (window.confirm('Submit the test? You cannot change answers after submission.')) handleSubmit(); }}>
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  subjectBadgeIntro: {
    display: 'inline-block',
    background: 'rgba(95,118,111,0.2)',
    border: '1px solid rgba(95,118,111,0.36)',
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '0.78rem',
    color: '#9cb4ab',
    fontWeight: 600,
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    margin: '24px 0',
    padding: '20px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  subjectBreakdown: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  subjectChip: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  instructionBox: {
    padding: '20px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '8px',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    margin: '12px',
    borderRadius: '16px',
    position: 'sticky',
    top: '12px',
    zIndex: 100,
    gap: '16px',
  },
  testLayout: {
    display: 'flex',
    gap: '20px',
    padding: '16px',
    alignItems: 'flex-start',
  },
  subjectTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  subjectTab: {
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'all 0.2s',
  },
  questionCard: {
    padding: '28px',
  },
  subjectBadgeInline: {
    padding: '3px 12px',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: 600,
  },
  palette: {
    width: '280px',
    flexShrink: 0,
    position: 'sticky',
    top: '80px',
  },
  // Results
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: '20px',
    marginBottom: '24px',
  },
  scoreCard: {
    padding: '32px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  scoreBig: {
    fontSize: '5rem',
    fontWeight: 900,
    lineHeight: 1,
    color: 'var(--accent-primary)',
  },
  scorePercent: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'var(--accent-secondary)',
    marginTop: '4px',
  },
  statsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  statRow: {
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankCard: {
    padding: '28px',
    border: '1px solid',
    marginBottom: '8px',
  },
  rankDisplay: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  rankValue: {
    fontSize: '1.8rem',
    fontWeight: 900,
    color: '#a5a0b2',
    lineHeight: 1.2,
  },
  rankDivider: {
    width: '1px',
    height: '60px',
    background: 'var(--glass-border)',
  },
  subjectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  subStat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    fontSize: '0.9rem',
  },
  standingPill: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px 14px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  standingLabel: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  standingValue: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--accent-secondary)',
  },
};
