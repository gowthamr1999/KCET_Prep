'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { allBitsatPapers, bitsatDailyPapers, bitsatSubjectWisePapers } from '@/data/bitsatQuestions';

function createRoomId(paperId) {
  const randomPart = Math.random().toString(36).slice(2, 8);
  const timePart = Date.now().toString(36).slice(-6);
  return `bitsat-${paperId}-${timePart}-${randomPart}`.toLowerCase();
}

function getPaperHref(paper) {
  return `/bitsat/tests/${paper.slug || paper.id}`;
}

const styles = {
  main: { padding: '20px 40px 60px', maxWidth: '960px', margin: '0 auto' },
  panel: { padding: '30px', marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', fontWeight: 800 },
  fixedField: {
    width: '100%',
    padding: '13px 14px',
    borderRadius: '10px',
    border: '1px solid var(--surface-border)',
    background: 'rgba(110,118,129,0.12)',
    color: 'var(--text-muted)',
    font: 'inherit',
    fontWeight: 700,
  },
  select: {
    width: '100%',
    padding: '13px 14px',
    borderRadius: '10px',
    border: '1px solid var(--surface-border-strong)',
    background: 'var(--surface-soft)',
    color: 'var(--text-main)',
    font: 'inherit',
  },
  resultBox: { padding: '18px', borderRadius: '10px', border: '1px solid rgba(156,180,171,0.28)', background: 'rgba(156,180,171,0.09)' },
  linkBox: { padding: '12px 14px', borderRadius: '8px', background: 'var(--surface-soft)', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', overflowWrap: 'anywhere', fontSize: '0.84rem' },
  stepGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' },
  step: { padding: '16px', borderRadius: '10px', background: 'var(--surface-soft)', border: '1px solid var(--surface-border)' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginTop: '18px' },
  feature: { padding: '16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)' },
};

export default function RoomsPage() {
  const paperOptions = useMemo(() => [
    {
      group: 'Daily Practice',
      papers: bitsatDailyPapers.map((paper) => ({
        id: paper.slug,
        label: paper.title,
        detail: `${paper.questions} questions · ${paper.duration}`,
        href: getPaperHref(paper),
      })),
    },
    {
      group: 'Full-Length Papers',
      papers: allBitsatPapers.map((paper) => ({
        id: paper.id,
        label: paper.title,
        detail: `${paper.questions} questions · ${paper.duration}`,
        href: getPaperHref(paper),
      })),
    },
    {
      group: 'Subject-wise Tests',
      papers: bitsatSubjectWisePapers.map((paper) => ({
        id: paper.slug,
        label: paper.title,
        detail: `${paper.questions} questions · ${paper.duration}`,
        href: getPaperHref(paper),
      })),
    },
  ], []);

  const flatPapers = paperOptions.flatMap((group) => group.papers);
  const [selectedPaperId, setSelectedPaperId] = useState(String(flatPapers[0]?.id || ''));
  const [roomLink, setRoomLink] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const selectedPaper = flatPapers.find((paper) => String(paper.id) === selectedPaperId) || flatPapers[0];

  function createRoom() {
    if (!selectedPaper || typeof window === 'undefined') return;

    const roomId = createRoomId(selectedPaper.id);
    const url = new URL(selectedPaper.href, window.location.origin);
    url.searchParams.set('room', roomId);
    setRoomLink(url.toString());
    setCopyStatus('');
  }

  async function copyRoomLink() {
    if (!roomLink) return;

    try {
      await navigator.clipboard.writeText(roomLink);
      setCopyStatus('Room link copied.');
    } catch {
      setCopyStatus('Copy failed. You can select the link manually.');
    }
  }

  return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/" style={{ color: 'var(--accent-secondary)', textDecoration: 'none', fontSize: '0.84rem' }}>Home</Link>
          <span aria-hidden="true" style={{ color: 'var(--text-muted)', margin: '0 8px' }}>›</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>Create Room</span>
        </nav>

        <header style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 800 }}>
            Beat My Score Room
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '10px' }}>
            Create a shared test room
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '720px' }}>
            Pick a BITSAT paper, generate a room link, and send it to friends. Everyone takes the exact same test and appears on one private scoreboard for that room.
          </p>
        </header>

        <section className="glass-panel" style={styles.panel} aria-labelledby="room-feature-heading">
          <h2 id="room-feature-heading" style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Why create a room?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
            Normal leaderboards mix everyone together. A room is for your group: classmates, coaching friends, or a quick weekend challenge. Share the link, let everyone attempt at their own time, then compare score and time taken in one place.
          </p>
          <div style={styles.featureGrid}>
            {[
              ['Same paper', 'No confusion about difficulty. Everyone gets the selected BITSAT paper.'],
              ['Private link', 'Only people with the room link join that room scoreboard.'],
              ['Instant ranking', 'After submit, scores are sorted by marks and then time taken.'],
            ].map(([title, text]) => (
              <div key={title} style={styles.feature}>
                <div style={{ fontWeight: 800, marginBottom: '6px' }}>{title}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel" style={styles.panel} aria-labelledby="create-room-heading">
          <h2 id="create-room-heading" style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px' }}>Room Setup</h2>

          <div style={{ display: 'grid', gap: '18px' }}>
            <div>
              <label htmlFor="room-exam" style={styles.label}>Exam</label>
              <div id="room-exam" role="textbox" aria-readonly="true" style={styles.fixedField}>
                BITSAT
              </div>
            </div>

            <div>
              <label htmlFor="room-paper" style={styles.label}>Paper</label>
              <select
                id="room-paper"
                className="room-select"
                value={selectedPaperId}
                onChange={(event) => {
                  setSelectedPaperId(event.target.value);
                  setRoomLink('');
                  setCopyStatus('');
                }}
                style={styles.select}
              >
                {paperOptions.map((group) => (
                  <optgroup key={group.group} label={group.group}>
                    {group.papers.map((paper) => (
                      <option key={paper.id} value={String(paper.id)}>
                        {paper.label} · {paper.detail}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <button type="button" className="btn-primary" onClick={createRoom} style={{ justifySelf: 'start' }}>
              Create Room Link
            </button>
          </div>
        </section>

        {roomLink && (
          <section className="glass-panel" style={styles.panel} aria-labelledby="room-ready-heading">
            <h2 id="room-ready-heading" style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>Room Ready</h2>
            <div style={styles.resultBox}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800, marginBottom: '8px' }}>
                Share this link
              </div>
              <div style={styles.linkBox}>{roomLink}</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
                <button type="button" className="btn-primary" onClick={copyRoomLink}>Copy Link</button>
                <Link href={roomLink.replace(/^https?:\/\/[^/]+/, '')}>
                  <button type="button" className="btn-secondary">Open Room Test</button>
                </Link>
              </div>
              {copyStatus && <p style={{ color: '#9cb4ab', fontSize: '0.84rem', marginTop: '10px' }}>{copyStatus}</p>}
            </div>
          </section>
        )}

        <section className="glass-panel" style={styles.panel} aria-labelledby="room-how-heading">
          <h2 id="room-how-heading" style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>How It Works</h2>
          <div style={styles.stepGrid}>
            {[
              ['1', 'Create a room', 'Choose BITSAT and the exact paper you want everyone to take.'],
              ['2', 'Share the link', 'Send the generated room link to your friends.'],
              ['3', 'Compare scores', 'After each submit, the room scoreboard updates for that test.'],
            ].map(([n, title, text]) => (
              <div key={n} style={styles.step}>
                <div style={{ fontWeight: 900, color: '#b5a98a', marginBottom: '8px' }}>{n}</div>
                <div style={{ fontWeight: 800, marginBottom: '6px' }}>{title}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
