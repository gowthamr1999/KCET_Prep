'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getKcetPaper } from '@/data/kcetQuestions';
import { estimateKcetRank, kcetResearchSignals } from '@/lib/kcetPredictor';
import { getScoreHistory, getStanding, saveAttempt } from '@/lib/kcetScoreHistory';

// ── Helpers ─────────────────────────────────────────────────
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function subjectColor(subject) {
  if (subject === 'Physics')     return { bg: 'rgba(0,245,212,0.1)', border: 'rgba(0,245,212,0.4)', text: '#00f5d4' };
  if (subject === 'Chemistry')   return { bg: 'rgba(254,228,64,0.1)', border: 'rgba(254,228,64,0.4)', text: '#fee440' };
  if (subject === 'Mathematics') return { bg: 'rgba(123,44,191,0.15)', border: 'rgba(123,44,191,0.5)', text: '#c77dff' };
  return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)', text: '#f0f0f5' };
}

// 80 minutes per subject — matches real KCET paper structure
const SUBJECT_DURATION = 80 * 60;

// ── Main Component ──────────────────────────────────────────
export default function KcetTestPage() {
  const params = useParams();
  const paper = getKcetPaper(params.id);

  const questions = paper.questions;
  const subjects  = [...new Set(questions.map(q => q.subject))];

  const [phase, setPhase]       = useState('intro'); // intro | test | result
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState({});       // { questionId: optionIndex }
  const [flagged, setFlagged]   = useState({});       // { questionId: bool }
  const [timeTaken, setTimeTaken] = useState(0);
  const [rankEstimate, setRankEstimate] = useState(null);
  const [history, setHistory] = useState([]);
  const [standing, setStanding] = useState(null);
  const [isSavedResult, setIsSavedResult] = useState(false);

  // Per-subject timers: each subject gets SUBJECT_DURATION seconds
  const [subjectTimers, setSubjectTimers] = useState(
    () => Object.fromEntries(subjects.map(s => [s, SUBJECT_DURATION]))
  );
  // Subjects whose time has run out (answers locked)
  const [lockedSubjects, setLockedSubjects] = useState(new Set());

  // Tick all subject timers simultaneously
  useEffect(() => {
    if (phase !== 'test') return;
    const id = setInterval(() => {
      setSubjectTimers(prev => {
        const next = {};
        subjects.forEach(s => { next[s] = Math.max(0, prev[s] - 1); });
        return next;
      });
      setTimeTaken(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    setHistory(getScoreHistory());
  }, []);

  useEffect(() => {
    if (phase !== 'test') return;

    // Ensure the question panel is visible immediately after starting the test.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  // Lock subjects when their timer reaches 0; auto-submit when all locked
  useEffect(() => {
    if (phase !== 'test') return;
    const nowLocked = new Set(subjects.filter(s => subjectTimers[s] === 0));
    if (nowLocked.size !== lockedSubjects.size) {
      setLockedSubjects(nowLocked);
      // Jump to first question of the next unlocked subject
      const nextSub = subjects.find(s => !nowLocked.has(s));
      if (nextSub) {
        const nextIdx = questions.findIndex(q => q.subject === nextSub);
        if (nextIdx !== -1) setCurrent(nextIdx);
      }
      // All done → auto-submit
      if (nowLocked.size === subjects.length) handleSubmit();
    }
  }, [subjectTimers]);

  const handleSelect = (qId, optIdx) => {
    if (phase !== 'test') return;
    const qSubject = questions.find(q => q.id === qId)?.subject;
    if (lockedSubjects.has(qSubject)) return; // time up for this subject
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmit = useCallback(() => {
    setIsSavedResult(false);
    setPhase('result');
  }, []);

  // ── Results Calculation ───────────────────────────────────
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

    const { correct } = calcResults();
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
      }),
    }).catch(() => { /* silently ignore if offline */ });

    setRankEstimate(estimate);
    setHistory(nextHistory);
    setStanding(getStanding(nextHistory, score));
    setIsSavedResult(true);
  }, [phase, isSavedResult, paper.id, paper.totalMarks, timeTaken]);

  // ── INTRO SCREEN ──────────────────────────────────────────
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
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-secondary)' }}>📌 Instructions</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <li>• Once started, the timer cannot be paused.</li>
                <li>• Click any question in the palette to navigate directly.</li>
                <li>• Use the flag button to mark questions for review.</li>
                <li>• You can change your answer any time before submission.</li>
                <li>• Test auto-submits when time runs out.</li>
              </ul>
            </div>
            <div style={{ padding: '14px 18px', background: 'rgba(0,245,212,0.06)', border: '1px solid rgba(0,245,212,0.2)', borderRadius: '12px', marginBottom: '16px', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--accent-secondary)' }}>⏱ Subject-wise timing (real KCET format):</strong><br />
              {subjects.map((s, i) => {
                const c = subjectColor(s);
                return <span key={s} style={{ color: c.text, fontWeight: 600 }}>{i > 0 ? ' · ' : ''}{s}: 80 min</span>;
              })}<br />
              <span style={{ fontSize: '0.8rem' }}>All subject timers run simultaneously. When a subject's time ends, it locks automatically.</span>
            </div>
            {history.length > 0 && (
              <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--accent-secondary)' }}>Previous attempts on this device:</strong> {history.length}<br />
                <span>Best score so far: {Math.max(...history.map(item => Number(item.score) || 0))}/{paper.totalMarks}</span>
              </div>
            )}
            <button className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', marginTop: '8px' }}
              onClick={() => setPhase('test')}>
              Start Test →
            </button>
          </div>
        </main>
      </>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────
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

          {/* Score Overview */}
          <div style={styles.resultGrid}>
            <div className="glass-panel" style={styles.scoreCard}>
              <div style={styles.scoreBig}>{score}</div>
              <div style={{ color: 'var(--text-muted)' }}>out of {paper.totalMarks}</div>
              <div style={styles.scorePercent}>{((score / paper.totalMarks) * 100).toFixed(1)}%</div>
            </div>
            <div style={styles.statsColumn}>
              {[
                ['✅ Correct', correct, '#00f5d4'],
                ['❌ Wrong', wrong, '#ff6b6b'],
                ['⬜ Unattempted', unattempted, '#8e8e9f'],
                ['⏱ Time Taken', `${formatTime(timeTaken)}`, '#fee440'],
              ].map(([label, val, color]) => (
                <div key={label} className="glass-panel" style={{ ...styles.statRow, borderLeft: `3px solid ${color}` }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</span>
                  <span style={{ fontWeight: 700, color, fontSize: '1.1rem' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ ...styles.rankCard, marginTop: '8px', borderColor: 'rgba(0,245,212,0.25)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>🏁 Standing Tracker</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Previous Best</span><span style={styles.standingValue}>{effectiveStanding.previousBest ?? '-'} / {paper.totalMarks}</span></div>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Attempts</span><span style={styles.standingValue}>{effectiveStanding.totalAttempts}</span></div>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Average Score</span><span style={styles.standingValue}>{effectiveStanding.averageScore ? effectiveStanding.averageScore.toFixed(1) : '-'}</span></div>
              <div style={styles.standingPill}><span style={styles.standingLabel}>Percentile</span><span style={styles.standingValue}>{effectiveStanding.percentile.toFixed(1)}%</span></div>
            </div>
          </div>

          {/* Rank Prediction */}
          <div className="glass-panel" style={{ ...styles.rankCard, borderColor: 'rgba(123, 44, 191, 0.4)' }}>
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
                    <div style={styles.subStat}><span style={{ color: 'var(--text-muted)' }}>Correct</span><span style={{ color: '#00f5d4', fontWeight: 700 }}>{data.correct}/{data.total}</span></div>
                    <div style={styles.subStat}><span style={{ color: 'var(--text-muted)' }}>Wrong</span><span style={{ color: '#ff6b6b', fontWeight: 700 }}>{data.wrong}</span></div>
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
              const borderColor = !isAttempted ? '#8e8e9f' : isCorrect ? '#00f5d4' : '#ff6b6b';
              return (
                <div key={q.id} className="glass-panel" style={{ padding: '20px', borderLeft: `3px solid ${borderColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: subjectColor(q.subject).text }}>
                      Q{idx + 1} · {q.subject}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: !isAttempted ? '#8e8e9f' : isCorrect ? '#00f5d4' : '#ff6b6b' }}>
                      {!isAttempted ? 'Skipped' : isCorrect ? '+1 ✓' : '0 ✗'}
                    </span>
                  </div>
                  <p style={{ marginBottom: '12px', lineHeight: 1.5 }}>{q.text}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {q.options.map((opt, i) => {
                      const isCorrectOpt = i === q.correct;
                      const isUserOpt    = i === userAns;
                      let bg = 'transparent', bdr = '1px solid rgba(255,255,255,0.08)';
                      if (isCorrectOpt)            { bg = 'rgba(0,245,212,0.1)'; bdr = '1px solid rgba(0,245,212,0.5)'; }
                      if (isUserOpt && !isCorrect) { bg = 'rgba(255,107,107,0.1)'; bdr = '1px solid rgba(255,107,107,0.5)'; }
                      return (
                        <div key={i} style={{ padding: '8px 12px', borderRadius: '8px', background: bg, border: bdr, fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{opt}</span>
                          {isCorrectOpt && <span style={{ color: '#00f5d4' }}>✓ Correct</span>}
                          {isUserOpt && !isCorrect && <span style={{ color: '#ff6b6b' }}>✗ Your answer</span>}
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
            <button className="btn-primary" onClick={() => { setAnswers({}); setFlagged({}); setCurrent(0); setTimeTaken(0); setSubjectTimers(Object.fromEntries(subjects.map(s => [s, SUBJECT_DURATION]))); setLockedSubjects(new Set()); setRankEstimate(null); setStanding(null); setIsSavedResult(false); setPhase('intro'); }}>
              Retake Test
            </button>
            <Link href="/kcet"><button className="btn-secondary">Rank Predictor →</button></Link>
          </div>
        </main>
      </>
    );
  }

  // ── TEST SCREEN ───────────────────────────────────────────
  const q = questions[current];
  const answered = Object.keys(answers).length;
  const currentSubjectTime = subjectTimers[q.subject] ?? SUBJECT_DURATION;
  const timerPct   = (currentSubjectTime / SUBJECT_DURATION) * 100;
  const timerColor = currentSubjectTime < 5 * 60 ? '#ff6b6b' : currentSubjectTime < 15 * 60 ? '#fee440' : 'var(--accent-secondary)';
  const isCurrentLocked = lockedSubjects.has(q.subject);

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
        {/* Top Bar */}
        <div style={{ ...styles.topBar }} className="glass-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{paper.title}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>KCET Mock | Paper {params.id}</span>
          </div>
          <div style={{ flex: 1, margin: '0 20px' }}>
            {/* Per-subject timer bars */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              {subjects.map(sub => {
                const t   = subjectTimers[sub] ?? SUBJECT_DURATION;
                const pct = (t / SUBJECT_DURATION) * 100;
                const col = sub === q.subject ? timerColor : lockedSubjects.has(sub) ? '#ff6b6b' : 'rgba(255,255,255,0.2)';
                const c   = subjectColor(sub);
                return (
                  <div key={sub} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: sub === q.subject ? c.text : 'var(--text-muted)', marginBottom: '2px', fontWeight: sub === q.subject ? 700 : 400 }}>
                      <span>{sub.slice(0, 4)}</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{lockedSubjects.has(sub) ? 'Locked' : formatTime(t)}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: lockedSubjects.has(sub) ? '#ff6b6b44' : c.text, borderRadius: '2px', transition: 'width 1s linear' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: 'right', minWidth: '110px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{formatTime(currentSubjectTime)}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{q.subject} remaining</div>
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
                const firstIdx = questions.findIndex(q => q.subject === sub);
                const c = subjectColor(sub);
                const isCurrent = q.subject === sub;
                return (
                  <button key={sub} onClick={() => setCurrent(firstIdx)}
                    style={{ ...styles.subjectTab, background: isCurrent ? c.bg : 'transparent', border: `1px solid ${isCurrent ? c.border : 'transparent'}`, color: isCurrent ? c.text : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {sub}
                    {lockedSubjects.has(sub)
                      ? <span style={{ fontSize: '0.65rem', color: '#ff6b6b', fontWeight: 700 }}>🔒 Locked</span>
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
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Q {current + 1}/{questions.length}</span>
                  <span style={{ ...styles.subjectBadgeInline, ...(() => { const c = subjectColor(q.subject); return { background: c.bg, border: `1px solid ${c.border}`, color: c.text }; })() }}>
                    {q.subject}
                  </span>
                </div>
                <button onClick={() => toggleFlag(q.id)}
                  style={{ background: flagged[q.id] ? 'rgba(254,228,64,0.15)' : 'transparent', border: `1px solid ${flagged[q.id] ? 'rgba(254,228,64,0.5)' : 'rgba(255,255,255,0.15)'}`, borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', color: flagged[q.id] ? '#fee440' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {flagged[q.id] ? '🚩 Flagged' : '⚑ Flag'}
                </button>
              </div>
              {isCurrentLocked && (
                <div style={{ padding: '10px 14px', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', marginBottom: '14px', fontSize: '0.85rem', color: '#ff6b6b', fontWeight: 600 }}>
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
                      padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                      background: sel ? 'rgba(123,44,191,0.2)' : 'rgba(255,255,255,0.03)',
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
                <button className="btn-secondary" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}
                  style={{ opacity: current === 0 ? 0.4 : 1, cursor: current === 0 ? 'not-allowed' : 'pointer' }}>
                  ← Previous
                </button>
                {answers[q.id] !== undefined && (
                  <button onClick={() => setAnswers(prev => { const n = { ...prev }; delete n[q.id]; return n; })}
                    style={{ background: 'transparent', border: '1px solid rgba(255,107,107,0.4)', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', color: '#ff6b6b', fontSize: '0.85rem' }}>
                    Clear Answer
                  </button>
                )}
                <button className="btn-primary" disabled={current === questions.length - 1} onClick={() => setCurrent(c => c + 1)}
                  style={{ opacity: current === questions.length - 1 ? 0.4 : 1, cursor: current === questions.length - 1 ? 'not-allowed' : 'pointer' }}>
                  Next →
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
                {subjects.map(sub => {
                  const subQs = questions.filter(q2 => q2.subject === sub);
                  const c = subjectColor(sub);
                  return (
                    <div key={sub}>
                      <div style={{ fontSize: '0.75rem', color: c.text, fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sub}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {subQs.map((sq) => {
                          const globalIdx = questions.indexOf(sq);
                          const isAns    = answers[sq.id] !== undefined;
                          const isFlagged = flagged[sq.id];
                          const isCur    = globalIdx === current;
                          return (
                            <button key={sq.id} onClick={() => setCurrent(globalIdx)}
                              style={{
                                width: '34px', height: '34px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700,
                                background: isCur ? 'var(--accent-primary)' : isAns ? 'rgba(0,245,212,0.25)' : 'rgba(255,255,255,0.06)',
                                color: isCur ? 'white' : isAns ? '#00f5d4' : 'var(--text-muted)',
                                outline: isFlagged ? '2px solid #fee440' : 'none',
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
                  ['■', 'rgba(0,245,212,0.4)', 'Answered'],
                  ['■', 'rgba(255,255,255,0.06)', 'Not visited'],
                  ['□', '#fee440', 'Flagged'],
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
    background: 'rgba(123,44,191,0.2)',
    border: '1px solid rgba(123,44,191,0.4)',
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '0.78rem',
    color: '#c77dff',
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
    background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    color: '#c77dff',
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
