import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function normalizeName(name) {
  if (typeof name !== 'string') return 'Anonymous';
  const cleaned = name.trim();
  return cleaned ? cleaned.slice(0, 50) : 'Anonymous';
}

async function fetchAttempts({ examType, paperId, includeName }) {
  const columns = includeName
    ? 'score, candidate_name, time_taken_seconds, created_at'
    : 'score, time_taken_seconds, created_at';

  let query = supabase
    .from('test_attempts')
    .select(columns)
    .eq('exam_type', examType)
    .order('score', { ascending: false })
    .order('time_taken_seconds', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true })
    .limit(20);

  if (typeof paperId === 'number' && Number.isFinite(paperId)) {
    query = query.eq('paper_id', paperId);
  }

  const { data, error } = await query;
  return { data: Array.isArray(data) ? data : [], error };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const examType = searchParams.get('examType') || 'kcet';
    const paperIdRaw = searchParams.get('paperId');
    const paperId = paperIdRaw == null ? null : Number(paperIdRaw);

    if (!['kcet', 'bitsat'].includes(examType)) {
      return Response.json({ error: 'Invalid examType' }, { status: 400 });
    }

    const withNames = await fetchAttempts({ examType, paperId, includeName: true });
    let rows = withNames.data;
    let queryError = withNames.error;

    if (queryError && /candidate_name|column/i.test(queryError.message || '')) {
      const withoutNames = await fetchAttempts({ examType, paperId, includeName: false });
      rows = withoutNames.data;
      queryError = withoutNames.error;
    }

    if (queryError) {
      console.error('leaderboard query error:', queryError.message);
      return Response.json({ error: 'DB read error' }, { status: 500 });
    }

    const leaderboard = rows.map((row, index) => ({
      rank: index + 1,
      name: normalizeName(row.candidate_name),
      score: typeof row.score === 'number' ? row.score : 0,
      timeTaken: typeof row.time_taken_seconds === 'number' ? row.time_taken_seconds : null,
      createdAt: row.created_at ?? null,
    }));

    return Response.json({ ok: true, leaderboard });
  } catch (err) {
    console.error('leaderboard route error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
