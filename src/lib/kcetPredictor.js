const RANK_ESTIMATION_TABLE = [
  { minIndex: 96, rankRange: '1 - 100', colleges: 'RVCE CSE, PES CSE, top circuit branches' },
  { minIndex: 93, rankRange: '101 - 500', colleges: 'RVCE/BMSCE/MSRIT core + CSE variants' },
  { minIndex: 90, rankRange: '501 - 2,000', colleges: 'BMSCE/MSRIT/DSCE top branches' },
  { minIndex: 86, rankRange: '2,001 - 6,000', colleges: 'DSCE/NIE/SJCE good branch options' },
  { minIndex: 82, rankRange: '6,001 - 15,000', colleges: 'SIT/JSSATE/NIE broader branch options' },
  { minIndex: 76, rankRange: '15,001 - 30,000', colleges: 'Good private colleges in Karnataka' },
  { minIndex: 70, rankRange: '30,001 - 55,000', colleges: 'Mid-tier colleges, many branch options' },
  { minIndex: 0, rankRange: '55,000+', colleges: 'Wide counselling options by category/region' },
];

const DIFFICULTY_INDEX_OFFSET = {
  easy: 2.4,
  moderate: 0,
  hard: -2.2,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function calculateCombinedScore(kcetMarks, boardMarks) {
  const safeKcet = clamp(Number(kcetMarks) || 0, 0, 180);
  const safeBoard = clamp(Number(boardMarks) || 0, 0, 300);

  const kcetPercentage = (safeKcet / 180) * 100;
  const boardPercentage = (safeBoard / 300) * 100;
  const combined = (kcetPercentage + boardPercentage) / 2;

  return {
    safeKcet,
    safeBoard,
    kcetPercentage,
    boardPercentage,
    combined,
  };
}

export function estimateKcetRank({
  kcetMarks,
  boardMarks,
  paperDifficulty = 'moderate',
  candidateGrowthPct = 8.3,
  repeaterPct = 26,
}) {
  const base = calculateCombinedScore(kcetMarks, boardMarks);
  const diffKey = String(paperDifficulty).toLowerCase();
  const difficultyOffset = DIFFICULTY_INDEX_OFFSET[diffKey] ?? DIFFICULTY_INDEX_OFFSET.moderate;

  // Competition pressure gathered from recent trend writeups.
  const growthPenalty = Math.max(0, Number(candidateGrowthPct) || 0) * 0.12;
  const repeaterPenalty = Math.max(0, (Number(repeaterPct) || 0) - 20) * 0.08;

  const adjustedIndex = clamp(
    base.combined - difficultyOffset - growthPenalty - repeaterPenalty,
    0,
    100
  );

  const band = RANK_ESTIMATION_TABLE.find((entry) => adjustedIndex >= entry.minIndex)
    || RANK_ESTIMATION_TABLE[RANK_ESTIMATION_TABLE.length - 1];

  return {
    ...base,
    adjustedIndex,
    estimatedRankRange: band.rankRange,
    colleges: band.colleges,
    factors: {
      paperDifficulty: diffKey,
      difficultyOffset,
      candidateGrowthPct: Number(candidateGrowthPct) || 0,
      repeaterPct: Number(repeaterPct) || 0,
      growthPenalty,
      repeaterPenalty,
    },
  };
}

export const kcetResearchSignals = {
  formula: '50% KCET marks + 50% board PCM percentage',
  notes: [
    'Marks-vs-rank shifts every year when paper level is easy/moderate/hard.',
    'Rising candidate count and repeater share increases rank competition at same marks.',
    'Use this as an estimate, final rank depends on KEA final normalization and reservation category.',
  ],
  defaults: {
    candidateGrowthPct: 8.3,
    repeaterPct: 26,
  },
};
