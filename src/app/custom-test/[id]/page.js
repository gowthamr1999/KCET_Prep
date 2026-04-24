'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getCustomPaperById } from '@/lib/paperParser';

// Helpers
function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Colour palette — cycles through a set for unlabelled subjects
const PALETTE = [
  { color: '#00f5d4', bg: 'rgba(0,245,212,0.12)'   },
  { color: '#c77dff', bg: 'rgba(199,125,255,0.12)' },
  { color: '#378ADD', bg: 'rgba(55,138,221,0.12)'  },
  { color: '#1D9E75', bg: 'rgba(29,158,117,0.12)'  },
  { color: '#fee440', bg: 'rgba(254,228,64,0.12)'  },
  { color: '#ff5a7e', bg: 'rgba(255,90,126,0.12)'  },
];
const KNOWN_META = {
  Physics:             { color: '#378ADD', bg: 'rgba(55,138,221,0.12)',   icon: '⚛️' },
  Chemistry:           { color: '#1D9E75', bg: 'rgba(29,158,117,0.12)',   icon: '🧪' },
  Mathematics:         { color: '#7F77DD', bg: 'rgba(127,119,221,0.12)',  icon: '📐' },
  English:             { color: '#fee440', bg: 'rgba(254,228,64,0.12)',   icon: '📖' },
  'Logical Reasoning': { color: '#ff5a7e', bg: 'rgba(255,90,126,0.12)',   icon: '🧩' },
  General:             { color: '#c77dff', bg: 'rgba(199,125,255,0.12)',  icon: '📋' },
};

function sectionMeta(subject, idx) {
  if (KNOWN_META[subject]) return { ...KNOWN_META[subject], icon: KNOWN_META[subject].icon };
  const p = PALETTE[idx % PALETTE.length];
  return { ...p, icon: '📋' };
}

// Not found
function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>Paper not found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
          This custom paper could not be found. It may have been deleted, or the link is stale.
          Papers are stored locally in your browser.
        </p>
        <Link href="/upload"><button className="btn-primary">Upload a Paper →</button></Link>
      </main>
    </>
  );
}

