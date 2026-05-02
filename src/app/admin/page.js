'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
const VALID_SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'];

// ── Upload Paper Panel ────────────────────────────────────
function UploadPaperPanel({ password }) {
  const [jsonText, setJsonText]     = useState('');
  const [parsed, setParsed]         = useState(null);   // null | { papers: [], error: string }
  const [submitStatus, setSubmit]   = useState('');     // '' | 'loading' | 'ok' | error string
  const fileRef = useRef(null);

  function parsePapers(text) {
    try {
      const raw = JSON.parse(text.trim());
      const papers = Array.isArray(raw) ? raw : [raw];
      const errors = [];

      papers.forEach((p, pi) => {
        if (!p.paperId) errors.push(`Paper ${pi + 1}: missing paperId`);
        if (!Array.isArray(p.questions) || p.questions.length === 0)
          errors.push(`Paper ${pi + 1}: questions must be a non-empty array`);
        else {
          p.questions.forEach((q, qi) => {
            if (!q.text) errors.push(`Paper ${pi + 1} Q${qi + 1}: missing text`);
            if (!Array.isArray(q.options) || q.options.length < 2)
              errors.push(`Paper ${pi + 1} Q${qi + 1}: need at least 2 options`);
            if (!VALID_SUBJECTS.includes(q.subject))
              errors.push(`Paper ${pi + 1} Q${qi + 1}: invalid subject "${q.subject}"`);
          });
        }
      });

      setParsed({ papers, error: errors.length ? errors.slice(0, 3).join(' · ') : null });
    } catch (e) {
      setParsed({ papers: [], error: `Invalid JSON: ${e.message}` });
    }
    setSubmit('');
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target.result;
      setJsonText(text);
      parsePapers(text);
    };
    reader.readAsText(file);
  }

  function handleTextChange(e) {
    setJsonText(e.target.value);
    setParsed(null);
    setSubmit('');
  }

  async function handleSubmit() {
    if (!parsed || parsed.error || parsed.papers.length === 0) return;
    setSubmit('loading');

    let lastError = '';
    let successCount = 0;

    for (const paper of parsed.papers) {
      try {
        const isDaily = Number(paper.paperId) >= 20260000;
        let res;

        if (isDaily) {
          // Convert paperId like 20260502 → "2026-05-02"
          const pid = String(paper.paperId);
          const date = `${pid.slice(0, 4)}-${pid.slice(4, 6)}-${pid.slice(6, 8)}`;
          const questions = paper.questions.map((q) => ({
            id:          q.id,
            subject:     q.subject,
            text:        q.text,
            options:     q.options,
            correct:     q.correct,
            explanation: q.explanation ?? q.solution ?? '',
          }));
          res = await fetch('/api/daily-quest', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, date, questions }),
          });
        } else {
          res = await fetch('/api/bitsat-paper', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, ...paper }),
          });
        }

        const data = await res.json();
        if (!res.ok) { lastError = data.error || 'Upload failed'; break; }
        successCount++;
      } catch (e) {
        lastError = e.message;
        break;
      }
    }

    setSubmit(lastError || `ok:${successCount}`);
  }

  const hasValidParse = parsed && !parsed.error && parsed.papers.length > 0;
  const totalQs = hasValidParse ? parsed.papers.reduce((s, p) => s + p.questions.length, 0) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={S.card}>
        <h2 style={S.cardTitle}>Upload Mock Paper</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Paste JSON directly or upload a <code>.json</code> file. Accepts a single paper object or an array.
          Papers with <code>paperId &ge; 20260000</code> go into <strong>daily_quest</strong>;
          others go into <strong>bitsat_papers</strong>.
        </p>

        {/* File picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <button className="btn-secondary" style={{ fontSize: '0.88rem', padding: '8px 16px' }}
            onClick={() => fileRef.current?.click()}>
            📂 Choose JSON file
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>or paste below</span>
          <input ref={fileRef} type="file" accept=".json,application/json"
            style={{ display: 'none' }} onChange={handleFile} />
        </div>

        {/* Textarea */}
        <textarea
          value={jsonText}
          onChange={handleTextChange}
          placeholder={`{\n  "paperId": 1,\n  "title": "BITSAT Mock Test 1",\n  "durationMinutes": 180,\n  "questions": [\n    {\n      "id": "q1", "subject": "Physics",\n      "text": "Question text...",\n      "options": ["A","B","C","D"],\n      "correct": 0\n    }\n  ]\n}`}
          rows={14}
          style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.84rem', padding: '12px',
            borderRadius: '10px', border: '1px solid var(--surface-border-strong)',
            background: 'var(--glass-bg)', color: 'var(--text-main)', resize: 'vertical',
            boxSizing: 'border-box' }}
        />

        {/* Parse button */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            onClick={() => jsonText.trim() && parsePapers(jsonText)}>
            Validate JSON
          </button>
          {parsed && (
            parsed.error
              ? <span style={{ color: '#c0392b', fontSize: '0.85rem' }}>✗ {parsed.error}</span>
              : <span style={{ color: '#27ae60', fontSize: '0.85rem' }}>
                  ✓ {parsed.papers.length} paper{parsed.papers.length !== 1 ? 's' : ''}, {totalQs} questions — ready to upload
                </span>
          )}
        </div>
      </div>

      {/* Preview table */}
      {hasValidParse && (
        <div style={S.card}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Preview</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--surface-border-strong)', textAlign: 'left' }}>
                  {['Paper ID','Title','Duration','Questions','Collection'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', color: 'var(--text-muted)', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.papers.map((p, i) => {
                  const isDaily = Number(p.paperId) >= 20260000;
                  const subjectCounts = {};
                  (p.questions || []).forEach(q => {
                    subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
                  });
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 700 }}>{p.paperId}</td>
                      <td style={{ padding: '8px 12px' }}>{p.title || `Paper ${p.paperId}`}</td>
                      <td style={{ padding: '8px 12px' }}>{p.durationMinutes ?? (isDaily ? 35 : 180)} min</td>
                      <td style={{ padding: '8px 12px' }}>
                        {p.questions.length}
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>
                          {Object.entries(subjectCounts).map(([s, n]) => `${s.slice(0,3)} ${n}`).join(' · ')}
                        </span>
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700,
                          background: isDaily ? 'rgba(90,160,90,0.15)' : 'rgba(90,122,149,0.15)',
                          color: isDaily ? '#4a9e4a' : 'var(--accent-secondary)' }}>
                          {isDaily ? 'daily_quest' : 'bitsat_papers'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Upload button */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="btn-primary"
              disabled={submitStatus === 'loading'}
              onClick={handleSubmit}
              style={{ padding: '10px 28px', opacity: submitStatus === 'loading' ? 0.7 : 1 }}>
              {submitStatus === 'loading' ? 'Uploading…' : `Upload ${parsed.papers.length > 1 ? `${parsed.papers.length} Papers` : 'Paper'} →`}
            </button>
            {submitStatus && submitStatus !== 'loading' && (
              submitStatus.startsWith('ok:')
                ? <span style={{ color: '#27ae60', fontWeight: 600 }}>
                    ✓ {submitStatus.replace('ok:', '')} paper{submitStatus !== 'ok:1' ? 's' : ''} saved to MongoDB
                  </span>
                : <span style={{ color: '#c0392b' }}>✗ {submitStatus}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const S = {
  card: {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '16px',
    padding: '24px',
    backdropFilter: 'blur(16px)',
  },
  cardTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'upload'
  const [stats, setStats] = useState(null);
  const [byPaper, setByPaper] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setLoading(true);
      setError('');
      setAuthed(true);
    } else {
      setPwError('Incorrect password.');
    }
  }

  useEffect(() => {
    if (!authed) return;

    async function fetchData() {
      try {
        // Overall stats
        const { data: allRows, error: e1 } = await supabase
          .from('test_attempts')
          .select('score, total_marks, paper_id, paper_name, candidate_name, time_taken_seconds, created_at');

        if (e1) throw e1;

        const total = allRows.length;
        const avgScore = total
          ? (allRows.reduce((s, r) => s + r.score, 0) / total).toFixed(1)
          : 0;
        const avgPct = total
          ? (allRows.reduce((s, r) => s + (r.score / r.total_marks) * 100, 0) / total).toFixed(1)
          : 0;

        // By paper
        const paperMap = {};
        for (const r of allRows) {
          const key = r.paper_id;
          if (!paperMap[key]) paperMap[key] = { paperId: key, paperName: r.paper_name, count: 0, totalScore: 0, totalMax: 0 };
          paperMap[key].count++;
          paperMap[key].totalScore += r.score;
          paperMap[key].totalMax += r.total_marks;
        }
        const papers = Object.values(paperMap).sort((a, b) => b.count - a.count);

        // Recent 20
        const { data: recentRows, error: e2 } = await supabase
          .from('test_attempts')
          .select('paper_id, paper_name, candidate_name, score, total_marks, time_taken_seconds, created_at')
          .order('created_at', { ascending: false })
          .limit(20);

        if (e2) throw e2;

        setStats({ total, avgScore, avgPct });
        setByPaper(papers);
        setRecent(recentRows);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authed]);

  if (!authed) {
    return (
      <>
        <Navbar />
        <main style={{ padding: '60px 24px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Admin Login</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', background: 'var(--card-bg)', color: 'var(--text)' }}
            />
            {pwError && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{pwError}</p>}
            <button type="submit" className="btn-primary">Login</button>
          </form>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '40px 24px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage test attempts and upload papers to MongoDB</p>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[['stats', '📊 Stats'], ['upload', '📤 Upload Paper']].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={activeTab === id ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'upload' && <UploadPaperPanel password={pw} />}

        {activeTab === 'stats' && (
          <>
            {loading && <p style={{ color: 'var(--text-muted)' }}>Loading data...</p>}
            {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}

            {stats && (
              <>
            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Total Attempts', value: stats.total },
                { label: 'Avg Score', value: stats.avgScore },
                { label: 'Avg Percentage', value: `${stats.avgPct}%` },
              ].map(card => (
                <div key={card.label} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>{card.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* By Paper */}
            <h2 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Attempts by Paper</h2>
            <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px' }}>Paper</th>
                    <th style={{ padding: '8px 12px' }}>Attempts</th>
                    <th style={{ padding: '8px 12px' }}>Avg Score</th>
                    <th style={{ padding: '8px 12px' }}>Avg %</th>
                  </tr>
                </thead>
                <tbody>
                  {byPaper.map(p => (
                    <tr key={p.paperId} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '8px 12px' }}>{p.paperName || `Paper ${p.paperId}`}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>{p.count}</td>
                      <td style={{ padding: '8px 12px' }}>{(p.totalScore / p.count).toFixed(1)}</td>
                      <td style={{ padding: '8px 12px' }}>{((p.totalScore / p.totalMax) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Attempts */}
            <h2 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Recent 20 Attempts</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px' }}>Name</th>
                    <th style={{ padding: '8px 12px' }}>Paper</th>
                    <th style={{ padding: '8px 12px' }}>Score</th>
                    <th style={{ padding: '8px 12px' }}>%</th>
                    <th style={{ padding: '8px 12px' }}>Time</th>
                    <th style={{ padding: '8px 12px' }}>When</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>{r.candidate_name || 'Anonymous'}</td>
                      <td style={{ padding: '8px 12px' }}>{r.paper_name || `Paper ${r.paper_id}`}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>{r.score}/{r.total_marks}</td>
                      <td style={{ padding: '8px 12px' }}>{((r.score / r.total_marks) * 100).toFixed(1)}%</td>
                      <td style={{ padding: '8px 12px' }}>
                        {r.time_taken_seconds ? `${Math.floor(r.time_taken_seconds / 60)}m ${r.time_taken_seconds % 60}s` : '—'}
                      </td>
                      <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>
                        {new Date(r.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
          </>
        )}
      </main>
    </>
  );
}
