import { generateStudyJson } from '@/lib/openaiStudy';

export async function POST(request) {
  try {
    const body = await request.json();
    const question = body?.question;

    if (!question?.text || !Array.isArray(question?.options)) {
      return Response.json({ error: 'Invalid question payload' }, { status: 400 });
    }

    const result = await generateStudyJson({
      maxOutputTokens: 900,
      instructions: [
        'You are an exam tutor for Indian entrance mock tests.',
        'Explain one multiple-choice question in a clear, concise way.',
        'If a correct option index is supplied, use it. If not, infer cautiously.',
        'JSON shape: {"answerLabel":"A","answerText":"...","explanation":"...","concept":"...","shortcut":"...","commonMistake":"..."}',
      ].join(' '),
      input: {
        examType: body.examType || 'Mock Test',
        question: {
          subject: question.subject || 'General',
          text: question.text,
          options: question.options,
          correct: typeof question.correct === 'number' ? question.correct : null,
          existingExplanation: question.explanation || '',
        },
      },
    });

    return Response.json({ help: result });
  } catch (err) {
    console.error('ai-question-help error:', err);
    return Response.json({ error: err.message || 'Unable to generate AI help.' }, { status: 500 });
  }
}
