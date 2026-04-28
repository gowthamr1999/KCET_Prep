export const bitsatDailyQuestionDate = '2026-04-28';
export const bitsatDailyPaperId = 20260428;

export const bitsatDailyPhysics = [
  {
    id: 'bdp20260428_1',
    subject: 'Physics',
    text: 'A body is thrown vertically upward with speed 30 m/s. Taking g = 10 m/s^2, the time taken to return to the point of projection is:',
    options: ['3 s', '4 s', '5 s', '6 s'],
    correct: 3,
    explanation: 'Time of flight for vertical projection is T = 2u/g = 2 x 30 / 10 = 6 s.'
  },
  {
    id: 'bdp20260428_2',
    subject: 'Physics',
    text: 'A 2 ohm and a 4 ohm resistor are connected in parallel across a 12 V battery. The total current drawn is:',
    options: ['3 A', '6 A', '9 A', '12 A'],
    correct: 2,
    explanation: 'Equivalent resistance is (2 x 4)/(2 + 4) = 4/3 ohm. Current I = V/R = 12/(4/3) = 9 A.'
  },
  {
    id: 'bdp20260428_3',
    subject: 'Physics',
    text: 'For a simple pendulum of length l, the time period is proportional to:',
    options: ['l', 'sqrt(l)', '1/l', '1/sqrt(l)'],
    correct: 1,
    explanation: 'T = 2pi sqrt(l/g), so the time period is proportional to sqrt(l).'
  },
];

export const bitsatDailyChemistry = [
  {
    id: 'bdc20260428_1',
    subject: 'Chemistry',
    text: 'Which element has the highest electronegativity?',
    options: ['Oxygen', 'Chlorine', 'Fluorine', 'Nitrogen'],
    correct: 2,
    explanation: 'Fluorine is the most electronegative element on the Pauling scale.'
  },
  {
    id: 'bdc20260428_2',
    subject: 'Chemistry',
    text: 'For an ideal gas, the compressibility factor Z is:',
    options: ['0', '1', 'greater than 1 always', 'less than 1 always'],
    correct: 1,
    explanation: 'For an ideal gas, PV = nRT, so Z = PV/nRT = 1.'
  },
  {
    id: 'bdc20260428_3',
    subject: 'Chemistry',
    text: 'The IUPAC name of CH3COCH3 is:',
    options: ['Propanal', 'Propanone', 'Ethanone', 'Methoxyethane'],
    correct: 1,
    explanation: 'CH3COCH3 is a three-carbon ketone, named propanone.'
  },
];

export const bitsatDailyMath = [
  {
    id: 'bdm20260428_1',
    subject: 'Mathematics',
    text: 'If A = [[1, 2], [0, 3]], then det(A) is:',
    options: ['1', '2', '3', '6'],
    correct: 2,
    explanation: 'For a 2 x 2 matrix, determinant = 1 x 3 - 2 x 0 = 3.'
  },
  {
    id: 'bdm20260428_2',
    subject: 'Mathematics',
    text: 'The derivative of e^(2x) with respect to x is:',
    options: ['e^(2x)', '2e^(2x)', 'e^x', '2e^x'],
    correct: 1,
    explanation: 'By chain rule, d/dx e^(2x) = 2e^(2x).'
  },
  {
    id: 'bdm20260428_3',
    subject: 'Mathematics',
    text: 'If two dice are thrown, the probability of getting a sum of 7 is:',
    options: ['1/12', '1/9', '1/6', '1/4'],
    correct: 2,
    explanation: 'Favourable outcomes are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1): 6 out of 36, so probability = 1/6.'
  },
  {
    id: 'bdm20260428_4',
    subject: 'Mathematics',
    text: 'The distance between the points (1, 2) and (4, 6) is:',
    options: ['3', '4', '5', '7'],
    correct: 2,
    explanation: 'Distance = sqrt((4 - 1)^2 + (6 - 2)^2) = sqrt(9 + 16) = 5.'
  },
];

export const bitsatDailyEnglish = [
  {
    id: 'bde20260428_1',
    subject: 'English',
    text: 'Choose the correct synonym of "brief":',
    options: ['Lengthy', 'Short', 'Complex', 'Hidden'],
    correct: 1,
    explanation: 'Brief means short or concise.'
  },
  {
    id: 'bde20260428_2',
    subject: 'English',
    text: 'Choose the correctly punctuated sentence:',
    options: ['However I was late.', 'However, I was late.', 'However I, was late.', 'However; I, was late.'],
    correct: 1,
    explanation: 'A comma is normally used after introductory however: "However, I was late."'
  },
];

export const bitsatDailyLogic = [
  {
    id: 'bdl20260428_1',
    subject: 'Logical Reasoning',
    text: 'Find the next term in the series: 4, 9, 19, 39, ?',
    options: ['69', '79', '89', '99'],
    correct: 1,
    explanation: 'Each term is previous x 2 + 1: 4, 9, 19, 39, 79.'
  },
  {
    id: 'bdl20260428_2',
    subject: 'Logical Reasoning',
    text: 'If SOUTH is coded as TPVUI, then NORTH is coded as:',
    options: ['OPSUI', 'MPSUI', 'OPTSI', 'OQSVI'],
    correct: 0,
    explanation: 'Each letter is shifted by +1: N->O, O->P, R->S, T->U, H->I.'
  },
  {
    id: 'bdl20260428_3',
    subject: 'Logical Reasoning',
    text: 'Riya walks 5 km east, then 3 km north. Her displacement from the starting point is:',
    options: ['8 km', 'sqrt(34) km', '2 km', '15 km'],
    correct: 1,
    explanation: 'The path forms a right triangle, so displacement = sqrt(5^2 + 3^2) = sqrt(34) km.'
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
