'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');

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
          .select('score, total_marks, paper_id, paper_name, time_taken_seconds, created_at');

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
          .select('paper_id, paper_name, score, total_marks, time_taken_seconds, created_at')
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
      <main style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Live test attempt tracking via Supabase</p>

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
      </main>
    </>
  );
}
