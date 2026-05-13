const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-5-mini';
const FALLBACK_MODEL = 'gpt-4.1-mini';

function getApiKey() {
  return process.env.dbkey || process.env.OPENAI_API_KEY || '';
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === 'string') return payload.output_text;

  const chunks = [];
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('\n').trim();
}

function parseJsonText(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) throw new Error('AI response was not valid JSON.');
    return JSON.parse(match[0]);
  }
}

export async function generateStudyJson({ instructions, input, maxOutputTokens = 1200 }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OpenAI API key missing. Add dbkey to .env.local.');
  }

  const model = process.env.OPENAI_STUDY_MODEL || DEFAULT_MODEL;
  const payload = {
    model,
    reasoning: { effort: 'low' },
    max_output_tokens: maxOutputTokens,
    instructions: `${instructions}\nReturn only compact JSON. Do not wrap it in markdown.`,
    input: JSON.stringify(input),
  };

  let response = await callResponsesApi(apiKey, payload);
  let responsePayload = await response.json().catch(() => null);

  if (
    !response.ok &&
    model !== FALLBACK_MODEL &&
    /model|does not exist|not found|unsupported|access/i.test(responsePayload?.error?.message || '')
  ) {
    response = await callResponsesApi(apiKey, { ...payload, model: FALLBACK_MODEL, reasoning: undefined });
    responsePayload = await response.json().catch(() => null);
  }

  if (!response.ok) {
    const message = responsePayload?.error?.message || 'OpenAI request failed.';
    throw new Error(message);
  }

  const text = extractOutputText(responsePayload);
  if (!text) throw new Error('OpenAI returned an empty response.');
  return parseJsonText(text);
}

async function callResponsesApi(apiKey, payload) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return response;
}

export function clampQuestions(questions, limit = 40) {
  if (!Array.isArray(questions)) return [];
  return questions.slice(0, limit).map((q, index) => ({
    number: index + 1,
    id: q.id,
    subject: q.subject || 'General',
    text: q.text || q.question || '',
    options: Array.isArray(q.options) ? q.options.slice(0, 6) : [],
    correct: typeof q.correct === 'number' ? q.correct : null,
    explanation: q.explanation || '',
  }));
}
