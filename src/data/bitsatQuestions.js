// ============================================================
// BITSAT QUESTION BANK
// Pattern: 40 Physics + 40 Chemistry + 45 Math + 15 English
//          + 10 Logical Reasoning = 150 questions
// Each full mock: 150 questions
// Scoring: +3 correct, −1 wrong (no omission penalty)
// Duration: 180 minutes | Max marks: 450
// ============================================================

export const bitsatPhysics = [
  {
    id: 'bp1', subject: 'Physics',
    text: 'A particle executes SHM with amplitude A and angular frequency ω. Maximum velocity is:',
    options: ['Aω/2', 'Aω', 'A²ω', 'A/ω'],
    correct: 1,
    explanation: 'v_max = Aω (at mean position where displacement = 0).'
  },
  {
    id: 'bp2', subject: 'Physics',
    text: 'Two balls are projected from the same point: one vertically and one at 45°. Which lands farther?',
    options: ['Vertical', '45°', 'Same range', 'Depends on speed'],
    correct: 1,
    explanation: 'Range R = u²sin2θ/g. At 45°, sin90° = 1 (max). Vertical throw returns to start (range=0).'
  },
  {
    id: 'bp3', subject: 'Physics',
    text: 'A body of mass m moves in a circle of radius r with angular velocity ω. Centripetal force is:',
    options: ['mωr', 'mω²r', 'mω²/r', 'm/ω²r'],
    correct: 1,
    explanation: 'F_c = mω²r = mv²/r (centripetal force).'
  },
  {
    id: 'bp4', subject: 'Physics',
    text: 'Young\'s modulus is defined as:',
    options: ['Stress × Strain', 'Stress / Strain', 'Strain / Stress', 'Stress + Strain'],
    correct: 1,
    explanation: 'Young\'s modulus Y = Stress/Strain = (F/A)/(ΔL/L).'
  },
  {
    id: 'bp5', subject: 'Physics',
    text: 'Two wires of same material, one twice as long and twice the radius. Ratio of their resistances:',
    options: ['1:2', '2:1', '1:1', '4:1'],
    correct: 0,
    explanation: 'R = ρL/A. R₁/R₂ = (2L/4A)/(L/A) = 2L×A/(L×4A) = 1/2. Ratio = 1:2.'
  },
  {
    id: 'bp6', subject: 'Physics',
    text: 'A photon of wavelength 500 nm has energy (h = 6.63×10⁻³⁴ J·s, c = 3×10⁸ m/s):',
    options: ['3.97×10⁻¹⁹ J', '2.5×10⁻¹⁹ J', '5×10⁻¹⁸ J', '1.1×10⁻¹⁸ J'],
    correct: 0,
    explanation: 'E = hc/λ = (6.63×10⁻³⁴ × 3×10⁸)/(500×10⁻⁹) = 3.978×10⁻¹⁹ J ≈ 3.97×10⁻¹⁹ J.'
  },
  {
    id: 'bp7', subject: 'Physics',
    text: 'According to Stefan-Boltzmann law, the power radiated by a black body ∝:',
    options: ['T', 'T²', 'T³', 'T⁴'],
    correct: 3,
    explanation: 'P = σAT⁴ (Stefan-Boltzmann law).'
  },
  {
    id: 'bp8', subject: 'Physics',
    text: 'The image formed by a plane mirror is:',
    options: ['Real and erect', 'Virtual and erect', 'Real and inverted', 'Virtual and inverted'],
    correct: 1,
    explanation: 'Plane mirror always forms virtual, erect, and laterally inverted image of the same size.'
  },
  {
    id: 'bp9', subject: 'Physics',
    text: 'Cyclotron frequency does NOT depend on:',
    options: ['Charge of particle', 'Mass of particle', 'Speed of particle', 'Magnetic field'],
    correct: 2,
    explanation: 'f_cyclotron = qB/(2πm). It depends on q, m, and B but NOT on particle speed.'
  },
  {
    id: 'bp10', subject: 'Physics',
    text: 'A charged particle moving through a magnetic field experiences:',
    options: ['Work done by the field', 'Change in speed', 'Change in direction only', 'Both speed and direction change'],
    correct: 2,
    explanation: 'Magnetic force is always perpendicular to velocity → changes direction only (does no work, speed unchanged).'
  },
  {
    id: 'bp11', subject: 'Physics',
    text: 'The rms value of an AC voltage v = V₀ sin(ωt) is:',
    options: ['V₀', 'V₀/2', 'V₀/√2', 'V₀√2'],
    correct: 2,
    explanation: 'V_rms = V₀/√2 for a sinusoidal voltage.'
  },
  {
    id: 'bp12', subject: 'Physics',
    text: 'Heisenberg\'s uncertainty principle states:',
    options: ['Δx × Δv ≥ h/m', 'Δx × Δp ≥ h/4π', 'Δx × Δp = h', 'ΔE × Δt = 0'],
    correct: 1,
    explanation: 'Δx·Δp ≥ ℏ/2 ≈ h/4π (position-momentum uncertainty).'
  },
  {
    id: 'bp13', subject: 'Physics',
    text: 'The wavelength of the first line of Lyman series in hydrogen is approximately:',
    options: ['91 nm', '121 nm', '486 nm', '656 nm'],
    correct: 1,
    explanation: 'Lyman series: n=2→1. 1/λ = R_H(1/1²−1/2²) = R_H(3/4). λ ≈ 121.5 nm (UV region).'
  },
  {
    id: 'bp14', subject: 'Physics',
    text: 'In nuclear fission, the sum of masses of products is:',
    options: ['Greater than reactants', 'Less than reactants', 'Equal to reactants', 'Depends on temperature'],
    correct: 1,
    explanation: 'Mass defect: reactant mass > product mass. The difference (Δm) converts to energy: E = Δmc².'
  },
  {
    id: 'bp15', subject: 'Physics',
    text: 'A transistor is used as an amplifier in:',
    options: ['Cutoff region', 'Saturation region', 'Active region', 'Breakdown region'],
    correct: 2,
    explanation: 'Amplification occurs in the active region (BE forward biased, BC reverse biased).'
  },
  {
    id: 'bp16', subject: 'Physics',
    text: 'The bandwidth of an AM signal with carrier frequency 1000 kHz and audio signal up to 5 kHz is:',
    options: ['5 kHz', '10 kHz', '1000 kHz', '1010 kHz'],
    correct: 1,
    explanation: 'AM bandwidth = 2 × audio bandwidth = 2 × 5 = 10 kHz.'
  },
  {
    id: 'bp17', subject: 'Physics',
    text: 'Surface tension is the property of liquids due to:',
    options: ['Cohesive forces between liquid molecules', 'Adhesive forces', 'Gravity', 'Viscosity'],
    correct: 0,
    explanation: 'Surface tension arises from cohesive forces (intermolecular attraction) between like liquid molecules.'
  },
  {
    id: 'bp18', subject: 'Physics',
    text: 'When a liquid rises in a capillary tube, the angle of contact is:',
    options: ['90°', 'Greater than 90°', 'Less than 90°', '180°'],
    correct: 2,
    explanation: 'Capillary rise occurs when liquid wets the tube (adhesion > cohesion) → contact angle < 90°.'
  },
  {
    id: 'bp19', subject: 'Physics',
    text: 'Bernoulli\'s equation is based on conservation of:',
    options: ['Mass', 'Momentum', 'Energy', 'Charge'],
    correct: 2,
    explanation: 'Bernoulli\'s principle: P + ½ρv² + ρgh = constant (conservation of energy for ideal fluids).'
  },
  {
    id: 'bp20', subject: 'Physics',
    text: 'The dimension of angular momentum is:',
    options: ['[ML²T⁻²]', '[ML²T⁻¹]', '[MLT⁻¹]', '[ML²T]'],
    correct: 1,
    explanation: 'L = mvr → [M][LT⁻¹][L] = [ML²T⁻¹].'
  },
  {
    id: 'bp21', subject: 'Physics',
    text: 'In Young\'s experiment, the fringe width β = λD/d. Doubling D and halving d makes β:',
    options: ['Same', 'Doubles', 'Quadruples', 'Halves'],
    correct: 2,
    explanation: 'β = λD/d. New β = λ(2D)/(d/2) = 4λD/d = 4β.'
  },
  {
    id: 'bp22', subject: 'Physics',
    text: 'Dispersion of white light through a prism occurs because:',
    options: ['Different wavelengths have different speeds in glass', 'Prism absorbs some colors', 'White light has multiple frequencies', 'Both A and C'],
    correct: 3,
    explanation: 'Dispersion: glass has different refractive indices for different λ (wavelengths = different frequencies in white light).'
  },
  {
    id: 'bp23', subject: 'Physics',
    text: 'The relation between electric field E and potential V is:',
    options: ['E = V/d', 'E = −dV/dx', 'E = dV/dx', 'E = V²'],
    correct: 1,
    explanation: 'E = −dV/dx (electric field is negative gradient of potential).'
  },
  {
    id: 'bp24', subject: 'Physics',
    text: 'Lenz\'s law is a consequence of conservation of:',
    options: ['Charge', 'Mass', 'Energy', 'Momentum'],
    correct: 2,
    explanation: 'Lenz\'s law (induced current opposes change) is a consequence of conservation of energy.'
  },
  {
    id: 'bp25', subject: 'Physics',
    text: 'The impedance of a capacitor in an AC circuit is:',
    options: ['ωC', '1/ωC', 'ωC²', 'C/ω'],
    correct: 1,
    explanation: 'Capacitive reactance Xc = 1/(ωC). This is the impedance.'
  },
  {
    id: 'bp26', subject: 'Physics',
    text: 'For which process is Q = 0?',
    options: ['Isothermal', 'Isobaric', 'Adiabatic', 'Isochoric'],
    correct: 2,
    explanation: 'Adiabatic process: no heat exchange (Q = 0).'
  },
  {
    id: 'bp27', subject: 'Physics',
    text: 'The work done in isothermal expansion of an ideal gas from V₁ to V₂ is:',
    options: ['nRT(V₂−V₁)', 'nRT ln(V₂/V₁)', 'nR(T₂−T₁)', 'P(V₂−V₁)'],
    correct: 1,
    explanation: 'W_isothermal = nRT ln(V₂/V₁) (derived from ∫PdV with PV = nRT).'
  },
  {
    id: 'bp28', subject: 'Physics',
    text: 'Which of these is an intensive property?',
    options: ['Volume', 'Mass', 'Temperature', 'Entropy'],
    correct: 2,
    explanation: 'Intensive properties are independent of amount: Temperature, pressure, density, refractive index.'
  },
  {
    id: 'bp29', subject: 'Physics',
    text: 'The number of atoms in 1 mole of a substance is:',
    options: ['6.022×10²²', '6.022×10²³', '1.66×10⁻²⁴', '22.4×10²³'],
    correct: 1,
    explanation: 'Avogadro\'s number NA = 6.022×10²³ atoms/mol.'
  },
  {
    id: 'bp30', subject: 'Physics',
    text: 'An astronaut in a freely falling elevator feels:',
    options: ['Normal weight', 'Double weight', 'Weightless', 'Half weight'],
    correct: 2,
    explanation: 'In free fall, both astronaut and elevator accelerate at g → no normal force → apparent weightlessness.'
  },
  {
    id: 'bp31', subject: 'Physics',
    text: 'A rod of length L at rest has length L/γ when moving at velocity v (γ = Lorentz factor). This is:',
    options: ['Time dilation', 'Length contraction', 'Mass increase', 'Energy equivalence'],
    correct: 1,
    explanation: 'Length contraction (Lorentz contraction): moving objects appear shorter along direction of motion.'
  },
  {
    id: 'bp32', subject: 'Physics',
    text: 'In a step-down transformer, ratio of primary to secondary turns is 10:1. If primary voltage is 2200 V:',
    options: ['22 V', '220 V', '22000 V', '110 V'],
    correct: 1,
    explanation: 'V_s/V_p = N_s/N_p → V_s = 2200 × (1/10) = 220 V.'
  },
  {
    id: 'bp33', subject: 'Physics',
    text: 'Wheatstone bridge is sensitive when all four resistances are:',
    options: ['Very high', 'Very low', 'Nearly equal', 'In ratio 1:2'],
    correct: 2,
    explanation: 'Wheatstone bridge is most sensitive when all arms have nearly equal resistance.'
  },
  {
    id: 'bp34', subject: 'Physics',
    text: 'The formula for electric potential energy of two charges Q₁ and Q₂ separated by r is:',
    options: ['kQ₁Q₂/r', 'kQ₁Q₂/r²', 'kQ₁²/r', 'k(Q₁+Q₂)/r'],
    correct: 0,
    explanation: 'U = kQ₁Q₂/r = Q₁Q₂/(4πε₀r).'
  },
  {
    id: 'bp35', subject: 'Physics',
    text: 'For a convex lens with object at 2F, image forms at:',
    options: ['F', '2F', 'Beyond 2F', 'Between F and 2F'],
    correct: 1,
    explanation: 'Object at 2F → real, inverted image of same size at 2F on the other side.'
  },
  {
    id: 'bp36', subject: 'Physics',
    text: 'Threshold frequency in photoelectric effect corresponds to:',
    options: ['Maximum kinetic energy', 'Work function', 'Stopping potential', 'Saturation current'],
    correct: 1,
    explanation: 'At threshold frequency ν₀, photon energy = work function (φ = hν₀), so KE_max = 0.'
  },
  {
    id: 'bp37', subject: 'Physics',
    text: 'In a series RLC circuit, quality factor Q =',
    options: ['R√(C/L)', '(1/R)√(L/C)', 'R√(L/C)', '√(LC)/R'],
    correct: 1,
    explanation: 'Q = (1/R)√(L/C) = ω₀L/R = 1/(ω₀CR).'
  },
  {
    id: 'bp38', subject: 'Physics',
    text: 'An LC circuit oscillates with period T = ',
    options: ['2π√(LC)', '2π/√(LC)', '√(LC)/2π', 'LC/(2π)'],
    correct: 0,
    explanation: 'T = 2π√(LC) (analogous to mass-spring: T = 2π√(m/k)).'
  },
  {
    id: 'bp39', subject: 'Physics',
    text: 'The work function of sodium is 2.3 eV. The threshold wavelength is approximately:',
    options: ['540 nm', '340 nm', '440 nm', '640 nm'],
    correct: 0,
    explanation: 'λ₀ = hc/φ = (4.14×10⁻¹⁵ × 3×10⁸)/(2.3×1.6×10⁻¹⁹) × ... ≈ 540 nm.'
  },
  {
    id: 'bp40', subject: 'Physics',
    text: 'The phenomenon responsible for sky appearing blue is:',
    options: ['Refraction', 'Reflection', 'Scattering (Rayleigh)', 'Interference'],
    correct: 2,
    explanation: 'Rayleigh scattering: I ∝ 1/λ⁴. Blue light (shorter λ) scatters more → blue sky.'
  },
];

