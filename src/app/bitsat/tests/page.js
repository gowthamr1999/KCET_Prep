'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { allBitsatPapers, bitsatSubjectWisePapers } from '@/data/bitsatQuestions';

function getPaperTag(id) {
  if (id === 1) return 'Analysis Paper';
  if (id === 11) return 'Phase 2 Forecast';
  if (id === 12) return 'Phase 1 Memory';
  if (id >= 13 && id <= 17) return 'Yearly Memory';
  if (id === 5 || id === 10) return 'Hard';
  if (id === 2 || id === 3) return 'Easy';
  return 'Medium';
}

const diffColor = {
  'Analysis Paper': '#a5a0b2',
  Easy: '#9cb4ab',
  Medium: '#b5a98a',
  Hard: '#a77f85',
  'Phase 2 Forecast': '#96aba1',
  'Phase 1 Memory': '#9aa7b3',
  'Yearly Memory': '#8f9aa3',
};

const subjectIcons = {
  'subject-physics': '⚛️',
  'subject-chemistry': '🧪',
  'subject-mathematics': '📐',
  'subject-english': '📖',
  'subject-logical-reasoning': '🧩',
};

const filterOptions = [
  { id: 'full', label: 'Full-Length' },
  { id: 'subject', label: 'Subject-wise' },
  { id: 'memory', label: 'Memory-Based' },
];

function isMemoryPaper(id) {
  return id >= 12 && id <= 17;
}

export default function BitsatTestsPage() {
  const [activeFilter, setActiveFilter] = useState('full');
  const visiblePapers = activeFilter === 'memory'
    ? allBitsatPapers.filter((paper) => isMemoryPaper(paper.id))
    : allBitsatPapers;

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
            {allBitsatPapers.length} full-length papers plus subject-wise practice sets. Start from Paper 1
            (10-year trend analysis) or drill one section at a time before taking a full mock.
          </p>
        </header>

        <section aria-label="BITSAT test filter" className="glass-panel" style={styles.filterWrap}>
          <div style={styles.filterBar}>
            {filterOptions.map((option) => {
              const active = option.id === activeFilter;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  aria-pressed={active}
                  style={{
                    ...styles.filterButton,
                    ...(active ? styles.filterButtonActive : null),
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p style={styles.filterCopy}>
            {activeFilter === 'full'
              ? 'Browse the full BITSAT mock set, including analysis, forecast, and mixed-syllabus simulations.'
              : activeFilter === 'subject'
                ? 'Practice one section at a time with shorter, subject-focused BITSAT-style tests.'
                : 'Use the memory-based papers to rehearse the Phase 1 and recent-year public trend reconstructions.'}
          </p>
        </section>

        {/* Pattern info banner */}
        <section aria-label="BITSAT exam pattern summary" className="glass-panel" style={styles.banner}>
          {[
            { label: '130 Questions', icon: '❓' },
            { label: 'Physics: 30',   icon: '⚛️' },
            { label: 'Chemistry: 30', icon: '🧪' },
            { label: 'Maths: 40',     icon: '📐' },
            { label: 'English: 10',   icon: '📖' },
            { label: 'Logic: 20',     icon: '🧩' },
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
            📊 10-Year Trend Insights (2016–2025)
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
          {activeFilter === 'subject' ? (
            <div style={styles.subjectGrid} role="list">
              {bitsatSubjectWisePapers.map((paper) => (
                <article key={paper.slug} role="listitem" className="glass-panel" style={styles.subjectCard}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.3rem' }} aria-hidden="true">{subjectIcons[paper.slug]}</span>
                      <h3 style={{ fontWeight: 700, fontSize: '0.98rem', lineHeight: 1.3 }}>{paper.title}</h3>
                    </div>
                    <span style={{ background: 'rgba(140,154,149,0.12)', color: '#9cb4ab', border: '1px solid rgba(140,154,149,0.26)', padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700 }}>
                      Subject-wise
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '14px' }}>{paper.topics}</p>
                  <dl style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {[
                      ['Questions', paper.questions],
                      ['Duration', paper.duration],
                      ['Max Marks', paper.maxMarks],
                      ['Scoring', paper.scoring],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{k}</dt>
                        <dd style={{ fontSize: '0.84rem', fontWeight: 700 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={`/bitsat/tests/${paper.slug}`}
                    aria-label={`Start ${paper.title}`}
                    style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'rgba(165,160,178,0.14)', color: '#e7e8e6', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', border: '1px solid rgba(165,160,178,0.3)', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(165,160,178,0.24)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(165,160,178,0.14)'; }}>
                    Start Subject Test →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div style={styles.grid} role="list">
              {visiblePapers.map((paper) => {
                const diff = getPaperTag(paper.id);
                const col = diffColor[diff] || '#fee440';
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
                      style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'rgba(95,118,111,0.16)', color: '#e7e8e6', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(95,118,111,0.35)', transition: 'all 0.2s' }}
                      onMouseOver={e => { e.currentTarget.style.background = 'rgba(95,118,111,0.28)'; }}
                      onMouseOut={e => { e.currentTarget.style.background = 'rgba(95,118,111,0.16)'; }}>
                      Start Test →
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
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
  filterWrap: { padding: '16px 18px', marginBottom: '24px' },
  filterBar: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  filterButton: {
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--text-muted)',
    padding: '9px 16px',
    fontSize: '0.85rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  filterButtonActive: {
    background: 'rgba(95,118,111,0.22)',
    color: '#eef1ee',
    border: '1px solid rgba(95,118,111,0.42)',
  },
  filterCopy: {
    color: 'var(--text-muted)',
    fontSize: '0.88rem',
    lineHeight: 1.6,
    marginTop: '12px',
    marginBottom: 0,
  },
  banner: {
    display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '16px 20px',
    marginBottom: '24px', alignItems: 'center',
  },
  chip: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '5px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
  },
  subjectGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' },
  subjectCard: { padding: '18px', display: 'flex', flexDirection: 'column' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: { padding: '20px', display: 'flex', flexDirection: 'column' },
};
