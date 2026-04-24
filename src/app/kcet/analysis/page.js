'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { kcetTenYearBlueprint } from '@/data/kcetQuestions';

// 5-Year data (2020-2024) from KCET official papers
const YEARS = ['2020', '2021', '2022', '2023', '2024'];

const analysisData = {
  physics: {
    title: 'Physics',
    color: '#378ADD',
    difficulty: 'Moderate – Hard',
    totalQs: 60,
    topUnit: 'Electricity & Magnetism',
    chapters: [
      { name: 'Current Electricity',    avg: '5',   pct: 83, weight: 'High',   yearly: [18, 19, 20, 18, 20] },
      { name: 'Electrostatics',         avg: '4–5', pct: 75, weight: 'High',   yearly: [10, 10, 10, 11, 10] },
      { name: 'Magnetic Effects',       avg: '4',   pct: 67, weight: 'High',   yearly: [8, 9, 9, 8, 10] },
      { name: 'Optics',                 avg: '3–4', pct: 58, weight: 'High',   yearly: [10, 9, 10, 11, 10] },
      { name: 'Thermodynamics',         avg: '3',   pct: 50, weight: 'Medium', yearly: [8, 8, 7, 8, 7] },
      { name: 'Gravitation',            avg: '2–3', pct: 42, weight: 'Medium', yearly: [3, 3, 2, 2, 3] },
      { name: 'Waves & Oscillations',   avg: '2',   pct: 33, weight: 'Medium', yearly: [5, 4, 4, 4, 4] },
      { name: 'Modern Physics',         avg: '1–2', pct: 25, weight: 'Low',    yearly: [3, 3, 3, 3, 2] },
    ],
    stackedYearly: [
      { label: 'Electricity', data: [18, 19, 20, 18, 20], color: '#378ADD' },
      { label: 'Optics',      data: [10, 9, 10, 11, 10],  color: '#85B7EB' },
      { label: 'Thermo',      data: [8, 8, 7, 8, 7],       color: '#B5D4F4' },
      { label: 'Mechanics',   data: [24, 24, 23, 23, 23],  color: '#E0EEF9' },
    ],
    insight: 'The Electricity block (Current + Electrostatics + Magnetism) dominates every year, contributing ~35% of all Physics questions. Prioritise these three chapters first.',
  },
  chemistry: {
    title: 'Chemistry',
    color: '#1D9E75',
    difficulty: 'Easy – Moderate',
    totalQs: 60,
    topUnit: 'Organic Chemistry',
    chapters: [
      { name: 'Coordination Compounds', avg: '4–5', pct: 83, weight: 'High',   yearly: [5, 5, 4, 5, 5] },
      { name: 'p-Block Elements',        avg: '4–5', pct: 75, weight: 'High',   yearly: [5, 4, 5, 5, 4] },
      { name: 'Aldehydes & Ketones',     avg: '4',   pct: 67, weight: 'High',   yearly: [4, 4, 4, 4, 4] },
      { name: 'Chemical Kinetics',       avg: '3–4', pct: 58, weight: 'High',   yearly: [3, 4, 3, 4, 4] },
      { name: 'Electrochemistry',        avg: '3',   pct: 50, weight: 'Medium', yearly: [3, 3, 3, 3, 3] },
      { name: 'Solutions',               avg: '2–3', pct: 42, weight: 'Medium', yearly: [3, 3, 2, 2, 3] },
      { name: 's-Block Elements',        avg: '2',   pct: 33, weight: 'Low',    yearly: [2, 2, 2, 2, 2] },
      { name: 'Polymers & Biomolecules', avg: '1–2', pct: 25, weight: 'Low',    yearly: [2, 2, 1, 2, 1] },
    ],
    stackedYearly: [
      { label: 'Organic',   data: [22, 21, 23, 22, 23], color: '#1D9E75' },
      { label: 'Inorganic', data: [20, 21, 19, 20, 19], color: '#5DCAA5' },
      { label: 'Physical',  data: [18, 18, 18, 18, 18], color: '#9FE1CB' },
    ],
    insight: 'Chemistry is consistently the easiest subject. Organic + Inorganic together account for 70%+ of questions. Master Coordination Compounds and p-Block for maximum returns.',
  },
  maths: {
    title: 'Mathematics',
    color: '#7F77DD',
    difficulty: 'Moderate – Hard',
    totalQs: 60,
    topUnit: 'Calculus',
    chapters: [
      { name: 'Integrals',                      avg: '6–7', pct: 83, weight: 'High',   yearly: [16, 15, 17, 16, 17] },
      { name: 'Continuity & Differentiability', avg: '5–6', pct: 75, weight: 'High',   yearly: [10, 10, 10, 11, 11] },
      { name: '3D Geometry & Vectors',          avg: '4–5', pct: 67, weight: 'High',   yearly: [9, 10, 9, 11, 11]  },
      { name: 'Relations & Functions',          avg: '4',   pct: 58, weight: 'High',   yearly: [8, 8, 7, 7, 7]    },
      { name: 'Matrices & Determinants',        avg: '3–4', pct: 50, weight: 'Medium', yearly: [6, 6, 6, 5, 5]    },
      { name: 'Probability',                    avg: '3',   pct: 42, weight: 'Medium', yearly: [5, 5, 5, 5, 5]    },
      { name: 'Differential Equations',         avg: '2–3', pct: 33, weight: 'Medium', yearly: [5, 5, 5, 4, 4]    },
      { name: 'Trigonometry / Inverse Trig',    avg: '1–2', pct: 25, weight: 'Low',    yearly: [1, 1, 1, 1, 0]    },
    ],
    stackedYearly: [
      { label: 'Calculus',   data: [16, 15, 17, 16, 17], color: '#7F77DD' },
      { label: '3D & Vecs',  data: [9, 10, 9, 11, 11],   color: '#AFA9EC' },
      { label: 'Algebra',    data: [14, 14, 13, 13, 13],  color: '#CECBF6' },
      { label: 'Others',     data: [21, 21, 21, 20, 19],  color: '#EEEDFE' },
    ],
    insight: 'Calculus (Integrals + Differentiation) alone contributes ~25% of all Maths questions every year. Combined with 3D Geometry & Vectors, these three areas account for more than 50%.',
  },
};