// Main Component
export default function CustomTestPage() {
  const params = useParams();
  const [paper,       setPaper]      = useState(null);
  const [loaded,      setLoaded]     = useState(false);
  const [phase,       setPhase]      = useState('intro');
  const [answers,     setAnswers]    = useState({});
  const [flagged,     setFlagged]    = useState(new Set());
  const [current,     setCurrent]    = useState(0);
  const [timeLeft,    setTimeLeft]   = useState(0);
  const [timeTaken,   setTimeTaken]  = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const timerRef = useRef(null);

  // Load from localStorage (client-only)
  useEffect(() => {
    async function loadPaper() {
      await Promise.resolve();
      const p = getCustomPaperById(params.id);
      setPaper(p);
      if (p) {
        setTimeLeft(p.duration * 60);
        const firstSection = p.questions[0]?.subject || '';
        setActiveSection(firstSection);
      }
      setLoaded(true);
    }

    loadPaper();
  }, [params.id]);

  const submitTest = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeTaken(paper ? paper.duration * 60 - timeLeft : 0);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [timeLeft, paper]);

  useEffect(() => {
    if (phase !== 'test') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); submitTest(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, submitTest]);

  if (!loaded) return null;
  if (!paper)  return <NotFound />;

  const { questions, correctMarks = 1, wrongMarks = 0, duration = 120 } = paper;
  const TOTAL_SECS = duration * 60;

  // Derived sections (ordered, unique)
  const sections = [...new Set(questions.map(q => q.subject))];
  const sectionMetaMap = Object.fromEntries(
    sections.map((sec, i) => [sec, sectionMeta(sec, i)])
  );

  // Scoring
  const correct     = questions.filter(q => answers[q.id] === q.correct).length;
  const wrong       = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
  const unattempted = questions.length - correct - wrong;
  const score       = correct * correctMarks + wrong * wrongMarks;
  const maxScore    = questions.length * correctMarks;

  // Section stats
  const sectionStats = sections.map(sec => {
    const qs = questions.filter(q => q.subject === sec);
    const c  = qs.filter(q => answers[q.id] === q.correct).length;
    const w  = qs.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct).length;
    return { sec, total: qs.length, correct: c, wrong: w, unattempted: qs.length - c - w,
             pct: Math.round((c / qs.length) * 100) };
  });

  function handleOption(qId, optIdx) { setAnswers(prev => ({ ...prev, [qId]: optIdx })); }
  function clearAnswer(qId)          { setAnswers(prev => { const n = {...prev}; delete n[qId]; return n; }); }
  function toggleFlag(qId)           { setFlagged(prev => { const n = new Set(prev); n.has(qId) ? n.delete(qId) : n.add(qId); return n; }); }
  function jumpToSection(sec) {
    const idx = questions.findIndex(q => q.subject === sec);
    if (idx !== -1) { setCurrent(idx); setActiveSection(sec); }
  }

  const q    = questions[current];
  const meta = sectionMetaMap[q?.subject] || PALETTE[0];
  const timerPct   = (timeLeft / TOTAL_SECS) * 100;
  const timerColor = timerPct > 33 ? '#00f5d4' : timerPct > 10 ? '#fee440' : '#ff5a7e';
  const progressPct = (Object.keys(answers).length / questions.length) * 100;

  // Intro
  if (phase === 'intro') return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        <div className="glass-panel" style={{ padding: '36px', maxWidth: '680px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb">
            <ol style={styles.breadcrumb}>
              <li><Link href="/" style={styles.breadLink}>Home</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li><Link href="/upload" style={styles.breadLink}>Upload</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li style={{ color: 'var(--text-muted)' }} aria-current="page">Test</li>
            </ol>
          </nav>

          <div style={{ textAlign: 'center', marginBottom: '28px', marginTop: '8px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Custom Uploaded Paper · {paper.examType}
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }} className="text-gradient">
              {paper.title}
            </h1>
            {paper.source && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Source: {paper.source}</p>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              ['Questions', questions.length],
              ['Duration',  `${duration} min`],
              ['Max Marks', maxScore],
              ['Correct',   correctMarks > 0 ? `+${correctMarks}` : `${correctMarks}`],
              ['Wrong',     wrongMarks < 0 ? `${wrongMarks}` : '0'],
              ['Unattempt', '0'],
            ].map(([k, v]) => (
              <div key={k} style={styles.statBox}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: String(v).startsWith('+') ? '#00f5d4' : String(v).startsWith('-') ? '#ff5a7e' : '#fff' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Section breakdown */}
          {sections.length > 1 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={styles.miniHeading}>Sections</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sections.map(sec => {
                  const m   = sectionMetaMap[sec];
                  const cnt = questions.filter(q => q.subject === sec).length;
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
          )}

          {/* Negative marking warning */}
          {wrongMarks < 0 && (
            <div style={{ padding: '12px 16px', background: 'rgba(255,90,126,0.08)', border: '1px solid rgba(255,90,126,0.25)', borderRadius: '10px', color: '#ff5a7e', fontSize: '0.85rem', marginBottom: '24px' }}>
              ⚠️ This paper has <strong>negative marking</strong>: {wrongMarks} per wrong answer. Think before you attempt!
            </div>
          )}

          <button className="btn-primary" style={{ width: '100%', fontSize: '1.05rem', padding: '15px' }}
            onClick={() => { setPhase('test'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Begin Test →
          </button>
        </div>
      </main>
    </>
  );

  // Result
  if (phase === 'result') {
    const penalty = wrong * Math.abs(wrongMarks);
    const accuracy = correct + wrong > 0 ? Math.round(correct / (correct + wrong) * 100) : 0;

    return (
      <>
        <Navbar />
        <main id="main-content" style={styles.main}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>
            Results — <span className="text-gradient">{paper.title}</span>
          </h1>

          {/* Score card */}
          <section aria-label="Score overview" className="glass-panel" style={{ padding: '32px', marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Your Score</div>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: score >= 0 ? '#00f5d4' : '#ff5a7e', lineHeight: 1 }}>{score}</div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>out of {maxScore}</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', textAlign: 'left' }}>
              {[
                { label: 'Correct',     value: correct,           color: '#00f5d4' },
                { label: 'Wrong',       value: wrong,             color: '#ff5a7e' },
                { label: 'Unattempted', value: unattempted,       color: '#8e8e9f' },
                { label: 'Penalty',     value: `-${penalty}`,     color: wrongMarks < 0 ? '#ff5a7e' : '#8e8e9f' },
                { label: 'Accuracy',    value: `${accuracy}%`,    color: '#c77dff' },
                { label: 'Time Taken',  value: formatTime(timeTaken), color: '#fee440' },
              ].map(({ label, value, color }) => (
                <div key={label} style={styles.statBox}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color }}>{value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section analysis */}
          <section aria-labelledby="sec-analysis" className="glass-panel" style={{ padding: '28px', marginBottom: '20px' }}>
            <h2 id="sec-analysis" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px' }}>Section-wise Analysis</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {sectionStats.map(({ sec, total, correct: c, wrong: w, unattempted: u, pct }) => {
                const m = sectionMetaMap[sec] || PALETTE[0];
                return (
                  <div key={sec}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 700 }}>{sec} <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({total} Qs)</span></span>
                      <span style={{ color: m.color, fontWeight: 700 }}>{pct}% correct</span>
                    </div>
                    <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(c / total) * 100}%`, background: '#00f5d4' }} />
                      <div style={{ width: `${(w / total) * 100}%`, background: '#ff5a7e' }} />
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: '#00f5d4' }}>✓ {c}</span>
                      <span style={{ color: '#ff5a7e' }}>✗ {w}</span>
                      <span>− {u}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Question review */}
          <section aria-labelledby="review-heading">
            <h2 id="review-heading" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Question Review</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions.map((q, idx) => {
                const given   = answers[q.id];
                const isRight = given === q.correct;
                const skipped = given === undefined;
                const m       = sectionMetaMap[q.subject] || PALETTE[0];
                const borderCol = skipped ? 'rgba(255,255,255,0.07)' : isRight ? 'rgba(0,245,212,0.3)' : 'rgba(255,90,126,0.3)';
                return (
                  <article key={q.id} className="glass-panel" style={{ padding: '18px 20px', borderLeft: `3px solid ${borderCol}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Q{idx + 1}</span>
                      <span style={{ fontSize: '0.75rem', color: m.color, fontWeight: 700, background: m.bg, padding: '2px 10px', borderRadius: '20px' }}>{q.subject}</span>
                    </div>
                    <p style={{ fontWeight: 600, marginBottom: '12px', lineHeight: 1.6 }}>{q.text}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {q.options.map((opt, oi) => {
                        const isCorrect = oi === q.correct;
                        const isGiven   = oi === given;
                        let bg = 'rgba(255,255,255,0.03)', border = 'rgba(255,255,255,0.07)', col = 'var(--text-muted)';
                        if (isCorrect) { bg = 'rgba(0,245,212,0.1)'; border = '#00f5d4'; col = '#00f5d4'; }
                        if (isGiven && !isCorrect) { bg = 'rgba(255,90,126,0.1)'; border = '#ff5a7e'; col = '#ff5a7e'; }
                        return (
                          <div key={oi} style={{ padding: '7px 12px', background: bg, border: `1px solid ${border}`, borderRadius: '8px', fontSize: '0.84rem', color: col }}>
                            <span style={{ fontWeight: 700, marginRight: '8px' }}>{String.fromCharCode(65+oi)}.</span>{opt}
                            {isCorrect && <span aria-label="correct" style={{ marginLeft: '8px' }}>✓</span>}
                            {isGiven && !isCorrect && <span aria-label="your wrong answer" style={{ marginLeft: '8px' }}>✗</span>}
                          </div>
                        );
                      })}
                    </div>
                    {q.explanation && (
                      <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(199,125,255,0.08)', borderRadius: '8px', border: '1px solid rgba(199,125,255,0.2)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        <strong style={{ color: '#c77dff' }}>Explanation: </strong>{q.explanation}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
            <button className="btn-primary" onClick={() => { setAnswers({}); setFlagged(new Set()); setCurrent(0); setTimeLeft(TOTAL_SECS); setPhase('intro'); }}>
              Retake Test
            </button>
            <Link href="/upload"><button className="btn-secondary">My Papers</button></Link>
          </div>
        </main>
      </>
    );
  }

  // Test
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Sticky header */}
        <div role="banner" aria-label="Test controls" style={styles.stickyBar}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {paper.title} — Q{current + 1}/{questions.length}
            </div>
            <div role="progressbar" aria-valuenow={Math.round(progressPct)} aria-valuemin={0} aria-valuemax={100}
              aria-label={`${Math.round(progressPct)}% answered`}
              style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--accent-secondary)', borderRadius: '2px', transition: 'width 0.3s' }} />
            </div>
          </div>
          <div aria-live="polite" aria-label={`Time remaining: ${formatTime(timeLeft)}`}
            style={{ fontWeight: 800, fontSize: '1.3rem', color: timerColor, minWidth: '90px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(timeLeft)}
          </div>
          <button className="btn-primary" onClick={submitTest} style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            Submit
          </button>
        </div>

        {/* Section tabs (only if > 1 section) */}
        {sections.length > 1 && (
          <div role="tablist" aria-label="Jump to section" style={styles.sectionTabs}>
            {sections.map(sec => {
              const m   = sectionMetaMap[sec];
              const cnt = questions.filter(q => q.subject === sec).length;
              const ans = questions.filter(q => q.subject === sec && answers[q.id] !== undefined).length;
              return (
                <button key={sec} role="tab"
                  aria-selected={activeSection === sec}
                  aria-label={`${sec}: ${ans} of ${cnt} answered`}
                  onClick={() => jumpToSection(sec)}
                  style={{ ...styles.sectionTab, borderBottom: `2px solid ${activeSection === sec ? m.color : 'transparent'}`, color: activeSection === sec ? m.color : 'var(--text-muted)' }}>
                  <span aria-hidden="true">{m.icon}</span> {sec}
                  <span style={{ marginLeft: '6px', fontSize: '0.72rem', background: activeSection === sec ? `${m.color}22` : 'rgba(255,255,255,0.05)', padding: '1px 6px', borderRadius: '20px' }}>
                    {ans}/{cnt}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Negative marking banner */}
        {wrongMarks < 0 && (
          <div style={{ padding: '8px 24px', background: 'rgba(255,90,126,0.07)', borderBottom: '1px solid rgba(255,90,126,0.15)', fontSize: '0.78rem', color: '#ff5a7e', textAlign: 'center' }}>
            ⚠️ Negative marking: +{correctMarks} correct · {wrongMarks} wrong · Live score: <strong>{score}</strong>/{maxScore}
          </div>
        )}

        <div style={styles.testLayout}>
          {/* Question */}
          <section aria-label={`Question ${current + 1}`} style={styles.questionArea}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ background: meta.bg, color: meta.color, padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, border: `1px solid ${meta.color}44` }}>
                {meta.icon} {q.subject}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Q{current + 1} of {questions.length}</span>
            </div>

            <div className="glass-panel" style={{ padding: '20px', marginBottom: '16px' }}>
              <p style={{ fontWeight: 600, lineHeight: 1.8, fontSize: '1rem' }}>{q.text}</p>
            </div>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend className="sr-only">Select your answer for question {current + 1}</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map((opt, oi) => {
                  const selected = answers[q.id] === oi;
                  return (
                    <label key={oi} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '13px 16px',
                      background: selected ? `${meta.color}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selected ? meta.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '12px', cursor: 'pointer', transition: 'all 0.15s', lineHeight: 1.6,
                    }}>
                      <input type="radio" name={`q-${q.id}`} value={oi} checked={selected}
                        onChange={() => handleOption(q.id, oi)} style={{ marginTop: '3px', accentColor: meta.color }} />
                      <span style={{ fontWeight: 600, color: selected ? meta.color : 'var(--text-muted)', minWidth: '20px' }}>
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      <span style={{ color: selected ? '#fff' : 'var(--text-muted)' }}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button onClick={() => toggleFlag(q.id)}
                aria-pressed={flagged.has(q.id)} aria-label={flagged.has(q.id) ? 'Unflag' : 'Flag for review'}
                style={{ ...styles.ctrlBtn, color: flagged.has(q.id) ? '#fee440' : 'var(--text-muted)', borderColor: flagged.has(q.id) ? '#fee440' : 'rgba(255,255,255,0.1)' }}>
                {flagged.has(q.id) ? '🚩 Flagged' : '⚑ Flag'}
              </button>
              {answers[q.id] !== undefined && (
                <button onClick={() => clearAnswer(q.id)} aria-label="Clear answer"
                  style={{ ...styles.ctrlBtn, color: '#ff5a7e', borderColor: 'rgba(255,90,126,0.3)' }}>
                  ✕ Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                className="btn-secondary" style={{ padding: '10px 24px', opacity: current === 0 ? 0.4 : 1 }}
                aria-label="Previous question">← Previous</button>
              <button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
                disabled={current === questions.length - 1}
                className="btn-primary" style={{ padding: '10px 24px', opacity: current === questions.length - 1 ? 0.4 : 1 }}
                aria-label="Next question">Next →</button>
            </div>
          </section>

          {/* Palette */}
          <aside aria-label="Question palette" style={styles.palette}>
            <h2 style={styles.miniHeading}>Palette</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
              {[
                { col: meta.color,                label: 'Current'  },
                { col: '#00f5d4',                 label: 'Answered' },
                { col: 'rgba(255,255,255,0.08)',  label: 'Not yet'  },
                { col: '#fee440',                 label: 'Flagged'  },
              ].map(({ col, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.67rem', color: 'var(--text-muted)' }}>
                  <div style={{ width: '10px', height: '10px', background: col, borderRadius: '2px' }} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>

            {sections.map(sec => {
              const secQs = questions.map((q, i) => ({ ...q, idx: i })).filter(q => q.subject === sec);
              const m     = sectionMetaMap[sec] || PALETTE[0];
              return (
                <div key={sec} style={{ marginBottom: '12px' }}>
                  {sections.length > 1 && (
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: m.color, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {sec}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {secQs.map(({ id, idx }) => {
                      const isCurrent  = idx === current;
                      const isAnswered = answers[id] !== undefined;
                      const isFlagged  = flagged.has(id);
                      let bg = 'rgba(255,255,255,0.06)', border = 'rgba(255,255,255,0.1)', col = 'var(--text-muted)';
                      if (isCurrent)       { bg = m.color; border = m.color; col = '#fff'; }
                      else if (isFlagged)  { bg = 'rgba(254,228,64,0.15)'; border = '#fee440'; col = '#fee440'; }
                      else if (isAnswered) { bg = 'rgba(0,245,212,0.15)'; border = '#00f5d4'; col = '#00f5d4'; }
                      return (
                        <button key={id} onClick={() => { setCurrent(idx); setActiveSection(sec); }}
                          aria-label={`Q${idx+1}${isFlagged?' (flagged)':''}${isAnswered?' (answered)':''}`}
                          aria-current={isCurrent ? 'true' : undefined}
                          style={{ width: '30px', height: '30px', borderRadius: '6px', background: bg, border: `1px solid ${border}`, color: col, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Live score */}
            <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem' }}>
              <div style={styles.miniHeading}>Live Score</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: score >= 0 ? '#00f5d4' : '#ff5a7e' }}>{score} / {maxScore}</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                {correct} correct · {wrong} wrong
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

const styles = {
  main:       { padding: '20px 40px 60px', maxWidth: '900px', margin: '0 auto' },
  breadcrumb: { display: 'flex', gap: '8px', alignItems: 'center', listStyle: 'none', fontSize: '0.82rem', marginBottom: '14px' },
  breadLink:  { color: 'var(--accent-secondary)', textDecoration: 'none' },
  statBox:    { padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' },
  miniHeading:{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '6px' },
  stickyBar:  { position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 24px', background: 'rgba(14,18,20,0.96)', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  sectionTabs:{ display: 'flex', gap: 0, overflowX: 'auto', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,15,0.7)', scrollbarWidth: 'none' },
  sectionTab: { display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 14px', background: 'none', border: 'none', borderBottom: '2px solid transparent', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'color 0.15s' },
  testLayout: { display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '20px 24px', maxWidth: '1200px', margin: '0 auto' },
  questionArea: { flex: 1, minWidth: 0 },
  palette:    { width: '200px', flexShrink: 0, position: 'sticky', top: '100px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', maxHeight: 'calc(100vh - 130px)', overflowY: 'auto' },
  ctrlBtn:    { padding: '8px 16px', background: 'transparent', borderRadius: '8px', border: '1px solid', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'inherit', fontWeight: 600 },
};
