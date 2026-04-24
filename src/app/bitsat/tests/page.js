'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { allBitsatPapers, bitsatQuestionsLastUpdated, bitsatSubjectWisePapers } from '@/data/bitsatQuestions';

function getPaperTag(id) {
  if (id === 1) return 'Analysis Paper';
  if (id === 11) return 'Phase 2 Forecast';
  if (id === 12) return 'Phase 1 Reconstruction';
  if (id >= 13 && id <= 17) return 'Yearly Reconstruction';
  if (id === 5 || id === 10) return 'Hard';
  if (id === 2 || id === 3) return 'Easy';
  return 'Medium';
}

const diffColor = {
  'Analysis Paper': 'var(--accent-secondary)',
  Easy: 'var(--accent-tertiary)',
  Medium: 'var(--accent-primary)',
  Hard: 'var(--text-muted)',
  'Phase 2 Forecast': 'var(--accent-secondary)',
  'Phase 1 Reconstruction': 'var(--accent-primary)',
  'Yearly Reconstruction': 'var(--accent-tertiary)',
};

function getSubjectIcon(slug) {
  if (slug.startsWith('subject-physics')) return '⚛️';
  if (slug.startsWith('subject-chemistry')) return '🧪';
  if (slug.startsWith('subject-mathematics')) return '📐';
  if (slug.startsWith('subject-english')) return '📖';
  if (slug.startsWith('subject-logical-reasoning')) return '🧩';
  return '📝';
}

const filterOptions = [
  { id: 'full', label: 'Full-Length' },
  { id: 'subject', label: 'Subject-wise' },
  { id: 'memory', label: 'Public Reconstructions' },
];

function isMemoryPaper(id) {
  return id >= 12 && id <= 17;
}

export default function BitsatTestsPage() {
  const [activeFilter, setActiveFilter] = useState('full');
  const formattedLastUpdated = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(bitsatQuestionsLastUpdated));
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
            {allBitsatPapers.length} full-length practice papers plus subject-wise sets. Start with the broad mixed papers,
            then use section drills or public reconstruction sets for targeted practice.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '10px' }}>
            Question bank last updated: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{formattedLastUpdated} IST</span>
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
              ? 'Browse the full BITSAT-style practice set, including mixed-syllabus papers and tougher revision variants.'
              : activeFilter === 'subject'
                ? 'Practice one section at a time with shorter, subject-focused BITSAT-style tests built from the current bank.'
                : 'Use these papers as public-discussion-based reconstructions and rehearsal sets, not official released papers.'}
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
              { subj: 'Physics',            color: 'var(--accent-secondary)', insight: 'SHM, Rotational Motion & Electrostatics — recurring high-frequency areas.' },
              { subj: 'Chemistry',          color: 'var(--accent-primary)', insight: 'Organic reactions and Coordination Chemistry dominate; Thermodynamics reliable.' },
              { subj: 'Mathematics',        color: 'var(--accent-tertiary)', insight: 'Calculus (~12 Qs) is the biggest section. 3D Geometry trending up.' },
              { subj: 'English + Logic',    color: 'var(--text-main)', insight: 'Consistent pattern — practice 15 min/day for near-perfect scores.' },
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
                      <span style={{ fontSize: '1.3rem' }} aria-hidden="true">{getSubjectIcon(paper.slug)}</span>
                      <h3 style={{ fontWeight: 700, fontSize: '0.98rem', lineHeight: 1.3 }}>{paper.title}</h3>
                    </div>
                    <span style={styles.subjectBadge}>
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
                    style={styles.cardLink}>
                    
                    Start Subject Test →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div style={styles.grid} role="list">
              {visiblePapers.map((paper) => {
                const diff = getPaperTag(paper.id);
                const col = diffColor[diff] || 'var(--accent-secondary)';
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
                      style={styles.cardLink}>
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
    border: '1px solid var(--surface-border)',
    background: 'var(--surface-soft)',
    color: 'var(--text-muted)',
    padding: '9px 16px',
    fontSize: '0.85rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  filterButtonActive: {
    background: 'var(--surface-highlight)',
    color: 'var(--text-main)',
    border: '1px solid var(--surface-border-strong)',
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
    background: 'var(--surface-soft)', border: '1px solid var(--surface-border)', color: 'var(--text-muted)',
  },
  subjectBadge: {
    background: 'var(--surface-highlight)',
    color: 'var(--accent-primary)',
    border: '1px solid var(--surface-border-strong)',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 700,
  },
  cardLink: {
    display: 'block',
    textAlign: 'center',
    padding: '10px',
    background: 'var(--surface-highlight)',
    color: 'var(--text-main)',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.9rem',
    border: '1px solid var(--surface-border-strong)',
    transition: 'all 0.2s ease',
  },
  subjectGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' },
  subjectCard: { padding: '18px', display: 'flex', flexDirection: 'column' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: { padding: '20px', display: 'flex', flexDirection: 'column' },
};
