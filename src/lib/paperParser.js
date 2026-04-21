/**
 * Question paper text parser.
 * Works on raw text extracted from PDFs or pasted by the user.
 *
 * Supported formats (common in Indian competitive exam papers):
 *   1.  Question text           Q1. Question text       (1) Question text
 *   (A) / A. / A) option text
 *
 * Returns an array of question objects compatible with the KCET/BITSAT test engine.
 */

// ── JSON import ───────────────────────────────────────────────
/**
 * Parse a JSON question paper into the internal format.
 *
 * Accepted JSON shapes:
 *
 * Shape 1 — PrepMaster native export:
 * {
 *   "title": "...", "examType": "KCET", "year": "2025",
 *   "questions": [
 *     { "text": "...", "options": ["A","B","C","D"], "correct": 0, "subject": "Physics", "explanation": "..." }
 *   ]
 * }
 *
 * Shape 2 — flat array:
 * [
 *   { "question": "...", "options": [...], "answer": "A", "subject": "..." }
 * ]
 *
 * Shape 3 — object with questions array (various key names):
 * { "questions": [...] }  or  { "data": [...] }  or  { "paper": [...] }
 *
 * Shape 4 — per-question answer key variant:
 * { "text": "...", "choices": [...], "correctIndex": 2 }
 *
 * @param {string} jsonString - raw JSON string
 * @param {string} defaultSubject - fallback subject if not present in each question
 * @returns {{ questions: object[], warnings: string[], meta: object }}
 */
export function parseJsonPaper(jsonString, defaultSubject = 'General') {
  const warnings = [];
  let raw;

  try {
    raw = JSON.parse(jsonString);
  } catch (e) {
    return { questions: [], warnings: [`Invalid JSON: ${e.message}`], meta: {} };
  }

  // Extract meta fields and question array
  let meta = {};
  let rawQuestions = [];

  if (Array.isArray(raw)) {
    rawQuestions = raw;
  } else if (typeof raw === 'object' && raw !== null) {
    // Pull meta
    meta = {
      title:       raw.title    || raw.name || '',
      examType:    raw.examType || raw.exam || raw.type || '',
      year:        raw.year     ? String(raw.year) : '',
      duration:    raw.duration || null,
      correctMarks: raw.correctMarks ?? raw.correct_marks ?? null,
      wrongMarks:   raw.wrongMarks   ?? raw.wrong_marks   ?? null,
    };

    // Find questions array under various common keys
    rawQuestions =
      raw.questions ||
      raw.data      ||
      raw.paper     ||
      raw.items     ||
      raw.mcqs      ||
      [];

    if (!Array.isArray(rawQuestions)) {
      return { questions: [], warnings: ['Could not find a questions array in the JSON. Expected a key named "questions", "data", "paper", or "items".'], meta };
    }
  } else {
    return { questions: [], warnings: ['Unrecognised JSON structure.'], meta };
  }

  const questions = rawQuestions.map((item, idx) => {
    if (typeof item !== 'object' || item === null) {
      warnings.push(`Item ${idx + 1} is not an object — skipped.`);
      return null;
    }

    // ── Question text ─────────────────────────────────────
    const text =
      item.text        ||
      item.question    ||
      item.q           ||
      item.stem        ||
      item.content     ||
      '';

    if (!text) {
      warnings.push(`Q${idx + 1}: no question text found — skipped.`);
      return null;
    }

    // ── Options ───────────────────────────────────────────
    let options = [];
    if (Array.isArray(item.options))   options = item.options.map(String);
    else if (Array.isArray(item.choices)) options = item.choices.map(String);
    else if (Array.isArray(item.answers)) options = item.answers.map(String);
    else {
      // Try keys A/B/C/D or 1/2/3/4
      ['A','B','C','D'].forEach(k => { if (item[k] !== undefined) options.push(String(item[k])); });
      if (options.length === 0)
        [1,2,3,4].forEach(k => { if (item[k] !== undefined) options.push(String(item[k])); });
    }

    if (options.length < 2) {
      warnings.push(`Q${idx + 1}: fewer than 2 options found.`);
    }
    // Pad to 4
    while (options.length < 4) options.push('(not provided)');
    options = options.slice(0, 4);

    // ── Correct answer ────────────────────────────────────
    let correct = 0;
    const rawCorrect =
      item.correct      ??
      item.correctIndex ??
      item.answer       ??
      item.ans          ??
      item.key          ??
      null;

    if (rawCorrect !== null) {
      if (typeof rawCorrect === 'number') {
        correct = Math.max(0, Math.min(3, rawCorrect));
      } else {
        const s = String(rawCorrect).trim().toUpperCase();
        if ('ABCD'.includes(s) && s.length === 1) {
          correct = 'ABCD'.indexOf(s);
        } else if (['1','2','3','4'].includes(s)) {
          correct = parseInt(s, 10) - 1;
        } else {
          // Try matching option text
          const matchIdx = options.findIndex(o => o.trim().toLowerCase() === s.toLowerCase());
          if (matchIdx !== -1) correct = matchIdx;
          else warnings.push(`Q${idx + 1}: could not parse correct answer "${rawCorrect}" — defaulting to A.`);
        }
      }
    } else {
      warnings.push(`Q${idx + 1}: no correct answer specified — defaulting to A.`);
    }

    return {
      id:          `json_${Date.now()}_${idx}`,
      subject:     item.subject || item.section || item.category || item.topic || defaultSubject,
      text:        text.trim(),
      options,
      correct,
      explanation: item.explanation || item.solution || item.reason || '',
    };
  }).filter(Boolean);

  if (questions.length === 0) {
    warnings.push('No valid questions found in JSON.');
  }

  return { questions, warnings, meta };
}