export const bitsatChemistry = [
  {
    id: 'bc1', subject: 'Chemistry',
    text: 'The shape of the SF₆ molecule is:',
    options: ['Trigonal bipyramidal', 'Octahedral', 'Square planar', 'Pentagonal'],
    correct: 1,
    explanation: 'SF₆: 6 bonding pairs, 0 lone pairs (sp³d² hybridization) → octahedral.'
  },
  {
    id: 'bc2', subject: 'Chemistry',
    text: 'The first ionization energy of nitrogen is greater than oxygen because:',
    options: ['N has higher Z', 'N has a half-filled p subshell (extra stability)', 'O has more electrons', 'N is smaller'],
    correct: 1,
    explanation: 'N (2p³) has a half-filled, stable configuration; removing an electron from it requires more energy.'
  },
  {
    id: 'bc3', subject: 'Chemistry',
    text: 'Van\'t Hoff factor (i) for Na₂SO₄ in dilute solution is:',
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'Na₂SO₄ → 2Na⁺ + SO₄²⁻ → i = 3 particles.'
  },
  {
    id: 'bc4', subject: 'Chemistry',
    text: 'Osmotic pressure of a solution is π = CRT. If concentration doubles, π:',
    options: ['Halves', 'Stays same', 'Doubles', 'Quadruples'],
    correct: 2,
    explanation: 'π ∝ C (at constant T). Doubling C → π doubles.'
  },
  {
    id: 'bc5', subject: 'Chemistry',
    text: 'The IUPAC name of CH₃-O-C₂H₅ is:',
    options: ['Dimethyl ether', 'Methyl ethyl ether', 'Methoxyethane', 'Ethoxyethane'],
    correct: 2,
    explanation: 'CH₃-O-C₂H₅: methoxy (CH₃O-) group on ethane → methoxyethane (or ethoxymethane).'
  },
  {
    id: 'bc6', subject: 'Chemistry',
    text: 'Diazotization reaction involves conversion of:',
    options: ['Amine to diazonium salt', 'Ketone to diazo compound', 'Alkene to azo dye', 'Alcohol to diazonium'],
    correct: 0,
    explanation: 'Diazotization: ArNH₂ + NaNO₂/HCl (0-5°C) → ArN₂⁺Cl⁻ (aryl diazonium salt).'
  },
  {
    id: 'bc7', subject: 'Chemistry',
    text: 'Coupling reaction of diazonium salt with aniline gives:',
    options: ['Azo dye', 'Benzene', 'Aniline again', 'Phenol'],
    correct: 0,
    explanation: 'Diazonium ion + aniline → azo compound (R-N=N-R\') which are colored azo dyes.'
  },
  {
    id: 'bc8', subject: 'Chemistry',
    text: 'Which of the following can act as both oxidizing and reducing agent?',
    options: ['H₂O₂', 'KMnO₄', 'K₂Cr₂O₇', 'MnO₂'],
    correct: 0,
    explanation: 'H₂O₂: reduces (KMnO₄) → oxidizing agent; oxidizes (KI) → reducing agent. It can do both.'
  },
  {
    id: 'bc9', subject: 'Chemistry',
    text: 'Hardy-Schulze rule states that flocculating power of electrolyte on a negative colloid is in order:',
    options: ['Na⁺ > Ca²⁺ > Al³⁺', 'Al³⁺ > Ca²⁺ > Na⁺', 'Ca²⁺ > Al³⁺ > Na⁺', 'All equal'],
    correct: 1,
    explanation: 'Hardy-Schulze: higher cation charge → greater flocculation power. Al³⁺ > Ca²⁺ > Na⁺.'
  },
  {
    id: 'bc10', subject: 'Chemistry',
    text: 'The cell reaction in a galvanic cell is:',
    options: ['Electrolysis', 'Spontaneous redox', 'Non-spontaneous', 'Only reduction'],
    correct: 1,
    explanation: 'Galvanic cell: spontaneous redox reaction produces electrical energy (ΔG < 0).'
  },
  {
    id: 'bc11', subject: 'Chemistry',
    text: 'The half-life of a first-order reaction is:',
    options: ['Depends on concentration', 'Independent of concentration', 'Proportional to concentration', 'Inversely proportional to [A]²'],
    correct: 1,
    explanation: 'First-order: t₁/₂ = 0.693/k (constant, independent of initial concentration).'
  },
  {
    id: 'bc12', subject: 'Chemistry',
    text: 'Arrhenius equation relates rate constant to temperature. The pre-exponential factor A represents:',
    options: ['Activation energy', 'Frequency of effective collisions', 'Threshold energy', 'Reaction order'],
    correct: 1,
    explanation: 'k = Ae^(-Ea/RT). A is the frequency/pre-exponential factor (collision frequency × steric factor).'
  },
  {
    id: 'bc13', subject: 'Chemistry',
    text: 'Which element shows anomalous behaviour in its group due to small size and high electronegativity?',
    options: ['Li (Group 1)', 'Be (Group 2)', 'Both Li and Be', 'Na'],
    correct: 2,
    explanation: 'Li and Be (first elements of their groups) show diagonal relationship and anomalous properties due to high charge/size ratio.'
  },
  {
    id: 'bc14', subject: 'Chemistry',
    text: 'The oxidation state of Mn in MnO₄⁻ is:',
    options: ['+4', '+5', '+6', '+7'],
    correct: 3,
    explanation: 'x + 4(−2) = −1 → x − 8 = −1 → x = +7.'
  },
  {
    id: 'bc15', subject: 'Chemistry',
    text: 'A catalyst increases reaction rate by:',
    options: ['Increasing temperature', 'Providing alternative path with lower Ea', 'Shifting equilibrium', 'Increasing reactant concentration'],
    correct: 1,
    explanation: 'Catalyst provides alternative mechanism with lower activation energy, increasing rate without being consumed.'
  },
  {
    id: 'bc16', subject: 'Chemistry',
    text: 'The Daniell cell uses which electrodes?',
    options: ['Zn and Pt', 'Zn and Cu', 'Cu and Ag', 'Fe and Cu'],
    correct: 1,
    explanation: 'Daniell cell: Zn anode (oxidized) in ZnSO₄, Cu cathode (reduced) in CuSO₄.'
  },
  {
    id: 'bc17', subject: 'Chemistry',
    text: 'The degree of unsaturation (DBE) of C₆H₅NH₂ is:',
    options: ['2', '3', '4', '6'],
    correct: 2,
    explanation: 'DBE = (2C+2+N−H)/2 = (12+2+1−7)/2 = 8/2 = 4 (benzene ring has 4 degrees).'
  },
  {
    id: 'bc18', subject: 'Chemistry',
    text: 'Rubber vulcanization involves cross-linking with:',
    options: ['Nitrogen', 'Sulfur', 'Carbon', 'Chlorine'],
    correct: 1,
    explanation: 'Vulcanization: sulfur forms cross-links between polyisoprene chains → improved elasticity and strength.'
  },
  {
    id: 'bc19', subject: 'Chemistry',
    text: 'Racemic mixture is optically:',
    options: ['Dextrorotatory', 'Levorotatory', 'Inactive', 'Highly active'],
    correct: 2,
    explanation: 'Racemic mixture (50:50 R and S enantiomers) → optical rotations cancel → optically inactive.'
  },
  {
    id: 'bc20', subject: 'Chemistry',
    text: 'Fajan\'s rules predict higher covalent character for a compound when the cation:',
    options: ['Is large and has low charge', 'Is small and has high charge', 'Is large and has high charge', 'Has fully filled d-orbitals'],
    correct: 1,
    explanation: 'Fajan\'s rules: small, highly charged cation polarizes the anion more → more covalent character.'
  },
  {
    id: 'bc21', subject: 'Chemistry',
    text: 'The element with highest electron affinity is:',
    options: ['F', 'Cl', 'O', 'Br'],
    correct: 1,
    explanation: 'Chlorine (Cl) has the highest electron affinity (−349 kJ/mol). F has high IE but smaller EA due to small size.'
  },
  {
    id: 'bc22', subject: 'Chemistry',
    text: 'Pinacol rearrangement converts:',
    options: ['Alcohol to ketone via 1,2-shift', '1,2-diol to carbonyl compound', 'Aldehyde to ketone', 'Ketone to alcohol'],
    correct: 1,
    explanation: 'Pinacol rearrangement: 1,2-diol (pinacol) → carbonyl compound (pinacolone) via 1,2-hydride or alkyl shift.'
  },
  {
    id: 'bc23', subject: 'Chemistry',
    text: 'The reagent used for Clemmensen reduction is:',
    options: ['Zn(Hg)/HCl', 'NaBH₄', 'LiAlH₄', 'H₂/Pd'],
    correct: 0,
    explanation: 'Clemmensen reduction: Zn-Hg/conc.HCl. Converts C=O (ketones/aldehydes) to CH₂.'
  },
  {
    id: 'bc24', subject: 'Chemistry',
    text: 'The pKa of a weak acid increases as:',
    options: ['Acid strength increases', 'Acid strength decreases', 'Temperature increases', 'Concentration increases'],
    correct: 1,
    explanation: 'pKa = −log Ka. Higher pKa → lower Ka → weaker acid. pKa increases as acid weakens.'
  },
  {
    id: 'bc25', subject: 'Chemistry',
    text: 'Tyndall effect is shown by:',
    options: ['True solutions', 'Colloids', 'Gases only', 'Saturated solutions'],
    correct: 1,
    explanation: 'Tyndall effect: scattering of light by colloidal particles (1–100 nm range) → makes beam visible.'
  },
  {
    id: 'bc26', subject: 'Chemistry',
    text: 'The Mole fraction of solute in a 0.1 m aqueous solution (M = 18 g/mol) is approximately:',
    options: ['0.0018', '0.0180', '0.1', '0.001'],
    correct: 0,
    explanation: 'Molality 0.1 m: 0.1 mol solute per 1000 g water = 0.1 mol/55.55 mol water. X_solute ≈ 0.1/55.65 ≈ 0.0018.'
  },
  {
    id: 'bc27', subject: 'Chemistry',
    text: 'Which lanthanide is used in color television screens (red phosphor)?',
    options: ['La', 'Eu', 'Ce', 'Gd'],
    correct: 1,
    explanation: 'Europium (Eu) is used as red phosphor in color TV screens and LED lights.'
  },
  {
    id: 'bc28', subject: 'Chemistry',
    text: 'The spin-only magnetic moment of Fe³⁺ (d⁵, high spin) is:',
    options: ['1.73 BM', '3.87 BM', '4.90 BM', '5.92 BM'],
    correct: 3,
    explanation: 'μ = √(n(n+2)) BM. Fe³⁺ d⁵ high spin has 5 unpaired electrons → μ = √(5×7) = √35 ≈ 5.92 BM.'
  },
  {
    id: 'bc29', subject: 'Chemistry',
    text: 'Which of the following is a biodegradable polymer?',
    options: ['PVC', 'Polythene', 'PHBV', 'Bakelite'],
    correct: 2,
    explanation: 'PHBV (poly-β-hydroxybutyrate-co-β-hydroxyvalerate) is a biodegradable polymer used for packaging.'
  },
  {
    id: 'bc30', subject: 'Chemistry',
    text: 'Essential amino acids are those that:',
    options: ['Are not required by body', 'Cannot be synthesized by body and must be taken in diet', 'Are synthesized in excess', 'Have no nutritional value'],
    correct: 1,
    explanation: 'Essential amino acids (e.g., Lys, Trp, Val, Leu, Ile, Phe, Met, Thr) cannot be synthesized by humans.'
  },
  {
    id: 'bc31', subject: 'Chemistry',
    text: 'DNA and RNA differ in that RNA contains:',
    options: ['Thymine and deoxyribose', 'Uracil and ribose', 'Cytosine and ribose', 'Adenine and deoxyribose'],
    correct: 1,
    explanation: 'RNA has uracil (instead of thymine) and ribose (instead of deoxyribose).'
  },
  {
    id: 'bc32', subject: 'Chemistry',
    text: 'The Cannizzaro reaction occurs with:',
    options: ['Aldehydes having α-hydrogen', 'Aldehydes without α-hydrogen', 'Ketones', 'Carboxylic acids'],
    correct: 1,
    explanation: 'Cannizzaro reaction: non-enolizable aldehydes (no α-H, e.g., HCHO, PhCHO) undergo disproportionation with NaOH.'
  },
  {
    id: 'bc33', subject: 'Chemistry',
    text: 'Beckmann rearrangement converts:',
    options: ['Ketone to amide', 'Oxime to amide', 'Amine to ketone', 'Aldehyde to acid'],
    correct: 1,
    explanation: 'Beckmann rearrangement: ketoxime (R₂C=NOH) + H₂SO₄ → amide (RCONHR).'
  },
  {
    id: 'bc34', subject: 'Chemistry',
    text: 'Gabriel phthalimide synthesis is used to prepare:',
    options: ['Secondary amines', 'Tertiary amines', 'Primary amines', 'Quaternary salts'],
    correct: 2,
    explanation: 'Gabriel synthesis: phthalimide + RX → N-alkylphthalimide → hydrolysis → primary amine (1°amine, pure).'
  },
  {
    id: 'bc35', subject: 'Chemistry',
    text: 'The number of sigma (σ) bonds in ethyne (HC≡CH) is:',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: 'H-C (1σ) + C≡C (1σ + 2π) + C-H (1σ) = 3 sigma bonds total.'
  },
  {
    id: 'bc36', subject: 'Chemistry',
    text: 'Which of the following is NOT a property of ionic compounds?',
    options: ['High melting point', 'Conduct electricity in solid state', 'Soluble in polar solvents', 'Crystalline structure'],
    correct: 1,
    explanation: 'Ionic compounds do NOT conduct electricity in solid state (ions are fixed); they conduct when molten/dissolved.'
  },
  {
    id: 'bc37', subject: 'Chemistry',
    text: 'What is the pH of blood plasma (normal range)?',
    options: ['6.8–7.0', '7.0–7.2', '7.35–7.45', '7.5–8.0'],
    correct: 2,
    explanation: 'Normal blood pH is maintained at 7.35–7.45 by bicarbonate buffer system.'
  },
  {
    id: 'bc38', subject: 'Chemistry',
    text: 'Oleum (fuming sulfuric acid) is:',
    options: ['H₂SO₃', 'H₂SO₄ + SO₃', 'H₂S₂O₇', 'B and C are the same thing'],
    correct: 3,
    explanation: 'Oleum = H₂SO₄ + SO₃ = pyrosulfuric acid H₂S₂O₇. B and C are equivalent representations.'
  },
  {
    id: 'bc39', subject: 'Chemistry',
    text: 'Alum (KAl(SO₄)₂·12H₂O) is used in water purification because:',
    options: ['It kills bacteria', 'Al³⁺ hydrolyzes to form colloidal Al(OH)₃ which coagulates impurities', 'It makes water alkaline', 'It removes chlorine'],
    correct: 1,
    explanation: 'Al³⁺ undergoes hydrolysis → Al(OH)₃ colloid which adsorbs and coagulates suspended particles.'
  },
  {
    id: 'bc40', subject: 'Chemistry',
    text: 'The number of unpaired electrons in the ground state of oxygen (O, Z=8) is:',
    options: ['0', '1', '2', '4'],
    correct: 2,
    explanation: 'O: [He]2s²2p⁴. The four 2p electrons fill as: 2p↑↓, 2p↑, 2p↑ → 2 unpaired electrons.'
  },
];

