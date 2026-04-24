"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

function formatTime(seconds) {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds)) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}:${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const EXAMS = [
  {
    id: 'bitsat',
    icon: '🚀',
    title: 'BITSAT',
    subtitle: 'BITS Aptitude Test',
    desc: '17 full-length BITSAT-style practice papers, including public reconstruction sets · 150 questions · Physics, Chemistry, Maths, English & Logical Reasoning · 3 hours',
    featured: true,
    color: '#9ca8a4',
    bg: 'rgba(156,168,164,0.10)',
    border: 'rgba(156,168,164,0.24)',
    links: [
      { label: 'Start Mock Test', href: '/bitsat/tests', primary: true },
      { label: 'Score Predictor', href: '/bitsat', primary: false },
    ],
  },
  {
    id: 'kcet',
    icon: '🎓',
    title: 'KCET',
    subtitle: 'Karnataka CET',
    desc: '10 full-length mock tests · 60 questions · Physics, Chemistry & Mathematics · 80 min per subject',
    featured: false,
    color: '#8c9a95',
    bg: 'rgba(140,154,149,0.10)',
    border: 'rgba(140,154,149,0.24)',
    links: [
      { label: 'Start Mock Test', href: '/kcet/tests', primary: true },
      { label: 'Rank Predictor', href: '/kcet', primary: false },
      { label: '5-Year Analysis', href: '/kcet/analysis', primary: false },
    ],
  },
];

const FEATURES = [
  {
    icon: '⏱️',
    color: 'rgba(140,154,149,0.12)',
    title: 'Real Exam Timer',
    desc: 'Subject-wise countdowns matching the actual exam pattern. Auto-submits when time runs out — no surprises on exam day.',
  },
  {
    icon: '📊',
    color: 'rgba(156,168,164,0.12)',
    title: 'Instant Results & Analysis',
    desc: 'Correct / wrong / skipped breakdown per subject. See exactly which questions you got wrong and why.',
  },
  {
    icon: '🎯',
    color: 'rgba(183,189,185,0.12)',
    title: 'Rank Prediction',
    desc: 'Enter your mock score and get an estimated KCET rank or BITSAT score band based on historical cutoffs.',
  },
  {
    icon: '📈',
    color: 'rgba(140,154,149,0.10)',
    title: '5-Year Trend Analysis',
    desc: 'Chapter-wise difficulty trends from 2021–2025 so you know exactly what to focus on before the real exam.',
  },
  {
    icon: '📤',
    color: 'rgba(95,118,111,0.14)',
    title: 'Upload Your Own Paper',
    desc: 'Have a past paper PDF or JSON? Upload it and take it as a timed mock test — works with any exam.',
  },
  {
    icon: '🆓',
    color: 'rgba(255,255,255,0.05)',
    title: '100% Free, Always',
    desc: 'No login, no subscription, no credit card. Every mock test, every analysis — completely free to use.',
  },
];

const HOME_LEADERBOARDS = [
  {
    id: 'bitsat',
    title: 'BITSAT Top Scores',
    subtitle: 'Latest overall attempts across BITSAT mocks',
    href: '/bitsat/tests',
    accent: '#9ca8a4',
  },
  {
    id: 'kcet',
    title: 'KCET Top Scores',
    subtitle: 'Latest overall attempts across KCET mocks',
    href: '/kcet/tests',
    accent: '#8c9a95',
  },
];

export default function Home() {
  const [leaderboards, setLeaderboards] = useState({
    kcet: { rows: [], error: '', loading: true },
    bitsat: { rows: [], error: '', loading: true },
  });

  useEffect(() => {
    let ignore = false;

    async function loadLeaderboards() {
      const results = await Promise.all(
        HOME_LEADERBOARDS.map(async (board) => {
          try {
            const response = await fetch(`/api/leaderboard?examType=${board.id}`, { cache: 'no-store' });
            const contentType = response.headers.get('content-type') || '';
            const data = contentType.includes('application/json')
              ? await response.json()
              : { error: 'Leaderboard unavailable right now.' };

            return [
              board.id,
              {
                rows: response.ok && Array.isArray(data?.leaderboard) ? data.leaderboard.slice(0, 5) : [],
                error: response.ok ? '' : (data?.error || 'Leaderboard unavailable right now.'),
                loading: false,
              },
            ];
          } catch {
            return [
              board.id,
              {
                rows: [],
                error: 'Leaderboard unavailable right now.',
                loading: false,
              },
            ];
          }
        })
      );

      if (!ignore) {
        setLeaderboards(Object.fromEntries(results));
      }
    }

    loadLeaderboards();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="home-main">

        {/* Hero */}
        <section className="hero-section animate-fade-in-up">
          <div className="hero-free-badge">🚀 BITSAT Focus Now · 100% Free · No Login Required</div>
          <h1 className="hero-title">
            Make <span className="text-gradient">BITSAT</span> Your Next Win<br />
            with Full-Length Mock Tests
          </h1>
          <p className="hero-subtitle">
            KCET may be behind you, so the homepage now puts BITSAT first: full-length practice papers, public reconstruction sets,
            instant scoring, and score prediction tools right in your browser. KCET tools are still here whenever you need them.
          </p>
          <div className="hero-cta-row">
            <Link href="/bitsat/tests">
              <button className="btn-primary hero-btn">
                Start BITSAT Mock Test →
              </button>
            </Link>
            <Link href="/bitsat">
              <button className="btn-secondary hero-btn">
                Open BITSAT Score Predictor →
              </button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="hero-stats glass-panel delay-200 animate-fade-in-up">
            {[['17', 'BITSAT Papers'], ['150', 'Questions Per Test'], ['3 hrs', 'Full-Length Mode'], ['Free', 'Forever']].map(([val, label]) => (
              <div key={label} className="hero-stat-item">
                <span className="hero-stat-val text-gradient">{val}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Cards */}
        <section className="section" aria-labelledby="exams-heading">
          <div className="section-header">
            <h2 id="exams-heading" className="section-title">Choose Your Exam</h2>
            <p className="section-subtitle">BITSAT is front and center for the upcoming cycle, with KCET tools still available below.</p>
          </div>
          <div className="exam-cards-grid">
            {EXAMS.map(exam => (
              <div
                key={exam.id}
                className={`exam-card glass-panel${exam.featured ? ' exam-card-featured' : ''}`}
                style={{ borderColor: exam.border, '--exam-color': exam.color }}
              >
                <div className="exam-card-header" style={{ background: exam.bg, borderBottom: `1px solid ${exam.border}` }}>
                  <span className="exam-icon">{exam.icon}</span>
                  <div>
                    <div className="exam-title-row">
                      <div className="exam-title" style={{ color: exam.color }}>{exam.title}</div>
                      {exam.featured && <span className="exam-feature-pill">Focus Now</span>}
                    </div>
                    <div className="exam-subtitle">{exam.subtitle}</div>
                  </div>
                </div>
                <div className="exam-card-body">
                  <p className="exam-desc">{exam.desc}</p>
                  <div className="exam-links">
                    {exam.links.map(({ label, href, primary }) => (
                      <Link key={href} href={href} style={{ flex: primary ? '1 1 100%' : 1 }}>
                        <button className={primary ? 'btn-primary exam-link-btn' : 'btn-secondary exam-link-btn'} style={primary ? { background: exam.color, border: `1px solid ${exam.border}`, color: '#ffffff' } : {}}>
                          {label}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="leaderboards-heading">
          <div className="section-header">
            <h2 id="leaderboards-heading" className="section-title">Live Leaderboards</h2>
            <p className="section-subtitle">See who is setting the pace in BITSAT right now, then compare with KCET results below.</p>
          </div>
          <div className="leaderboard-grid">
            {HOME_LEADERBOARDS.map((board) => {
              const state = leaderboards[board.id] || { rows: [], error: '', loading: true };
              return (
                <section key={board.id} className="leaderboard-card glass-panel" aria-labelledby={`${board.id}-leaderboard-title`}>
                  <div className="leaderboard-card-header">
                    <div>
                      <h3 id={`${board.id}-leaderboard-title`} className="leaderboard-card-title" style={{ color: board.accent }}>{board.title}</h3>
                      <p className="leaderboard-card-subtitle">{board.subtitle}</p>
                    </div>
                    <Link href={board.href} className="leaderboard-view-link">View tests</Link>
                  </div>

                  {state.loading && <p className="leaderboard-state">Loading leaderboard...</p>}
                  {!state.loading && state.error && <p className="leaderboard-state leaderboard-error">{state.error}</p>}
                  {!state.loading && !state.error && !state.rows.length && (
                    <p className="leaderboard-state">No attempts yet. Be the first one on the board.</p>
                  )}

                  {!!state.rows.length && (
                    <div className="leaderboard-list" role="list" aria-label={`${board.title} leaderboard`}>
                      {state.rows.map((row) => (
                        <div key={`${board.id}-${row.rank}-${row.name}-${row.score}`} className="leaderboard-row" role="listitem">
                          <span className="leaderboard-rank">#{row.rank}</span>
                          <div className="leaderboard-user">
                            <span className="leaderboard-name">{row.name}</span>
                            <span className="leaderboard-time">{formatTime(row.timeTaken)}</span>
                          </div>
                          <span className="leaderboard-score">{row.score}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="section how-section" aria-labelledby="how-heading">
          <div className="section-header">
            <h2 id="how-heading" className="section-title">How It Works</h2>
            <p className="section-subtitle">Three steps, zero friction.</p>
          </div>
          <div className="steps-row">
            {[
              { n: '1', icon: '🖱️', title: 'Pick an exam', desc: 'Choose BITSAT or KCET from the cards above. No account needed.' },
              { n: '2', icon: '⏱️', title: 'Take the timed test', desc: 'Real exam interface with subject-wise timers, question palette, and flag-for-review.' },
              { n: '3', icon: '📊', title: 'See your results', desc: 'Instant score, subject analysis, question-by-question review and rank prediction.' },
            ].map(step => (
              <div key={step.n} className="step-card glass-panel">
                <div className="step-number">{step.n}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="section" aria-labelledby="features-heading">
          <div className="section-header">
            <h2 id="features-heading" className="section-title">Everything You Need to <span className="text-gradient">Succeed</span></h2>
            <p className="section-subtitle">Built specifically for BITSAT and KCET aspirants.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card glass-panel">
                <div className="feature-icon-wrap" style={{ background: f.color }}>
                  <span style={{ fontSize: '1.6rem' }}>{f.icon}</span>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upload CTA */}
        <section className="upload-cta glass-panel" aria-labelledby="upload-heading">
          <div className="upload-cta-content">
            <div className="upload-cta-icon">📤</div>
            <div>
              <h2 id="upload-heading" className="upload-cta-title">Have Your Own Question Paper?</h2>
              <p className="upload-cta-desc">Upload a PDF, TXT, or JSON file and turn it into a timed mock test instantly.</p>
            </div>
          </div>
          <Link href="/upload">
            <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload Paper →</button>
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="site-footer glass-panel">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo-mark" aria-hidden="true" />
            <span className="footer-logo-text">Prep<span className="text-gradient">Master</span></span>
            <p className="footer-tagline">Free mock tests for BITSAT &amp; KCET aspirants.</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-links-grid">
            <div className="footer-col">
              <h3 className="footer-col-heading">BITSAT</h3>
              <Link href="/bitsat" className="footer-link">Score Predictor</Link>
              <Link href="/bitsat/tests" className="footer-link">Mock Tests</Link>
            </div>
            <div className="footer-col">
              <h3 className="footer-col-heading">KCET</h3>
              <Link href="/kcet" className="footer-link">Rank Predictor</Link>
              <Link href="/kcet/tests" className="footer-link">Mock Tests</Link>
              <Link href="/kcet/analysis" className="footer-link">5-Year Analysis</Link>
            </div>
            <div className="footer-col">
              <h3 className="footer-col-heading">Tools</h3>
              <Link href="/upload" className="footer-link">Upload Paper</Link>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>© 2026 PrepMaster · Free forever for students</span>
          <span className="footer-free-pill">🆓 No login · No fees</span>
        </div>
      </footer>
    </>
  );
}