// ── JSON import ───────────────────────────────────────────────
/**
 * Parse a JSON question paper into the internal format.
 *
 * Accepted JSON shapes:
 *
 * Shape 1 — PrepMaster native export:
 * {
 *   "title": "...", "examType": "KCET", "year": "2025",
 *   "questions": [
 *     { "text": "...", "options": ["A","B","C","D"], "correct": 0, "subject": "Physics", "explanation": "..." }
 *   ]
 * }
 *
 * Shape 2 — flat array:
 * [
 *   { "question": "...", "options": [...], "answer": "A", "subject": "..." }
 * ]
 *
 * Shape 3 — object with questions array (various key names):
 * { "questions": [...] }  or  { "data": [...] }  or  { "paper": [...] }
 *
 * Shape 4 — per-question answer key variant:
 * { "text": "...", "choices": [...], "correctIndex": 2 }
 *
 * @param {string} jsonString - raw JSON string
 * @param {string} defaultSubject - fallback subject if not present in each question
 * @returns {{ questions: object[], warnings: string[], meta: object }}
 */
export function parseJsonPaper(jsonString, defaultSubject = 'General') {
  const warnings = [];
  let raw;

  try {
    raw = JSON.parse(jsonString);
  } catch (e) {
    return { questions: [], warnings: [`Invalid JSON: ${e.message}`], meta: {} };
  }

  // Extract meta fields and question array
  let meta = {};
  let rawQuestions = [];

  if (Array.isArray(raw)) {
    rawQuestions = raw;
  } else if (typeof raw === 'object' && raw !== null) {
    // Pull meta
    meta = {
      title:       raw.title    || raw.name || '',
      examType:    raw.examType || raw.exam || raw.type || '',
      year:        raw.year     ? String(raw.year) : '',
      duration:    raw.duration || null,
      correctMarks: raw.correctMarks ?? raw.correct_marks ?? null,
      wrongMarks:   raw.wrongMarks   ?? raw.wrong_marks   ?? null,
    };

    // Find questions array under various common keys
    rawQuestions =
      raw.questions ||
      raw.data      ||
      raw.paper     ||
      raw.items     ||
      raw.mcqs      ||
      [];

    if (!Array.isArray(rawQuestions)) {
      return { questions: [], warnings: ['Could not find a questions array in the JSON. Expected a key named "questions", "data", "paper", or "items".'], meta };
    }
  } else {
    return { questions: [], warnings: ['Unrecognised JSON structure.'], meta };
  }

  const questions = rawQuestions.map((item, idx) => {
    if (typeof item !== 'object' || item === null) {
      warnings.push(`Item ${idx + 1} is not an object — skipped.`);
      return null;
    }

    // ── Question text ─────────────────────────────────────
    const text =
      item.text        ||
      item.question    ||
      item.q           ||
      item.stem        ||
      item.content     ||
      '';

    if (!text) {
      warnings.push(`Q${idx + 1}: no question text found — skipped.`);
      return null;
    }

    // ── Options ───────────────────────────────────────────
    let options = [];
    if (Array.isArray(item.options))   options = item.options.map(String);
    else if (Array.isArray(item.choices)) options = item.choices.map(String);
    else if (Array.isArray(item.answers)) options = item.answers.map(String);
    else {
      // Try keys A/B/C/D or 1/2/3/4
      ['A','B','C','D'].forEach(k => { if (item[k] !== undefined) options.push(String(item[k])); });
      if (options.length === 0)
        [1,2,3,4].forEach(k => { if (item[k] !== undefined) options.push(String(item[k])); });
    }

    if (options.length < 2) {
      warnings.push(`Q${idx + 1}: fewer than 2 options found.`);
    }
    // Pad to 4
    while (options.length < 4) options.push('(not provided)');
    options = options.slice(0, 4);

    // ── Correct answer ────────────────────────────────────
    let correct = 0;
    const rawCorrect =
      item.correct      ??
      item.correctIndex ??
      item.answer       ??
      item.ans          ??
      item.key          ??
      null;

    if (rawCorrect !== null) {
      if (typeof rawCorrect === 'number') {
        correct = Math.max(0, Math.min(3, rawCorrect));
      } else {
        const s = String(rawCorrect).trim().toUpperCase();
        if ('ABCD'.includes(s) && s.length === 1) {
          correct = 'ABCD'.indexOf(s);
        } else if (['1','2','3','4'].includes(s)) {
          correct = parseInt(s, 10) - 1;
        } else {
          // Try matching option text
          const matchIdx = options.findIndex(o => o.trim().toLowerCase() === s.toLowerCase());
          if (matchIdx !== -1) correct = matchIdx;
          else warnings.push(`Q${idx + 1}: could not parse correct answer "${rawCorrect}" — defaulting to A.`);
        }
      }
    } else {
      warnings.push(`Q${idx + 1}: no correct answer specified — defaulting to A.`);
    }

    return {
      id:          `json_${Date.now()}_${idx}`,
      subject:     item.subject || item.section || item.category || item.topic || defaultSubject,
      text:        text.trim(),
      options,
      correct,
      explanation: item.explanation || item.solution || item.reason || '',
    };
  }).filter(Boolean);

  if (questions.length === 0) {
    warnings.push('No valid questions found in JSON.');
  }

  return { questions, warnings, meta };
}