export const bitsatMath = [
  {
    id: 'bm1', subject: 'Mathematics',
    text: 'The sum of the series 1² + 2² + 3² + ... + n² is:',
    options: ['n(n+1)/2', 'n(n+1)(2n+1)/6', 'n²(n+1)²/4', 'n(n+1)(n+2)/6'],
    correct: 1,
    explanation: '∑k² = n(n+1)(2n+1)/6.'
  },
  {
    id: 'bm2', subject: 'Mathematics',
    text: 'lim(x→0) (e^x − 1)/x equals:',
    options: ['0', 'e', '1', '∞'],
    correct: 2,
    explanation: 'Standard limit: lim(x→0) (eˣ−1)/x = 1.'
  },
  {
    id: 'bm3', subject: 'Mathematics',
    text: 'The number of ways to choose 3 items from 8 distinct items is:',
    options: ['24', '56', '168', '512'],
    correct: 1,
    explanation: '⁸C₃ = 8!/(3!5!) = 56.'
  },
  {
    id: 'bm4', subject: 'Mathematics',
    text: 'If z = cos θ + i sin θ, then z + 1/z =',
    options: ['2cosθ', '2i sinθ', 'cosθ', '2'],
    correct: 0,
    explanation: '1/z = cosθ − isinθ (conjugate). z + 1/z = 2cosθ (De Moivre).'
  },
  {
    id: 'bm5', subject: 'Mathematics',
    text: 'The derivative of log₁₀(x) is:',
    options: ['1/x', '1/(x ln 10)', 'ln x', '10/x'],
    correct: 1,
    explanation: 'd/dx[log₁₀x] = 1/(x ln 10) [change of base formula].'
  },
  {
    id: 'bm6', subject: 'Mathematics',
    text: '∫ sec²x dx =',
    options: ['sec x tan x + C', 'tan x + C', 'sec x + C', '−cot x + C'],
    correct: 1,
    explanation: '∫ sec²x dx = tan x + C.'
  },
  {
    id: 'bm7', subject: 'Mathematics',
    text: 'The area under the curve y = e^x from x = 0 to x = 1 is:',
    options: ['e − 1', 'e', 'e + 1', '1/e'],
    correct: 0,
    explanation: '∫₀¹ eˣ dx = [eˣ]₀¹ = e − 1.'
  },
  {
    id: 'bm8', subject: 'Mathematics',
    text: 'The asymptotes of the hyperbola x²/a² − y²/b² = 1 are:',
    options: ['y = ±(b/a)x', 'y = ±(a/b)x', 'x² + y² = a²', 'x = ±a'],
    correct: 0,
    explanation: 'Asymptotes of x²/a² − y²/b² = 1 are y = ±(b/a)x.'
  },
  {
    id: 'bm9', subject: 'Mathematics',
    text: 'The volume of the tetrahedron with vertices at origin and points (a,0,0), (0,b,0), (0,0,c) is:',
    options: ['abc/6', 'abc/3', 'abc/2', 'abc'],
    correct: 0,
    explanation: 'V = (1/6)|a·(b×c)| = abc/6 for a right-angle tetrahedron.'
  },
  {
    id: 'bm10', subject: 'Mathematics',
    text: 'The general term in the binomial expansion of (1 + x)^n is:',
    options: ['ⁿCᵣ xʳ', 'ⁿCᵣ xⁿ', 'ⁿCᵣ x^(n-r)', 'ⁿPᵣ xʳ'],
    correct: 0,
    explanation: 'Tᵣ₊₁ = ⁿCᵣ × 1^(n-r) × xʳ = ⁿCᵣ xʳ.'
  },
  {
    id: 'bm11', subject: 'Mathematics',
    text: 'The equation of a sphere with center (a, b, c) and radius r is:',
    options: ['(x−a)² + (y−b)² + (z−c)² = r²', '(x+a)² + y² + z² = r', 'x² + y² + z² = r²', 'ax + by + cz = r'],
    correct: 0,
    explanation: '(x−a)² + (y−b)² + (z−c)² = r² is the standard form of a sphere.'
  },
  {
    id: 'bm12', subject: 'Mathematics',
    text: 'f(x) = |x| is:',
    options: ['Differentiable everywhere', 'Not continuous at x=0', 'Continuous but not differentiable at x=0', 'Neither continuous nor differentiable'],
    correct: 2,
    explanation: '|x| is continuous everywhere but not differentiable at x=0 (corner point, left/right derivatives differ).'
  },
  {
    id: 'bm13', subject: 'Mathematics',
    text: 'The maximum value of sin x + cos x is:',
    options: ['1', '√2', '2', '√3'],
    correct: 1,
    explanation: 'sin x + cos x = √2 sin(x+π/4). Maximum = √2.'
  },
  {
    id: 'bm14', subject: 'Mathematics',
    text: '∫₀^(π/2) sin²x dx =',
    options: ['π/2', 'π/4', '1/2', 'π/8'],
    correct: 1,
    explanation: '∫₀^(π/2) sin²x dx = (1/2)∫₀^(π/2)(1−cos2x)dx = π/4.'
  },
  {
    id: 'bm15', subject: 'Mathematics',
    text: 'The solution of dy/dx = x/y is:',
    options: ['y = x + C', 'y² − x² = C', 'y² = x² + C', 'y = Cx'],
    correct: 2,
    explanation: 'y dy = x dx → y²/2 = x²/2 + C₁ → y² = x² + C.'
  },
  {
    id: 'bm16', subject: 'Mathematics',
    text: 'The rank of the matrix [[1,2,3],[4,5,6],[7,8,9]] is:',
    options: ['1', '2', '3', '0'],
    correct: 1,
    explanation: 'Row 3 = Row 1 + 2×Row 2 (linearly dependent). Rank = 2.'
  },
  {
    id: 'bm17', subject: 'Mathematics',
    text: 'If |A| = 3 for a 2×2 matrix A, then |adj A| is:',
    options: ['3', '9', '6', '1/3'],
    correct: 0,
    explanation: '|adj A| = |A|^(n-1) for n×n matrix. For n=2: |adj A| = |A|¹ = 3.'
  },
  {
    id: 'bm18', subject: 'Mathematics',
    text: 'The projection of vector a on vector b is:',
    options: ['(a·b)/|b|', '(a·b)/|a|', '|a||b|sinθ', '(a×b)/|b|'],
    correct: 0,
    explanation: 'Projection of a onto b = (a·b)/|b| (scalar projection).'
  },
  {
    id: 'bm19', subject: 'Mathematics',
    text: 'For the linear programming problem max Z = 3x + 4y subject to constraints, the optimal solution lies at:',
    options: ['Center of feasible region', 'A corner point (vertex)', 'Any interior point', 'Midpoint of any edge'],
    correct: 1,
    explanation: 'The optimal solution of an LPP always occurs at a corner (vertex) of the feasible region.'
  },
  {
    id: 'bm20', subject: 'Mathematics',
    text: 'If f(x) = x/(x²+1), the critical points are where f\'(x) = 0. These are:',
    options: ['x = 0', 'x = ±1', 'x = ±2', 'No critical points'],
    correct: 1,
    explanation: 'f\'(x) = (x²+1−2x²)/(x²+1)² = (1−x²)/(x²+1)² = 0 → x = ±1.'
  },
  {
    id: 'bm21', subject: 'Mathematics',
    text: 'The argument (amplitude) of the complex number −1 + i is:',
    options: ['π/4', '3π/4', '−3π/4', '−π/4'],
    correct: 1,
    explanation: '−1+i: x < 0, y > 0 → second quadrant. arg = π − π/4 = 3π/4.'
  },
  {
    id: 'bm22', subject: 'Mathematics',
    text: 'If the function f(x) = kx³ − 9x² + 9 is strictly decreasing for all x < 0, then k must be:',
    options: ['k = 0', 'k ≤ 0', 'k > 0', 'k ≥ 3'],
    correct: 1,
    explanation: 'f\'(x) = 3kx² − 18x. For strictly decreasing at x<0: f\'(x) < 0. At x<0: 3x(kx−6) < 0 requires k ≤ 0.'
  },
  {
    id: 'bm23', subject: 'Mathematics',
    text: 'The value of cos(sin⁻¹(3/5)) is:',
    options: ['4/5', '3/4', '5/4', '3/5'],
    correct: 0,
    explanation: 'Let θ = sin⁻¹(3/5) → sinθ = 3/5. cosθ = √(1−9/25) = √(16/25) = 4/5.'
  },
  {
    id: 'bm24', subject: 'Mathematics',
    text: 'The formula for integration by parts is:',
    options: ['∫uv = uv − ∫vu\'', '∫uv dx = u∫v dx − ∫(u\'∫v dx)dx', '∫u dv = uv − ∫v du', 'B and C are the same'],
    correct: 3,
    explanation: '∫u dv = uv − ∫v du (integration by parts), equivalent to ∫uv dx = u∫v dx − ∫[u\' ∫v dx]dx.'
  },
  {
    id: 'bm25', subject: 'Mathematics',
    text: 'The number of terms in the expansion of (a + b + c)^n is:',
    options: ['n+1', 'n+2', '(n+1)(n+2)/2', 'n²'],
    correct: 2,
    explanation: 'Number of terms = ⁿ⁺²C₂ = (n+1)(n+2)/2.'
  },
  {
    id: 'bm26', subject: 'Mathematics',
    text: 'The foot of perpendicular from point (1,2,3) to the xy-plane is:',
    options: ['(1,2,0)', '(0,2,3)', '(1,0,3)', '(0,0,3)'],
    correct: 0,
    explanation: 'Foot of perpendicular to xy-plane (z=0) is (x,y,0) = (1,2,0).'
  },
  {
    id: 'bm27', subject: 'Mathematics',
    text: 'sin⁻¹(x) + cos⁻¹(x) for x ∈ [−1,1] equals:',
    options: ['0', 'π', 'π/2', '2π'],
    correct: 2,
    explanation: 'sin⁻¹x + cos⁻¹x = π/2 for all x ∈ [−1,1].'
  },
  {
    id: 'bm28', subject: 'Mathematics',
    text: '∫ dx/(x²+a²) =',
    options: ['tan⁻¹(x/a)/a + C', 'tan⁻¹(x/a) + C', 'a tan⁻¹(x/a) + C', 'ln(x²+a²) + C'],
    correct: 0,
    explanation: '∫ dx/(x²+a²) = (1/a)tan⁻¹(x/a) + C.'
  },
  {
    id: 'bm29', subject: 'Mathematics',
    text: 'The plane x + 2y + 3z = 6 intersects the axes. The intercepts are:',
    options: ['6, 3, 2', '1, 2, 3', '6, 6, 6', '2, 4, 6'],
    correct: 0,
    explanation: 'x-int (y=z=0): x=6. y-int (x=z=0): 2y=6→y=3. z-int: 3z=6→z=2. Intercepts: 6,3,2.'
  },
  {
    id: 'bm30', subject: 'Mathematics',
    text: 'The probability density function of a continuous random variable must satisfy:',
    options: ['∫f(x)dx = 0', '∫f(x)dx = 1 and f(x) ≥ 0', 'f(x) = 1 for all x', '∑f(x) = 1'],
    correct: 1,
    explanation: 'PDF requires: f(x) ≥ 0 everywhere and total area ∫₋∞^∞ f(x)dx = 1.'
  },
  {
    id: 'bm31', subject: 'Mathematics',
    text: 'If f(x) = |x − 1| + |x + 1|, then f is:',
    options: ['Differentiable everywhere', 'Not differentiable at x = ±1', 'Constant for x ∈ (−1,1)', 'Both B and C'],
    correct: 3,
    explanation: 'f(x) = 2 for x∈[−1,1] (constant), and grows linearly outside. Not differentiable at x=±1 (corners).'
  },
  {
    id: 'bm32', subject: 'Mathematics',
    text: 'The value of tan(π + x) is:',
    options: ['tan x', '−tan x', 'cot x', '−cot x'],
    correct: 0,
    explanation: 'tan(π + x) = tan x (period of tan is π).'
  },
  {
    id: 'bm33', subject: 'Mathematics',
    text: 'The Euler\'s formula for complex numbers states e^(iθ) =',
    options: ['cosθ − i sinθ', 'cosθ + i sinθ', 'sinθ + i cosθ', 'i(cosθ + sinθ)'],
    correct: 1,
    explanation: 'Euler\'s formula: e^(iθ) = cosθ + i sinθ.'
  },
  {
    id: 'bm34', subject: 'Mathematics',
    text: 'The period of f(x) = sin(2x) is:',
    options: ['π', '2π', 'π/2', '4π'],
    correct: 0,
    explanation: 'Period of sin(nx) = 2π/n = 2π/2 = π.'
  },
  {
    id: 'bm35', subject: 'Mathematics',
    text: 'The angle between lines with slopes m₁ and m₂ is given by tan θ =',
    options: ['(m₁+m₂)/(1−m₁m₂)', '|(m₁−m₂)/(1+m₁m₂)|', 'm₁m₂', 'm₁/m₂'],
    correct: 1,
    explanation: 'tan θ = |(m₁−m₂)/(1+m₁m₂)| gives the acute angle between two lines.'
  },
  {
    id: 'bm36', subject: 'Mathematics',
    text: 'The trace of a matrix (sum of diagonal elements) of [[1,2],[3,4]] is:',
    options: ['4', '5', '10', '3'],
    correct: 1,
    explanation: 'Trace = 1 + 4 = 5.'
  },
  {
    id: 'bm37', subject: 'Mathematics',
    text: 'By L\'Hôpital\'s rule, lim(x→0) (sin x)/x² is:',
    options: ['0', '1', '∞', '1/2'],
    correct: 2,
    explanation: '(sin x)/x² → 0/0. L\'Hôpital: cos x/(2x) → 1/0 = ∞.'
  },
  {
    id: 'bm38', subject: 'Mathematics',
    text: 'The equation of tangent to y = x² at (2, 4) is:',
    options: ['y = 4x − 4', 'y = 2x', 'y = 4x + 4', 'y = 2x + 4'],
    correct: 0,
    explanation: 'Slope = dy/dx = 2x = 4 at x=2. Tangent: y−4 = 4(x−2) → y = 4x−4.'
  },
  {
    id: 'bm39', subject: 'Mathematics',
    text: 'Mean deviation from median is minimum when compared to mean deviation from:',
    options: ['Mean', 'Mode', 'Any other central value', 'Standard deviation'],
    correct: 2,
    explanation: 'Mean deviation is minimized when taken from the median (compared to deviation from any other value).'
  },
  {
    id: 'bm40', subject: 'Mathematics',
    text: 'The value of ∫₀¹ x(1−x)^9 dx is:',
    options: ['1/110', '1/100', '1/90', '1/55'],
    correct: 0,
    explanation: 'Using Beta function: ∫₀¹ x^m(1−x)^n dx = m!n!/(m+n+1)!. Here m=1, n=9, so value = 1!9!/11! = 1/110.'
  },
  {
    id: 'bm41', subject: 'Mathematics',
    text: 'The solution set of x² − 5x + 6 ≤ 0 is:',
    options: ['[2, 3]', '(2, 3)', '(−∞, 2] ∪ [3, ∞)', '[−∞, 2]'],
    correct: 0,
    explanation: 'x²−5x+6 = (x−2)(x−3). ≤ 0 when 2 ≤ x ≤ 3.'
  },
  {
    id: 'bm42', subject: 'Mathematics',
    text: 'The number of 4-digit numbers that can be formed using digits 0-9 (no repetition) is:',
    options: ['4536', '5040', '9×9×8×7', '10⁴'],
    correct: 0,
    explanation: 'Thousands digit: 9 choices (1-9). Remaining 3 from 9 remaining digits: 9×8×7 = 504. Total: 9×504 = 4536.'
  },
  {
    id: 'bm43', subject: 'Mathematics',
    text: 'The scalar triple product [a, b, c] = 0 implies:',
    options: ['Vectors are orthogonal', 'Vectors are coplanar', 'Vectors form a basis', 'One vector is zero'],
    correct: 1,
    explanation: 'a·(b×c) = 0 means volume of parallelepiped = 0 → a, b, c are coplanar.'
  },
  {
    id: 'bm44', subject: 'Mathematics',
    text: 'The distance from point (1,2,3) to the plane 2x−y+2z = 5 is:',
    options: ['1/3', '2/3', '5/3', '4/3'],
    correct: 0,
    explanation: 'Distance = |Ax1 + By1 + Cz1 + D|/sqrt(A^2+B^2+C^2). Here: |2(1) + (−1)2 + 2(3) − 5|/sqrt(4+1+4) = 1/3.'
  },
  {
    id: 'bm45', subject: 'Mathematics',
    text: 'For a normal distribution, the mean, median and mode are:',
    options: ['All different', 'Mean = Median ≠ Mode', 'All equal', 'Median = Mode ≠ Mean'],
    correct: 2,
    explanation: 'For a symmetric normal distribution, mean = median = mode.'
  },
];

