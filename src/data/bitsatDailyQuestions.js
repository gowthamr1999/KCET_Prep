export const bitsatDailyQuestionDate = '2026-04-25';
export const bitsatDailyPaperId = 20260425;

export const bitsatDailyPhysics = [
  {
    id: 'bdp20260425_1',
    subject: 'Physics',
    text: 'A particle executing SHM has amplitude A and angular frequency omega. Its speed when displacement is A/2 is:',
    options: ['omega A/2', 'omega A/sqrt(2)', 'sqrt(3) omega A/2', 'omega A'],
    correct: 2,
    explanation: 'For SHM, v = omega sqrt(A^2 - x^2). At x = A/2, v = omega A sqrt(3/4) = sqrt(3) omega A/2.'
  },
  {
    id: 'bdp20260425_2',
    subject: 'Physics',
    text: 'A wire of resistance R is stretched uniformly to double its length. Its new resistance is:',
    options: ['R/2', 'R', '2R', '4R'],
    correct: 3,
    explanation: 'Volume remains constant, so area halves when length doubles. Since R = rho L/A, new resistance becomes 4R.'
  },
  {
    id: 'bdp20260425_3',
    subject: 'Physics',
    text: 'The de Broglie wavelength of an electron accelerated through potential V is proportional to:',
    options: ['V', 'sqrt(V)', '1/sqrt(V)', '1/V'],
    correct: 2,
    explanation: 'lambda = h/sqrt(2meV), so de Broglie wavelength is inversely proportional to sqrt(V).'
  },
];

export const bitsatDailyChemistry = [
  {
    id: 'bdc20260425_1',
    subject: 'Chemistry',
    text: 'For the reaction 2A + B -> products, if the rate law is rate = k[A]^2[B], the overall order is:',
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'Overall order is the sum of powers in the rate law: 2 + 1 = 3.'
  },
  {
    id: 'bdc20260425_2',
    subject: 'Chemistry',
    text: 'Which complex is expected to show geometrical isomerism?',
    options: ['[Co(NH3)6]3+', '[Pt(NH3)2Cl2]', '[Ag(NH3)2]+', '[Ni(CO)4]'],
    correct: 1,
    explanation: 'Square planar [Pt(NH3)2Cl2] can exist as cis and trans isomers.'
  },
  {
    id: 'bdc20260425_3',
    subject: 'Chemistry',
    text: 'The major product when propene reacts with HBr in the absence of peroxide is:',
    options: ['1-bromopropane', '2-bromopropane', 'propane', 'propan-1-ol'],
    correct: 1,
    explanation: 'Without peroxide, HBr follows Markovnikov addition, giving 2-bromopropane as the major product.'
  },
];

export const bitsatDailyMath = [
  {
    id: 'bdm20260425_1',
    subject: 'Mathematics',
    text: 'If A is a 2 x 2 matrix with determinant 5, then det(3A) is:',
    options: ['15', '30', '45', '60'],
    correct: 2,
    explanation: 'For a 2 x 2 matrix, det(kA) = k^2 det(A). Thus det(3A) = 9 x 5 = 45.'
  },
  {
    id: 'bdm20260425_2',
    subject: 'Mathematics',
    text: 'The derivative of tan inverse x with respect to x is:',
    options: ['1/(1 + x^2)', '1/(1 - x^2)', '-1/(1 + x^2)', 'x/(1 + x^2)'],
    correct: 0,
    explanation: 'd/dx(tan inverse x) = 1/(1 + x^2).'
  },
  {
    id: 'bdm20260425_3',
    subject: 'Mathematics',
    text: 'If the probability of an event A is 0.35, then the probability of not A is:',
    options: ['0.35', '0.45', '0.65', '1.35'],
    correct: 2,
    explanation: 'P(not A) = 1 - P(A) = 1 - 0.35 = 0.65.'
  },
  {
    id: 'bdm20260425_4',
    subject: 'Mathematics',
    text: 'The equation of a circle with centre (0, 0) and radius 5 is:',
    options: ['x + y = 5', 'x^2 + y^2 = 25', 'x^2 - y^2 = 25', 'x^2 + y^2 = 5'],
    correct: 1,
    explanation: 'A circle with centre at origin and radius r has equation x^2 + y^2 = r^2. Here r = 5.'
  },
];

export const bitsatDailyEnglish = [
  {
    id: 'bde20260425_1',
    subject: 'English',
    text: 'Choose the word closest in meaning to "concise":',
    options: ['brief', 'careless', 'angry', 'ancient'],
    correct: 0,
    explanation: 'Concise means giving much information clearly in few words; brief is the closest meaning.'
  },
  {
    id: 'bde20260425_2',
    subject: 'English',
    text: 'Choose the correct sentence:',
    options: ['Neither of the answers are correct.', 'Neither of the answers is correct.', 'Neither answers is correct.', 'Neither of answer is correct.'],
    correct: 1,
    explanation: 'Neither is treated as singular here, so the correct verb is "is".'
  },
];

export const bitsatDailyLogic = [
  {
    id: 'bdl20260425_1',
    subject: 'Logical Reasoning',
    text: 'Find the next term: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '48'],
    correct: 1,
    explanation: 'The terms are n(n+1): 1x2, 2x3, 3x4, 4x5, 5x6, so next is 6x7 = 42.'
  },
  {
    id: 'bdl20260425_2',
    subject: 'Logical Reasoning',
    text: 'If SOUTH is coded as TPVUI by shifting each letter forward by one, then NORTH is coded as:',
    options: ['OPSUI', 'MNSUG', 'OPSUH', 'OPVUI'],
    correct: 0,
    explanation: 'Each letter shifts by +1: N->O, O->P, R->S, T->U, H->I.'
  },
  {
    id: 'bdl20260425_3',
    subject: 'Logical Reasoning',
    text: 'A is the brother of B. B is the sister of C. C is the father of D. How is A related to D?',
    options: ['Father', 'Uncle', 'Brother', 'Grandfather'],
    correct: 1,
    explanation: 'A is sibling of C, and C is D\'s father. Therefore A is D\'s uncle.'
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
