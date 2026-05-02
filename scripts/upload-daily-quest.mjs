/**
 * Usage:
 *   node scripts/upload-daily-quest.mjs <path-to-json> <date YYYY-MM-DD> [password]
 *
 * Example:
 *   node scripts/upload-daily-quest.mjs ~/Downloads/bitsat_mock_may2_2026.json 2026-05-02
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const [,, filePath, date, password = 'admin123'] = process.argv;

if (!filePath || !date) {
  console.error('Usage: node scripts/upload-daily-quest.mjs <file.json> <YYYY-MM-DD> [password]');
  process.exit(1);
}

const raw = JSON.parse(readFileSync(resolve(filePath), 'utf-8'));

// Support both a single paper object and an array
const paper = Array.isArray(raw) ? raw[0] : raw;

// Map fields: the daily-quest API uses `explanation`; the JSON uses `solution`
const questions = paper.questions.map((q) => ({
  id:          q.id,
  subject:     q.subject,
  text:        q.text,
  options:     q.options,
  correct:     q.correct,
  explanation: q.explanation ?? q.solution ?? '',
}));

const body = { password, date, questions };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

console.log(`Uploading ${questions.length} questions for ${date} to ${BASE_URL}/api/daily-quest …`);

const res = await fetch(`${BASE_URL}/api/daily-quest`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const data = await res.json();

if (!res.ok) {
  console.error('Upload failed:', data);
  process.exit(1);
}

console.log(`✓ Success — ${data.count} questions saved for ${data.date}`);