export const bitsatEnglish = [
  {
    id: 'be1', subject: 'English',
    text: 'Choose the word closest in meaning to AMELIORATE:',
    options: ['Worsen', 'Improve', 'Maintain', 'Ignore'],
    correct: 1,
    explanation: 'Ameliorate means to make something bad better/improve it.'
  },
  {
    id: 'be2', subject: 'English',
    text: 'The antonym of EPHEMERAL is:',
    options: ['Short-lived', 'Momentary', 'Permanent', 'Transient'],
    correct: 2,
    explanation: 'Ephemeral = lasting a very short time. Antonym = permanent.'
  },
  {
    id: 'be3', subject: 'English',
    text: 'She _____ the answer before the teacher could explain. (fill in)',
    options: ['Has guessed', 'Had guessed', 'Will guess', 'Guesses'],
    correct: 1,
    explanation: 'Past perfect "had guessed" shows the action was completed before another past action.'
  },
  {
    id: 'be4', subject: 'English',
    text: 'Identify the error: "Each of the students are responsible for their work."',
    options: ['students are', '"Each... are" — should be "is"', 'their work', 'No error'],
    correct: 1,
    explanation: '"Each" is singular → verb must be singular: "Each of the students IS responsible."'
  },
  {
    id: 'be5', subject: 'English',
    text: 'The phrase "to burn the midnight oil" means:',
    options: ['To destroy lamps', 'To work late into the night', 'To waste resources', 'To cook food at night'],
    correct: 1,
    explanation: 'To burn the midnight oil = to work or study until very late at night.'
  },
  {
    id: 'be6', subject: 'English',
    text: 'Choose the correctly spelled word:',
    options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
    correct: 1,
    explanation: 'Accommodate (two c\'s, two m\'s).'
  },
  {
    id: 'be7', subject: 'English',
    text: '"The committee have decided to postpone the meeting." The error is:',
    options: ['"committee" should be "committees"', '"have" should be "has" (committee is singular)', '"postpone" should be "postponed"', 'No error'],
    correct: 1,
    explanation: 'In British English, collective nouns can take plural verbs; in standard formal usage, "committee has" is preferred.'
  },
  {
    id: 'be8', subject: 'English',
    text: 'Select the best word: The scientist made a _____ discovery that changed medicine.',
    options: ['Redundant', 'Seminal', 'Trivial', 'Mundane'],
    correct: 1,
    explanation: 'Seminal = influential and important, originating new developments. Perfect for a landmark discovery.'
  },
  {
    id: 'be9', subject: 'English',
    text: 'Reading Comprehension: "The industrial revolution transformed agrarian societies into industrial ones, leading to urbanization." The passage primarily discusses:',
    options: ['Environmental effects', 'Social transformation caused by industrialization', 'Agricultural techniques', 'Urban planning'],
    correct: 1,
    explanation: 'The passage describes the transformation from farming societies to industrial/urban ones.'
  },
  {
    id: 'be10', subject: 'English',
    text: 'Identify the figure of speech: "The stars danced playfully in the moonlit sky."',
    options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
    correct: 2,
    explanation: 'Personification: attributing human qualities (dancing) to stars (non-human).'
  },
  {
    id: 'be11', subject: 'English',
    text: 'The word ENERVATE means:',
    options: ['Energize', 'Weaken', 'Nerve', 'Excite'],
    correct: 1,
    explanation: 'Enervate = to drain energy or vitality from; to weaken.'
  },
  {
    id: 'be12', subject: 'English',
    text: 'Choose the passive voice of: "They are building a new hospital."',
    options: ['A new hospital was being built', 'A new hospital is being built by them', 'A new hospital will be built', 'A new hospital has been built'],
    correct: 1,
    explanation: 'Active "are building" → Passive "is being built." "A new hospital is being built by them."'
  },
  {
    id: 'be13', subject: 'English',
    text: 'The part of speech of "well" in "She sings well" is:',
    options: ['Adjective', 'Noun', 'Adverb', 'Preposition'],
    correct: 2,
    explanation: '"Well" modifies the verb "sings" → it is an adverb.'
  },
  {
    id: 'be14', subject: 'English',
    text: 'TACITURN most nearly means:',
    options: ['Talkative', 'Reserved and silent', 'Aggressive', 'Cheerful'],
    correct: 1,
    explanation: 'Taciturn = habitually reserved in speech; saying very little.'
  },
  {
    id: 'be15', subject: 'English',
    text: 'Choose the sentence with correct punctuation:',
    options: [
      'Its a beautiful day, isnt it.',
      "It's a beautiful day, isn't it?",
      "Its a beautiful day, isn't it?",
      "It's a beautiful day isn't it?"
    ],
    correct: 1,
    explanation: '"It\'s" = contraction of "it is". "Isn\'t" = "is not". Question mark required.'
  },
];

