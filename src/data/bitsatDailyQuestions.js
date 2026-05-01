export const bitsatDailyQuestionDate = '2026-05-01';
export const bitsatDailyPaperId = 20260501;

export const bitsatDailyPhysics = [
  {
    id: 'bdp20260501_1',
    subject: 'Physics',
    text: 'A projectile is fired with speed 20 m/s at 30 degrees to the horizontal. Taking g = 10 m/s^2, its range is:',
    options: ['20 sqrt(3) m', '40 sqrt(3) m', '20 m', '40 m'],
    correct: 0,
    explanation: 'Range R = u^2 sin 2theta / g = 400 x sin 60 degrees / 10 = 40 x sqrt(3)/2 = 20sqrt(3) m.'
  },
  {
    id: 'bdp20260501_2',
    subject: 'Physics',
    text: 'A capacitor of capacitance 4 microfarad is charged to 100 V. The energy stored in it is:',
    options: ['0.01 J', '0.02 J', '0.04 J', '0.08 J'],
    correct: 1,
    explanation: 'Energy U = (1/2)CV^2 = 0.5 x 4 x 10^-6 x 100^2 = 0.02 J.'
  },
  {
    id: 'bdp20260501_3',
    subject: 'Physics',
    text: 'For a convex mirror, the image formed of a real object is always:',
    options: ['Real, inverted, and magnified', 'Virtual, erect, and diminished', 'Real, erect, and diminished', 'Virtual, inverted, and magnified'],
    correct: 1,
    explanation: 'A convex mirror always forms a virtual, erect, and diminished image for a real object.'
  },
];

export const bitsatDailyChemistry = [
  {
    id: 'bdc20260501_1',
    subject: 'Chemistry',
    text: 'Which of the following has the highest first ionisation enthalpy?',
    options: ['Na', 'Mg', 'Al', 'Si'],
    correct: 3,
    explanation: 'First ionisation enthalpy generally increases across period 3. Although Mg is higher than Al due to a filled 3s subshell, Si is the highest among these options.'
  },
  {
    id: 'bdc20260501_2',
    subject: 'Chemistry',
    text: 'For the reaction N2 + 3H2 -> 2NH3, if the rate of disappearance of H2 is 0.06 mol L^-1 s^-1, the rate of formation of NH3 is:',
    options: ['0.02 mol L^-1 s^-1', '0.03 mol L^-1 s^-1', '0.04 mol L^-1 s^-1', '0.09 mol L^-1 s^-1'],
    correct: 2,
    explanation: 'Rate relation: -(1/3)d[H2]/dt = (1/2)d[NH3]/dt. So d[NH3]/dt = (2/3) x 0.06 = 0.04 mol L^-1 s^-1.'
  },
  {
    id: 'bdc20260501_3',
    subject: 'Chemistry',
    text: 'The major product obtained on dehydration of ethanol with concentrated H2SO4 at 443 K is:',
    options: ['Ethane', 'Ethene', 'Ethanal', 'Diethyl ether'],
    correct: 1,
    explanation: 'At 443 K, concentrated H2SO4 dehydrates ethanol mainly to ethene.'
  },
];

export const bitsatDailyMath = [
  {
    id: 'bdm20260501_1',
    subject: 'Mathematics',
    text: 'If f(x) = x^3 - 3x^2 + 2, then f\'(2) is:',
    options: ['0', '3', '6', '12'],
    correct: 0,
    explanation: 'f\'(x) = 3x^2 - 6x. Hence f\'(2) = 12 - 12 = 0.'
  },
  {
    id: 'bdm20260501_2',
    subject: 'Mathematics',
    text: 'The value of integral from 0 to 1 of 2x dx is:',
    options: ['0', '1/2', '1', '2'],
    correct: 2,
    explanation: 'Integral of 2x is x^2. From 0 to 1, the value is 1.'
  },
  {
    id: 'bdm20260501_3',
    subject: 'Mathematics',
    text: 'If z = 3 + 4i, then |z| is:',
    options: ['1', '5', '7', '25'],
    correct: 1,
    explanation: '|3 + 4i| = sqrt(3^2 + 4^2) = 5.'
  },
  {
    id: 'bdm20260501_4',
    subject: 'Mathematics',
    text: 'The number of ways to arrange the letters of the word LEVEL is:',
    options: ['20', '30', '60', '120'],
    correct: 1,
    explanation: 'LEVEL has 5 letters with L repeated twice and E repeated twice. Arrangements = 5!/(2!2!) = 30.'
  },
];

export const bitsatDailyEnglish = [
  {
    id: 'bde20260501_1',
    subject: 'English',
    text: 'Choose the word opposite in meaning to "scarce":',
    options: ['Rare', 'Plentiful', 'Hidden', 'Costly'],
    correct: 1,
    explanation: 'Scarce means insufficient or rare; its opposite is plentiful.'
  },
  {
    id: 'bde20260501_2',
    subject: 'English',
    text: 'Choose the grammatically correct sentence:',
    options: ['Neither of the answers are correct.', 'Neither of the answers is correct.', 'Neither answers is correct.', 'Neither of answer is correct.'],
    correct: 1,
    explanation: 'Neither is treated as singular here, so the correct verb is "is".'
  },
];

export const bitsatDailyLogic = [
  {
    id: 'bdl20260501_1',
    subject: 'Logical Reasoning',
    text: 'Find the next term in the series: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    correct: 2,
    explanation: 'The pattern is n(n+1): 1x2, 2x3, 3x4, 4x5, 5x6, so the next term is 6x7 = 42.'
  },
  {
    id: 'bdl20260501_2',
    subject: 'Logical Reasoning',
    text: 'If BOOK is coded as CPPL, then PAGE is coded as:',
    options: ['QBHF', 'QBGF', 'OZFD', 'QAHF'],
    correct: 0,
    explanation: 'Each letter is shifted forward by one: P->Q, A->B, G->H, E->F.'
  },
  {
    id: 'bdl20260501_3',
    subject: 'Logical Reasoning',
    text: 'A is the sister of B. B is the father of C. How is A related to C?',
    options: ['Mother', 'Aunt', 'Sister', 'Grandmother'],
    correct: 1,
    explanation: 'A is the sister of C\'s father, so A is C\'s aunt.'
  },
];

export const bitsatDailyQuestions = [
  ...bitsatDailyPhysics,
  ...bitsatDailyChemistry,
  ...bitsatDailyMath,
  ...bitsatDailyEnglish,
  ...bitsatDailyLogic,
];

export const latestBitsatDailyPaper = {
  id: bitsatDailyPaperId,
  slug: `daily-${bitsatDailyQuestionDate}`,
  title: `BITSAT Daily Practice - ${bitsatDailyQuestionDate}`,
  topics: 'Daily mixed practice | Physics, Chemistry, Mathematics, English, and Logical Reasoning',
  questions: bitsatDailyQuestions.length,
  duration: '35 Min',
  durationMinutes: 35,
  maxMarks: bitsatDailyQuestions.length * 3,
  scoring: '+3 / -1',
  description: 'Short all-subject BITSAT practice set for daily revision.',
  questionSet: bitsatDailyQuestions,
};
