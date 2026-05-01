/**
 * seed-mongodb.mjs
 * ─────────────────────────────────────────────────────────
 * Seeds papers into MongoDB collections.
 *
 * Usage
 * ─────
 *   # Seed the current daily questions from bitsatDailyQuestions.js
 *   node scripts/seed-mongodb.mjs --daily
 *
 *   # Upload an arbitrary paper from a JSON file
 *   node scripts/seed-mongodb.mjs --paper path/to/paper.json
 *
 *   # Do both at once
 *   node scripts/seed-mongodb.mjs --daily --paper path/to/paper.json
 *
 * JSON paper format (for --paper flag)
 * ─────────────────────────────────────
 * {
 *   "paperId": 20260501,
 *   "slug": "daily-2026-05-01",            // optional
 *   "title": "BITSAT Daily Practice …",    // optional
 *   "description": "…",                    // optional
 *   "durationMinutes": 35,                 // optional, default 180
 *   "questions": [
 *     {
 *       "id": "q1",
 *       "subject": "Physics",
 *       "text": "Question text …",
 *       "options": ["A", "B", "C", "D"],
 *       "correct": 0,
 *       "explanation": "…"                 // optional
 *     },
 *     …
 *   ]
 * }
 *
 * The target collection is chosen automatically:
 *   paperId >= 20260000  →  daily_quest
 *   otherwise            →  bitsat_papers
 * ─────────────────────────────────────────────────────────
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { MongoClient } from 'mongodb';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── 1. Load MONGODB_URI from .env.local ──────────────────
function loadEnv() {
  const envPath = resolve(ROOT, '.env.local');
  try {
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local missing — rely on environment already set
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('✗ MONGODB_URI is not set. Add it to .env.local or export it before running.');
  process.exit(1);
}

const DB_NAME              = 'mock_papers';
const DAILY_COLLECTION     = 'daily_quest';
const PAPERS_COLLECTION    = 'bitsat_papers';

// ── 2. Helpers ────────────────────────────────────────────
function isDaily(paperId) {
  return Number(paperId) >= 20260000;
}

function buildDoc(raw) {
  const paperId = Number(raw.paperId);
  if (!paperId) throw new Error('"paperId" is required and must be a number.');

  const questions = (raw.questions ?? []).map((q, i) => ({
    id:          q.id ?? `q-${paperId}-${i + 1}`,
    subject:     q.subject,
    text:        String(q.text).trim(),
    options:     (q.options ?? []).map(o => String(o).trim()),
    correct:     q.correct,
    explanation: typeof q.explanation === 'string' ? q.explanation.trim() : '',
    ...(q.image ? { image: q.image, imageAlt: q.imageAlt ?? '' } : {}),
  }));

  return {
    paperId,
    slug:            raw.slug        ?? (isDaily(paperId) ? `daily-${String(paperId).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}` : `paper-${paperId}`),
    title:           raw.title       ?? `BITSAT Paper ${paperId}`,
    description:     raw.description ?? '',
    durationMinutes: raw.durationMinutes ?? (isDaily(paperId) ? 35 : 180),
    totalMarks:      questions.length * 3,
    correctMarks:    3,
    wrongMarks:      -1,
    questions,
    createdAt:       new Date(),
  };
}

async function upsert(db, doc) {
  const collection = isDaily(doc.paperId) ? DAILY_COLLECTION : PAPERS_COLLECTION;
  const result = await db.collection(collection).replaceOne(
    { paperId: doc.paperId },
    doc,
    { upsert: true }
  );
  return { collection, matched: result.matchedCount, upserted: result.upsertedCount };
}

// ── 3. Seed daily paper from bitsatDailyQuestions.js ──────
async function seedDaily(db) {
  console.log('\n→ Importing daily questions from src/data/bitsatDailyQuestions.js …');

  const dataPath = pathToFileURL(resolve(ROOT, 'src/data/bitsatDailyQuestions.js')).href;
  const { bitsatDailyPaperId, bitsatDailyQuestionDate, bitsatDailyQuestions, latestBitsatDailyPaper } =
    await import(dataPath);

  const doc = buildDoc({
    paperId:         bitsatDailyPaperId,
    slug:            `daily-${bitsatDailyQuestionDate}`,
    title:           latestBitsatDailyPaper.title,
    description:     latestBitsatDailyPaper.description,
    durationMinutes: latestBitsatDailyPaper.durationMinutes,
    questions:       bitsatDailyQuestions,
  });

  const res = await upsert(db, doc);
  console.log(`  ✓ ${res.upserted ? 'Inserted' : 'Updated'} daily paper (id=${doc.paperId}) → collection: ${res.collection}`);
  console.log(`    ${doc.questions.length} questions, ${doc.durationMinutes} min`);
}

// ── 4. Upload a JSON file ─────────────────────────────────
async function uploadJsonPaper(db, jsonPath) {
  const resolved = resolve(process.cwd(), jsonPath);
  console.log(`\n→ Reading paper JSON from ${resolved} …`);

  let raw;
  try {
    raw = JSON.parse(readFileSync(resolved, 'utf8'));
  } catch (err) {
    throw new Error(`Could not read/parse JSON: ${err.message}`);
  }

  // Support both a single paper object and an array of papers
  const papers = Array.isArray(raw) ? raw : [raw];

  for (const paper of papers) {
    const doc = buildDoc(paper);
    const res = await upsert(db, doc);
    console.log(`  ✓ ${res.upserted ? 'Inserted' : 'Updated'} paper id=${doc.paperId} → collection: ${res.collection}`);
    console.log(`    "${doc.title}"  ${doc.questions.length} questions, ${doc.durationMinutes} min`);
  }
}

// ── 5. Seed all 19 static mock papers ────────────────────
async function seedAllPapers(db) {
  console.log('\n→ Importing all BITSAT mock papers from src/data/bitsatQuestions.js …');

  const dataUrl = pathToFileURL(resolve(ROOT, 'src/data/bitsatQuestions.js')).href;
  const { getBitsatPaper, allBitsatPapers } = await import(dataUrl);

  const docs = allBitsatPapers.map(meta => {
    const p = getBitsatPaper(String(meta.id));
    return buildDoc({
      paperId:         p.id,
      slug:            p.slug ?? `paper-${p.id}`,
      title:           p.title,
      description:     p.description ?? '',
      durationMinutes: p.duration,
      questions:       p.questions,
    });
  });

  // Bulk upsert
  let inserted = 0, updated = 0;
  for (const doc of docs) {
    const res = await upsert(db, doc);
    if (res.upserted) inserted++; else updated++;
    console.log(`  ${res.upserted ? '✓ Inserted' : '↺ Updated '} paper id=${doc.paperId} (${doc.questions.length} questions) → ${res.collection}`);
  }

  console.log(`\n  Total: ${inserted} inserted, ${updated} updated across ${docs.length} papers.`);
}


const args = process.argv.slice(2);
const doDaily      = args.includes('--daily');
const doAllPapers  = args.includes('--all-papers');
const paperIdx     = args.indexOf('--paper');
const paperArg     = paperIdx !== -1 ? args[paperIdx + 1] : null;

if (!doDaily && !doAllPapers && !paperArg) {
  console.error('Usage:');
  console.error('  node scripts/seed-mongodb.mjs --daily');
  console.error('  node scripts/seed-mongodb.mjs --all-papers');
  console.error('  node scripts/seed-mongodb.mjs --daily --all-papers');
  console.error('  node scripts/seed-mongodb.mjs --paper path/to/paper.json');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  const db = client.db(DB_NAME);
  console.log(`✓ Connected to MongoDB  (db: ${DB_NAME})`);

  if (doDaily)      await seedDaily(db);
  if (doAllPapers)  await seedAllPapers(db);
  if (paperArg)     await uploadJsonPaper(db, paperArg);

  console.log('\n✓ Done.\n');
} catch (err) {
  console.error('\n✗ Error:', err.message);
  process.exit(1);
} finally {
  await client.close();
}