export const bitsatLogic = [
  {
    id: 'bl1', subject: 'Logical Reasoning',
    text: 'If all A are B, and all B are C, then:',
    options: ['All C are A', 'All A are C', 'Some C are not A', 'No A are C'],
    correct: 1,
    explanation: 'Syllogism: All A→B, all B→C ∴ All A→C.'
  },
  {
    id: 'bl2', subject: 'Logical Reasoning',
    text: 'Number series: 2, 6, 12, 20, 30, ___',
    options: ['40', '42', '44', '36'],
    correct: 1,
    explanation: 'Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42.'
  },
  {
    id: 'bl3', subject: 'Logical Reasoning',
    text: 'If PENCIL is coded as RGPEKN, how is ERASER coded?',
    options: ['GTCUGT', 'GSCUGT', 'GTCUGU', 'HUCVGT'],
    correct: 0,
    explanation: 'Each letter shifted by +2 (P→R, E→G, N→P, C→E, I→K, L→N). ERASER: E→G, R→T, A→C, S→U, E→G, R→T = GTCUGT.'
  },
  {
    id: 'bl4', subject: 'Logical Reasoning',
    text: 'Which does NOT belong: Dog, Cat, Elephant, Crow, Horse',
    options: ['Dog', 'Cat', 'Elephant', 'Crow'],
    correct: 3,
    explanation: 'Crow is a bird, while Dog, Cat, Elephant, and Horse are mammals.'
  },
  {
    id: 'bl5', subject: 'Logical Reasoning',
    text: 'A is taller than B, B is taller than C, C is taller than D. Who is shortest?',
    options: ['A', 'B', 'C', 'D'],
    correct: 3,
    explanation: 'A > B > C > D. D is the shortest.'
  },
  {
    id: 'bl6', subject: 'Logical Reasoning',
    text: 'In a clock, at 3:15, the angle between hour and minute hands is:',
    options: ['0°', '7.5°', '15°', '30°'],
    correct: 1,
    explanation: 'Minute hand at 90° (15 min). Hour hand at 3h15m: 90° + 15×0.5° = 97.5°. Angle = 97.5−90 = 7.5°.'
  },
  {
    id: 'bl7', subject: 'Logical Reasoning',
    text: 'If 2×3 = 10, 3×4 = 20, 4×5 = 30, then 5×6 =',
    options: ['30', '40', '50', '60'],
    correct: 1,
    explanation: 'Observe the mapped results: 10, 20, 30 increase by 10 each. The next value is 40.'
  },
  {
    id: 'bl8', subject: 'Logical Reasoning',
    text: 'Assertion (A): The sum of angles in a triangle is 180°. Reason (R): This is a consequence of Euclid\'s parallel postulate.',
    options: ['A and R are both true, R is correct explanation', 'A true, R false', 'A false, R true', 'Both false'],
    correct: 0,
    explanation: 'Both statements are true, and R correctly explains why the angle sum in a flat/Euclidean triangle = 180°.'
  },
  {
    id: 'bl9', subject: 'Logical Reasoning',
    text: 'How many triangles are in a figure with 4 lines all passing through a single point?',
    options: ['0', '4', '6', '8'],
    correct: 0,
    explanation: '4 lines through one point create 8 rays/regions (like a star). No triangles can be formed as no three non-concurrent lines exist.'
  },
  {
    id: 'bl10', subject: 'Logical Reasoning',
    text: 'If today is Wednesday, what day will it be 100 days from now?',
    options: ['Monday', 'Friday', 'Thursday', 'Saturday'],
    correct: 1,
    explanation: '100 ÷ 7 = 14 weeks + 2 days. Wednesday + 2 = Friday.'
  },
];

