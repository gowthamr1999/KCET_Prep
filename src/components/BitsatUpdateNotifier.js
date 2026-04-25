'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { bitsatQuestionsLastUpdated } from '@/data/bitsatQuestions';

const SEEN_UPDATE_KEY = 'prepmaster_bitsat_seen_update';
const NOTIFIED_UPDATE_KEY = 'prepmaster_bitsat_notified_update';
const NOTIFICATIONS_ENABLED_KEY = 'prepmaster_bitsat_notifications_enabled';

export default function BitsatUpdateNotifier() {
  const [noticeState, setNoticeState] = useState({
    visible: false,
    permission: 'default',
    notificationsEnabled: false,
  });

  const formattedLastUpdated = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date(bitsatQuestionsLastUpdated));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedPermission = 'Notification' in window ? Notification.permission : 'unsupported';
    const enabled = window.localStorage.getItem(NOTIFICATIONS_ENABLED_KEY) === 'true';
    const seenUpdate = window.localStorage.getItem(SEEN_UPDATE_KEY);
    const notifiedUpdate = window.localStorage.getItem(NOTIFIED_UPDATE_KEY);
    const hasNewQuestions = seenUpdate !== bitsatQuestionsLastUpdated;

    window.setTimeout(() => {
      setNoticeState({
        visible: hasNewQuestions,
        permission: storedPermission,
        notificationsEnabled: enabled,
      });
    }, 0);

    if (
      hasNewQuestions &&
      enabled &&
      storedPermission === 'granted' &&
      notifiedUpdate !== bitsatQuestionsLastUpdated
    ) {
      new Notification('BITSAT questions updated', {
        body: `Fresh practice questions are ready. Updated ${formattedLastUpdated} IST.`,
      });
      window.localStorage.setItem(NOTIFIED_UPDATE_KEY, bitsatQuestionsLastUpdated);
    }
  }, [formattedLastUpdated]);

  function dismissUpdate() {
    window.localStorage.setItem(SEEN_UPDATE_KEY, bitsatQuestionsLastUpdated);
    setNoticeState((current) => ({ ...current, visible: false }));
  }

  async function enableNotifications() {
    if (!('Notification' in window)) {
      setNoticeState((current) => ({ ...current, permission: 'unsupported' }));
      return;
    }

    const result = await Notification.requestPermission();
    setNoticeState((current) => ({ ...current, permission: result }));

    if (result === 'granted') {
      window.localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'true');
      window.localStorage.setItem(NOTIFIED_UPDATE_KEY, bitsatQuestionsLastUpdated);
      setNoticeState((current) => ({ ...current, notificationsEnabled: true }));
      new Notification('BITSAT daily reminders enabled', {
        body: 'You will be notified in this browser when new BITSAT questions are available.',
      });
    }
  }

  if (!noticeState.visible) return null;

  const canAskForNotifications = noticeState.permission === 'default';
  const deniedNotifications = noticeState.permission === 'denied';
  const showEnableButton = !noticeState.notificationsEnabled && canAskForNotifications;

  return (
    <aside aria-live="polite" style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.copy}>
          <div style={styles.title}>BITSAT questions updated</div>
          <p style={styles.text}>
            Fresh daily practice is ready. Last updated {formattedLastUpdated} IST.
          </p>
          {deniedNotifications && (
            <p style={styles.hint}>
              Browser notifications are blocked. You can still use the in-app reminder here.
            </p>
          )}
        </div>
        <div style={styles.actions}>
          <Link href="/bitsat/tests" onClick={dismissUpdate} style={styles.primary}>
            Practice now
          </Link>
          {showEnableButton && (
            <button type="button" onClick={enableNotifications} style={styles.secondary}>
              Enable reminders
            </button>
          )}
          <button type="button" onClick={dismissUpdate} style={styles.dismiss} aria-label="Dismiss BITSAT update reminder">
            ×
          </button>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  wrap: {
    position: 'fixed',
    right: '18px',
    bottom: '18px',
    zIndex: 400,
    maxWidth: 'min(440px, calc(100vw - 32px))',
  },
  card: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
    background: 'var(--surface-panel)',
    boxShadow: '0 18px 60px rgba(0, 0, 0, 0.22)',
  },
  copy: {
    minWidth: 0,
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: 800,
    color: 'var(--text-main)',
    marginBottom: '4px',
  },
  text: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  },
  hint: {
    fontSize: '0.74rem',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
    marginTop: '6px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
  primary: {
    textDecoration: 'none',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 12px',
    background: 'var(--accent-secondary)',
    color: '#03150f',
    fontSize: '0.78rem',
    fontWeight: 800,
  },
  secondary: {
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
    padding: '8px 11px',
    background: 'var(--surface-card)',
    color: 'var(--text-main)',
    fontSize: '0.76rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  dismiss: {
    width: '30px',
    height: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--surface-border)',
    borderRadius: '50%',
    background: 'transparent',
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
    lineHeight: 1,
    cursor: 'pointer',
  },
};
