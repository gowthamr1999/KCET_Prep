import { createClient } from '@supabase/supabase-js';

// Use service role key server-side so row-level security doesn't block inserts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { paperId, paperName, score, totalMarks, timeTaken, examType, candidateName } = body;

    if (typeof paperId !== 'number' || typeof score !== 'number' || typeof totalMarks !== 'number') {
      return Response.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const baseInsertRow = {
      paper_id: paperId,
      paper_name: paperName ?? null,
      score,
      total_marks: totalMarks,
      time_taken_seconds: timeTaken ?? null,
      exam_type: examType ?? 'kcet',
    };

    const cleanName = typeof candidateName === 'string' ? candidateName.trim().slice(0, 50) : '';
    const { error } = await supabase.from('test_attempts').insert({
      ...baseInsertRow,
      candidate_name: cleanName || null,
    });

    if (error) {
      console.error('Supabase insert error:', error.message);
      return Response.json({ error: 'DB error' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('track-attempt error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