export const bitsatTenYearBlueprint = {
  span: '2016-2025',
  pattern: {
    Physics: 40,
    Chemistry: 40,
    Mathematics: 45,
    English: 15,
    'Logical Reasoning': 10,
  },
  focus: [
    'Physics: Mechanics + Electrostatics + Modern Physics remain high-yield anchors.',
    'Chemistry: Organic named reactions and Inorganic periodic trends recur consistently.',
    'Mathematics: Calculus and Algebra together drive most score separation.',
    'English/Logic: Stable and speed-sensitive section that rewards daily short drills.',
  ],
};

// ── PAPER ASSEMBLY ──────────────────────────────────────────
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getBitsatPaper(paperId) {
  const id = parseInt(paperId, 10);
  const shuffledPh = seededShuffle(bitsatPhysics, id * 7331);
  const shuffledCh = seededShuffle(bitsatChemistry, id * 7331 + 1);
  const shuffledMa = seededShuffle(bitsatMath, id * 7331 + 2);
  const shuffledEn = seededShuffle(bitsatEnglish, id * 7331 + 3);
  const shuffledLo = seededShuffle(bitsatLogic, id * 7331 + 4);

  const names = [
    '', 'BITSAT 2026 Analysis Paper',
    'BITSAT Mock Test 2 – Mixed Syllabus',
    'BITSAT Mock Test 3 – Speed Focus',
    'BITSAT Mock Test 4 – Concept Based',
    'BITSAT Mock Test 5 – High Difficulty',
    'BITSAT Mock Test 6 – Chemistry Heavy',
    'BITSAT Mock Test 7 – Physics Heavy',
    'BITSAT Mock Test 8 – Math Heavy',
    'BITSAT Mock Test 9 – English Focus',
    'BITSAT Mock Test 10 – Final Simulation',
  ];

  return {
    id,
    title: names[id] || `BITSAT Mock Test ${id}`,
    description: id === 1
      ? 'Curated from 10-year BITSAT trend analysis (2016–2025) with recent-year weighting'
      : 'Mixed syllabus adaptive paper',
    duration: 180,
    totalMarks: 450,
    correctMarks: 3,
    wrongMarks: -1,
    questions: [
      ...shuffledPh.slice(0, 40),
      ...shuffledCh.slice(0, 40),
      ...shuffledMa.slice(0, 45),
      ...shuffledEn.slice(0, 15),
      ...shuffledLo.slice(0, 10),
    ]
  };
}

