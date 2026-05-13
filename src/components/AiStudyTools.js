'use client';

import { useState } from 'react';
import AdReveal from './AdReveal';
import GoogleAd from './GoogleAd';

function optionLabel(index) {
  return typeof index === 'number' && index >= 0 ? String.fromCharCode(65 + index) : '';
}

async function readJson(response, fallback) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || fallback);
  return data;
}

export function AiQuestionHelp({
  examType,
  question,
  label = 'AI answer',
  adText = 'AI explanations are study aids. Review the official solution or textbook when an answer matters.',
  onHelpOpened,
  invalidated = false,
}) {
  const [help, setHelp] = useState(null);
  const [status, setStatus] = useState('');

  async function loadHelp() {
    if (help || status === 'loading') return;
    try {
      if (onHelpOpened) onHelpOpened(question?.id);
      setStatus('loading');
      const data = await readJson(await fetch('/api/ai-question-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examType, question }),
      }), 'Unable to generate answer help.');
      setHelp(data.help);
      setStatus('');
    } catch (err) {
      setStatus(err.message || 'Unable to generate answer help.');
    }
  }

  return (
    <div style={styles.questionTool}>
      <AdReveal
        label={label}
        adTitle="Supporter note"
        adText={adText}
        onReveal={loadHelp}
      >
        {invalidated && (
          <p style={styles.invalidatedNote}>This question is AI-assisted and excluded from scoring.</p>
        )}
        {status === 'loading' && <p style={styles.muted}>Generating explanation...</p>}
        {status && status !== 'loading' && <p style={styles.error}>{status}</p>}
        {help && (
          <div style={styles.aiBox}>
            <div style={styles.aiTitle}>AI Answer: {help.answerLabel || optionLabel(question.correct)}</div>
            {help.answerText && <p style={styles.answerText}>{help.answerText}</p>}
            <p style={styles.bodyText}>{help.explanation}</p>
            {help.shortcut && <p style={styles.muted}><strong>Shortcut:</strong> {help.shortcut}</p>}
            {help.commonMistake && <p style={styles.muted}><strong>Watch out:</strong> {help.commonMistake}</p>}
          </div>
        )}
      </AdReveal>
    </div>
  );
}

