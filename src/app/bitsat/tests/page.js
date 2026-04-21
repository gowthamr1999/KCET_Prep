'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { allBitsatPapers } from '@/data/bitsatQuestions';

const difficultyMap = [
  '', 'Analysis Paper', 'Easy', 'Easy', 'Medium', 'Hard',
  'Medium', 'Medium', 'Hard', 'Medium', 'Hard',
];
const diffColor = { 'Analysis Paper': '#c77dff', Easy: '#00f5d4', Medium: '#fee440', Hard: '#ff5a7e' };

export default function BitsatTestsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        {/* Header */}
        <header style={{ marginBottom: '36px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={styles.breadcrumb}>
              <li><Link href="/" style={styles.breadLink}>Home</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li><Link href="/bitsat" style={styles.breadLink}>BITSAT</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li style={{ color: 'var(--text-muted)' }} aria-current="page">Mock Tests</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '10px' }}>
            BITSAT <span className="text-gradient">Mock Tests</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
            10 full-length papers — each 150 questions, 3 hours, +3/−1 marking. Start from Paper 1
            (trend analysis) to simulate the real 2026 exam.
          </p>
        </header>

        {/* Pattern info banner */}
        <section aria-label="BITSAT exam pattern summary" className="glass-panel" style={styles.banner}>
          {[
            { label: '150 Questions', icon: '❓' },
            { label: 'Physics: 40',   icon: '⚛️' },
            { label: 'Chemistry: 40', icon: '🧪' },
            { label: 'Maths: 45',     icon: '📐' },
            { label: 'English: 15',   icon: '📖' },
            { label: 'Logic: 10',     icon: '🧩' },
            { label: '+3 / −1',       icon: '⚡' },
            { label: '3 Hours',       icon: '⏱' },
          ].map(({ label, icon }) => (
            <div key={label} style={styles.chip}>
              <span aria-hidden="true">{icon}</span> {label}
            </div>
          ))}
        </section>

        {/* 5-Year Trend Box */}
        <section aria-labelledby="trend-heading" className="glass-panel" style={{ padding: '24px 28px', marginBottom: '24px' }}>
          <h2 id="trend-heading" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
            📊 5-Year Trend Insights (2021–2025)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {[
              { subj: 'Physics',            color: '#378ADD', insight: 'SHM, Rotational Motion & Electrostatics — recurring high-frequency areas.' },
              { subj: 'Chemistry',          color: '#1D9E75', insight: 'Organic reactions and Coordination Chemistry dominate; Thermodynamics reliable.' },
              { subj: 'Mathematics',        color: '#7F77DD', insight: 'Calculus (~12 Qs) is the biggest section. 3D Geometry trending up.' },
              { subj: 'English + Logic',    color: '#fee440', insight: 'Consistent pattern — practice 15 min/day for near-perfect scores.' },
            ].map(({ subj, color, insight }) => (
              <div key={subj} style={{ borderLeft: `3px solid ${color}`, paddingLeft: '14px' }}>
                <div style={{ fontWeight: 700, color, marginBottom: '4px', fontSize: '0.88rem' }}>{subj}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>{insight}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Test grid */}
        <section aria-label="BITSAT mock test list">
          <h2 className="sr-only">All BITSAT Mock Tests</h2>
          <div style={styles.grid} role="list">
            {allBitsatPapers.map((paper) => {
              const diff = difficultyMap[paper.id] || 'Medium';
              const col  = diffColor[diff] || '#fee440';
              return (
                <article key={paper.id} role="listitem" className="glass-panel" style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Paper {paper.id}
                    </div>
                    <span style={{ background: `${col}1a`, color: col, border: `1px solid ${col}44`, padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {diff}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px', lineHeight: 1.3 }}>{paper.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '16px' }}>{paper.topics}</p>
                  <dl style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {[
                      ['Questions', paper.questions],
                      ['Duration', paper.duration],
                      ['Max Marks', paper.maxMarks],
                      ['Scoring', paper.scoring],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{k}</dt>
                        <dd style={{ fontSize: '0.85rem', fontWeight: 700 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={`/bitsat/tests/${paper.id}`}
                    aria-label={`Start BITSAT ${paper.title}`}
                    style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'rgba(123,44,191,0.15)', color: '#c77dff', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(123,44,191,0.3)', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(123,44,191,0.3)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(123,44,191,0.15)'; }}>
                    Start Test →
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

const styles = {
  main: { padding: '20px 40px 60px', maxWidth: '1200px', margin: '0 auto' },
  breadcrumb: {
    display: 'flex', gap: '8px', alignItems: 'center',
    listStyle: 'none', fontSize: '0.82rem', marginBottom: '12px',
  },
  breadLink: { color: 'var(--accent-secondary)', textDecoration: 'none' },
  banner: {
    display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '16px 20px',
    marginBottom: '24px', alignItems: 'center',
  },
  chip: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '5px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: { padding: '20px', display: 'flex', flexDirection: 'column' },
};
