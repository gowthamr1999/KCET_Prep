'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { parseQuestionPaper, parseJsonPaper, saveCustomPaper, getCustomPapers, deleteCustomPaper } from '@/lib/paperParser';

// ── PDF extraction (lazy-loaded to avoid SSR issues) ──────────
async function extractTextFromPDF(file) {
  // Dynamically import pdfjs-dist only on the client
  const pdfjsLib = await import('pdfjs-dist');
  // Point to the worker bundled with next.js static assets
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join('\n');
    fullText += pageText + '\n';
  }
  return fullText;
}

// ── Exam config ───────────────────────────────────────────────
const EXAM_CONFIGS = {
  KCET: {
    label: 'KCET',
    color: '#00f5d4',
    sections: ['Physics', 'Chemistry', 'Mathematics'],
    correctMarks: 1,
    wrongMarks: 0,
    duration: 180,
    icon: '🎓',
  },
  BITSAT: {
    label: 'BITSAT',
    color: '#c77dff',
    sections: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'],
    correctMarks: 3,
    wrongMarks: -1,
    duration: 180,
    icon: '🏛️',
  },
  OTHER: {
    label: 'Other / Custom',
    color: '#fee440',
    sections: ['General'],
    correctMarks: 1,
    wrongMarks: 0,
    duration: 120,
    icon: '📄',
  },
};

const STEPS = ['upload', 'examtype', 'preview', 'done'];

