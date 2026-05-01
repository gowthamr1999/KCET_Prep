import getClientPromise, { DB_NAME, PAPERS_COLLECTION, DAILY_QUEST_COLLECTION } from '@/lib/mongodb';

/**
 * GET /api/bitsat-papers?filter=full|daily|all
 *
 * Returns card-level metadata for the test listing page.
 * Never returns the full questions array (too large).
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') ?? 'all'; // 'full' | 'daily' | 'all'

  // Projection — exclude heavy questions array
  const proj = { questions: 0, _id: 0 };

  try {
    const client = await getClientPromise();
    const db = client.db(DB_NAME);

    let mockPapers = [];
    let dailyPapers = [];

    if (filter === 'all' || filter === 'full') {
      mockPapers = await db
        .collection(PAPERS_COLLECTION)
        .find({}, { projection: proj })
        .sort({ paperId: 1 })
        .toArray();
    }

    if (filter === 'all' || filter === 'daily') {
      dailyPapers = await db
        .collection(DAILY_QUEST_COLLECTION)
        .find({}, { projection: proj })
        .sort({ paperId: -1 }) // newest daily first
        .toArray();
    }

    // Normalise into a consistent card shape
    const normalize = (doc, isDaily) => ({
      id:       doc.paperId,
      slug:     doc.slug ?? `paper-${doc.paperId}`,
      title:    doc.title ?? `BITSAT Paper ${doc.paperId}`,
      topics:   doc.topics ?? doc.description ?? '',
      questions: doc.totalMarks ? Math.round(doc.totalMarks / 3) : (doc.questionCount ?? 0),
      duration: doc.durationMinutes ? `${doc.durationMinutes} Min` : '180 Min',
      durationMinutes: doc.durationMinutes ?? 180,
      maxMarks: doc.totalMarks ?? 0,
      scoring:  '+3 / -1',
      isDaily,
      source:   'mongodb',
    });

    const papers = [
      ...dailyPapers.map(d => normalize(d, true)),
      ...mockPapers.map(d => normalize(d, false)),
    ];

    return Response.json({ papers, count: papers.length });
  } catch (err) {
    console.error('[bitsat-papers GET]', err);
    // Return empty so the listing page falls back to static data gracefully
    return Response.json({ papers: [], count: 0, error: 'Database unavailable.' }, { status: 503 });
  }
}
