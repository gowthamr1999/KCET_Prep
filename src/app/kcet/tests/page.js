'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { allPapers } from '@/data/kcetQuestions';

const difficultyColor = {
  Easy: '#00f5d4',
  Medium: '#fee440',
  Hard: '#ff6b6b',
};

export default function KcetTestsPage() {
  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.header}>
          <div style={styles.badge}>KCET Mock Tests</div>
          <h1 style={styles.title}>
            12 Full-Length <span className="text-gradient">KCET Mock Tests</span>
          </h1>
          <p style={styles.subtitle}>
            Physics · Chemistry · Mathematics &nbsp;|&nbsp; 180 Questions · 4 Hours · No Negative Marking
          </p>
          <div style={styles.patternBox} className="glass-panel">
            <div style={styles.patternItem}><span style={styles.patternLabel}>Papers</span><span style={styles.patternValue}>3 Subjects</span></div>
            <div style={styles.patternDivider} />
            <div style={styles.patternItem}><span style={styles.patternLabel}>Per Subject</span><span style={styles.patternValue}>60 Questions</span></div>
            <div style={styles.patternDivider} />
            <div style={styles.patternItem}><span style={styles.patternLabel}>Marking</span><span style={styles.patternValue}>+1 / 0</span></div>
            <div style={styles.patternDivider} />
            <div style={styles.patternItem}><span style={styles.patternLabel}>Duration</span><span style={styles.patternValue}>4 Hours</span></div>
          </div>
        </div>

        <div style={styles.grid}>
          {allPapers.map((paper) => (
            <div key={paper.id} className="glass-panel" style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.paperNumber}>Paper {paper.id}</div>
                <span style={{ ...styles.difficulty, color: difficultyColor[paper.difficulty] }}>
                  {paper.difficulty}
                </span>
              </div>
              <h3 style={styles.cardTitle}>{paper.title}</h3>
              <p style={styles.cardTopics}>{paper.topics}</p>
              <div style={styles.cardMeta}>
                <span>{paper.questions} Questions</span>
                <span>·</span>
                <span>{paper.duration}</span>
                <span>·</span>
                <span>{paper.marks} Marks</span>
              </div>
              <div style={styles.subjectTags}>
                {['Physics', 'Chemistry', 'Math'].map(s => (
                  <span key={s} style={styles.tag}>{s}</span>
                ))}
              </div>
              <Link href={`/kcet/tests/${paper.id}`} style={{ display: 'block', marginTop: '16px' }}>
                <button className="btn-primary" style={{ width: '100%' }}>
                  {paper.id === 1 ? '★ Start 2026 Analysis Paper' : `Start Mock Test ${paper.id}`}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div style={styles.tipsBox} className="glass-panel">
          <h2 style={styles.tipsTitle}>📋 KCET 2026 Exam Pattern</h2>
          <div style={styles.tipsGrid}>
            <div>
              <h4 style={styles.tipHead}>Exam Structure</h4>
              <ul style={styles.tipList}>
                <li>Paper 1: Mathematics (80 min)</li>
                <li>Paper 2: Biology (80 min, optional)</li>
                <li>Paper 3: Physics (80 min)</li>
                <li>Paper 4: Chemistry (80 min)</li>
              </ul>
            </div>
            <div>
              <h4 style={styles.tipHead}>Marking Scheme</h4>
              <ul style={styles.tipList}>
                <li>+1 for each correct answer</li>
                <li>0 for incorrect (no negative marking)</li>
                <li>0 for unattempted</li>
                <li>Total: 60 marks per paper</li>
              </ul>
            </div>
            <div>
              <h4 style={styles.tipHead}>10-Year Trend (2016–2025)</h4>
              <ul style={styles.tipList}>
                <li>Physics: 30% Mechanics, 25% Modern Physics</li>
                <li>Chemistry: 35% Organic, 30% Physical Chem</li>
                <li>Math: 40% Calculus, 25% Coordinate Geometry</li>
                <li>Difficulty: Moderate to hard, with easier-year rank inflation</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    padding: '20px 40px 60px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(123, 44, 191, 0.2)',
    border: '1px solid rgba(123, 44, 191, 0.4)',
    borderRadius: '20px',
    padding: '6px 18px',
    fontSize: '0.85rem',
    color: '#c77dff',
    marginBottom: '16px',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 800,
    marginBottom: '12px',
    lineHeight: 1.2,
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
    marginBottom: '28px',
  },
  patternBox: {
    display: 'inline-flex',
    gap: '0',
    padding: '16px 32px',
    borderRadius: '16px',
  },
  patternItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
    gap: '4px',
  },
  patternDivider: {
    width: '1px',
    background: 'var(--glass-border)',
    margin: '0 4px',
  },
  patternLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  patternValue: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--accent-secondary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'transform 0.2s ease',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paperNumber: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  difficulty: {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  cardTopics: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  cardMeta: {
    display: 'flex',
    gap: '8px',
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
  },
  subjectTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tag: {
    background: 'rgba(123, 44, 191, 0.15)',
    border: '1px solid rgba(123, 44, 191, 0.3)',
    borderRadius: '20px',
    padding: '3px 12px',
    fontSize: '0.75rem',
    color: '#c77dff',
  },
  tipsBox: {
    padding: '32px',
  },
  tipsTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '24px',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  tipHead: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--accent-secondary)',
    marginBottom: '12px',
  },
  tipList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};