export default function UploadPage() {
  const [step,        setStep]        = useState('upload');  // upload | examtype | preview | done
  const [rawText,     setRawText]     = useState('');
  const [fileName,    setFileName]    = useState('');
  const [loading,     setLoading]     = useState(false);
  const [loadError,   setLoadError]   = useState('');
  const [isJson,      setIsJson]      = useState(false);   // true when uploaded file is JSON
  const [examType,    setExamType]    = useState('KCET');
  const [paperName,   setPaperName]   = useState('');
  const [year,        setYear]        = useState('2026');
  const [parsed,      setParsed]      = useState(null);   // { questions, warnings }
  const [editQ,       setEditQ]       = useState(null);   // question being edited
  const [savedId,     setSavedId]     = useState(null);
  const [myPapers,    setMyPapers]    = useState([]);
  const [dragOver,    setDragOver]    = useState(false);
  const fileRef = useRef(null);

  useEffect(() => { setMyPapers(getCustomPapers()); }, [step]);

  // ── File handling ─────────────────────────────────────────
  async function handleFile(file) {
    if (!file) return;
    setLoadError('');
    setLoading(true);
    setFileName(file.name);
    setIsJson(false);
    try {
      const isJsonFile = file.name.endsWith('.json') || file.type === 'application/json';

      if (isJsonFile) {
        // ── JSON path: parse immediately, auto-fill examType from meta ──
        const text = await file.text();
        const { questions, warnings, meta } = parseJsonPaper(text);
        if (questions.length === 0) {
          setLoadError(
            warnings.length
              ? `JSON parsing failed: ${warnings[0]}`
              : 'No questions found in JSON. Check the format guide below.'
          );
          setLoading(false);
          return;
        }
        // Auto-detect examType from embedded meta
        const detectedType = ['KCET','BITSAT','OTHER'].includes((meta.examType || '').toUpperCase())
          ? (meta.examType || '').toUpperCase()
          : 'KCET';
        setExamType(detectedType);
        if (meta.title)  setPaperName(meta.title);
        if (meta.year)   setYear(meta.year);
        setIsJson(true);
        setParsed({ questions, warnings });
        // Skip examtype step — go directly to preview
        setStep('preview');
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const text = await extractTextFromPDF(file);
        if (!text.trim()) {
          setLoadError('The PDF appears to have no selectable text (it may be a scanned image). Please use the "Paste text" tab.');
          setLoading(false);
          return;
        }
        setRawText(text);
        setStep('examtype');
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const text = await file.text();
        setRawText(text);
        setStep('examtype');
      } else {
        setLoadError('Unsupported file type. Upload a PDF, TXT, or JSON file.');
        setLoading(false);
        return;
      }
    } catch (err) {
      setLoadError(`Failed to read file: ${err.message}`);
    }
    setLoading(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  // ── Parse & preview ───────────────────────────────────────
  function handleParse() {
    const cfg = EXAM_CONFIGS[examType];
    // For multi-section exams, pass first section label; parser will assign single subject
    const result = parseQuestionPaper(rawText, cfg.sections[0]);
    setParsed(result);
    setStep('preview');
  }

  // ── Edit a question inline ────────────────────────────────
  function saveEdit(updated) {
    setParsed(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === updated.id ? updated : q),
    }));
    setEditQ(null);
  }

  function removeQuestion(id) {
    setParsed(prev => ({ ...prev, questions: prev.questions.filter(q => q.id !== id) }));
  }

  // ── Save ──────────────────────────────────────────────────
  function handleSave() {
    const cfg = EXAM_CONFIGS[examType];
    const paper = {
      title:       paperName || `${examType} ${year} (Uploaded)`,
      examType,
      year,
      correctMarks: cfg.correctMarks,
      wrongMarks:   cfg.wrongMarks,
      duration:     cfg.duration,
      questions:    parsed.questions,
      source:       fileName,
    };
    const id = saveCustomPaper(paper);
    setSavedId(id);
    setStep('done');
  }

  const cfg = EXAM_CONFIGS[examType];

  // ─────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <main id="main-content" style={styles.main}>
        {/* Header */}
        <header style={{ marginBottom: '32px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={styles.breadcrumb}>
              <li><Link href="/" style={styles.breadLink}>Home</Link></li>
              <li aria-hidden="true" style={{ color: 'var(--text-muted)' }}>›</li>
              <li style={{ color: 'var(--text-muted)' }} aria-current="page">Upload Paper</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
            Upload a <span className="text-gradient">Question Paper</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Upload any KCET / BITSAT PDF and we'll parse it into a full mock test — complete with timer, scoring, and rank prediction.
          </p>
        </header>

        {/* Step indicator */}
        <StepBar current={step} />

        {/* ── STEP 1: Upload ─────────────────────────────── */}
        {step === 'upload' && (
          <UploadStep
            dragOver={dragOver} setDragOver={setDragOver}
            handleDrop={handleDrop} handleFile={handleFile}
            fileRef={fileRef} loading={loading} loadError={loadError}
            rawText={rawText} setRawText={setRawText}
            setFileName={setFileName} setStep={setStep}
            myPapers={myPapers} setMyPapers={setMyPapers}
            setParsed={setParsed} setExamType={setExamType} setIsJson={setIsJson}
          />
        )}

        {/* ── STEP 2: Exam type ──────────────────────────── */}
        {step === 'examtype' && (
          <section aria-labelledby="examtype-heading" className="glass-panel" style={styles.card}>
            <h2 id="examtype-heading" style={styles.cardTitle}>What type of paper is this?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              This sets the marking scheme, duration and section labels.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {Object.entries(EXAM_CONFIGS).map(([key, conf]) => (
                <button key={key} role="radio" aria-checked={examType === key}
                  onClick={() => setExamType(key)}
                  style={{
                    ...styles.examBtn,
                    border: `2px solid ${examType === key ? conf.color : 'rgba(255,255,255,0.1)'}`,
                    background: examType === key ? `${conf.color}15` : 'rgba(255,255,255,0.02)',
                    color: examType === key ? conf.color : 'var(--text-muted)',
                  }}>
                  <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{conf.icon}</span>
                  <span style={{ fontWeight: 700 }}>{conf.label}</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                    {conf.correctMarks > 0 ? `+${conf.correctMarks}` : ''}{conf.wrongMarks < 0 ? ` / ${conf.wrongMarks}` : ' / 0'} · {conf.duration} min
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              <div>
                <label htmlFor="paper-name" style={styles.label}>Paper name (optional)</label>
                <input id="paper-name" type="text" value={paperName} maxLength={80}
                  onChange={e => setPaperName(e.target.value)}
                  placeholder={`e.g. ${examType} 2025 – Karnataka`}
                  style={styles.input} />
              </div>
              <div>
                <label htmlFor="paper-year" style={styles.label}>Year</label>
                <input id="paper-year" type="number" value={year} min="2000" max="2030"
                  onChange={e => setYear(e.target.value)}
                  style={styles.input} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setStep('upload')}>← Back</button>
              <button className="btn-primary" onClick={handleParse}>Parse Questions →</button>
            </div>
          </section>
        )}

        {/* ── STEP 3: Preview & Edit ─────────────────────── */}
        {step === 'preview' && parsed && (
          <PreviewStep
            parsed={parsed} setParsed={setParsed}
            examType={examType} cfg={cfg}
            paperName={paperName} year={year}
            editQ={editQ} setEditQ={setEditQ}
            saveEdit={saveEdit} removeQuestion={removeQuestion}
            onBack={() => setStep('examtype')}
            onSave={handleSave}
          />
        )}

        {/* ── STEP 4: Done ───────────────────────────────── */}
        {step === 'done' && (
          <DoneStep examType={examType} savedId={savedId}
            onUploadAnother={() => { setStep('upload'); setRawText(''); setFileName(''); setParsed(null); setSavedId(null); }} />
        )}

        {/* My Uploaded Papers */}
        {step === 'upload' && myPapers.length > 0 && (
          <MyPapersSection papers={myPapers} onDelete={id => {
            deleteCustomPaper(id);
            setMyPapers(getCustomPapers());
          }} />
        )}
      </main>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────

function StepBar({ current }) {
  const steps = [
    { id: 'upload',   label: 'Upload' },
    { id: 'examtype', label: 'Exam Type' },
    { id: 'preview',  label: 'Review' },
    { id: 'done',     label: 'Done' },
  ];
  const curIdx = steps.findIndex(s => s.id === current);
  return (
    <nav aria-label="Upload progress steps" style={{ marginBottom: '28px' }}>
      <ol style={{ display: 'flex', gap: '0', listStyle: 'none', alignItems: 'center' }}>
        {steps.map((s, i) => {
          const done    = i < curIdx;
          const active  = i === curIdx;
          return (
            <li key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}
              aria-current={active ? 'step' : undefined}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                background: done ? '#00f5d4' : active ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
                border: `2px solid ${done ? '#00f5d4' : active ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700,
                color: done || active ? '#fff' : 'var(--text-muted)',
              }} aria-hidden="true">
                {done ? '✓' : i + 1}
              </div>
              <span style={{ marginLeft: '8px', fontSize: '0.82rem', fontWeight: active ? 700 : 500, color: active ? '#fff' : 'var(--text-muted)' }}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: '2px', margin: '0 12px', background: done ? '#00f5d4' : 'rgba(255,255,255,0.08)', borderRadius: '1px' }} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function UploadStep({ dragOver, setDragOver, handleDrop, handleFile, fileRef, loading, loadError, rawText, setRawText, setFileName, setStep, myPapers, setMyPapers, setParsed, setExamType, setIsJson }) {
  const [tab, setTab] = useState('file');  // 'file' | 'paste' | 'json'

  return (
    <div>
      {/* Tab selector */}
      <div role="tablist" aria-label="Upload method" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {[['file', '📎 Upload PDF / TXT / JSON'], ['paste', '📋 Paste Text'], ['json', '🔧 JSON Format Guide']].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} id={`tab-${id}`} aria-controls={`panel-${id}`}
            onClick={() => setTab(id)}
            style={{
              padding: '9px 20px', borderRadius: '20px', border: `1px solid ${tab === id ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.1)'}`,
              background: tab === id ? 'rgba(0,245,212,0.1)' : 'transparent',
              color: tab === id ? 'var(--accent-secondary)' : 'var(--text-muted)',
              fontWeight: tab === id ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem',
            }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'file' && (
        <div role="tabpanel" id="panel-file" aria-labelledby="tab-file">
          <div
            role="button" tabIndex={0}
            aria-label="Drop zone: drag and drop a PDF, TXT, or JSON file, or click to browse"
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && fileRef.current?.click()}
            className="glass-panel"
            style={{
              ...styles.dropzone,
              borderColor: dragOver ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.12)',
              background: dragOver ? 'rgba(0,245,212,0.05)' : 'rgba(255,255,255,0.02)',
            }}>
            <input ref={fileRef} type="file" accept=".pdf,.txt,.json,application/json" aria-hidden="true" tabIndex={-1}
              style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <div style={styles.spinner} aria-label="Loading" role="status" />
                <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Extracting text from PDF…</p>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }} aria-hidden="true">📄</div>
                <p style={{ fontWeight: 700, marginBottom: '6px' }}>Drag &amp; drop your PDF here</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>or click to browse · PDF, TXT &amp; JSON supported</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ padding: '5px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>📄 PDF</span>
                  <span style={{ padding: '5px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>📝 TXT</span>
                  <span style={{ padding: '5px 14px', borderRadius: '20px', background: 'rgba(0,245,212,0.1)', fontSize: '0.78rem', color: 'var(--accent-secondary)', border: '1px solid rgba(0,245,212,0.2)' }}>⚡ JSON (auto-parsed)</span>
                </div>
              </div>
            )}
          </div>
          {loadError && (
            <div role="alert" style={{ marginTop: '12px', padding: '12px 16px', background: 'rgba(255,90,126,0.1)', border: '1px solid rgba(255,90,126,0.3)', borderRadius: '10px', color: '#ff5a7e', fontSize: '0.85rem' }}>
              ⚠️ {loadError}
            </div>
          )}
        </div>
      )}

      {tab === 'json' && (
        <div role="tabpanel" id="panel-json" aria-labelledby="tab-json" className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>JSON Format Guide</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.6 }}>
            Upload or paste a <code style={styles.code}>.json</code> file with any of these shapes.
            The exam type, scoring, and duration are auto-detected from the file.
          </p>

          {[
            {
              label: 'Shape 1 — PrepMaster native (recommended)',
              badge: 'Full auto-detect',
              badgeColor: '#00f5d4',
              code: `{
  "title": "KCET 2025 – Karnataka",
  "examType": "KCET",
  "year": "2025",
  "questions": [
    {
      "text": "A body of mass 2 kg has KE of 25 J. Its speed is:",
      "options": ["2.5 m/s", "5 m/s", "10 m/s", "25 m/s"],
      "correct": 1,
      "subject": "Physics",
      "explanation": "KE = ½mv² → v = √(2×25/2) = 5 m/s"
    }
  ]
}`,
            },
            {
              label: 'Shape 2 — flat array',
              badge: 'Simple',
              badgeColor: '#c77dff',
              code: `[
  {
    "question": "Which noble gas has the highest boiling point?",
    "choices": ["Helium", "Neon", "Argon", "Radon"],
    "answer": "D",
    "subject": "Chemistry"
  }
]`,
            },
            {
              label: 'Shape 3 — answer as letter or number',
              badge: 'Flexible',
              badgeColor: '#fee440',
              code: `{
  "paper": [
    {
      "q": "∫x² dx from 0 to 3 = ?",
      "A": "3", "B": "9", "C": "27", "D": "81",
      "correctIndex": 1,
      "explanation": "[x³/3] from 0→3 = 9"
    }
  ]
}`,
            },
          ].map(({ label, badge, badgeColor, code }) => (
            <div key={label} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.88rem' }}>{label}</h4>
                <span style={{ padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}44` }}>{badge}</span>
              </div>
              <pre style={styles.codeBlock}>{code}</pre>
            </div>
          ))}

          <div style={{ padding: '14px 16px', background: 'rgba(0,245,212,0.06)', border: '1px solid rgba(0,245,212,0.2)', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--accent-secondary)' }}>Supported field names:</strong><br />
            Question text: <code style={styles.code}>text</code>, <code style={styles.code}>question</code>, <code style={styles.code}>q</code>, <code style={styles.code}>stem</code><br />
            Options: <code style={styles.code}>options</code>, <code style={styles.code}>choices</code>, or keys <code style={styles.code}>A B C D</code><br />
            Correct answer: <code style={styles.code}>correct</code> (0-based index), <code style={styles.code}>answer</code> ("A"–"D" or 1–4), <code style={styles.code}>correctIndex</code><br />
            Subject: <code style={styles.code}>subject</code>, <code style={styles.code}>section</code>, <code style={styles.code}>category</code><br />
            Explanation: <code style={styles.code}>explanation</code>, <code style={styles.code}>solution</code>
          </div>
        </div>
      )}

      {tab === 'paste' && (
        <div role="tabpanel" id="panel-paste" aria-labelledby="tab-paste" className="glass-panel" style={{ padding: '24px' }}>
          <label htmlFor="paste-area" style={{ ...styles.label, display: 'block', marginBottom: '10px' }}>
            Paste question paper text below:
          </label>
          <textarea id="paste-area" rows={14}
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder={`Paste the question paper text here.\n\nExample format:\n1. A body of mass 2 kg moves with velocity 3 m/s. Its kinetic energy is:\n(A) 6 J\n(B) 9 J\n(C) 12 J\n(D) 18 J\n\n2. Which of the following is a noble gas?\nA. Nitrogen\nB. Argon\nC. Oxygen\nD. Carbon`}
            aria-describedby="paste-hint"
            style={{ ...styles.input, width: '100%', resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: '0.85rem', boxSizing: 'border-box' }} />
          <p id="paste-hint" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '8px' }}>
            Supported: numbered questions (1. / Q1. / (1)) with options (A) / A. / A) on separate lines.
            Include an "Answer Key" section at the end for automatic correct-answer detection.
            You can also paste raw JSON here.
          </p>
          <button className="btn-primary" style={{ marginTop: '16px' }}
            disabled={!rawText.trim()}
            onClick={() => {
              setFileName('pasted-text.txt');
              // Auto-detect JSON paste
              const trimmed = rawText.trim();
              if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                const { questions, warnings, meta } = parseJsonPaper(trimmed);
                if (questions.length > 0) {
                  const detectedType = ['KCET','BITSAT','OTHER'].includes((meta.examType || '').toUpperCase())
                    ? (meta.examType || '').toUpperCase() : 'KCET';
                  setExamType(detectedType);
                  setIsJson(true);
                  setParsed({ questions, warnings });
                  setStep('preview');
                  return;
                }
              }
              setStep('examtype');
            }}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}

function PreviewStep({ parsed, setParsed, examType, cfg, paperName, year, editQ, setEditQ, saveEdit, removeQuestion, onBack, onSave }) {
  const { questions, warnings } = parsed;

  return (
    <div>
      {/* Summary */}
      <section aria-label="Parse summary" className="glass-panel" style={{ padding: '20px 24px', marginBottom: '16px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: cfg.color }}>{questions.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Questions parsed</div>
        </div>
        {warnings.length > 0 && (
          <div style={{ flex: 1, padding: '10px 14px', background: 'rgba(254,228,64,0.08)', border: '1px solid rgba(254,228,64,0.25)', borderRadius: '10px' }}>
            <p style={{ fontWeight: 700, color: '#fee440', fontSize: '0.85rem', marginBottom: '4px' }}>⚠️ {warnings.length} parsing warning{warnings.length > 1 ? 's' : ''}</p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.78rem', paddingLeft: '16px' }}>
              {warnings.slice(0, 5).map((w, i) => <li key={i}>{w}</li>)}
              {warnings.length > 5 && <li>…and {warnings.length - 5} more</li>}
            </ul>
          </div>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={onBack}>← Back</button>
          <button className="btn-primary" disabled={questions.length === 0} onClick={onSave}>
            Save as Mock Test ✓
          </button>
        </div>
      </section>

      {questions.length === 0 && (
        <div role="alert" className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: '#ff5a7e' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>No questions were detected.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Try the "Paste Text" tab and paste the paper content directly. Make sure questions are numbered (1. / Q1.) and options are labelled (A. / (A) / A)).
          </p>
          <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={onBack}>Go Back</button>
        </div>
      )}

      {/* Question list */}
      {questions.length > 0 && (
        <section aria-label="Parsed questions list">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            Review &amp; Edit Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions.map((q, idx) => (
              editQ?.id === q.id
                ? <QuestionEditor key={q.id} q={editQ} onSave={saveEdit} onCancel={() => setEditQ(null)} cfg={cfg} />
                : (
                  <article key={q.id} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-muted)', minWidth: '28px', fontSize: '0.85rem' }}>Q{idx + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.5 }}>{q.text}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {q.options.map((opt, oi) => (
                          <span key={oi} style={{
                            padding: '3px 10px', borderRadius: '6px', fontSize: '0.77rem',
                            background: oi === q.correct ? 'rgba(0,245,212,0.12)' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${oi === q.correct ? '#00f5d4' : 'rgba(255,255,255,0.07)'}`,
                            color: oi === q.correct ? '#00f5d4' : 'var(--text-muted)',
                          }}>
                            {String.fromCharCode(65 + oi)}. {opt} {oi === q.correct ? '✓' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button onClick={() => setEditQ({ ...q })} aria-label={`Edit question ${idx + 1}`}
                        style={styles.iconBtn}>✏️</button>
                      <button onClick={() => removeQuestion(q.id)} aria-label={`Remove question ${idx + 1}`}
                        style={{ ...styles.iconBtn, color: '#ff5a7e' }}>🗑️</button>
                    </div>
                  </article>
                )
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '12px' }}>
            <button className="btn-secondary" onClick={onBack}>← Back</button>
            <button className="btn-primary" disabled={questions.length === 0} onClick={onSave}>
              Save as Mock Test ({questions.length} Qs) →
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function QuestionEditor({ q, onSave, onCancel, cfg }) {
  const [draft, setDraft] = useState({ ...q });

  function setOption(i, val) {
    const opts = [...draft.options];
    opts[i] = val;
    setDraft(prev => ({ ...prev, options: opts }));
  }

  return (
    <div className="glass-panel" style={{ padding: '20px', border: '1px solid var(--accent-primary)' }}>
      <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '12px', textTransform: 'uppercase' }}>Editing Question</h3>
      <label style={styles.label}>Question text</label>
      <textarea rows={3} value={draft.text} onChange={e => setDraft(d => ({ ...d, text: e.target.value }))}
        style={{ ...styles.input, width: '100%', resize: 'vertical', marginBottom: '12px', boxSizing: 'border-box' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        {draft.options.map((opt, i) => (
          <div key={i}>
            <label style={{ ...styles.label, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="radio" name="correct-opt" checked={draft.correct === i} onChange={() => setDraft(d => ({ ...d, correct: i }))}
                aria-label={`Mark option ${String.fromCharCode(65 + i)} as correct`} />
              Option {String.fromCharCode(65 + i)} {draft.correct === i ? '(correct)' : ''}
            </label>
            <input type="text" value={opt} onChange={e => setOption(i, e.target.value)}
              style={{ ...styles.input, width: '100%', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>

      <label style={styles.label}>Explanation (optional)</label>
      <textarea rows={2} value={draft.explanation} onChange={e => setDraft(d => ({ ...d, explanation: e.target.value }))}
        style={{ ...styles.input, width: '100%', resize: 'vertical', marginBottom: '14px', boxSizing: 'border-box' }} />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn-primary" onClick={() => onSave(draft)}>Save</button>
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function DoneStep({ examType, savedId, onUploadAnother }) {
  const cfg = EXAM_CONFIGS[examType];
  const testUrl = `/custom-test/${savedId}`;
  return (
    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '16px' }} aria-hidden="true">🎉</div>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>Mock Test Saved!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.6 }}>
        Your uploaded paper is ready as a <strong style={{ color: cfg.color }}>{cfg.label}</strong> mock test with full timer, scoring and rank prediction.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href={testUrl}>
          <button className="btn-primary" style={{ fontSize: '1rem', padding: '13px 28px' }}>
            Start Test Now →
          </button>
        </Link>
        <button className="btn-secondary" onClick={onUploadAnother}>Upload Another</button>
      </div>
    </div>
  );
}

function MyPapersSection({ papers, onDelete }) {
  return (
    <section aria-labelledby="my-papers-heading" style={{ marginTop: '40px' }}>
      <h2 id="my-papers-heading" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
        My Uploaded Papers
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {papers.map(p => (
          <article key={p.id} className="glass-panel" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: EXAM_CONFIGS[p.examType]?.color || '#fff', letterSpacing: '0.06em' }}>
                {p.examType}
              </span>
              <button onClick={() => onDelete(p.id)} aria-label={`Delete ${p.title}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff5a7e', fontSize: '0.85rem', padding: '2px 6px' }}>
                🗑️
              </button>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '14px' }}>
              {p.questions.length} questions · {p.duration} min · {new Date(p.createdAt).toLocaleDateString()}
            </p>
            <Link href={`/custom-test/${p.id}`}
              style={{ display: 'block', textAlign: 'center', padding: '9px', background: 'rgba(123,44,191,0.12)', color: '#c77dff', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', border: '1px solid rgba(123,44,191,0.25)' }}>
              Start Test →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  main: { padding: '20px 40px 60px', maxWidth: '900px', margin: '0 auto' },
  breadcrumb: { display: 'flex', gap: '8px', alignItems: 'center', listStyle: 'none', fontSize: '0.82rem', marginBottom: '12px' },
  breadLink: { color: 'var(--accent-secondary)', textDecoration: 'none' },
  card: { padding: '28px', marginBottom: '20px' },
  cardTitle: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' },
  dropzone: {
    border: '2px dashed', borderRadius: '16px', padding: '48px 32px',
    cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', marginBottom: '12px',
  },
  examBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
    padding: '16px 24px', borderRadius: '14px', cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all 0.2s', minWidth: '130px',
  },
  label: { fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' },
  input: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem', fontFamily: 'inherit',
    outline: 'none',
  },
  iconBtn: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '0.9rem',
  },
  spinner: {
    width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto',
    border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-secondary)',
    animation: 'spin 0.8s linear infinite',
  },
  code: {
    background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: '4px',
    fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--accent-secondary)',
  },
  codeBlock: {
    background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', padding: '16px', fontFamily: 'monospace', fontSize: '0.78rem',
    color: '#c9d1d9', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre',
    margin: 0,
  },
};
