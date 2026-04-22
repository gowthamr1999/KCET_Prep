import { createClient } from '@supabase/supabase-js';
import {
  getBitsatBenchmarkNote,
  getPaperBenchmarkOverall,
  getSubjectBenchmarkScore,
} from '@/lib/bitsatBenchmarks';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function percentile(scores, currentScore) {
  if (!scores.length) return 100;
  const lessOrEqual = scores.filter((s) => s <= currentScore).length;
  return Math.round((lessOrEqual / scores.length) * 100);
}

function rankAmong(scores, currentScore) {
  const better = scores.filter((s) => s > currentScore).length;
  return better + 1;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      paperId,
      paperName,
      score,
      totalMarks,
      timeTaken,
      sectionStats = [],
    } = body;

    if (
      typeof paperId !== 'number' ||
      typeof score !== 'number' ||
      typeof totalMarks !== 'number'
    ) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { data: existingPaperRows, error: paperRowsError } = await supabase
      .from('test_attempts')
      .select('score')
      .eq('exam_type', 'bitsat')
      .eq('paper_id', paperId);

    if (paperRowsError) {
      console.error('bitsat-insights read error (paper):', paperRowsError.message);
      return Response.json({ error: 'DB read error' }, { status: 500 });
    }

    const historicalPaperScores = (existingPaperRows || []).map((r) => r.score);
    const historicalPaperBest = historicalPaperScores.length
      ? Math.max(...historicalPaperScores)
      : null;

    const seededPaperBest = getPaperBenchmarkOverall(paperId);
    const previousBestOverall = historicalPaperBest == null
      ? seededPaperBest
      : Math.max(historicalPaperBest, seededPaperBest);

    const { error: insertError } = await supabase.from('test_attempts').insert({
      paper_id: paperId,
      paper_name: paperName ?? null,
      score,
      total_marks: totalMarks,
      time_taken_seconds: typeof timeTaken === 'number' ? timeTaken : null,
      exam_type: 'bitsat',
    });

    if (insertError) {
      console.error('bitsat-insights insert error:', insertError.message);
      return Response.json({ error: 'DB insert error' }, { status: 500 });
    }

    const paperScoresWithCurrent = [...historicalPaperScores, score];

    const { data: allBitsatRows, error: allBitsatError } = await supabase
      .from('test_attempts')
      .select('score')
      .eq('exam_type', 'bitsat');

    if (allBitsatError) {
      console.error('bitsat-insights read error (global):', allBitsatError.message);
      return Response.json({ error: 'DB read error' }, { status: 500 });
    }

    const globalScores = (allBitsatRows || []).map((r) => r.score);
    if (!globalScores.length || globalScores[globalScores.length - 1] !== score) {
      globalScores.push(score);
    }

    const subjectScoresNow = sectionStats.map((section) => ({
      subject: section.sec,
      score: section.correct * 3 + section.wrong * -1,
    }));

    let subjectHistoryMap = {};
    const { data: subjectRows, error: subjectReadError } = await supabase
      .from('bitsat_subject_attempts')
      .select('subject, score')
      .eq('paper_id', paperId);

    if (!subjectReadError && Array.isArray(subjectRows)) {
      for (const row of subjectRows) {
        subjectHistoryMap[row.subject] = Math.max(
          subjectHistoryMap[row.subject] ?? Number.NEGATIVE_INFINITY,
          row.score
        );
      }
    }

    const subjectInsertRows = subjectScoresNow.map((row) => ({
      paper_id: paperId,
      paper_name: paperName ?? null,
      subject: row.subject,
      score: row.score,
      exam_type: 'bitsat',
    }));

    const { error: subjectInsertError } = await supabase
      .from('bitsat_subject_attempts')
      .insert(subjectInsertRows);

    if (subjectInsertError) {
      // Ignore table-missing / RLS issues to keep main result flow stable.
      console.warn('bitsat-insights subject insert skipped:', subjectInsertError.message);
    }

    const previousBestBySubject = subjectScoresNow.map((section) => {
      const seededBest = getSubjectBenchmarkScore(section.subject);
      const historicalBest = subjectHistoryMap[section.subject];
      const previousBestScore = Number.isFinite(historicalBest)
        ? Math.max(historicalBest, seededBest)
        : seededBest;

      return {
        subject: section.subject,
        currentSectionScore: section.score,
        previousBestScore,
      };
    });

    return Response.json({
      ok: true,
      benchmarkNote: getBitsatBenchmarkNote(),
      previousBestOverall,
      currentScore: score,
      testStanding: {
        attempts: paperScoresWithCurrent.length,
        rank: rankAmong(paperScoresWithCurrent, score),
        percentile: percentile(paperScoresWithCurrent, score),
        averageScore: Number(
          (
            paperScoresWithCurrent.reduce((sum, value) => sum + value, 0) /
            paperScoresWithCurrent.length
          ).toFixed(1)
        ),
      },
      globalStanding: {
        attempts: globalScores.length,
        rank: rankAmong(globalScores, score),
        percentile: percentile(globalScores, score),
      },
      previousBestBySubject,
    });
  } catch (err) {
    console.error('bitsat-insights error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
