import { generateStudyJson } from '@/lib/openaiStudy';

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const weakSubjects = Array.isArray(body?.weakSubjects) ? body.weakSubjects.slice(0, 5) : [];

    const result = await generateStudyJson({
      maxOutputTokens: 2600,
      instructions: [
        'You generate fresh practice questions for Indian entrance mock tests.',
        'Create original questions targeted to the given weak areas.',
        'Use 4 options per question and include a correct option index from 0 to 3.',
        'JSON shape: {"title":"...","durationMinutes":30,"questions":[{"subject":"...","text":"...","options":["..."],"correct":0,"explanation":"..."}]}',
      ].join(' '),
      input: {
        examType: body.examType || 'Mock Test',
        paperTitle: body.paperTitle || '',
        desiredCount: Math.max(5, Math.min(Number(body.desiredCount) || 10, 15)),
        weakSubjects,
        score: toNumber(body.score),
        totalMarks: toNumber(body.totalMarks),
        sectionStats: body.sectionStats || [],
      },
    });

    const questions = Array.isArray(result?.questions) ? result.questions.slice(0, 15) : [];
    return Response.json({ paper: { ...result, questions } });
  } catch (err) {
    console.error('ai-question-paper error:', err);
    return Response.json({ error: err.message || 'Unable to generate practice paper.' }, { status: 500 });
  }
}
