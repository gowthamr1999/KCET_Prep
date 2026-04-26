export const bitsatDailyQuestionDate = '2026-04-26';
export const bitsatDailyPaperId = 20260426;

export const bitsatDailyPhysics = [
  {
    id: 'bdp20260426_1',
    subject: 'Physics',
    text: 'A projectile is fired with speed 20 m/s at an angle of 30 degrees to the horizontal. Taking g = 10 m/s^2, its maximum height is:',
    options: ['2.5 m', '5 m', '10 m', '20 m'],
    correct: 1,
    explanation: 'Vertical component u_y = 20 sin 30 = 10 m/s. Maximum height H = u_y^2/(2g) = 100/20 = 5 m.'
  },
  {
    id: 'bdp20260426_2',
    subject: 'Physics',
    text: 'Two capacitors of 6 microfarad and 3 microfarad are connected in series. Their equivalent capacitance is:',
    options: ['2 microfarad', '3 microfarad', '4.5 microfarad', '9 microfarad'],
    correct: 0,
    explanation: 'For series capacitors, C_eq = C1C2/(C1 + C2) = 6 x 3 / 9 = 2 microfarad.'
  },
  {
    id: 'bdp20260426_3',
    subject: 'Physics',
    text: 'A convex mirror always forms an image that is:',
    options: ['real, inverted and enlarged', 'virtual, erect and diminished', 'real, erect and diminished', 'virtual, inverted and enlarged'],
    correct: 1,
    explanation: 'A convex mirror forms a virtual, erect, and diminished image for all real object positions.'
  },
];

export const bitsatDailyChemistry = [
  {
    id: 'bdc20260426_1',
    subject: 'Chemistry',
    text: 'The conjugate base of H2PO4- is:',
    options: ['H3PO4', 'HPO4^2-', 'PO4^3-', 'H2PO4+'],
    correct: 1,
    explanation: 'A conjugate base is formed by removal of one proton. H2PO4- loses H+ to form HPO4^2-.'
  },
  {
    id: 'bdc20260426_2',
    subject: 'Chemistry',
    text: 'For a first-order reaction, the half-life is:',
    options: ['directly proportional to initial concentration', 'inversely proportional to initial concentration', 'independent of initial concentration', 'equal to k/0.693'],
    correct: 2,
    explanation: 'For first-order kinetics, t1/2 = 0.693/k, so it is independent of initial concentration.'
  },
  {
    id: 'bdc20260426_3',
    subject: 'Chemistry',
    text: 'Which reagent converts an alcohol to an aldehyde without further oxidation to acid?',
    options: ['KMnO4/H+', 'PCC', 'acidified K2Cr2O7', 'hot concentrated HNO3'],
    correct: 1,
    explanation: 'PCC oxidizes primary alcohols to aldehydes under mild conditions without usually giving carboxylic acids.'
  },
];

export const bitsatDailyMath = [
  {
    id: 'bdm20260426_1',
    subject: 'Mathematics',
    text: 'If f(x) = x^2 + 1, then f(f(2)) equals:',
    options: ['10', '17', '26', '37'],
    correct: 2,
    explanation: 'f(2) = 5, so f(f(2)) = f(5) = 25 + 1 = 26.'
  },
  {
    id: 'bdm20260426_2',
    subject: 'Mathematics',
    text: 'The value of the determinant |1 2; 3 4| is:',
    options: ['-2', '2', '10', '-10'],
    correct: 0,
    explanation: 'Determinant = 1 x 4 - 2 x 3 = 4 - 6 = -2.'
  },
  {
    id: 'bdm20260426_3',
    subject: 'Mathematics',
    text: 'If sin theta = 3/5 and theta is acute, then cos theta is:',
    options: ['3/5', '4/5', '5/4', '1/5'],
    correct: 1,
    explanation: 'For an acute angle, cos theta = sqrt(1 - sin^2 theta) = sqrt(1 - 9/25) = 4/5.'
  },
  {
    id: 'bdm20260426_4',
    subject: 'Mathematics',
    text: 'The mean of 4, 7, 9, 10, and 15 is:',
    options: ['8', '9', '10', '11'],
    correct: 1,
    explanation: 'Mean = (4 + 7 + 9 + 10 + 15)/5 = 45/5 = 9.'
  },
];

export const bitsatDailyEnglish = [
  {
    id: 'bde20260426_1',
    subject: 'English',
    text: 'Choose the word opposite in meaning to "optimistic":',
    options: ['hopeful', 'confident', 'pessimistic', 'cheerful'],
    correct: 2,
    explanation: 'Optimistic means hopeful or positive; pessimistic is the opposite.'
  },
  {
    id: 'bde20260426_2',
    subject: 'English',
    text: 'Choose the grammatically correct sentence:',
    options: ['The data is reliable.', 'The datas are reliable.', 'The data are reliable.', 'The data were a reliable.'],
    correct: 2,
    explanation: 'In formal usage, data is treated as plural, so "The data are reliable" is correct.'
  },
];

export const bitsatDailyLogic = [
  {
    id: 'bdl20260426_1',
    subject: 'Logical Reasoning',
    text: 'Find the next term in the series: 5, 11, 23, 47, ?',
    options: ['87', '93', '95', '99'],
    correct: 2,
    explanation: 'Each term is previous x 2 + 1: 5, 11, 23, 47, 95.'
  },
  {
    id: 'bdl20260426_2',
    subject: 'Logical Reasoning',
    text: 'If A means +, B means -, C means x, and D means /, then 12 C 3 B 8 A 4 equals:',
    options: ['28', '32', '36', '40'],
    correct: 1,
    explanation: 'Replace symbols: 12 x 3 - 8 + 4 = 36 - 8 + 4 = 32.'
  },
  {
    id: 'bdl20260426_3',
    subject: 'Logical Reasoning',
    text: 'Pointing to a woman, Rohan says, "She is the daughter of my father\'s only son." How is the woman related to Rohan?',
    options: ['Sister', 'Daughter', 'Mother', 'Cousin'],
    correct: 1,
    explanation: 'Rohan\'s father\'s only son is Rohan himself. The woman is Rohan\'s daughter.'
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
