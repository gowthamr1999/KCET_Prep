import { clampQuestions, generateStudyJson } from '@/lib/openaiStudy';

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeSectionStats(sectionStats) {
  if (!Array.isArray(sectionStats)) return [];
  return sectionStats.map((section) => ({
    sec: section.sec || section.subject || 'General',
    total: toNumber(section.total),
    correct: toNumber(section.correct),
    wrong: toNumber(section.wrong),
    unattempted: toNumber(section.unattempted),
    pct: toNumber(section.pct),
  }));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const questions = clampQuestions(body?.questions, 60);
    const answers = body?.answers && typeof body.answers === 'object' ? body.answers : {};
    const sectionStats = normalizeSectionStats(body?.sectionStats);
    const score = toNumber(body?.score, Number.NaN);
    const totalMarks = toNumber(body?.totalMarks, Number.NaN);

    if (!Number.isFinite(score) || !Number.isFinite(totalMarks) || totalMarks <= 0) {
      return Response.json({ error: 'Invalid performance payload: score and total marks are required.' }, { status: 400 });
    }

    const result = await generateStudyJson({
      maxOutputTokens: 1400,
      instructions: [
        'You are an honest exam performance coach.',
        'Analyze a completed mock test. Be specific, encouraging, and practical.',
        'Avoid inflated claims. Base your analysis on score, accuracy, subject stats, and answer patterns.',
        'JSON shape: {"standing":"...","summary":"...","strengths":["..."],"weaknesses":["..."],"nextSteps":["..."],"timeStrategy":"...","practiceFocus":["..."]}',
      ].join(' '),
      input: {
        examType: body.examType || 'Mock Test',
        paperTitle: body.paperTitle || 'Mock paper',
        score,
        totalMarks,
        correct: toNumber(body.correct),
        wrong: toNumber(body.wrong),
        unattempted: toNumber(body.unattempted),
        timeTaken: toNumber(body.timeTaken),
        sectionStats,
        answers,
        questions: questions.length ? questions : sectionStats.map((section, index) => ({
          number: index + 1,
          subject: section.sec,
          text: `${section.sec} section performance summary`,
          options: [],
          correct: null,
          explanation: '',
        })),
      },
    });

    return Response.json({ analysis: result });
  } catch (err) {
    console.error('ai-performance error:', err);
    return Response.json({ error: err.message || 'Unable to analyze performance.' }, { status: 500 });
  }
}
