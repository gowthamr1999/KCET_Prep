'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { allBitsatPapers, bitsatRankBands } from '@/data/bitsatQuestions';

function predictRank(score) {
  if (score < 0) return null;
  for (const band of bitsatRankBands) {
    if (score >= band.minScore && score <= band.maxScore) return band;
  }
  return bitsatRankBands[bitsatRankBands.length - 1];
}

export default function BitsatPage() {
  const [score, setScore] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  function handlePredict(e) {
    e.preventDefault();
    const s = parseInt(score, 10);
    if (isNaN(s) || s < -130 || s > 390) {
      setError('Please enter a valid BITSAT score between -130 and 390.');
      setPrediction(null);
      return;
    }
    setError('');
    setPrediction(predictRank(s));
  }

  return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={styles.breadcrumb}>
              <li><Link href="/" style={styles.breadLink}>Home</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li style={{ color: 'var(--text-muted)' }} aria-current="page">BITSAT</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>
            <span className="text-gradient">BITSAT 2026</span> Prep Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '640px' }}>
            130 questions · 3 hours · +3/−1 marking · Physics, Chemistry, Maths, English &amp; Logical Reasoning.
            Practice with 10-year trend-aligned full mocks, subject-wise tests, and predict your BITS campus &amp; branch.
          </p>
        </header>

        {/* Exam Pattern */}
        <section aria-labelledby="pattern-heading" className="glass-panel" style={styles.section}>
          <h2 id="pattern-heading" style={styles.sectionTitle}>Exam Pattern</h2>
          <div style={styles.patternGrid}>
            {[
              { icon: '⚛️',  section: 'Physics',            qs: 30,  note: 'Mechanics, Electromagnetism, Optics, Modern Physics' },
              { icon: '🧪',  section: 'Chemistry',           qs: 30,  note: 'Physical, Inorganic, Organic Chemistry' },
              { icon: '📐',  section: 'Mathematics',         qs: 40,  note: 'Calculus, Algebra, Trigonometry, Probability' },
              { icon: '📖',  section: 'English Proficiency', qs: 10,  note: 'Grammar, Vocabulary, Reading Comprehension' },
              { icon: '🧩',  section: 'Logical Reasoning',   qs: 20,  note: 'Verbal & Non-verbal Reasoning, Series' },
            ].map(({ icon, section, qs, note }) => (
              <div key={section} style={styles.patternCard} className="glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.4rem' }} aria-hidden="true">{icon}</span>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{section}</h3>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent-secondary)' }}>{qs}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{note}</p>
              </div>
            ))}

            {/* Total summary card */}
            <div style={{ ...styles.patternCard, background: 'rgba(123,44,191,0.12)', border: '1px solid rgba(123,44,191,0.3)' }} className="glass-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Total</h3>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent-primary)' }}>130</span>
              </div>
              <dl style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Max marks</dt><dd style={{ fontWeight: 700, color: '#fff' }}>390</dd></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Correct</dt><dd style={{ fontWeight: 700, color: '#00f5d4' }}>+3</dd></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Wrong</dt><dd style={{ fontWeight: 700, color: '#ff5a7e' }}>−1</dd></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Duration</dt><dd style={{ fontWeight: 700, color: '#fff' }}>3 Hours</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* Rank Predictor */}
        <section aria-labelledby="rank-predictor-heading" className="glass-panel" style={styles.section}>
          <h2 id="rank-predictor-heading" style={styles.sectionTitle}>Score → Rank Predictor</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
            Enter your expected BITSAT score (range: -130 to 390) to estimate your rank and likely campus.
          </p>

          <form onSubmit={handlePredict} aria-label="BITSAT rank predictor form" style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label htmlFor="bitsat-score" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                BITSAT Score (out of 390)
              </label>
              <input id="bitsat-score" type="number" min="-130" max="390"
                value={score} onChange={e => setScore(e.target.value)}
                placeholder="e.g. 340"
                aria-describedby={error ? 'score-error' : undefined}
                aria-invalid={!!error}
                style={styles.input} />
              {error && <p id="score-error" role="alert" style={{ color: '#ff5a7e', fontSize: '0.78rem', marginTop: '4px' }}>{error}</p>}
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
              Predict Rank
            </button>
          </form>

          {prediction && (
            <div role="region" aria-live="polite" aria-label="Rank prediction result" style={styles.resultBox}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div style={styles.resultCard}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Score Range</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                    {prediction.minScore} – {prediction.maxScore}
                  </div>
                </div>
                <div style={styles.resultCard}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimated Rank</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#c77dff' }}>{prediction.rankRange}</div>
                </div>
                <div style={{ ...styles.resultCard, gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Likely Admission</div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{prediction.admission}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px' }}>
                ⚠️ Based on BITSAT 2021–2025 cutoffs. Actual results may vary by year and branch preferences.
              </p>
            </div>
          )}

          {/* Score bands table */}
          <div style={{ marginTop: '24px', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Historical Score–Rank Bands
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }} aria-label="BITSAT score to rank band reference table">
              <caption className="sr-only">BITSAT score ranges and their corresponding expected rank and admission outcomes (2021–2025 trend)</caption>
              <thead>
                <tr>
                  {['Score Range', 'Expected Rank', 'Likely Outcome'].map(h => (
                    <th key={h} scope="col" style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bitsatRankBands.map((band, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={styles.td}>{band.minScore === 0 ? `< 250` : `${band.minScore} – ${band.maxScore}`}</td>
                    <td style={{ ...styles.td, color: 'var(--accent-secondary)', fontWeight: 700 }}>{band.rankRange}</td>
                    <td style={{ ...styles.td, color: 'var(--text-muted)', fontSize: '0.83rem' }}>{band.admission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Strategy Tips */}
        <section aria-labelledby="tips-heading" className="glass-panel" style={styles.section}>
          <h2 id="tips-heading" style={styles.sectionTitle}>📚 10-Year Pattern Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { icon: '⚛️', title: 'Physics', tip: 'Mechanics (SHM, Rotational) and Electromagnetism dominate. Expect 12–15 Qs from these two areas.' },
              { icon: '🧪', title: 'Chemistry', tip: 'Organic Reactions and Coordination Chemistry are most tested. Physical Chemistry (Equilibrium, Kinetics) is reliable scoring.' },
              { icon: '📐', title: 'Mathematics', tip: 'Calculus (Integrals + Differentials) = ~12 Qs. Trigonometry and Coordinate Geometry together = ~10 Qs.' },
              { icon: '📖', title: 'English', tip: 'Vocabulary and Grammar questions repeat. 10–12 Qs are straightforward if you read quality English daily.' },
              { icon: '🧩', title: 'Logic', tip: 'All 10 questions can be solved correctly with 15 min practice/day. High ROI section — never skip it.' },
              { icon: '⚡', title: 'Speed Strategy', tip: 'At +3/−1, accuracy > attempts. Target 130+ attempts with 90%+ accuracy for a 350+ score.' },
            ].map(({ icon, title, tip }) => (
              <div key={title} style={styles.tipCard} className="glass-panel">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }} aria-hidden="true">{icon}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{title}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Call to action" style={{ textAlign: 'center', marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
            Start Practising Now
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            {allBitsatPapers.length} full-length BITSAT mock tests plus subject-wise practice tests — trend-aligned, free, instant scoring.
          </p>
          <Link href="/bitsat/tests">
            <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '15px 36px' }}>
              View All Mock Tests →
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}

const styles = {
  main: { padding: '20px 40px 60px', maxWidth: '1100px', margin: '0 auto' },
  breadcrumb: {
    display: 'flex', gap: '8px', alignItems: 'center',
    listStyle: 'none', fontSize: '0.82rem', marginBottom: '12px', color: 'var(--text-muted)',
  },
  breadLink: { color: 'var(--accent-secondary)', textDecoration: 'none' },
  section: { padding: '28px', marginBottom: '24px' },
  sectionTitle: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' },
  patternGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' },
  patternCard: { padding: '16px 18px' },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '1rem', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box',
  },
  resultBox: {
    background: 'rgba(0,245,212,0.05)', border: '1px solid rgba(0,245,212,0.2)',
    borderRadius: '12px', padding: '24px',
  },
  resultCard: {
    background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '14px 18px',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  tipCard: { padding: '16px 18px' },
  th: {
    textAlign: 'left', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  td: { padding: '10px 12px', verticalAlign: 'middle' },
};