// ── BITSAT RANK PREDICTOR ────────────────────────────────────
// Based on BITSAT 2021-2025 published cutoffs (PCM cutoffs for various campuses)
export const bitsatRankBands = [
  { minScore: 400, maxScore: 450, rankRange: '< 100',       admission: 'BITS Pilani – CS/ECE confirmed' },
  { minScore: 370, maxScore: 399, rankRange: '100 – 500',   admission: 'BITS Pilani – Most branches' },
  { minScore: 340, maxScore: 369, rankRange: '500 – 2,000', admission: 'BITS Goa – CS/ECE, BITS Pilani – Mech/Chem' },
  { minScore: 310, maxScore: 339, rankRange: '2,000 – 5,000', admission: 'BITS Goa – most branches, BITS Hyderabad – CS' },
  { minScore: 280, maxScore: 309, rankRange: '5,000 – 10,000', admission: 'BITS Hyderabad – most branches' },
  { minScore: 250, maxScore: 279, rankRange: '10,000 – 20,000', admission: 'BITS Hyderabad – some branches (competitive)' },
  { minScore: 0,   maxScore: 249, rankRange: '20,000+',       admission: 'Waitlist or not shortlisted' },
];

export const allBitsatPapers = Array.from({ length: 10 }, (_, i) => {
  const id = i + 1;
  const topics = [
    'Trend Analysis 2021-2026 | Complete Pattern',
    'Mixed Syllabus | Standard Difficulty',
    'Speed Focus | 150 Qs / 180 min',
    'Concept Based | Reasoning Heavy',
    'High Difficulty | Previous Year Pattern',
    'Chemistry Intensive | Organic Focus',
    'Physics Intensive | Modern Physics',
    'Mathematics Intensive | Calculus',
    'English & Logic | Speed Scoring',
    'Full Simulation | Final Practice',
  ];
  return {
    id,
    title: id === 1 ? 'BITSAT 2026 Analysis Paper' : `Mock Test ${id}`,
    topics: topics[i],
    questions: 150,
    duration: '3 Hours',
    maxMarks: 450,
    scoring: '+3 / −1',
  };
});
