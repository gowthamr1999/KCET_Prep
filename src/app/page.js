import Link from 'next/link';
import Navbar from '@/components/Navbar';

const EXAMS = [
  {
    id: 'kcet',
    icon: '🎓',
    title: 'KCET',
    subtitle: 'Karnataka CET',
    desc: '10 full-length mock tests · 60 questions · Physics, Chemistry & Mathematics · 80 min per subject',
    color: '#00f5d4',
    bg: 'rgba(0,245,212,0.08)',
    border: 'rgba(0,245,212,0.25)',
    links: [
      { label: 'Start Mock Test', href: '/kcet/tests', primary: true },
      { label: 'Rank Predictor', href: '/kcet', primary: false },
      { label: '5-Year Analysis', href: '/kcet/analysis', primary: false },
    ],
  },
  {
    id: 'bitsat',
    icon: '🚀',
    title: 'BITSAT',
    subtitle: 'BITS Aptitude Test',
    desc: '10 full-length mock tests · 150 questions · Physics, Chemistry, Maths, English & Logical Reasoning · 3 hours',
    color: '#c77dff',
    bg: 'rgba(199,125,255,0.08)',
    border: 'rgba(199,125,255,0.25)',
    links: [
      { label: 'Start Mock Test', href: '/bitsat/tests', primary: true },
      { label: 'Score Predictor', href: '/bitsat', primary: false },
    ],
  },
];

const FEATURES = [
  {
    icon: '⏱️',
    color: 'rgba(0,245,212,0.1)',
    title: 'Real Exam Timer',
    desc: 'Subject-wise countdowns matching the actual exam pattern. Auto-submits when time runs out — no surprises on exam day.',
  },
  {
    icon: '📊',
    color: 'rgba(199,125,255,0.1)',
    title: 'Instant Results & Analysis',
    desc: 'Correct / wrong / skipped breakdown per subject. See exactly which questions you got wrong and why.',
  },
  {
    icon: '🎯',
    color: 'rgba(254,228,64,0.1)',
    title: 'Rank Prediction',
    desc: 'Enter your mock score and get an estimated KCET rank or BITSAT score band based on historical cutoffs.',
  },
  {
    icon: '📈',
    color: 'rgba(0,245,212,0.08)',
    title: '5-Year Trend Analysis',
    desc: 'Chapter-wise difficulty trends from 2021–2025 so you know exactly what to focus on before the real exam.',
  },
  {
    icon: '📤',
    color: 'rgba(123,44,191,0.1)',
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="home-main">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero-section animate-fade-in-up">
          <div className="hero-free-badge">🆓 100% Free · No Login Required</div>
          <h1 className="hero-title">
            Crack <span className="text-gradient">KCET & BITSAT</span><br />
            with Full-Length Mock Tests
          </h1>
          <p className="hero-subtitle">
            Practice with realistic timed tests, get instant results, predict your rank,
            and study 5-year exam trends — all for free, right in your browser.
          </p>
          <div className="hero-cta-row">
            <Link href="/kcet/tests">
              <button className="btn-primary hero-btn">
                Start KCET Mock Test →
              </button>
            </Link>
            <Link href="/bitsat/tests">
              <button className="btn-secondary hero-btn">
                Start BITSAT Mock Test →
              </button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="hero-stats glass-panel delay-200 animate-fade-in-up">
            {[['20', 'Mock Tests'], ['210', 'Questions Bank'], ['80 min', 'Per Subject'], ['Free', 'Forever']].map(([val, label]) => (
              <div key={label} className="hero-stat-item">
                <span className="hero-stat-val text-gradient">{val}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Exam Cards ───────────────────────────────────── */}
        <section className="section" aria-labelledby="exams-heading">
          <div className="section-header">
            <h2 id="exams-heading" className="section-title">Choose Your Exam</h2>
            <p className="section-subtitle">Pick an exam below and start practising right away — no sign-up needed.</p>
          </div>
          <div className="exam-cards-grid">
            {EXAMS.map(exam => (
              <div key={exam.id} className="exam-card glass-panel" style={{ borderColor: exam.border, '--exam-color': exam.color }}>
                <div className="exam-card-header" style={{ background: exam.bg, borderBottom: `1px solid ${exam.border}` }}>
                  <span className="exam-icon">{exam.icon}</span>
                  <div>
                    <div className="exam-title" style={{ color: exam.color }}>{exam.title}</div>
                    <div className="exam-subtitle">{exam.subtitle}</div>
                  </div>
                </div>
                <div className="exam-card-body">
                  <p className="exam-desc">{exam.desc}</p>
                  <div className="exam-links">
                    {exam.links.map(({ label, href, primary }) => (
                      <Link key={href} href={href} style={{ flex: primary ? '1 1 100%' : 1 }}>
                        <button className={primary ? 'btn-primary exam-link-btn' : 'btn-secondary exam-link-btn'} style={primary ? { background: `linear-gradient(135deg, ${exam.color}33, ${exam.color}11)`, border: `1px solid ${exam.border}`, color: exam.color } : {}}>
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

        {/* ── How it works ─────────────────────────────────── */}
        <section className="section how-section" aria-labelledby="how-heading">
          <div className="section-header">
            <h2 id="how-heading" className="section-title">How It Works</h2>
            <p className="section-subtitle">Three steps, zero friction.</p>
          </div>
          <div className="steps-row">
            {[
              { n: '1', icon: '🖱️', title: 'Pick an exam', desc: 'Choose KCET or BITSAT from the cards above. No account needed.' },
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

        {/* ── Features ─────────────────────────────────────── */}
        <section className="section" aria-labelledby="features-heading">
          <div className="section-header">
            <h2 id="features-heading" className="section-title">Everything You Need to <span className="text-gradient">Succeed</span></h2>
            <p className="section-subtitle">Built specifically for KCET and BITSAT aspirants.</p>
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

        {/* ── Upload CTA ───────────────────────────────────── */}
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

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="site-footer glass-panel">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo-mark" aria-hidden="true" />
            <span className="footer-logo-text">Prep<span className="text-gradient">Master</span></span>
            <p className="footer-tagline">Free mock tests for KCET &amp; BITSAT aspirants.</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-links-grid">
            <div className="footer-col">
              <h3 className="footer-col-heading">KCET</h3>
              <Link href="/kcet" className="footer-link">Rank Predictor</Link>
              <Link href="/kcet/tests" className="footer-link">Mock Tests</Link>
              <Link href="/kcet/analysis" className="footer-link">5-Year Analysis</Link>
            </div>
            <div className="footer-col">
              <h3 className="footer-col-heading">BITSAT</h3>
              <Link href="/bitsat" className="footer-link">Score Predictor</Link>
              <Link href="/bitsat/tests" className="footer-link">Mock Tests</Link>
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
