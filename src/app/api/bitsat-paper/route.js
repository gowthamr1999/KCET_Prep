import getClientPromise, { DB_NAME, PAPERS_COLLECTION, DAILY_QUEST_COLLECTION } from '@/lib/mongodb';

/**
 * Normalize a document from the bitsat_papers or daily_quest collection into
 * the shape the test runner expects.
 */
function normalizeDoc(doc, isDaily = false) {
  const qCount = Array.isArray(doc.questions) ? doc.questions.length : 0;
  return {
    id:           doc.paperId ?? doc.id,
    slug:         doc.slug ?? `paper-${doc.paperId ?? doc.id}`,
    title:        doc.title ?? 'BITSAT Practice Paper',
    description:  doc.description ?? (isDaily ? 'Daily BITSAT practice set.' : 'BITSAT mock paper.'),
    duration:     doc.durationMinutes ?? doc.duration ?? (isDaily ? 35 : 180),
    totalMarks:   doc.totalMarks ?? doc.maxMarks ?? qCount * 3,
    correctMarks: doc.correctMarks ?? 3,
    wrongMarks:   doc.wrongMarks ?? -1,
    questions:    doc.questions ?? [],
  };
}

/**
 * GET /api/bitsat-paper?id=<paperId|slug>
 *
 * Lookup order:
 *  1. bitsat_papers collection  (full mock papers saved by admin)
 *  2. daily_quest collection    (daily practice papers)
 *  3. 404 → client falls back to static getBitsatPaper()
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return Response.json({ error: 'Missing id parameter.' }, { status: 400 });
  }

  const numericId = Number(id);
  const filter = Number.isFinite(numericId)
    ? { $or: [{ paperId: numericId }, { slug: id }] }
    : { slug: id };

  try {
    const client = await getClientPromise();
    const db = client.db(DB_NAME);

    // 1. Check full mock-paper collection first
    const mockDoc = await db.collection(PAPERS_COLLECTION).findOne(filter, { sort: { createdAt: -1 } });
    if (mockDoc) {
      const { _id, ...doc } = mockDoc;
      return Response.json({ paper: normalizeDoc(doc, false), source: 'mongodb-paper' });
    }

    // 2. Check daily-quest collection
    const dailyDoc = await db.collection(DAILY_QUEST_COLLECTION).findOne(filter, { sort: { createdAt: -1 } });
    if (dailyDoc) {
      const { _id, ...doc } = dailyDoc;
      return Response.json({ paper: normalizeDoc(doc, true), source: 'mongodb-daily' });
    }

    // 3. Not in MongoDB — tell the client to fall back to static data
    return Response.json({ error: 'Paper not found in database.' }, { status: 404 });
  } catch (err) {
    console.error('[bitsat-paper GET]', err);
    return Response.json({ error: 'Database unavailable.' }, { status: 503 });
  }
}

/**
 * PUT /api/bitsat-paper
 * Save (upsert) a full mock paper to the bitsat_papers collection.
 *
 * Body: { password, paperId, slug, title, description, duration, questions[] }
 */
export async function PUT(request) {
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  try {
    const body = await request.json();
    const { password, paperId, slug, title, description, duration, questions } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    if (!paperId) {
      return Response.json({ error: 'Missing paperId.' }, { status: 400 });
    }
    if (!Array.isArray(questions) || questions.length === 0) {
      return Response.json({ error: 'questions must be a non-empty array.' }, { status: 400 });
    }

    const doc = {
      paperId:         Number(paperId),
      slug:            slug || `paper-${paperId}`,
      title:           title || `BITSAT Mock Paper ${paperId}`,
      description:     description || '',
      durationMinutes: typeof duration === 'number' ? duration : 180,
      totalMarks:      questions.length * 3,
      correctMarks:    3,
      wrongMarks:      -1,
      questions:       questions.map((q, i) => ({
        id:          q.id || `mp-${paperId}-${i + 1}`,
        subject:     q.subject,
        text:        String(q.text).trim(),
        options:     q.options.map(o => String(o).trim()),
        correct:     q.correct,
        explanation: typeof q.explanation === 'string' ? q.explanation.trim() : '',
        ...(q.image ? { image: q.image, imageAlt: q.imageAlt || '' } : {}),
      })),
      createdAt: new Date(),
    };

    const client = await getClientPromise();
    const db = client.db(DB_NAME);
    await db.collection(PAPERS_COLLECTION).replaceOne({ paperId: doc.paperId }, doc, { upsert: true });

    return Response.json({ success: true, paperId: doc.paperId, count: doc.questions.length });
  } catch (err) {
    console.error('[bitsat-paper PUT]', err);
    return Response.json({ error: 'Failed to save paper.' }, { status: 500 });
  }
}
