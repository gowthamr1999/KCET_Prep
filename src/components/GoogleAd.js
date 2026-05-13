'use client';

import { useEffect } from 'react';

export default function GoogleAd({ slot, format = 'auto', responsive = true, style, className }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;

  useEffect(() => {
    if (!client || !adSlot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed script loading can throw; the page should continue normally.
    }
  }, [client, adSlot]);

  if (!client || !adSlot) return null;

  return (
    <div className={className} style={{ ...styles.shell, ...style }}>
      <div style={styles.label}>Advertisement</div>
      <ins
        className="adsbygoogle"
        style={styles.adUnit}
        data-ad-client={client}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

const styles = {
  shell: {
    width: '100%',
    minHeight: '120px',
    margin: '16px 0',
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid var(--surface-border)',
    background: 'var(--surface-soft)',
    overflow: 'hidden',
  },
  label: {
    color: 'var(--text-muted)',
    fontSize: '0.68rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
    textAlign: 'center',
  },
  adUnit: {
    display: 'block',
    minHeight: '90px',
  },
};
