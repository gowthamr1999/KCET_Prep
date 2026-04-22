const PAPER_BASELINE = {
  1: 258,
  2: 252,
  3: 248,
  4: 255,
  5: 242,
  6: 251,
  7: 246,
  8: 244,
  9: 262,
  10: 240,
};

const SUBJECT_BASELINE = {
  Physics: 84,
  Chemistry: 86,
  Mathematics: 95,
  English: 31,
  'Logical Reasoning': 22,
};

export function getPaperBenchmarkOverall(paperId) {
  return PAPER_BASELINE[paperId] ?? 250;
}

export function getSubjectBenchmarkScore(subject) {
  return SUBJECT_BASELINE[subject] ?? 0;
}

export function getBitsatBenchmarkNote() {
  return 'Benchmarks are seeded from public BITSAT score-vs-branch discussions and 5-10 year prep trend reports; they auto-update as real attempts grow.';
}
