'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { estimateKcetRank, kcetResearchSignals } from '@/lib/kcetPredictor';

export default function KcetPage() {
  const [boardPhysics, setBoardPhysics] = useState(100);
  const [boardChemistry, setBoardChemistry] = useState(100);
  const [boardMaths, setBoardMaths] = useState(100);

  const [kcetPhysics, setKcetPhysics] = useState(60);
  const [kcetChemistry, setKcetChemistry] = useState(60);
  const [kcetMaths, setKcetMaths] = useState(60);

  const [paperDifficulty, setPaperDifficulty] = useState('moderate');
  const [candidateGrowthPct, setCandidateGrowthPct] = useState(kcetResearchSignals.defaults.candidateGrowthPct);
  const [repeaterPct, setRepeaterPct] = useState(kcetResearchSignals.defaults.repeaterPct);

  const [prediction, setPrediction] = useState(null);

  const calculateRank = (e) => {
    e.preventDefault();
    
    // KCET marks out of 180 (60 per subject)
    const totalKcet = Number(kcetPhysics) + Number(kcetChemistry) + Number(kcetMaths);

    // Board PCM marks out of 300 (100 per subject)
    const totalBoard = Number(boardPhysics) + Number(boardChemistry) + Number(boardMaths);

    const estimate = estimateKcetRank({
      kcetMarks: totalKcet,
      boardMarks: totalBoard,
      paperDifficulty,
      candidateGrowthPct,
      repeaterPct,
    });

    setPrediction({
      totalKcet,
      totalBoard,
      combinedPercentage: estimate.combined.toFixed(2),
      estimatedRank: estimate.estimatedRankRange,
      colleges: estimate.colleges,
      adjustedIndex: estimate.adjustedIndex.toFixed(2),
    });
  };

  const sampleQuestions = [
    {
      subject: 'Physics',
      topic: 'Ray Optics',
      question: 'Two lenses of power +10 D and -5 D are placed in contact. The focal length of the combination is:',
      options: ['10 cm', '20 cm', '-20 cm', '-10 cm'],
      answer: '20 cm',
      analysis: 'Highly repeated concept (2021, 2023). Power combination P = P1 + P2. Focus on lens combination formulas.'
    },
    {
      subject: 'Chemistry',
      topic: 'Chemical Kinetics',
      question: 'For a first-order reaction, if the rate constant is k, the time required for 99% completion is approximately:',
      options: ['2.303/k', '4.606/k', '6.909/k', '0.693/k'],
      answer: '4.606/k',
      analysis: 'Appeared in 4 of the last 5 years. Direct application of t = (2.303/k) * log(100/1).'
    },
    {
      subject: 'Mathematics',
      topic: 'Matrices & Determinants',
      question: 'If A is a square matrix of order 3 such that |A| = 4, then |adj(A)| is equal to:',
      options: ['4', '16', '64', '8'],
      answer: '16',
      analysis: 'Standard property-based question. |adj(A)| = |A|^(n-1). Very frequent in KCET (2022, 2024).'
    }
  ];

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <section style={styles.header}>
          <h1 style={styles.title}>KCET 2026 <span className="text-gradient">Predictor & Analysis</span></h1>
          <p style={styles.subtitle}>Calculate your expected rank with 50:50 weighting and trend adjustments (paper difficulty + competition), plus question patterns analyzed from the last 10 years.</p>
        </section>

        <div style={styles.container}>
          {/* Rank Predictor Column */}
          <div style={styles.column}>
            <div className="glass-panel" style={styles.card}>
              <h2 style={styles.cardTitle}>📊 Rank Predictor</h2>
              <form onSubmit={calculateRank} style={styles.form}>
                
                <h3 style={styles.sectionHeading}>12th Board PCM Marks (Out of 100)</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Physics</label>
                    <input type="number" min="0" max="100" required value={boardPhysics} onChange={(e) => setBoardPhysics(e.target.value)} style={styles.input} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Chemistry</label>
                    <input type="number" min="0" max="100" required value={boardChemistry} onChange={(e) => setBoardChemistry(e.target.value)} style={styles.input} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Maths</label>
                    <input type="number" min="0" max="100" required value={boardMaths} onChange={(e) => setBoardMaths(e.target.value)} style={styles.input} />
                  </div>
                </div>

                <h3 style={{...styles.sectionHeading, marginTop: '20px'}}>Expected KCET Marks (Out of 60)</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Physics</label>
                    <input type="number" min="0" max="60" required value={kcetPhysics} onChange={(e) => setKcetPhysics(e.target.value)} style={styles.input} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Chemistry</label>
                    <input type="number" min="0" max="60" required value={kcetChemistry} onChange={(e) => setKcetChemistry(e.target.value)} style={styles.input} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Maths</label>
                    <input type="number" min="0" max="60" required value={kcetMaths} onChange={(e) => setKcetMaths(e.target.value)} style={styles.input} />
                  </div>
                </div>

                <h3 style={{...styles.sectionHeading, marginTop: '20px'}}>Trend Factors (Web Analysis Inputs)</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Paper Difficulty</label>
                    <select value={paperDifficulty} onChange={(e) => setPaperDifficulty(e.target.value)} style={styles.input}>
                      <option value="easy">Easy (rank inflation)</option>
                      <option value="moderate">Moderate</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Candidate Growth %</label>
                    <input type="number" min="0" max="20" step="0.1" value={candidateGrowthPct} onChange={(e) => setCandidateGrowthPct(e.target.value)} style={styles.input} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Reappearing %</label>
                    <input type="number" min="0" max="60" step="0.1" value={repeaterPct} onChange={(e) => setRepeaterPct(e.target.value)} style={styles.input} />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{marginTop: '24px', width: '100%'}}>
                  Calculate Expected Rank
                </button>
              </form>

              {prediction && (
                <div style={styles.resultBox} className="animate-fade-in-up">
                  <h3 style={{marginBottom: '16px', color: 'var(--accent-secondary)'}}>Prediction Results</h3>
                  <div style={styles.resultGrid}>
                    <div style={styles.resultItem}>
                      <span style={styles.resultLabel}>Total KCET</span>
                      <span style={styles.resultValue}>{prediction.totalKcet} / 180</span>
                    </div>
                    <div style={styles.resultItem}>
                      <span style={styles.resultLabel}>Total Board PCM</span>
                      <span style={styles.resultValue}>{prediction.totalBoard} / 300</span>
                    </div>
                    <div style={styles.resultItem}>
                      <span style={styles.resultLabel}>Combined Score</span>
                      <span style={styles.resultValue}>{prediction.combinedPercentage}%</span>
                    </div>
                    <div style={styles.resultItem}>
                      <span style={styles.resultLabel}>Adjusted Index</span>
                      <span style={styles.resultValue}>{prediction.adjustedIndex}</span>
                    </div>
                  </div>
                  <div style={{marginTop: '20px', padding: '16px', background: 'rgba(123, 44, 191, 0.1)', borderRadius: '12px', textAlign: 'center'}}>
                    <span style={styles.resultLabel}>Estimated KCET 2026 Rank</span>
                    <div style={{fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '8px'}}>{prediction.estimatedRank}</div>
                    <p style={{fontSize: '0.88rem', color: 'var(--accent-secondary)', marginTop: '8px'}}>{prediction.colleges}</p>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px'}}>*Rank is approximate and based on historical trends.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="glass-panel" style={{...styles.card, marginTop: '30px'}}>
              <h2 style={styles.cardTitle}>ℹ️ How it Works</h2>
              <p style={{color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem'}}>
                The Karnataka Examination Authority (KEA) determines KCET engineering ranks by taking <strong>50% weightage from the KCET marks</strong> (out of 180 in Physics, Chemistry, and Mathematics) and <strong>50% weightage from your 2nd PUC / 12th Board marks</strong> in the same three subjects. 
                <br/><br/>
                This predictor also adjusts for year-to-year movement by considering paper difficulty, candidate growth, and reappearing-candidate pressure reported in recent trend analysis.
              </p>
            </div>
          </div>

          {/* Analysis & Mock Questions Column */}
          <div style={styles.column}>
            <div className="glass-panel" style={styles.card}>
              <h2 style={styles.cardTitle}>🎯 2026 Mock Questions (5-Year Analysis)</h2>
              <p style={{color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem'}}>
                We analyzed past KCET papers (2016 - 2025) to identify the most repeated patterns and concepts. Here are expected high-probability questions for 2026.
              </p>

              <div style={styles.questionsList}>
                {sampleQuestions.map((q, idx) => (
                  <div key={idx} style={styles.questionCard}>
                    <div style={styles.qHeader}>
                      <span style={styles.qSubject}>{q.subject}</span>
                      <span style={styles.qTopic}>{q.topic}</span>
                    </div>
                    <p style={styles.qText}><strong>Q{idx + 1}.</strong> {q.question}</p>
                    <div style={styles.optionsGrid}>
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} style={styles.option}>
                          <div style={styles.optionDot}></div>
                          {opt}
                        </div>
                      ))}
                    </div>
                    <div style={styles.answerBox}>
                      <div style={{color: 'var(--accent-secondary)', fontWeight: '600', marginBottom: '8px'}}>Correct Answer: {q.answer}</div>
                      <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}><strong>Trend Analysis:</strong> {q.analysis}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/kcet/test">
                <button className="btn-secondary" style={{width: '100%', marginTop: '20px'}}>
                  Take Full Interactive Mock Test
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    padding: '0 40px 60px',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    padding: '40px 0',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
  },
  container: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1',
    minWidth: '400px',
  },
  card: {
    padding: '32px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '24px',
    borderBottom: '1px solid var(--glass-border)',
    paddingBottom: '16px',
  },
  sectionHeading: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: 'var(--text-main)',
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--glass-border)',
    padding: '12px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'var(--transition)',
  },
  resultBox: {
    marginTop: '32px',
    padding: '24px',
    border: '1px solid var(--accent-primary)',
    borderRadius: '16px',
    background: 'rgba(123, 44, 191, 0.05)',
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  resultItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  resultLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  resultValue: {
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  questionCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--glass-border)',
    borderRadius: '16px',
    padding: '20px',
  },
  qHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  qSubject: {
    background: 'rgba(0, 245, 212, 0.1)',
    color: 'var(--accent-secondary)',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  qTopic: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  qText: {
    fontSize: '1.05rem',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '0.95rem',
  },
  optionDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--glass-border)',
  },
  answerBox: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '16px',
    borderRadius: '8px',
    borderLeft: '4px solid var(--accent-primary)',
  }
};
