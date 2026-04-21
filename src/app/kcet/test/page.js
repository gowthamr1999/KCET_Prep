'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function MockTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      subject: 'Physics',
      text: 'A particle moves in a circular path of radius R. If it completes one revolution in time T, the average velocity is:',
      options: ['2πR/T', 'πR/T', '0', 'R/T'],
      correctAnswer: 2,
    },
    {
      id: 2,
      subject: 'Physics',
      text: 'The equivalent resistance of two resistors R1 and R2 connected in parallel is:',
      options: ['R1 + R2', '(R1 * R2) / (R1 + R2)', '|R1 - R2|', '(R1 + R2) / (R1 * R2)'],
      correctAnswer: 1,
    },
    {
      id: 3,
      subject: 'Chemistry',
      text: 'Which of the following is a primary haloalkane?',
      options: ['2-Bromopropane', '1-Bromopropane', '2-Bromo-2-methylpropane', 'Bromobenzene'],
      correctAnswer: 1,
    },
    {
      id: 4,
      subject: 'Chemistry',
      text: 'The oxidation state of Fe in [Fe(CN)6]4- is:',
      options: ['+2', '+3', '+4', '+6'],
      correctAnswer: 0,
    },
    {
      id: 5,
      subject: 'Mathematics',
      text: 'The derivative of sin(x^2) with respect to x is:',
      options: ['cos(x^2)', '2x cos(x^2)', '-2x sin(x)', '2x sin(x^2)'],
      correctAnswer: 1,
    },
    {
      id: 6,
      subject: 'Mathematics',
      text: 'The integral of (1/x) dx is:',
      options: ['x^2/2', 'ln|x| + C', '-1/x^2', 'e^x'],
      correctAnswer: 1,
    }
  ];

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let currentScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
  };

  const resetTest = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  const previousPapers = [
    { year: 2025, link: '#' },
    { year: 2024, link: '#' },
    { year: 2023, link: '#' },
    { year: 2022, link: '#' },
    { year: 2021, link: '#' },
  ];

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>KCET <span className="text-gradient">2026 Interactive Mock Test</span></h1>
          <p style={styles.subtitle}>Take this dynamically generated test based on 5-year historical trends.</p>
        </div>

        <div style={styles.container}>
          {/* Test Area */}
          <div style={styles.testSection} className="glass-panel">
            {!isSubmitted ? (
              <>
                <div style={styles.progressContainer}>
                  <div style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</div>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: `${((currentQuestion + 1) / questions.length) * 100}%`}}></div>
                  </div>
                </div>

                <div style={styles.questionBox}>
                  <div style={styles.subjectBadge}>{questions[currentQuestion].subject}</div>
                  <h3 style={styles.questionText}>{questions[currentQuestion].text}</h3>
                  
                  <div style={styles.optionsList}>
                    {questions[currentQuestion].options.map((opt, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          ...styles.optionItem,
                          background: selectedAnswers[questions[currentQuestion].id] === idx ? 'rgba(123, 44, 191, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          border: selectedAnswers[questions[currentQuestion].id] === idx ? '1px solid var(--accent-primary)' : '1px solid transparent'
                        }}
                        onClick={() => handleOptionSelect(questions[currentQuestion].id, idx)}
                      >
                        <div style={{
                          ...styles.optionRadio,
                          background: selectedAnswers[questions[currentQuestion].id] === idx ? 'var(--accent-primary)' : 'transparent',
                          border: selectedAnswers[questions[currentQuestion].id] === idx ? 'none' : '1px solid var(--text-muted)'
                        }}></div>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.navigationButtons}>
                  <button 
                    className="btn-secondary" 
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    style={{ opacity: currentQuestion === 0 ? 0.5 : 1, cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    Previous
                  </button>
                  
                  {currentQuestion < questions.length - 1 ? (
                    <button className="btn-primary" onClick={() => setCurrentQuestion(prev => prev + 1)}>
                      Next
                    </button>
                  ) : (
                    <button className="btn-primary" onClick={calculateScore}>
                      Submit Test
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div style={styles.resultView} className="animate-fade-in-up">
                <h2>Test Completed! 🎉</h2>
                <div style={styles.scoreCircle}>
                  <span style={styles.scoreText}>{score}/{questions.length}</span>
                </div>
                <p style={{marginBottom: '20px', color: 'var(--text-muted)'}}>
                  Your performance on this sample mock test indicates a combined percentage that would contribute to your KCET Rank calculation.
                </p>
                <div style={{display: 'flex', gap: '16px'}}>
                  <button className="btn-primary" onClick={resetTest}>Retake Test</button>
                  <Link href="/kcet">
                    <button className="btn-secondary">Back to Predictor</button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Previous Papers */}
          <div style={styles.sidebarSection} className="glass-panel">
            <h3 style={styles.sidebarTitle}>📚 Previous 5 Years Papers</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px'}}>
              Practice with actual KCET question papers from 2021 to 2025.
            </p>
            
            <ul style={styles.papersList}>
              {previousPapers.map((paper, i) => (
                <li key={i} style={styles.paperItem}>
                  <span>KCET {paper.year} Question Paper (PCM)</span>
                  <a href={paper.link} style={styles.downloadBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15V3M12 15L8 11M12 15L16 11M21 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <div style={{marginTop: '30px', padding: '16px', background: 'rgba(0, 245, 212, 0.1)', borderRadius: '12px'}}>
              <h4 style={{color: 'var(--accent-secondary)', marginBottom: '8px'}}>Why solve past papers?</h4>
              <p style={{fontSize: '0.85rem', lineHeight: '1.5'}}>
                KCET is known for repeating specific concept frameworks, especially in Calculus and Optics. Solving these papers increases your familiarity with the time constraint and difficulty level.
              </p>
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
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    padding: '40px 0',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '12px',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
  },
  container: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  testSection: {
    flex: '2',
    minWidth: '400px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  progressContainer: {
    marginBottom: '30px',
  },
  progressText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: '600',
  },
  progressBar: {
    height: '6px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))',
    transition: 'width 0.4s ease',
  },
  questionBox: {
    marginBottom: '40px',
  },
  subjectBadge: {
    display: 'inline-block',
    background: 'rgba(123, 44, 191, 0.2)',
    color: 'var(--accent-primary)',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  questionText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    lineHeight: '1.5',
    marginBottom: '24px',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  optionItem: {
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'var(--transition)',
    fontSize: '1.05rem',
  },
  optionRadio: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  sidebarSection: {
    flex: '1',
    minWidth: '300px',
    padding: '30px',
  },
  sidebarTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '12px',
    borderBottom: '1px solid var(--glass-border)',
    paddingBottom: '16px',
  },
  papersList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  paperItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  downloadBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent-secondary)',
    transition: 'var(--transition)',
  },
  resultView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px 0',
  },
  scoreCircle: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(123, 44, 191, 0.1)',
    border: '4px solid var(--accent-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0',
    boxShadow: '0 0 30px rgba(123, 44, 191, 0.3)',
  },
  scoreText: {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'var(--accent-secondary)',
  }
};
