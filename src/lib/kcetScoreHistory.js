const STORAGE_KEY = 'kcet_score_history_v1';

function readHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(history) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function saveAttempt(entry) {
  const history = readHistory();
  const next = [
    ...history,
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      timestamp: Date.now(),
      ...entry,
    },
  ].slice(-150);

  writeHistory(next);
  return next;
}

export function getScoreHistory() {
  return readHistory();
}

export function getStanding(history, currentScore) {
  const attempts = Array.isArray(history) ? history : [];
  const scores = attempts
    .map((item) => Number(item.score))
    .filter((score) => Number.isFinite(score));

  const totalAttempts = scores.length;
  const previousBest = totalAttempts > 0 ? Math.max(...scores) : null;
  const averageScore = totalAttempts > 0
    ? scores.reduce((sum, value) => sum + value, 0) / totalAttempts
    : null;

  const betterOrEqual = scores.filter((score) => score >= currentScore).length;
  const rankAmongAttempts = betterOrEqual;

  const percentile = totalAttempts > 0
    ? ((scores.filter((score) => score <= currentScore).length / totalAttempts) * 100)
    : 100;

  return {
    totalAttempts,
    previousBest,
    averageScore,
    rankAmongAttempts,
    percentile,
  };
}
