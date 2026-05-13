'use client';

import { useState } from 'react';

export default function AdReveal({ label = 'Unlock', adTitle = 'Supporter note', adText = 'Thanks for supporting free study tools on PrepMaster.', onReveal, disabled, children }) {
  const [stage, setStage] = useState('locked');

  async function reveal() {
    setStage('revealed');
    if (onReveal) await onReveal();
  }

  if (stage === 'revealed') return children;

  if (stage === 'ad') {
    return (
      <div style={styles.adBox} role="status">
        <div style={styles.kicker}>Sponsor</div>
        <div style={styles.adTitle}>{adTitle}</div>
        <p style={styles.adText}>{adText}</p>
        <button type="button" className="btn-primary" onClick={reveal} disabled={disabled} style={styles.button}>
          Continue
        </button>
      </div>
    );
  }

  return (
    <button type="button" className="btn-secondary" onClick={() => setStage('ad')} disabled={disabled} style={styles.button}>
      {label}
    </button>
  );
}

const styles = {
  button: {
    padding: '9px 14px',
    fontSize: '0.84rem',
  },
  adBox: {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid var(--surface-border-strong)',
    background: 'var(--surface-soft)',
    color: 'var(--text-main)',
    marginTop: '10px',
  },
  kicker: {
    display: 'inline-flex',
    padding: '2px 8px',
    borderRadius: '999px',
    background: 'var(--surface-highlight)',
    color: 'var(--accent-secondary)',
    fontSize: '0.68rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  adTitle: {
    fontWeight: 800,
    marginBottom: '4px',
  },
  adText: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    lineHeight: 1.5,
    marginBottom: '10px',
  },
};
