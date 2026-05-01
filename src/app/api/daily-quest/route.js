import clientPromise, { DB_NAME, DAILY_QUEST_COLLECTION } from '@/lib/mongodb';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

/**
 * GET /api/daily-quest?date=YYYY-MM-DD   (optional – omit for latest)
 * Returns the daily quest document.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const filter = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? { date } : {};
    const doc = await db
      .collection(DAILY_QUEST_COLLECTION)
      .findOne(filter, { sort: { createdAt: -1 } });

    if (!doc) {
      return Response.json({ error: 'No daily quest found.' }, { status: 404 });
    }

    // Remove internal Mongo _id from response
    const { _id, ...quest } = doc;
    return Response.json({ quest });
  } catch (err) {
    console.error('[daily-quest GET]', err);
    return Response.json({ error: 'Failed to load daily quest.' }, { status: 500 });
  }
}

/**
 * PUT /api/daily-quest
 * Replaces the daily quest. Requires admin password in Authorization header.
 *
 * Body: { password: string, date: string, questions: Question[] }
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { password, date, questions } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json({ error: 'Invalid or missing date (expected YYYY-MM-DD).' }, { status: 400 });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return Response.json({ error: 'questions must be a non-empty array.' }, { status: 400 });
    }

    // Validate each question minimally
    for (const [i, q] of questions.entries()) {
      if (typeof q.text !== 'string' || !q.text.trim()) {
        return Response.json({ error: `Question ${i + 1}: missing text.` }, { status: 400 });
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        return Response.json({ error: `Question ${i + 1}: options must have at least 2 items.` }, { status: 400 });
      }
      if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) {
        return Response.json({ error: `Question ${i + 1}: correct index out of range.` }, { status: 400 });
      }
      if (!['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'].includes(q.subject)) {
        return Response.json({ error: `Question ${i + 1}: invalid subject "${q.subject}".` }, { status: 400 });
      }
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(DAILY_QUEST_COLLECTION);

    const doc = {
      date,
      paperId: Number(date.replace(/-/g, '')),
      slug: `daily-${date}`,
      title: `BITSAT Daily Practice - ${date}`,
      questions: questions.map((q, i) => ({
        id: q.id || `dq-${date}-${i + 1}`,
        subject: q.subject,
        text: q.text.trim(),
        options: q.options.map((o) => String(o).trim()),
        correct: q.correct,
        explanation: typeof q.explanation === 'string' ? q.explanation.trim() : '',
        ...(q.image ? { image: q.image, imageAlt: q.imageAlt || '' } : {}),
      })),
      createdAt: new Date(),
    };

    // Replace the single document (upsert by date)
    await collection.replaceOne({ date }, doc, { upsert: true });

    return Response.json({ success: true, date, count: doc.questions.length });
  } catch (err) {
    console.error('[daily-quest PUT]', err);
    return Response.json({ error: 'Failed to update daily quest.' }, { status: 500 });
  }
}