export function AiPerformancePanel({ payload }) {
  const [analysis, setAnalysis] = useState(null);
  const [paper, setPaper] = useState(null);
  const [status, setStatus] = useState('');
  const [paperStatus, setPaperStatus] = useState('');

  async function loadAnalysis() {
    if (analysis || status === 'loading') return;
    try {
      setStatus('loading');
      const data = await readJson(await fetch('/api/ai-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }), 'Unable to analyze performance.');
      setAnalysis(data.analysis);
      setStatus('');
    } catch (err) {
      setStatus(err.message || 'Unable to analyze performance.');
    }
  }

  async function generatePaper() {
    if (paper || paperStatus === 'loading') return;
    try {
      setPaperStatus('loading');
      const weakSubjects = [...(payload.sectionStats || [])]
        .sort((a, b) => (a.pct || 0) - (b.pct || 0))
        .slice(0, 3)
        .map((item) => item.sec);
      const data = await readJson(await fetch('/api/ai-question-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, weakSubjects, desiredCount: 10 }),
      }), 'Unable to generate practice paper.');
      setPaper(data.paper);
      setPaperStatus('');
    } catch (err) {
      setPaperStatus(err.message || 'Unable to generate practice paper.');
    }
  }

  return (
    <aside aria-label="AI study tools" className="ai-study-side-panel" style={styles.sidePanel}>
      <div style={styles.panelHeader}>
        <div style={styles.kicker}>AI Coach</div>
        <h2 style={styles.panelTitle}>Understand where you stand</h2>
        <p style={styles.panelCopy}>Open after results for a focused read on strengths, weak areas, and what to practice next.</p>
      </div>

      <GoogleAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR} />

      <AdReveal
        label="Analyze my performance"
        adTitle="Supporter note"
        adText="This AI coach is available because PrepMaster is supported by responsible sponsorships and ads."
        onReveal={loadAnalysis}
      >
        {status === 'loading' && <p style={styles.muted}>Analyzing your attempt...</p>}
        {status && status !== 'loading' && <p style={styles.error}>{status}</p>}
        {analysis && (
          <div style={styles.stack}>
            <div style={styles.aiTitle}>{analysis.standing}</div>
            <p style={styles.bodyText}>{analysis.summary}</p>
            <List title="Strengths" items={analysis.strengths} />
            <List title="Improve next" items={analysis.weaknesses} />
            <List title="Next steps" items={analysis.nextSteps} />
            {analysis.timeStrategy && <p style={styles.muted}><strong>Time strategy:</strong> {analysis.timeStrategy}</p>}
          </div>
        )}
      </AdReveal>

      <div style={styles.divider} />

      <AdReveal
        label="Generate practice paper"
        adTitle="Supporter note"
        adText="Use the generated paper as practice, then verify important concepts from your textbook or teacher."
        onReveal={generatePaper}
      >
        {paperStatus === 'loading' && <p style={styles.muted}>Creating fresh questions...</p>}
        {paperStatus && paperStatus !== 'loading' && <p style={styles.error}>{paperStatus}</p>}
        {paper && (
          <div style={styles.stack}>
            <div style={styles.aiTitle}>{paper.title || 'AI Practice Paper'}</div>
            <p style={styles.muted}>{paper.durationMinutes || 30} min · {paper.questions?.length || 0} questions</p>
            <div style={styles.paperList}>
              {(paper.questions || []).map((q, index) => (
                <details key={`${q.subject}-${index}`} style={styles.practiceItem}>
                  <summary style={styles.practiceSummary}>Q{index + 1}. {q.subject || 'General'}</summary>
                  <p style={styles.bodyText}>{q.text}</p>
                  <ol type="A" style={styles.optionList}>
                    {(q.options || []).map((option) => <li key={option}>{option}</li>)}
                  </ol>
                  <p style={styles.muted}><strong>Answer:</strong> {optionLabel(q.correct)}. {q.explanation}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </AdReveal>
    </aside>
  );
}

function List({ title, items }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <div>
      <div style={styles.listTitle}>{title}</div>
      <ul style={styles.list}>
        {items.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

const styles = {
  sidePanel: {
    width: 'min(310px, 100%)',
    flexShrink: 0,
    position: 'sticky',
    top: '84px',
    alignSelf: 'flex-start',
    margin: 0,
    padding: '18px',
    borderRadius: '18px',
    border: '1px solid var(--surface-border-strong)',
    background: 'var(--glass-bg)',
    boxShadow: 'var(--glass-shadow)',
    maxHeight: 'calc(100vh - 104px)',
    overflowY: 'auto',
  },
  panelHeader: {
    marginBottom: '14px',
  },
  kicker: {
    color: 'var(--accent-secondary)',
    fontWeight: 800,
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '6px',
  },
  panelTitle: {
    fontSize: '1.05rem',
    lineHeight: 1.25,
    marginBottom: '6px',
  },
  panelCopy: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    lineHeight: 1.5,
  },
  questionTool: {
    marginTop: '12px',
  },
  aiBox: {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid var(--surface-border)',
    background: 'var(--surface-soft)',
  },
  aiTitle: {
    color: 'var(--text-main)',
    fontWeight: 800,
    marginBottom: '8px',
    lineHeight: 1.35,
  },
  answerText: {
    color: 'var(--accent-secondary)',
    fontWeight: 700,
    marginBottom: '8px',
  },
  bodyText: {
    color: 'var(--text-main)',
    fontSize: '0.86rem',
    lineHeight: 1.6,
    marginBottom: '8px',
  },
  muted: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    lineHeight: 1.55,
  },
  error: {
    color: '#a77f85',
    fontSize: '0.82rem',
    lineHeight: 1.5,
  },
  invalidatedNote: {
    color: '#8a7248',
    fontSize: '0.82rem',
    fontWeight: 800,
    lineHeight: 1.45,
    marginBottom: '8px',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  divider: {
    height: '1px',
    background: 'var(--surface-border)',
    margin: '16px 0',
  },
  listTitle: {
    fontSize: '0.76rem',
    fontWeight: 800,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingLeft: '18px',
    listStyle: 'disc',
    color: 'var(--text-main)',
    fontSize: '0.84rem',
    lineHeight: 1.45,
  },
  paperList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  practiceItem: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid var(--surface-border)',
    background: 'var(--surface-soft)',
  },
  practiceSummary: {
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '0.84rem',
  },
  optionList: {
    paddingLeft: '22px',
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    lineHeight: 1.55,
    marginBottom: '8px',
  },
};