const weightColor = { High: '#00f5d4', Medium: '#fee440', Low: '#8e8e9f' };
const weightBg    = { High: 'rgba(0,245,212,0.1)', Medium: 'rgba(254,228,64,0.1)', Low: 'rgba(142,142,159,0.1)' };

// Reusable sub-components
function WeightBadge({ weight }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '20px',
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      background: weightBg[weight],
      color: weightColor[weight],
      border: `1px solid ${weightColor[weight]}44`,
    }} aria-label={`Priority: ${weight}`}>
      {weight}
    </span>
  );
}

function HorizontalBar({ pct, color }) {
  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
      aria-label={`${pct}% weightage`}
      style={{ flex: 1, margin: '0 12px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '8px' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width 0.6s ease' }} />
    </div>
  );
}

function StackedBarChart({ data, maxVal = 65, color }) {
  const ALPHA_VARIANTS = ['ff', 'bb', '77', '33'];
  return (
    <div role="img" aria-label="Year-wise question distribution bar chart" style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
        {YEARS.map((yr, yi) => {
          const total = data.stackedYearly.reduce((sum, d) => sum + d.data[yi], 0);
          return (
            <div key={yr} style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', height: '100%', gap: '2px' }}>
              {data.stackedYearly.map((seg, si) => {
                const pct = (seg.data[yi] / maxVal) * 100;
                return (
                  <div key={si} title={`${seg.label}: ${seg.data[yi]} Qs`}
                    style={{ height: `${pct}%`, background: seg.color, borderRadius: si === data.stackedYearly.length - 1 ? '4px 4px 0 0' : '0', transition: 'height 0.5s ease' }} />
                );
              })}
              <span style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', flexShrink: 0 }}>{yr}</span>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
        {data.stackedYearly.map(seg => (
          <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div style={{ width: '12px', height: '12px', background: seg.color, borderRadius: '2px' }} />
            {seg.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function DifficultyTimeline() {
  // difficulty on scale 1-5 (from overview chart data)
  const diffData = {
    Physics:     [3.2, 3.5, 3.8, 3.4, 3.6],
    Chemistry:   [2.5, 2.8, 2.6, 2.7, 2.9],
    Mathematics: [3.4, 3.6, 3.9, 3.7, 3.8],
  };
  const subColors = { Physics: '#378ADD', Chemistry: '#1D9E75', Mathematics: '#7F77DD' };
  const H = 140;
  const W_UNIT = 20; // % per year slot
  const minY = 1, maxY = 5;
  const toY = (v) => H - ((v - minY) / (maxY - minY)) * H;

  return (
    <div role="img" aria-label="Difficulty trend 2020-2024: Physics and Maths moderate-hard (3.2–3.9/5), Chemistry easy-moderate (2.5–2.9/5)">
      <svg width="100%" viewBox={`0 0 400 ${H + 40}`} style={{ overflow: 'visible' }} aria-hidden="true">
        {/* Y gridlines */}
        {[2, 3, 4].map(v => (
          <g key={v}>
            <line x1="30" x2="390" y1={toY(v)} y2={toY(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x="24" y={toY(v) + 4} fontSize="10" fill="#8e8e9f" textAnchor="end">
              {['', 'Easy', '', 'Med', '', 'Hard'][v]}
            </text>
          </g>
        ))}
        {/* Lines */}
        {Object.entries(diffData).map(([sub, vals]) => {
          const pts = vals.map((v, i) => {
            const x = 30 + (i / (YEARS.length - 1)) * 360;
            return `${x},${toY(v)}`;
          }).join(' ');
          return (
            <g key={sub}>
              <polyline points={pts} fill="none" stroke={subColors[sub]} strokeWidth="2.5" strokeLinejoin="round" />
              {vals.map((v, i) => {
                const x = 30 + (i / (YEARS.length - 1)) * 360;
                return <circle key={i} cx={x} cy={toY(v)} r="4" fill={subColors[sub]} />;
              })}
            </g>
          );
        })}
        {/* X labels */}
        {YEARS.map((yr, i) => (
          <text key={yr} x={30 + (i / (YEARS.length - 1)) * 360} y={H + 20} fontSize="11" fill="#8e8e9f" textAnchor="middle">{yr}</text>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {Object.entries(subColors).map(([sub, col]) => (
          <div key={sub} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <div style={{ width: '20px', height: '3px', background: col, borderRadius: '2px' }} />
            {sub}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main page
export default function KcetAnalysisPage() {
  const [activeTab, setActiveTab] = useState('physics');
  const data = analysisData[activeTab] || analysisData.physics;

  return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <nav aria-label="Breadcrumb">
            <ol style={styles.breadcrumb}>
              <li><Link href="/" style={styles.breadLink}>Home</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li><Link href="/kcet" style={styles.breadLink}>KCET</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li style={{ color: 'var(--text-muted)' }} aria-current="page">5-Year Analysis</li>
            </ol>
          </nav>
          <h1 style={styles.title}>
            KCET <span className="text-gradient">10-Year Analysis</span>
          </h1>
          <p style={styles.subtitle}>
            Question preparation blueprint for Physics, Chemistry &amp; Mathematics (2016–2025),
            with detailed visuals from the latest stable window (2020–2024).
          </p>
        </header>

        {/* Overview cards */}
        <section aria-label="Quick overview metrics" style={styles.overviewGrid}>
          {[
            { label: 'Exam Date',         value: '23–24 Apr 2026',    icon: '📅' },
            { label: 'Total Marks',        value: '180 (60 per subj)', icon: '🎯' },
            { label: 'Duration per subj',  value: '80 minutes',        icon: '⏱' },
            { label: 'Negative Marking',   value: 'None',              icon: '✅' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="glass-panel" style={styles.overviewCard}>
              <span style={styles.cardIcon} aria-hidden="true">{icon}</span>
              <div>
                <div style={styles.cardValue}>{value}</div>
                <div style={styles.cardLabel}>{label}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="glass-panel" style={styles.section}>
          <h2 style={styles.sectionTitle}>10-Year Preparation Blueprint (2016-2025)</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '14px', lineHeight: 1.7 }}>
            Paper generation now follows this long-horizon framework before creating each mock. This reduces easy-paper bias and keeps the pattern close to real KCET progression.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {kcetTenYearBlueprint.strategy.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
          <p style={{ marginTop: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Difficulty mix target: Easy {Math.round(kcetTenYearBlueprint.difficultyMix.easy * 100)}% · Medium {Math.round(kcetTenYearBlueprint.difficultyMix.medium * 100)}% · Hard {Math.round(kcetTenYearBlueprint.difficultyMix.hard * 100)}%
          </p>
        </section>

        {/* Difficulty Timeline */}
        <section aria-labelledby="difficulty-heading" className="glass-panel" style={styles.section}>
          <h2 id="difficulty-heading" style={styles.sectionTitle}>Recent Difficulty Window (2020–2024)</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Scored 1 (Easy) → 5 (Hard) based on question complexity analysis.
          </p>
          <DifficultyTimeline />
          <div style={styles.keyObservations}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Key Observations</h3>
            {[
              ['Physics',     '#378ADD', 'Electricity block dominates every year — ~35% of all Physics questions.'],
              ['Chemistry',   '#1D9E75', 'Consistently easiest subject; Organic + Inorganic share 70%+.'],
              ['Mathematics', '#7F77DD', 'Calculus alone accounts for ~25% every year; difficulty trending upward.'],
              ['KCET 2026',   '#c77dff', 'Scheduled Apr 23–24, 2026 — same pattern strongly expected.'],
            ].map(([subj, col, obs]) => (
              <div key={subj} style={styles.obsRow}>
                <span style={{ color: col, fontWeight: 700, minWidth: '90px', fontSize: '0.88rem' }}>{subj}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{obs}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Tabs */}
        <section aria-labelledby="subject-analysis-heading">
          <h2 id="subject-analysis-heading" style={{ ...styles.sectionTitle, marginBottom: '16px' }}>
            Chapter-wise Weightage
          </h2>

          {/* Tab navigation */}
          <div role="tablist" aria-label="Subject analysis tabs" style={styles.tabList}>
            {[
              { key: 'physics',   label: 'Physics',     color: '#378ADD' },
              { key: 'chemistry', label: 'Chemistry',   color: '#1D9E75' },
              { key: 'maths',     label: 'Mathematics', color: '#7F77DD' },
            ].map(tab => (
              <button key={tab.key} role="tab"
                id={`tab-${tab.key}`}
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  ...styles.tab,
                  background: activeTab === tab.key ? `${tab.color}22` : 'transparent',
                  border: `1px solid ${activeTab === tab.key ? tab.color : 'rgba(255,255,255,0.1)'}`,
                  color: activeTab === tab.key ? tab.color : 'var(--text-muted)',
                  fontWeight: activeTab === tab.key ? 700 : 500,
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} className="glass-panel" style={styles.tabPanel}>
            {/* Subject metrics */}
            <div style={styles.metricRow}>
              {[
                ['Total Questions',  data.totalQs],
                ['Difficulty Level', data.difficulty],
                ['Top Scoring Unit', data.topUnit],
              ].map(([k, v]) => (
                <div key={k} style={styles.metricBox}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{k}</div>
                  <div style={{ fontWeight: 700, color: data.color }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Insight box */}
            <div style={styles.insightBox}>
              <span style={{ fontSize: '1rem', marginRight: '8px' }} aria-hidden="true">💡</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{data.insight}</p>
            </div>

            {/* Chapter bars */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }} aria-label={`${data.title} chapter weightage`}>
              <caption className="sr-only">Average questions per chapter in KCET {data.title} (2020–2024)</caption>
              <thead>
                <tr>
                  <th scope="col" style={styles.th}>Chapter</th>
                  <th scope="col" style={{ ...styles.th, display: 'none' }} aria-hidden="true">Bar</th>
                  <th scope="col" style={styles.th}>Avg Qs</th>
                  <th scope="col" style={styles.th}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {data.chapters.map(ch => (
                  <tr key={ch.name} style={styles.chRow}>
                    <td style={{ ...styles.td, minWidth: '200px', fontWeight: 500 }}>{ch.name}</td>
                    <td style={{ ...styles.td, width: '100%' }}>
                      <HorizontalBar pct={ch.pct} color={data.color} />
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{ch.avg}</td>
                    <td style={{ ...styles.td, paddingLeft: '12px' }}><WeightBadge weight={ch.weight} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Stacked yearly chart */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0' }}>
                Year-wise Distribution (2020–2024)
              </h3>
              <StackedBarChart data={data} color={data.color} />
            </div>
          </div>
        </section>

        {/* 2026 Prediction */}
        <section aria-labelledby="prediction-heading" className="glass-panel" style={{ ...styles.section, borderTop: '3px solid rgba(123,44,191,0.5)' }}>
          <h2 id="prediction-heading" style={styles.sectionTitle}>🔮 2026 Paper Prediction</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
            Based on trend analysis, here is the expected question distribution for KCET 2026.
          </p>
          <div style={styles.predGrid}>
            {[
              {
                subject: 'Physics', color: '#378ADD',
                chapters: [
                  ['Current Electricity + Electrostatics', '9–10 Qs'],
                  ['Magnetic Effects + EMI',               '6–7 Qs'],
                  ['Optics (Ray + Wave)',                  '6–7 Qs'],
                  ['Thermodynamics + Kinetic Theory',     '5–6 Qs'],
                  ['Mechanics (Motion + Laws)',            '8–9 Qs'],
                  ['Modern Physics + Semiconductors',     '4–5 Qs'],
                ],
              },
              {
                subject: 'Chemistry', color: '#1D9E75',
                chapters: [
                  ['Coordination Compounds',        '4–5 Qs'],
                  ['p-Block (Groups 15–18)',         '4–5 Qs'],
                  ['Aldehydes, Ketones & Acids',     '4–5 Qs'],
                  ['Chemical Kinetics',              '3–4 Qs'],
                  ['Electrochemistry',               '3–4 Qs'],
                  ['Solutions + Surface Chemistry',  '4–5 Qs'],
                  ['Polymers, Biomolecules, d-block','5–6 Qs'],
                ],
              },
              {
                subject: 'Mathematics', color: '#7F77DD',
                chapters: [
                  ['Integrals (Definite + Indefinite)', '7–8 Qs'],
                  ['Continuity & Differentiability',    '6–7 Qs'],
                  ['3D Geometry + Vectors',             '5–6 Qs'],
                  ['Relations & Functions',             '4–5 Qs'],
                  ['Matrices & Determinants',           '4–5 Qs'],
                  ['Probability',                       '3–4 Qs'],
                  ['Differential Equations',            '3 Qs'],
                ],
              },
            ].map(({ subject, color, chapters }) => (
              <div key={subject} style={{ borderTop: `2px solid ${color}66`, paddingTop: '16px' }}>
                <h3 style={{ color, fontWeight: 700, fontSize: '1rem', marginBottom: '14px' }}>{subject}</h3>
                <dl style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {chapters.map(([ch, qs]) => (
                    <div key={ch} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                      <dt style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{ch}</dt>
                      <dd style={{ fontSize: '0.83rem', fontWeight: 700, color, marginLeft: '12px', whiteSpace: 'nowrap' }}>{qs}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '20px' }}>
            ⚠️ This is an expert prediction based on 5-year trend. Actual paper may vary.
          </p>
        </section>

        {/* CTA */}
        <section aria-label="Call to action" style={{ textAlign: 'center', marginTop: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
            Ready to practice?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Our mock tests are built to exactly match this pattern.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kcet/tests">
              <button className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                Start Mock Tests →
              </button>
            </Link>
            <Link href="/kcet">
              <button className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                Rank Predictor
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

const styles = {
  main: {
    padding: '20px 40px 60px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  header: { marginBottom: '36px' },
  breadcrumb: {
    display: 'flex', gap: '8px', alignItems: 'center',
    listStyle: 'none', fontSize: '0.82rem', marginBottom: '12px', color: 'var(--text-muted)',
  },
  breadLink: { color: 'var(--accent-secondary)', textDecoration: 'none' },
  title: { fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '10px' },
  subtitle: { color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 },

  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '32px',
  },
  overviewCard: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  cardIcon: { fontSize: '1.8rem' },
  cardValue: { fontWeight: 700, fontSize: '1rem' },
  cardLabel: { fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' },

  section: { padding: '28px', marginBottom: '24px' },
  sectionTitle: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' },

  keyObservations: {
    marginTop: '24px',
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  obsRow: {
    display: 'flex',
    gap: '16px',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    alignItems: 'flex-start',
  },

  tabList: { display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
  tab: {
    padding: '9px 22px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.88rem',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  tabPanel: { padding: '28px' },

  metricRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  metricBox: {
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.07)',
    flex: 1,
    minWidth: '150px',
  },
  insightBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '14px 16px',
    background: 'rgba(123,44,191,0.08)',
    borderRadius: '10px',
    border: '1px solid rgba(123,44,191,0.2)',
    marginBottom: '20px',
  },

  th: {
    textAlign: 'left',
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  td: {
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    verticalAlign: 'middle',
  },
  chRow: {},

  predGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
};