const QUESTION_NUM_RE = /^(?:Q\.?\s*)?(\d{1,3})[.)]\s+(.+)/i;
const OPTION_RE       = /^\s*[(\[]?([A-Da-d])[)\].]?\s+(.+)/;
const ANSWER_LINE_RE  = /^\s*(?:ans(?:wer)?|key)\s*[:\-]?\s*([A-Da-d1-4])/i;
const SECTION_HDR_RE  = /^section\s+[A-Z\d]+/i;

/**
 * Parse raw text into structured questions.
 * @param {string} text - raw text from PDF or paste
 * @param {string} subject - subject label (Physics / Chemistry / etc.)
 * @returns {{ questions: object[], warnings: string[] }}
 */
export function parseQuestionPaper(text, subject = 'General') {
  const lines    = text.split('\n').map(l => l.trim()).filter(Boolean);
  const questions = [];
  const warnings  = [];

  let current = null;
  let answerKeyMap = {};       // q index → correct option index
  let inAnswerKey  = false;

  // ── First pass: detect answer key block ──────────────────
  // Many papers end with "Answer Key" section
  let answerKeyStart = lines.findIndex(l => /answer[\s\-]*key/i.test(l));
  if (answerKeyStart !== -1) {
    const keyLines = lines.slice(answerKeyStart + 1);
    keyLines.forEach(line => {
      // Formats: "1. A", "1-A", "1) B", "1: C" etc.
      const m = line.match(/(\d+)\s*[.\-):]\s*([A-Da-d1-4])/g);
      if (m) {
        m.forEach(tok => {
          const parts = tok.match(/(\d+)\s*[.\-):]\s*([A-Da-d1-4])/);
          if (parts) {
            const qNum = parseInt(parts[1], 10);
            const opt  = parts[2].toUpperCase();
            answerKeyMap[qNum] = 'ABCD'.indexOf(opt) !== -1
              ? 'ABCD'.indexOf(opt)
              : parseInt(opt, 10) - 1;
          }
        });
      }
    });
    // Trim lines to before answer key
    lines.splice(answerKeyStart);
  }

  // ── Second pass: parse questions and options ──────────────
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip known section headers
    if (SECTION_HDR_RE.test(line)) continue;

    // Match question number
    const qMatch = line.match(QUESTION_NUM_RE);
    if (qMatch) {
      // Save previous question
      if (current && current.options.length >= 2) {
        questions.push(current);
      } else if (current) {
        warnings.push(`Q${current._num}: only ${current.options.length} options found — skipped.`);
      }

      current = {
        _num:    parseInt(qMatch[1], 10),
        id:      `custom_${Date.now()}_${qMatch[1]}`,
        subject,
        text:    qMatch[2].trim(),
        options: [],
        correct: -1,
        explanation: '',
      };

      // Look-ahead: collect continuation lines until next Q or option
      let j = i + 1;
      while (j < lines.length && !lines[j].match(QUESTION_NUM_RE) && !lines[j].match(OPTION_RE)) {
        current.text += ' ' + lines[j].trim();
        j++;
      }
      continue;
    }

    // Match option line
    const optMatch = line.match(OPTION_RE);
    if (optMatch && current) {
      let optText = optMatch[2].trim();

      // Collect continuation text for long options
      let k = i + 1;
      while (k < lines.length && !lines[k].match(OPTION_RE) && !lines[k].match(QUESTION_NUM_RE)) {
        optText += ' ' + lines[k].trim();
        k++;
      }

      current.options.push(optText);

      // Inline answer indicator e.g. "A) correct ✓" or "A) text *"
      if (/[✓✔\*]/.test(optText) && current.correct === -1) {
        current.correct = current.options.length - 1;
      }
      continue;
    }

    // Inline answer declaration (outside question block)
    const ansMatch = line.match(ANSWER_LINE_RE);
    if (ansMatch && current) {
      const opt = ansMatch[1].toUpperCase();
      current.correct = 'ABCD'.indexOf(opt) !== -1
        ? 'ABCD'.indexOf(opt)
        : parseInt(opt, 10) - 1;
    }
  }

  // Save last question
  if (current && current.options.length >= 2) {
    questions.push(current);
  }

  // ── Apply answer key map ──────────────────────────────────
  questions.forEach(q => {
    if (q.correct === -1 && answerKeyMap[q._num] !== undefined) {
      q.correct = answerKeyMap[q._num];
    }
    // Clamp
    if (q.correct < 0 || q.correct >= q.options.length) q.correct = 0;
    // Pad options to 4 if fewer
    while (q.options.length < 4) q.options.push('(option not detected)');
    // Normalise options to exactly 4
    q.options = q.options.slice(0, 4);
    // Clean internal fields
    delete q._num;
  });

  if (questions.length === 0) {
    warnings.push('No questions detected. Make sure the PDF has selectable text or paste manually.');
  }

  return { questions, warnings };
}

/**
 * Save a custom paper to localStorage.
 * Returns the saved paper id.
 */
export function saveCustomPaper(paper) {
  const stored = getCustomPapers();
  const id = `cp_${Date.now()}`;
  const entry = { ...paper, id, createdAt: new Date().toISOString() };
  stored.push(entry);
  try {
    localStorage.setItem('prepmaster_custom_papers', JSON.stringify(stored));
  } catch (e) {
    console.warn('localStorage full — could not save paper:', e);
  }
  return id;
}

/**
 * Load all custom papers from localStorage.
 */
export function getCustomPapers() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('prepmaster_custom_papers') || '[]');
  } catch {
    return [];
  }
}

/**
 * Get a single custom paper by id.
 */
export function getCustomPaperById(id) {
  return getCustomPapers().find(p => p.id === id) || null;
}

/**
 * Delete a custom paper by id.
 */
export function deleteCustomPaper(id) {
  const papers = getCustomPapers().filter(p => p.id !== id);
  localStorage.setItem('prepmaster_custom_papers', JSON.stringify(papers));
}
