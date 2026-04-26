// ============================================================
// BITSAT QUESTION BANK
// Pattern: 30 Physics + 30 Chemistry + 40 Math + 10 English
//          + 20 Logical Reasoning = 130 questions
// Each full mock: 130 questions
// Scoring: +3 correct, −1 wrong (no omission penalty)
// Duration: 180 minutes | Max marks: 390
// ============================================================

import {
  bitsatDailyPhysics,
  bitsatDailyChemistry,
  bitsatDailyMath,
  bitsatDailyEnglish,
  bitsatDailyLogic,
  latestBitsatDailyPaper,
} from './bitsatDailyQuestions';

export const bitsatQuestionsLastUpdated = '2026-04-26T00:00:00+05:30';

const bitsatPhysicsBase = [
  {
    id: 'bp1', subject: 'Physics',
    text: 'A block slides down an incline of angle 37° with coefficient of friction 0.25. Take g = 10 m/s², sin37° = 0.6, cos37° = 0.8. Its acceleration is:',
    options: ['2 m/s²', '4 m/s²', '6 m/s²', '8 m/s²'],
    correct: 1,
    explanation: 'Acceleration down incline = g(sinθ − μcosθ) = 10(0.6 − 0.25×0.8) = 10(0.4) = 4 m/s².'
  },
  {
    id: 'bp2', subject: 'Physics',
    text: 'A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 30 cm. The power of the combination is:',
    options: ['1.67 D', '-1.67 D', '3.33 D', '8.33 D'],
    correct: 0,
    explanation: 'P = P1 + P2 = 1/0.20 + 1/(−0.30) = 5 − 3.33 = 1.67 D.'
  },
  {
    id: 'bp3', subject: 'Physics',
    text: 'A 3 Ω resistor and a 6 Ω resistor are connected in series across an 18 V battery. The heat produced in the 3 Ω resistor in 2 s is:',
    options: ['12 J', '18 J', '24 J', '36 J'],
    correct: 2,
    explanation: 'Series resistance = 9 Ω, so current I = 18/9 = 2 A. Heat in 3 Ω resistor: H = I²Rt = 4 × 3 × 2 = 24 J.'
  },
  {
    id: 'bp4', subject: 'Physics',
    text: 'A radioactive sample has a half-life of 10 days. The fraction of the sample left undecayed after 30 days is:',
    options: ['1/2', '1/4', '1/8', '1/16'],
    correct: 2,
    explanation: '30 days = 3 half-lives. Remaining fraction = (1/2)^3 = 1/8.'
  },
  {
    id: 'bp5', subject: 'Physics',
    text: 'The current through an inductor varies as i = kt. The potential difference across the inductor is:',
    options: ['Zero', 'L/k', 'Lk', 'kt/L'],
    correct: 2,
    explanation: 'V = L(di/dt). Since i = kt, di/dt = k, so V = Lk, a constant.'
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
  {
    id: 'bp41', subject: 'Physics',
    text: 'The moment of inertia of a solid sphere of mass M and radius R about a tangential axis is:',
    options: ['(2/5)MR²', '(7/5)MR²', '(3/2)MR²', '(5/4)MR²'],
    correct: 1,
    explanation: 'I_cm (through center) = (2/5)MR². By parallel axis theorem, I_tangential = (2/5)MR² + MR² = (7/5)MR².'
  },
  {
    id: 'bp42', subject: 'Physics',
    text: 'A train moving at 72 km/h blows a whistle of 500 Hz. Speed of sound = 340 m/s. Frequency heard by a stationary observer ahead is:',
    options: ['500 Hz', '531 Hz', '470 Hz', '545 Hz'],
    correct: 1,
    explanation: 'v_train = 20 m/s. Doppler: f′ = f × v/(v − v_s) = 500 × 340/320 ≈ 531 Hz.'
  },
  {
    id: 'bp43', subject: 'Physics',
    text: 'An electron is accelerated through 100 V. Its de Broglie wavelength (h = 6.63×10⁻³⁴ J·s, m_e = 9.11×10⁻³¹ kg) is approximately:',
    options: ['0.123 nm', '0.023 nm', '1.23 nm', '0.012 nm'],
    correct: 0,
    explanation: 'λ = h/√(2m_eKE) = h/√(2m_eeV). Substituting gives λ ≈ 1.23×10⁻¹⁰ m = 0.123 nm.'
  },
  {
    id: 'bp44', subject: 'Physics',
    text: 'A Carnot engine operates between 600 K and 300 K. Its efficiency and work output for 1000 J of heat input are:',
    options: ['33% and 330 J', '50% and 500 J', '40% and 400 J', '60% and 600 J'],
    correct: 1,
    explanation: 'η = 1 − T_L/T_H = 1 − 300/600 = 50%. W = 0.5 × 1000 = 500 J.'
  },
  {
    id: 'bp45', subject: 'Physics',
    text: 'Two convex lenses with focal lengths 20 cm and 30 cm are placed in contact. The combined focal length is:',
    options: ['10 cm', '12 cm', '15 cm', '50 cm'],
    correct: 1,
    explanation: '1/f = 1/20 + 1/30 = 3/60 + 2/60 = 5/60 → f = 12 cm.'
  },
  {
    id: 'bp46', subject: 'Physics',
    text: 'In the photoelectric effect, stopping potential V₀ is related to maximum kinetic energy by:',
    options: ['KE_max = eV₀/2', 'KE_max = eV₀', 'KE_max = 2eV₀', 'KE_max = eV₀²'],
    correct: 1,
    explanation: 'Work done by retarding field equals kinetic energy: KE_max = eV₀.'
  },
  {
    id: 'bp47', subject: 'Physics',
    text: 'The ratio of electric field intensities at distances r and 2r from an infinite line charge (linear charge density λ) is:',
    options: ['1:1', '2:1', '4:1', '1:2'],
    correct: 1,
    explanation: 'E = λ/(2πε₀r), so E₁/E₂ = (1/r)/(1/2r) = 2:1.'
  },
  {
    id: 'bp48', subject: 'Physics',
    text: 'In a resonance column, first and second resonances occur at tube lengths 24 cm and 74 cm. The end correction is:',
    options: ['0 cm', '0.5 cm', '1.0 cm', '2.0 cm'],
    correct: 2,
    explanation: '3(L₁+e) = L₂+e → 72+3e = 74+e → 2e = 2 → e = 1.0 cm. Also λ = 2(L₂−L₁) = 100 cm.'
  },
  {
    id: 'bp49', subject: 'Physics',
    text: 'Three resistors 2 Ω, 3 Ω, and 6 Ω are connected in parallel. The equivalent resistance is:',
    options: ['1 Ω', '2 Ω', '3 Ω', '11 Ω'],
    correct: 0,
    explanation: '1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1 → R = 1 Ω.'
  },
  {
    id: 'bp50', subject: 'Physics',
    text: 'The radius of a charged particle\'s circular path in a magnetic field B depends on:',
    options: ['B and charge only', 'Mass and velocity only', 'Mass, velocity, charge, and B', 'Mass and B only'],
    correct: 2,
    explanation: 'r = mv/(qB). It depends on mass m, velocity v, charge q, and magnetic field B.'
  },
  {
    id: 'bp51', subject: 'Physics',
    text: 'In Young\'s double-slit experiment, if wavelength is halved and slit separation is doubled, fringe width:',
    options: ['Increases 4 times', 'Remains same', 'Decreases 4 times', 'Doubles'],
    correct: 2,
    explanation: 'β = λD/d. New β = (λ/2)D/(2d) = λD/(4d) = β/4. Fringe width decreases 4 times.'
  },
  {
    id: 'bp52', subject: 'Physics',
    text: 'In the van der Waals equation (P + a/V²)(V − b) = nRT, the constant \'a\' accounts for:',
    options: ['Volume of gas molecules', 'Intermolecular attractive forces', 'Both attractions and volume', 'Temperature correction'],
    correct: 1,
    explanation: '\'a\' corrects for intermolecular attractions (pressure term); \'b\' corrects for finite molecular volume.'
  },
  {
    id: 'bp53', subject: 'Physics',
    text: 'A wire of resistance R is stretched uniformly to twice its original length. Its new resistance is:',
    options: ['2R', 'R/2', '4R', 'R/4'],
    correct: 2,
    explanation: 'Volume is conserved: length doubles → area halves. R = ρL/A → R′ = ρ(2L)/(A/2) = 4R.'
  },
  {
    id: 'bp54', subject: 'Physics',
    text: 'The time constant of an RL circuit with R = 5 Ω and L = 0.1 H is:',
    options: ['0.5 s', '2 s', '0.02 s', '50 s'],
    correct: 2,
    explanation: 'Time constant τ = L/R = 0.1/5 = 0.02 s.'
  },
  {
    id: 'bp55', subject: 'Physics',
    text: 'A projectile is fired at 30° to horizontal with speed 40 m/s. Its range on level ground (g = 10 m/s²) is:',
    options: ['40√3 m', '80√3 m', '120 m', '160 m'],
    correct: 1,
    explanation: 'R = u²sin2θ/g = (1600 × sin60°)/10 = 1600 × (√3/2)/10 = 80√3 m.'
  },
  {
    id: 'bp56', subject: 'Physics',
    text: 'A particle executes SHM with amplitude 5 cm and frequency 2 Hz. Its maximum acceleration is:',
    options: ['0.4π² m/s²', '0.8π² m/s²', '1.6π² m/s²', '4π² m/s²'],
    correct: 1,
    explanation: 'a_max = ω²A = (2πf)²A = (4π)² × 0.05 = 16π² × 0.05 = 0.8π² m/s².'
  },
  {
    id: 'bp57', subject: 'Physics',
    text: 'A potentiometer wire of length 10 m has a potential difference of 2 V across it. The balancing length for a cell of emf 1.5 V is:',
    options: ['7.5 m', '6.0 m', '5.0 m', '3.0 m'],
    correct: 0,
    explanation: 'Potential gradient = 2/10 = 0.2 V m⁻¹. Balancing length l = 1.5/0.2 = 7.5 m.'
  },
  {
    id: 'bp58', subject: 'Physics',
    text: 'Two identical cells each of emf E and internal resistance r are connected in parallel. Their equivalent emf and internal resistance are respectively:',
    options: ['2E and 2r', 'E and r/2', 'E/2 and r', '2E and r/2'],
    correct: 1,
    explanation: 'For identical cells in parallel, effective emf remains E while internal resistance becomes r/n = r/2.'
  },
  {
    id: 'bp59', subject: 'Physics',
    text: 'A plano-convex lens has refractive index 1.5 and radius of curvature 20 cm. Its focal length in air is:',
    options: ['10 cm', '20 cm', '40 cm', '60 cm'],
    correct: 2,
    explanation: 'Lens maker formula for plano-convex lens: 1/f = (μ − 1)(1/R) = 0.5/20 = 1/40, so f = 40 cm.'
  },
  {
    id: 'bp60', subject: 'Physics',
    text: 'A gas is taken from state (P, V) to (2P, V/2). Assuming ideal behavior, the temperature:',
    options: ['doubles', 'halves', 'remains unchanged', 'becomes four times'],
    correct: 2,
    explanation: 'For an ideal gas, T ∝ PV. Here (2P)(V/2) = PV, so temperature stays the same.'
  },
  {
    id: 'bp61', subject: 'Physics',
    text: 'An object is placed 15 cm in front of a concave mirror of focal length 10 cm. The image formed is:',
    options: ['real, inverted, magnified', 'real, inverted, diminished', 'virtual, erect, magnified', 'virtual, erect, diminished'],
    correct: 0,
    explanation: 'The object is between F and C. A concave mirror then forms a real, inverted, magnified image beyond C.'
  },
  {
    id: 'bp62', subject: 'Physics',
    text: 'A disc rolls without slipping on a horizontal surface. The ratio of translational kinetic energy to rotational kinetic energy is:',
    options: ['1 : 1', '2 : 1', '1 : 2', '3 : 2'],
    correct: 1,
    explanation: 'For a solid disc, I = (1/2)MR². Rotational KE = 1/2 Iω² = 1/4 Mv², translational KE = 1/2 Mv², so ratio = 2 : 1.'
  },
  {
    id: 'bp63', subject: 'Physics',
    text: 'The stopping potential in a photoelectric experiment depends on:',
    options: ['intensity of incident light only', 'frequency of incident light only', 'both intensity and frequency', 'distance between source and metal'],
    correct: 1,
    explanation: 'Stopping potential is determined by maximum kinetic energy, KE_max = hν − φ, so it depends on frequency, not intensity.'
  },
  {
    id: 'bp64', subject: 'Physics',
    text: 'If the radius of the circular orbit of an electron in a magnetic field is doubled while the field remains unchanged, its kinetic energy becomes:',
    options: ['half', 'double', 'four times', 'unchanged'],
    correct: 2,
    explanation: 'r = mv/(qB), so doubling r doubles v. Since KE ∝ v², kinetic energy becomes four times.'
  },
  {
    id: 'bp65', subject: 'Physics',
    text: 'A slab of glass of refractive index 1.5 is placed in one path of Young’s double-slit experiment. To shift the central fringe to the previous position, the slab thickness should introduce an extra optical path of:',
    options: ['λ', 'λ/2', '2λ', 'zero'],
    correct: 1,
    explanation: 'To move a bright fringe to the adjacent dark position, the required additional path difference is λ/2.'
  },
  {
    id: 'bp66', subject: 'Physics',
    text: 'The ratio of speeds of light in glass and water is 3 : 4. If refractive index of water is 4/3, the refractive index of glass is:',
    options: ['1.0', '9/4', '16/9', '3/4'],
    correct: 2,
    explanation: 'n = c/v. If v_glass : v_water = 3 : 4, then n_glass : n_water = 4 : 3. So n_glass = (4/3) × (4/3) = 16/9.'
  },
  {
    id: 'bp67', subject: 'Physics',
    text: 'A source of sound moves toward a stationary observer with speed 20 m/s. If the emitted frequency is 510 Hz and speed of sound is 340 m/s, the apparent frequency heard is:',
    options: ['480 Hz', '510 Hz', '540 Hz', '570 Hz'],
    correct: 2,
    explanation: 'f′ = f × v/(v − v_s) = 510 × 340/320 ≈ 541.9 Hz, so the nearest option is 540 Hz.'
  },
  {
    id: 'bp68', subject: 'Physics',
    text: 'When a dielectric slab is completely inserted between the plates of an isolated charged capacitor, the energy stored in it:',
    options: ['increases', 'decreases', 'remains the same', 'first increases then decreases'],
    correct: 1,
    explanation: 'For an isolated capacitor charge remains constant. Since C increases, U = Q²/(2C) decreases.'
  },
  {
    id: 'bp69', subject: 'Physics',
    text: 'A satellite just above Earth’s surface has orbital speed v. The escape speed from the same point is:',
    options: ['v/2', 'v', '√2 v', '2v'],
    correct: 2,
    explanation: 'Orbital speed = √(GM/R) and escape speed = √(2GM/R), so escape speed = √2 times orbital speed.'
  },
  {
    id: 'bp70', subject: 'Physics',
    text: 'For a transistor used in common-emitter mode, the current gain β is related to α by:',
    options: ['β = α/(1 + α)', 'β = α/(1 − α)', 'β = 1 − α', 'β = 1/α'],
    correct: 1,
    explanation: 'Using α = β/(1 + β), we get β = α/(1 − α).'
  },
];

const bitsatChemistryBase = [
  {
    id: 'bc1', subject: 'Chemistry',
    text: 'The hybridization and shape of IF₅ are respectively:',
    options: ['sp³d, trigonal bipyramidal', 'sp³d², square pyramidal', 'sp³d², octahedral', 'sp³, tetrahedral'],
    correct: 1,
    explanation: 'I in IF₅ has 6 electron pairs (5 bond pairs + 1 lone pair), so hybridization is sp³d² and molecular shape is square pyramidal.'
  },
  {
    id: 'bc2', subject: 'Chemistry',
    text: 'The pH of a 0.01 M acetic acid solution (Ka = 1.8 × 10⁻⁵) is approximately:',
    options: ['2.37', '3.37', '4.37', '5.37'],
    correct: 1,
    explanation: 'For weak acid, [H⁺] ≈ √(KaC) = √(1.8×10⁻⁷) ≈ 4.24×10⁻⁴ M. So pH ≈ 3.37.'
  },
  {
    id: 'bc3', subject: 'Chemistry',
    text: 'The unit of the rate constant for a zero-order reaction is:',
    options: ['s⁻¹', 'mol L⁻¹ s⁻¹', 'L mol⁻¹ s⁻¹', 'mol² L⁻² s⁻¹'],
    correct: 1,
    explanation: 'For a zero-order reaction, rate = k. Since rate has units of concentration/time, k has units mol L⁻¹ s⁻¹.'
  },
  {
    id: 'bc4', subject: 'Chemistry',
    text: 'On ozonolysis, propene gives:',
    options: ['Methanal and ethanal', 'Ethanal and ethanone', 'Methanal and propanone', 'Only ethanal'],
    correct: 0,
    explanation: 'CH₃CH=CH₂ on ozonolysis cleaves to CH₃CHO (ethanal) and HCHO (methanal).'
  },
  {
    id: 'bc5', subject: 'Chemistry',
    text: 'The complex [Ni(CN)₄]²⁻ is:',
    options: ['Tetrahedral and paramagnetic', 'Square planar and diamagnetic', 'Octahedral and paramagnetic', 'Square planar and paramagnetic'],
    correct: 1,
    explanation: 'CN⁻ is a strong-field ligand. Ni²⁺ (d⁸) undergoes pairing and forms a dsp² square planar complex that is diamagnetic.'
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
  {
    id: 'bc41', subject: 'Chemistry',
    text: 'In an SN2 reaction, the rate equation is:',
    options: ['Rate = k[substrate]', 'Rate = k[nucleophile]', 'Rate = k[substrate][nucleophile]', 'Rate = k[substrate]²'],
    correct: 2,
    explanation: 'SN2 is bimolecular: both substrate and nucleophile are involved in the rate-determining step. Rate = k[S][Nu].'
  },
  {
    id: 'bc42', subject: 'Chemistry',
    text: 'The Nernst equation for an electrode M^n+ + ne⁻ → M at 25°C is:',
    options: ['E = E° − (0.0591/n)log[M^n+]', 'E = E° + (0.0591/n)log[M^n+]', 'E = E° − 0.0591 log[M^n+]', 'E = E° × (0.0591/n)'],
    correct: 1,
    explanation: 'Nernst: E = E° − (0.0591/n)log(Q). For reduction Q = 1/[M^n+] → E = E° + (0.0591/n)log[M^n+].'
  },
  {
    id: 'bc43', subject: 'Chemistry',
    text: 'Crystal field stabilization energy (CFSE) for a d⁶ metal ion in a strong octahedral field is:',
    options: ['−0.4Δ₀', '−2.0Δ₀', '−2.4Δ₀', '−4.0Δ₀'],
    correct: 2,
    explanation: 'Strong field d⁶ → t₂g⁶ eg⁰. CFSE = 6×(−0.4Δ₀) + 0×(+0.6Δ₀) = −2.4Δ₀.'
  },
  {
    id: 'bc44', subject: 'Chemistry',
    text: 'The major product of addition of HBr to propene (CH₃CH=CH₂) by Markovnikov\'s rule is:',
    options: ['1-bromopropane', '2-bromopropane', '1,2-dibromopropane', 'propan-2-ol'],
    correct: 1,
    explanation: 'H adds to CH₂ (less substituted), Br adds to CH (more substituted) → CH₃CHBrCH₃ = 2-bromopropane.'
  },
  {
    id: 'bc45', subject: 'Chemistry',
    text: 'For N₂ + 3H₂ ⇌ 2NH₃, the relationship between Kp and Kc is:',
    options: ['Kp = Kc', 'Kp = Kc(RT)²', 'Kp = Kc(RT)⁻²', 'Kp = Kc(RT)³'],
    correct: 2,
    explanation: 'Δn = 2 − (1+3) = −2. Kp = Kc(RT)^Δn = Kc(RT)⁻².'
  },
  {
    id: 'bc46', subject: 'Chemistry',
    text: 'Which compound is most reactive toward electrophilic aromatic substitution (EAS)?',
    options: ['Nitrobenzene', 'Chlorobenzene', 'Anisole (methoxybenzene)', 'Benzene'],
    correct: 2,
    explanation: '−OCH₃ is a strong +M electron-donating group, greatly activating the ring toward EAS.'
  },
  {
    id: 'bc47', subject: 'Chemistry',
    text: 'The number of geometrical isomers of [Co(en)₂Cl₂]⁺ (en = ethylenediamine) is:',
    options: ['1', '2', '3', '4'],
    correct: 1,
    explanation: '[Co(en)₂Cl₂]⁺ has cis and trans isomers (Cl ligands either adjacent or opposite) = 2 geometrical isomers.'
  },
  {
    id: 'bc48', subject: 'Chemistry',
    text: 'Cyclooctatetraene (COT) with 8 π electrons is:',
    options: ['Aromatic', 'Antiaromatic', 'Non-aromatic', 'Superaromatic'],
    correct: 2,
    explanation: 'COT has 8 π electrons (4n, n=2), but adopts a non-planar tub shape → not cyclic planar conjugated → non-aromatic.'
  },
  {
    id: 'bc49', subject: 'Chemistry',
    text: 'The pH of a 10⁻⁸ M HCl solution is approximately:',
    options: ['8.0', '6.98', '7.02', '1.0'],
    correct: 1,
    explanation: 'At very low [HCl], water\'s H⁺ contribution matters. [H⁺]total ≈ 10⁻⁷ + 10⁻⁸ = 1.1×10⁻⁷ M → pH ≈ 6.96 ≈ 6.98.'
  },
  {
    id: 'bc50', subject: 'Chemistry',
    text: 'Mutarotation of glucose occurs due to:',
    options: ['Presence of aldehyde group only', 'Equilibrium between α and β anomers via open-chain form', 'Optical activity', 'Reaction with Benedict\'s solution'],
    correct: 1,
    explanation: 'Mutarotation: α-D-glucose ⇌ open chain ⇌ β-D-glucose in equilibrium, changing optical rotation over time.'
  },
  {
    id: 'bc51', subject: 'Chemistry',
    text: 'The Beckmann rearrangement converts:',
    options: ['Ketone to amine', 'Oxime to amide', 'Aldehyde to ketone', 'Nitrile to amide'],
    correct: 1,
    explanation: 'Beckmann rearrangement: ketoxime (R₂C=NOH) + H₂SO₄ → amide (RCONHR) via 1,2-shift of the anti group.'
  },
  {
    id: 'bc52', subject: 'Chemistry',
    text: 'The spin-only magnetic moment of Cr³⁺ (d³, electronic configuration [Ar]3d³) is:',
    options: ['1.73 BM', '2.83 BM', '3.87 BM', '4.90 BM'],
    correct: 2,
    explanation: 'Cr³⁺ has 3 unpaired electrons. μ = √(n(n+2)) = √(3×5) = √15 ≈ 3.87 BM.'
  },
  {
    id: 'bc53', subject: 'Chemistry',
    text: 'Which of the following shows ionization isomerism?',
    options: ['[Co(NH₃)₆]Cl₃ and [Co(NH₃)₆]Cl₃', '[Co(NH₃)₅Cl]SO₄ and [Co(NH₃)₅SO₄]Cl', 'cis-[Pt(NH₃)₂Cl₂] and trans-[Pt(NH₃)₂Cl₂]', '[Co(en)₃]Cl₃ and [Cr(en)₃]Cl₃'],
    correct: 1,
    explanation: 'Ionization isomers give different ions in solution. [Co(NH₃)₅Cl]SO₄ vs [Co(NH₃)₅SO₄]Cl differ by which ion is coordinated vs free.'
  },
  {
    id: 'bc54', subject: 'Chemistry',
    text: 'The degree of unsaturation (index of hydrogen deficiency) of C₆H₅NO₂ is:',
    options: ['3', '4', '5', '6'],
    correct: 2,
    explanation: 'DBE = (2C + 2 + N − H)/2 = (12 + 2 + 1 − 5)/2 = 10/2 = 5, so the index of hydrogen deficiency is 5.'
  },
  {
    id: 'bc55', subject: 'Chemistry',
    text: 'Which of the following is a step-growth (condensation) polymer?',
    options: ['Polythene', 'Polystyrene', 'Nylon-6,6', 'Teflon'],
    correct: 2,
    explanation: 'Nylon-6,6 is formed by condensation polymerization of hexamethylene diamine + adipic acid (step-growth, releases H₂O).'
  },
  {
    id: 'bc56', subject: 'Chemistry',
    text: 'The number of stereoisomers possible for 2,3-dichlorobutane is:',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: 'There are two optically active enantiomers and one meso form, so total stereoisomers = 3.'
  },
  {
    id: 'bc57', subject: 'Chemistry',
    text: 'Which of the following has the highest boiling point?',
    options: ['n-Butane', 'Isobutane', 'Propane', 'Neopentane'],
    correct: 0,
    explanation: 'For comparable alkanes, less branching gives stronger van der Waals forces and a higher boiling point. n-Butane > isobutane.'
  },
  {
    id: 'bc58', subject: 'Chemistry',
    text: 'The geometry of XeF₄ is:',
    options: ['tetrahedral', 'see-saw', 'square planar', 'trigonal bipyramidal'],
    correct: 2,
    explanation: 'XeF₄ has 6 electron pairs around Xe (4 bond pairs + 2 lone pairs), giving octahedral arrangement and square planar molecular shape.'
  },
  {
    id: 'bc59', subject: 'Chemistry',
    text: 'The incorrect statement about catalysts is:',
    options: ['They change activation energy', 'They increase the rate of forward and backward reactions equally', 'They change the equilibrium constant', 'They provide an alternative pathway'],
    correct: 2,
    explanation: 'Catalysts do not alter the equilibrium constant; they only help the system reach equilibrium faster.'
  },
  {
    id: 'bc60', subject: 'Chemistry',
    text: 'The major product formed when propene reacts with HBr in the presence of peroxide is:',
    options: ['1-bromopropane', '2-bromopropane', '1,2-dibromopropane', 'propan-2-ol'],
    correct: 0,
    explanation: 'Peroxide effect causes anti-Markovnikov addition of HBr to alkenes, giving 1-bromopropane.'
  },
  {
    id: 'bc61', subject: 'Chemistry',
    text: 'Which quantum number determines the shape of an orbital?',
    options: ['principal quantum number', 'azimuthal quantum number', 'magnetic quantum number', 'spin quantum number'],
    correct: 1,
    explanation: 'The azimuthal quantum number l determines the subshell and hence the shape of the orbital.'
  },
  {
    id: 'bc62', subject: 'Chemistry',
    text: 'The emf of a Daniell cell increases when:',
    options: ['Zn²⁺ concentration is increased', 'Cu²⁺ concentration is decreased', 'Cu²⁺ concentration is increased', 'temperature is ignored and both concentrations are made equal'],
    correct: 2,
    explanation: 'For Zn | Zn²⁺ || Cu²⁺ | Cu, E = E° − (0.0591/2) log([Zn²⁺]/[Cu²⁺]). Increasing Cu²⁺ lowers Q and increases E.'
  },
  {
    id: 'bc63', subject: 'Chemistry',
    text: 'Which oxide is amphoteric?',
    options: ['Na₂O', 'MgO', 'Al₂O₃', 'SO₂'],
    correct: 2,
    explanation: 'Al₂O₃ reacts with both acids and bases, so it is amphoteric.'
  },
  {
    id: 'bc64', subject: 'Chemistry',
    text: 'The IUPAC name of CH₃CH(OH)CH₂CHO is:',
    options: ['3-hydroxybutanal', '2-hydroxybutanal', 'butan-1-al-3-ol', '4-hydroxybutanal'],
    correct: 0,
    explanation: 'The aldehyde carbon gets priority and is numbered 1. The OH group lies on carbon 3, so the name is 3-hydroxybutanal.'
  },
  {
    id: 'bc65', subject: 'Chemistry',
    text: 'For the reaction 2A → products, the half-life is independent of initial concentration when the reaction is:',
    options: ['zero order', 'first order', 'second order', 'third order'],
    correct: 1,
    explanation: 'For first-order reactions, t₁/₂ = 0.693/k and does not depend on the starting concentration.'
  },
  {
    id: 'bc66', subject: 'Chemistry',
    text: 'Which of the following compounds will show geometrical isomerism?',
    options: ['CH₂=CHCl', 'CH₃CH=CHCH₃', 'CH₃CH₂CH=CH₂', 'CH₂=C(CH₃)₂'],
    correct: 1,
    explanation: 'Geometrical isomerism requires both carbons of the double bond to have two different substituents. This is true for but-2-ene.'
  },
  {
    id: 'bc67', subject: 'Chemistry',
    text: 'The freezing point of a 1 molal aqueous solution of a non-electrolyte (Kf for water = 1.86 K kg mol⁻¹) is:',
    options: ['−1.86°C', '1.86°C', '−0.93°C', '0°C'],
    correct: 0,
    explanation: 'Depression in freezing point ΔTf = iKfm = 1 × 1.86 × 1 = 1.86 K, so the new freezing point is −1.86°C.'
  },
  {
    id: 'bc68', subject: 'Chemistry',
    text: 'Among the following, the strongest acid is:',
    options: ['CH₃COOH', 'ClCH₂COOH', 'Cl₂CHCOOH', 'Cl₃CCOOH'],
    correct: 3,
    explanation: 'Electron-withdrawing Cl atoms increase acidity by stabilizing the conjugate base. More Cl atoms means stronger acid.'
  },
  {
    id: 'bc69', subject: 'Chemistry',
    text: 'The hybridization of carbon atoms in benzene is:',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correct: 1,
    explanation: 'Each carbon in benzene forms three sigma bonds in a trigonal planar arrangement, so each is sp² hybridized.'
  },
  {
    id: 'bc70', subject: 'Chemistry',
    text: 'Which of the following does NOT give a silver mirror with Tollens’ reagent?',
    options: ['ethanal', 'benzaldehyde', 'formic acid', 'acetone'],
    correct: 3,
    explanation: 'Aldehydes and formic acid reduce Tollens’ reagent, but acetone is a ketone and does not respond.'
  },
];

const bitsatMathBase = [
  {
    id: 'bm1', subject: 'Mathematics',
    text: 'If |2 1; k 3| = 5, then k equals:',
    options: ['1', '2', '3', '4'],
    correct: 0,
    explanation: 'Determinant = 2×3 − 1×k = 6 − k = 5, so k = 1.'
  },
  {
    id: 'bm2', subject: 'Mathematics',
    text: 'For f(x) = x³ − 3x, the local maximum value is:',
    options: ['−2', '0', '2', '4'],
    correct: 2,
    explanation: 'f′(x) = 3x² − 3 = 0 gives x = ±1. f″(−1) = −6 < 0, so local maximum at x = −1. f(−1) = 2.'
  },
  {
    id: 'bm3', subject: 'Mathematics',
    text: 'The tangent to the circle x² + y² = 25 at the point (3, 4) is:',
    options: ['3x + 4y = 25', '4x + 3y = 25', '3x − 4y = 25', 'x + y = 7'],
    correct: 0,
    explanation: 'For x² + y² = a², tangent at (x₁, y₁) is xx₁ + yy₁ = a². Hence 3x + 4y = 25.'
  },
  {
    id: 'bm4', subject: 'Mathematics',
    text: 'If nPr = 60 and nCr = 10 for the same r, then r is:',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: 'nPr = nCr × r! so 60 = 10 × r! → r! = 6 → r = 3.'
  },
  {
    id: 'bm5', subject: 'Mathematics',
    text: 'The angle between vectors 2i + j − k and i − j + 2k is given by cosθ =',
    options: ['1/6', '−1/6', '1/3', '−1/3'],
    correct: 1,
    explanation: 'Dot product = 2(1) + 1(−1) + (−1)(2) = −1. Magnitudes are √6 and √6. So cosθ = −1/(√6·√6) = −1/6.'
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
  {
    id: 'bm46', subject: 'Mathematics',
    text: 'The number of real roots of x⁴ − 5x² + 4 = 0 is:',
    options: ['0', '2', '4', '1'],
    correct: 2,
    explanation: 'Let t = x²: t² − 5t + 4 = 0 → t = 1 or t = 4 → x = ±1 or ±2. Four real roots.'
  },
  {
    id: 'bm47', subject: 'Mathematics',
    text: 'If α and β are roots of x² − px + q = 0, then α² + β² equals:',
    options: ['p² − 2q', 'p² + 2q', 'p² − q', 'p² + q'],
    correct: 0,
    explanation: 'α² + β² = (α+β)² − 2αβ = p² − 2q.'
  },
  {
    id: 'bm48', subject: 'Mathematics',
    text: 'The value of lim(x→∞) (1 + 1/x)^x is:',
    options: ['1', '0', 'e', '∞'],
    correct: 2,
    explanation: 'Standard limit: lim(x→∞)(1 + 1/x)^x = e (Euler\'s number).'
  },
  {
    id: 'bm49', subject: 'Mathematics',
    text: 'The area bounded by the curves y = x² and y = x is:',
    options: ['1/4', '1/6', '1/3', '1/2'],
    correct: 1,
    explanation: 'They intersect at x = 0 and x = 1. Area = ∫₀¹(x − x²)dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6.'
  },
  {
    id: 'bm50', subject: 'Mathematics',
    text: 'The eccentricity of a parabola is:',
    options: ['0', 'Between 0 and 1', '1', 'Greater than 1'],
    correct: 2,
    explanation: 'Eccentricity: circle e=0, ellipse 0<e<1, parabola e=1, hyperbola e>1.'
  },
  {
    id: 'bm51', subject: 'Mathematics',
    text: 'The center of the circle x² + y² + 6x − 4y − 3 = 0 is:',
    options: ['(6, −4)', '(−3, 2)', '(3, −2)', '(−6, 4)'],
    correct: 1,
    explanation: 'Complete the square: (x+3)² + (y−2)² = 16. Center = (−3, 2).'
  },
  {
    id: 'bm52', subject: 'Mathematics',
    text: 'If |a⃗| = 3, |b⃗| = 4 and the angle between them is 90°, then |a⃗ × b⃗| is:',
    options: ['0', '12', '7', '5'],
    correct: 1,
    explanation: '|a⃗ × b⃗| = |a||b|sinθ = 3 × 4 × sin90° = 12.'
  },
  {
    id: 'bm53', subject: 'Mathematics',
    text: 'The number of ways to arrange letters of "MISSISSIPPI" is:',
    options: ['34650', '11!', '3465', '69300'],
    correct: 0,
    explanation: '11 letters: M×1, I×4, S×4, P×2. Arrangements = 11!/(1!4!4!2!) = 34650.'
  },
  {
    id: 'bm54', subject: 'Mathematics',
    text: 'If tan A = 1/2 and tan B = 1/3, then tan(A + B) is:',
    options: ['5/6', '1/2', '1', '√3'],
    correct: 2,
    explanation: 'tan(A+B) = (1/2 + 1/3)/(1 − 1/2 × 1/3) = (5/6)/(5/6) = 1.'
  },
  {
    id: 'bm55', subject: 'Mathematics',
    text: 'The general solution of dy/dx = y/x is:',
    options: ['y = Ax', 'y = x + C', 'y = Ax²', 'y = Ce^x'],
    correct: 0,
    explanation: 'dy/y = dx/x → ln|y| = ln|x| + ln|A| → y = Ax (family of lines through origin).'
  },
  {
    id: 'bm56', subject: 'Mathematics',
    text: 'The number of terms in the expansion of (x + y + z)⁵ is:',
    options: ['15', '18', '21', '25'],
    correct: 2,
    explanation: 'Number of terms = ⁽ⁿ⁺ʳ⁻¹⁾C₍ᵣ₋₁₎ = ⁷C₂ = 21 (n=5, r=3 variables).'
  },
  {
    id: 'bm57', subject: 'Mathematics',
    text: 'If P(A) = 0.6, P(B) = 0.5, and P(A∪B) = 0.8, then P(A∩B) is:',
    options: ['0.2', '0.3', '0.4', '0.1'],
    correct: 1,
    explanation: 'P(A∩B) = P(A) + P(B) − P(A∪B) = 0.6 + 0.5 − 0.8 = 0.3.'
  },
  {
    id: 'bm58', subject: 'Mathematics',
    text: 'The standard deviation of the set {1, 3, 5, 7, 9} is:',
    options: ['√2', '2', '2√2', '4'],
    correct: 2,
    explanation: 'Mean = 5. Variance = [(4²+2²+0²+2²+4²)/5] = 40/5 = 8. SD = √8 = 2√2.'
  },
  {
    id: 'bm59', subject: 'Mathematics',
    text: '∫ x·eˣ dx equals:',
    options: ['xeˣ + C', '(x+1)eˣ + C', '(x−1)eˣ + C', 'eˣ + C'],
    correct: 2,
    explanation: 'Integration by parts: u = x, dv = eˣ dx → ∫xeˣ dx = xeˣ − ∫eˣ dx = xeˣ − eˣ = (x−1)eˣ + C.'
  },
  {
    id: 'bm60', subject: 'Mathematics',
    text: 'The distance from the point (1, 2, 3) to the plane 2x − y + 2z = 5 is:',
    options: ['1/3', '2/3', '5/3', '1'],
    correct: 0,
    explanation: 'Distance = |2(1) − 2 + 2(3) − 5|/√(4+1+4) = |2 − 2 + 6 − 5|/3 = 1/3.'
  },
  {
    id: 'bm61', subject: 'Mathematics',
    text: 'If z = 1 + i, then z⁴ equals:',
    options: ['−4', '4', '−4i', '4i'],
    correct: 0,
    explanation: '(1+i)² = 2i, so z⁴ = (2i)² = −4.'
  },
  {
    id: 'bm62', subject: 'Mathematics',
    text: 'The coefficient of x⁵ in the expansion of (1 + x)⁷ is:',
    options: ['7', '21', '35', '42'],
    correct: 1,
    explanation: 'The coefficient of x⁵ is ⁷C₅ = 21.'
  },
  {
    id: 'bm63', subject: 'Mathematics',
    text: 'If tan θ = 3/4 and θ lies in the first quadrant, then sec θ is:',
    options: ['3/5', '4/5', '5/4', '5/3'],
    correct: 2,
    explanation: 'Using a 3-4-5 triangle, cos θ = 4/5, so sec θ = 5/4.'
  },
  {
    id: 'bm64', subject: 'Mathematics',
    text: 'The derivative of ln(sin x) with respect to x is:',
    options: ['tan x', 'cot x', 'sec x', 'cosec x'],
    correct: 1,
    explanation: 'd/dx[ln(sin x)] = (1/sin x)·cos x = cot x.'
  },
  {
    id: 'bm65', subject: 'Mathematics',
    text: 'If A and B are independent events with P(A) = 1/2 and P(B) = 1/3, then P(A ∪ B) is:',
    options: ['1/6', '2/3', '5/6', '1/3'],
    correct: 1,
    explanation: 'P(A ∪ B) = P(A) + P(B) − P(A)P(B) = 1/2 + 1/3 − 1/6 = 2/3.'
  },
  {
    id: 'bm66', subject: 'Mathematics',
    text: 'The general solution of the differential equation dy/dx = 3x² is:',
    options: ['y = x³ + C', 'y = 3x³ + C', 'y = x² + C', 'y = 3x + C'],
    correct: 0,
    explanation: 'Integrating both sides gives y = ∫3x² dx = x³ + C.'
  },
  {
    id: 'bm67', subject: 'Mathematics',
    text: 'If the matrix A = [[2, 0], [0, 3]], then A⁻¹ is:',
    options: ['[[1/2, 0], [0, 1/3]]', '[[2, 0], [0, 3]]', '[[3, 0], [0, 2]]', '[[1/3, 0], [0, 1/2]]'],
    correct: 0,
    explanation: 'For a diagonal matrix, the inverse is found by taking reciprocals of the diagonal entries.'
  },
  {
    id: 'bm68', subject: 'Mathematics',
    text: 'The locus of a point equidistant from the points (2, 0) and (−2, 0) is:',
    options: ['x = 0', 'y = 0', 'x = 2', 'y = 2'],
    correct: 0,
    explanation: 'The locus is the perpendicular bisector of the segment joining the two points, which is x = 0.'
  },
  {
    id: 'bm69', subject: 'Mathematics',
    text: 'The value of ∫₀^π sin x dx is:',
    options: ['0', '1', '2', 'π'],
    correct: 2,
    explanation: '∫₀^π sin x dx = [−cos x]₀^π = 1 + 1 = 2.'
  },
  {
    id: 'bm70', subject: 'Mathematics',
    text: 'If α and β are the roots of x² − 7x + 10 = 0, then αβ is:',
    options: ['7', '10', '17', '−10'],
    correct: 1,
    explanation: 'For x² − sx + p = 0, the product of roots is p. Hence αβ = 10.'
  },
];

const bitsatEnglishBase = [
  {
    id: 'be1', subject: 'English',
    text: 'Choose the word closest in meaning to OBDURATE:',
    options: ['Flexible', 'Stubborn', 'Generous', 'Rapid'],
    correct: 1,
    explanation: 'Obdurate means stubborn or resistant to persuasion.'
  },
  {
    id: 'be2', subject: 'English',
    text: 'Choose the correct sentence:',
    options: ['Scarcely had the match begun when it started raining.', 'Scarcely the match had begun when it started raining.', 'Scarcely had begun the match when it started raining.', 'Scarcely the match begun had when it started raining.'],
    correct: 0,
    explanation: 'With "scarcely...when", the correct inversion is "Scarcely had...when..."'
  },
  {
    id: 'be3', subject: 'English',
    text: 'Choose the correctly spelled word:',
    options: ['Questionaire', 'Questionnaire', 'Quesionnaire', 'Questionnair'],
    correct: 1,
    explanation: 'The correct spelling is questionnaire.'
  },
  {
    id: 'be4', subject: 'English',
    text: 'The idiom "once in a blue moon" means:',
    options: ['Very often', 'At night', 'Rarely', 'Suddenly'],
    correct: 2,
    explanation: '"Once in a blue moon" means very rarely.'
  },
  {
    id: 'be5', subject: 'English',
    text: 'Identify the error: "Neither of the two proposals are acceptable."',
    options: ['Neither of the two', 'are acceptable', 'proposals', 'No error'],
    correct: 1,
    explanation: 'Neither is singular, so the sentence should read: "Neither of the two proposals is acceptable."'
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
    text: 'Select the sentence with correct subject-verb agreement:',
    options: ['The quality of the apples were excellent.', 'Neither of the answers is correct.', 'A bouquet of roses were lying on the table.', 'One of the players have been injured.'],
    correct: 2,
    explanation: '"Neither" takes a singular verb in standard usage, so "Neither of the answers is correct" is the only sentence with correct subject-verb agreement.'
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
  {
    id: 'be16', subject: 'English',
    text: 'Choose the word closest in meaning to LACONIC:',
    options: ['Verbose', 'Brief and concise', 'Lengthy', 'Confused'],
    correct: 1,
    explanation: 'Laconic = using very few words; characterized by brevity and terseness.'
  },
  {
    id: 'be17', subject: 'English',
    text: 'Fill in: "Neither the students nor the teacher ___ present."',
    options: ['were', 'are', 'is', 'have been'],
    correct: 2,
    explanation: 'With "neither...nor", the verb agrees with the nearer subject. "Teacher" is singular → "is".'
  },
  {
    id: 'be18', subject: 'English',
    text: 'Identify the error: "He is one of those persons who has succeeded in life."',
    options: ['"one of those persons"', '"who has" — should be "who have"', '"in life"', 'No error'],
    correct: 1,
    explanation: '"One of those persons who" — the relative clause refers to "persons" (plural) → "who have succeeded".'
  },
  {
    id: 'be19', subject: 'English',
    text: 'The antonym of VERBOSE is:',
    options: ['Loquacious', 'Prolix', 'Terse', 'Garrulous'],
    correct: 2,
    explanation: 'Verbose = using more words than needed. Antonym = terse/concise/brief.'
  },
  {
    id: 'be20', subject: 'English',
    text: 'Choose the correct form: "I wish I ___ a millionaire."',
    options: ['am', 'was', 'were', 'will be'],
    correct: 2,
    explanation: 'Subjunctive mood with "wish" for unreal/hypothetical situations → "I wish I were..." (even for singular subjects).'
  },
  {
    id: 'be21', subject: 'English',
    text: 'Choose the sentence with the correct use of the article:',
    options: ['He is an European scientist.', 'She bought a umbrella yesterday.', 'It was a unique opportunity.', 'He is the honest man.'],
    correct: 2,
    explanation: '"Unique" starts with a consonant sound (yu), so "a unique opportunity" is correct.'
  },
  {
    id: 'be22', subject: 'English',
    text: 'Select the correctly punctuated sentence:',
    options: ['If you work hard you will succeed.', 'If you work hard, you will succeed.', 'If, you work hard you will succeed.', 'If you work hard you, will succeed.'],
    correct: 1,
    explanation: 'A comma is correctly used after the introductory clause.'
  },
  {
    id: 'be23', subject: 'English',
    text: 'The word "benevolent" most nearly means:',
    options: ['cruel', 'kind-hearted', 'careless', 'powerful'],
    correct: 1,
    explanation: 'Benevolent means kind, generous, or well-meaning.'
  },
  {
    id: 'be24', subject: 'English',
    text: 'Choose the correct indirect speech: He said, "I can solve this problem."',
    options: ['He said that he can solve this problem.', 'He said that he could solve that problem.', 'He said he solved this problem.', 'He said that I could solve that problem.'],
    correct: 1,
    explanation: 'In indirect speech, "can" changes to "could" and "this" usually changes to "that."'
  },
  {
    id: 'be25', subject: 'English',
    text: 'Choose the word that best fits the sentence: "The judge is expected to remain completely _____ while hearing the case."',
    options: ['impartial', 'impulsive', 'arbitrary', 'hostile'],
    correct: 0,
    explanation: 'A judge is expected to remain impartial, meaning fair and unbiased.'
  },
  {
    id: 'be26', subject: 'English',
    text: 'Fill in the blank: Neither the teacher nor the students _____ aware of the change in schedule.',
    options: ['was', 'is', 'were', 'has been'],
    correct: 2,
    explanation: 'With "neither...nor", the verb agrees with the nearer subject. Here "students" is plural, so "were" is correct.'
  },
  {
    id: 'be27', subject: 'English',
    text: 'The idiom "spill the beans" means:',
    options: ['waste food', 'reveal a secret', 'make a mistake', 'argue loudly'],
    correct: 1,
    explanation: '"Spill the beans" means to reveal secret information.'
  },
  {
    id: 'be28', subject: 'English',
    text: 'The word "meticulous" most nearly means:',
    options: ['careless', 'very careful and precise', 'angry', 'confused'],
    correct: 1,
    explanation: 'Meticulous means showing great attention to detail; very careful and precise.'
  },
  {
    id: 'be29', subject: 'English',
    text: 'Choose the grammatically correct sentence:',
    options: ['Each of the players have a jersey.', 'Each of the players has a jersey.', 'Each of the player has a jersey.', 'Each of players has a jersey.'],
    correct: 1,
    explanation: '"Each" is singular, so it takes the singular verb "has."'
  },
  {
    id: 'be30', subject: 'English',
    text: 'Choose the word opposite in meaning to "scarce":',
    options: ['rare', 'limited', 'abundant', 'small'],
    correct: 2,
    explanation: 'Scarce means in short supply; its opposite is abundant.'
  },
];

const bitsatLogicBase = [
  {
    id: 'bl1', subject: 'Logical Reasoning',
    text: 'Five persons A, B, C, D and E are sitting in a row. A is to the left of B, B is to the left of C, and D is to the right of C. Who must be in the middle if they are arranged in that order with E at one end?',
    options: ['B', 'C', 'D', 'E'],
    correct: 1,
    explanation: 'The enforced order is A, B, C, D with E at one end. The middle fixed position among these is C.'
  },
  {
    id: 'bl2', subject: 'Logical Reasoning',
    text: 'Find the next term in the series: 3, 7, 15, 31, 63, ?',
    options: ['95', '111', '127', '129'],
    correct: 2,
    explanation: 'Pattern is multiply by 2 and add 1: 3→7→15→31→63→127.'
  },
  {
    id: 'bl3', subject: 'Logical Reasoning',
    text: 'If SOUTH is coded as TPVUI, then NORTH is coded as:',
    options: ['OPSUI', 'OQSVI', 'OPRUI', 'NPSUI'],
    correct: 0,
    explanation: 'Each letter is shifted by +1: N→O, O→P, R→S, T→U, H→I. So NORTH → OPSUI.'
  },
  {
    id: 'bl4', subject: 'Logical Reasoning',
    text: 'Pointing to a man, Ravi said, "He is the son of my mother\'s sister." The man is Ravi\'s:',
    options: ['Brother', 'Nephew', 'Cousin', 'Uncle'],
    correct: 2,
    explanation: 'Mother\'s sister is Ravi\'s aunt. Her son is Ravi\'s cousin.'
  },
  {
    id: 'bl5', subject: 'Logical Reasoning',
    text: 'If 1st January of a leap year is a Monday, what day will 1st January of the next year be?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    correct: 2,
    explanation: 'A leap year has 366 days = 52 weeks + 2 days. So the same date shifts forward by 2 days: Monday → Wednesday.'
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
  {
    id: 'bl11', subject: 'Logical Reasoning',
    text: 'Choose the odd one out: Square, Rectangle, Triangle, Circle',
    options: ['Square', 'Rectangle', 'Triangle', 'Circle'],
    correct: 3,
    explanation: 'Circle has no sides or vertices; the others are polygons.'
  },
  {
    id: 'bl12', subject: 'Logical Reasoning',
    text: 'If BOOK is coded as 2151511 (A=1, B=2, ...), then CODE is coded as:',
    options: ['31545', '34155', '31455', '34154'],
    correct: 0,
    explanation: 'C=3, O=15, D=4, E=5 → 31545.'
  },
  {
    id: 'bl13', subject: 'Logical Reasoning',
    text: 'A clock shows 6:00. The angle between the hands is:',
    options: ['0°', '90°', '180°', '270°'],
    correct: 2,
    explanation: 'At 6:00 the minute hand is at 12 and hour hand at 6, so the angle is 180°.'
  },
  {
    id: 'bl14', subject: 'Logical Reasoning',
    text: 'Find the next term: AZ, BY, CX, ?',
    options: ['DW', 'DX', 'EV', 'CV'],
    correct: 0,
    explanation: 'First letter moves forward A,B,C,D and second moves backward Z,Y,X,W.'
  },
  {
    id: 'bl15', subject: 'Logical Reasoning',
    text: 'If all roses are flowers and some flowers are red, then:',
    options: ['All roses are red', 'Some roses are red', 'No rose is red', 'Cannot be concluded'],
    correct: 3,
    explanation: 'No direct overlap between roses and red flowers is guaranteed.'
  },
  {
    id: 'bl16', subject: 'Logical Reasoning',
    text: 'In a queue, P is 8th from the front and 17th from the back. Total people =',
    options: ['24', '25', '26', '27'],
    correct: 0,
    explanation: 'Total = 8 + 17 − 1 = 24.'
  },
  {
    id: 'bl17', subject: 'Logical Reasoning',
    text: 'Choose the correct mirror image relation for the word TEAM (vertical mirror):',
    options: ['MAET', 'TEMA', 'AEMT', 'MEAT'],
    correct: 0,
    explanation: 'For mirror reflection, the sequence reverses to MAET (ignoring glyph-level flips).' 
  },
  {
    id: 'bl18', subject: 'Logical Reasoning',
    text: 'If 5 pens cost ₹60, what is the cost of 8 pens at the same rate?',
    options: ['₹88', '₹90', '₹96', '₹100'],
    correct: 2,
    explanation: 'Unit cost = 60/5 = 12. Cost of 8 pens = 8 × 12 = 96.'
  },
  {
    id: 'bl19', subject: 'Logical Reasoning',
    text: 'Find the missing number: 2, 6, 18, 54, ?',
    options: ['108', '144', '162', '216'],
    correct: 2,
    explanation: 'Each term is multiplied by 3. 54 × 3 = 162.'
  },
  {
    id: 'bl20', subject: 'Logical Reasoning',
    text: 'Pointing to a girl, Arun said: "She is the daughter of my grandfather\'s only son." The girl is Arun\'s:',
    options: ['Sister', 'Cousin', 'Niece', 'Daughter'],
    correct: 0,
    explanation: 'Grandfather\'s only son is Arun\'s father. So the girl is father\'s daughter, i.e., Arun\'s sister.'
  },
  {
    id: 'bl21', subject: 'Logical Reasoning',
    text: 'In a group of 40 students, 25 play chess and 20 play carrom. 10 play both. How many play neither?',
    options: ['3', '5', '10', '15'],
    correct: 1,
    explanation: 'n(Chess ∪ Carrom) = 25 + 20 − 10 = 35. Neither = 40 − 35 = 5.'
  },
  {
    id: 'bl22', subject: 'Logical Reasoning',
    text: 'Complete: 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '32', '49'],
    correct: 1,
    explanation: 'These are perfect squares: 1², 2², 3², 4², 5², 6² = 36.'
  },
  {
    id: 'bl23', subject: 'Logical Reasoning',
    text: 'In a code where A=Z, B=Y, C=X (reverse alphabet), BIRD is coded as:',
    options: ['ZIQW', 'YRIW', 'XRJV', 'YQJW'],
    correct: 1,
    explanation: 'B→Y, I→R, R→I, D→W. Code = YRIW.'
  },
  {
    id: 'bl24', subject: 'Logical Reasoning',
    text: 'Statement: All birds can fly. Conclusion I: Some birds can fly. Conclusion II: No bird can fly.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 0,
    explanation: '"All birds can fly" → "Some birds can fly" is valid (particular follows from universal). Conclusion II contradicts the statement.'
  },
  {
    id: 'bl25', subject: 'Logical Reasoning',
    text: 'A can finish work in 12 days, B in 18 days. Working together they finish in:',
    options: ['7 days', '7.2 days', '8 days', '6 days'],
    correct: 1,
    explanation: 'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36 per day. Days = 36/5 = 7.2 days.'
  },
  {
    id: 'bl26', subject: 'Logical Reasoning',
    text: 'If DELHI is coded as FGNJK in a +2 alphabet shift code, then MUMBAI is coded as:',
    options: ['OWODCK', 'OVODCK', 'OVNCAK', 'NWODCJ'],
    correct: 0,
    explanation: 'Using a +2 shift: M→O, U→W, M→O, B→D, A→C, I→K, so MUMBAI becomes OWODCK.'
  },
  {
    id: 'bl27', subject: 'Logical Reasoning',
    text: 'Find the odd one out:',
    options: ['Triangle', 'Square', 'Circle', 'Rectangle'],
    correct: 2,
    explanation: 'Circle is the only option without sides or angles; the others are polygons.'
  },
  {
    id: 'bl28', subject: 'Logical Reasoning',
    text: 'If today is Wednesday, what day will it be after 100 days?',
    options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    correct: 1,
    explanation: '100 mod 7 = 2, so two days after Wednesday is Friday.'
  },
  {
    id: 'bl29', subject: 'Logical Reasoning',
    text: 'A is taller than B, B is taller than C, and C is taller than D. Who is the shortest?',
    options: ['A', 'B', 'C', 'D'],
    correct: 3,
    explanation: 'The order is A > B > C > D, so D is the shortest.'
  },
  {
    id: 'bl30', subject: 'Logical Reasoning',
    text: 'Choose the missing term: AZ, BY, CX, ____',
    options: ['DW', 'DX', 'EV', 'CV'],
    correct: 0,
    explanation: 'The first letters move forward while the second letters move backward: A-Z, B-Y, C-X, D-W.'
  },
  {
    id: 'bl31', subject: 'Logical Reasoning',
    text: 'Statement: Some books are pens. Some pens are boxes. Conclusion: Some books are boxes.',
    options: ['Definitely follows', 'Definitely does not follow', 'May or may not follow', 'Only if all pens are books'],
    correct: 2,
    explanation: 'The overlap through "pens" does not guarantee overlap between books and boxes.'
  },
  {
    id: 'bl32', subject: 'Logical Reasoning',
    text: 'In a row of students, Ravi is 12th from the left and 9th from the right. How many students are there in the row?',
    options: ['19', '20', '21', '22'],
    correct: 1,
    explanation: 'Total students = 12 + 9 − 1 = 20.'
  },
  {
    id: 'bl33', subject: 'Logical Reasoning',
    text: 'If "MANGO" is written as "NBOHP" in a +1 alphabet shift code, then "APPLE" will be written as:',
    options: ['BQQMF', 'BQQMD', 'AQQMF', 'CRRNG'],
    correct: 0,
    explanation: 'Shifting each letter by +1 gives A→B, P→Q, P→Q, L→M, E→F, so APPLE becomes BQQMF.'
  },
  {
    id: 'bl34', subject: 'Logical Reasoning',
    text: 'How many times do the hands of a clock overlap between 12 noon and 12 midnight?',
    options: ['10', '11', '12', '13'],
    correct: 1,
    explanation: 'The hour and minute hands coincide 11 times in 12 hours.'
  },
  {
    id: 'bl35', subject: 'Logical Reasoning',
    text: 'If in a certain language, TEACHER is coded as VGCEJGT, then STUDENT is coded as:',
    options: ['UVWFGPV', 'UVWFGOU', 'TUVDFOU', 'UVWFGQT'],
    correct: 0,
    explanation: 'Each letter is shifted by +2: S→U, T→V, U→W, D→F, E→G, N→P, T→V.'
  },
];

const bitsatPhysicsHard = [
  {
    id: 'bph1', subject: 'Physics',
    text: 'A disc rolls without slipping down an incline of angle theta. For a solid disc, acceleration of center of mass is:',
    options: ['g sin(theta)', '(2/3) g sin(theta)', '(1/2) g sin(theta)', '(3/4) g sin(theta)'],
    correct: 1,
    explanation: 'a = g sin(theta) / (1 + I/mR^2). For solid disc I = (1/2)mR^2, so a = g sin(theta)/(1+1/2) = (2/3)g sin(theta).'
  },
  {
    id: 'bph2', subject: 'Physics',
    text: 'In Young\'s double-slit experiment, if wavelength is doubled and slit separation is halved, fringe width becomes:',
    options: ['Unchanged', '2 times', '4 times', '1/2 times'],
    correct: 2,
    explanation: 'Beta = lambda D / d. New beta = (2lambda)D/(d/2) = 4(lambda D/d).'
  },
  {
    id: 'bph3', subject: 'Physics',
    text: 'A capacitor C is charged to V and connected in parallel with an identical uncharged capacitor. Final energy stored is:',
    options: ['CV^2/2', 'CV^2/4', 'CV^2/8', 'CV^2'],
    correct: 1,
    explanation: 'Total charge Q = CV. Final voltage V/2 on equivalent 2C. Energy = (1/2)(2C)(V/2)^2 = CV^2/4.'
  },
  {
    id: 'bph4', subject: 'Physics',
    text: 'For a transistor in common-emitter mode, relation between current gains alpha and beta is:',
    options: ['beta = alpha/(1-alpha)', 'beta = (1-alpha)/alpha', 'alpha = beta/(1-beta)', 'alpha = beta+1'],
    correct: 0,
    explanation: 'beta = Ic/Ib and alpha = Ic/Ie with Ie = Ic + Ib, giving beta = alpha/(1-alpha).'
  },
  {
    id: 'bph5', subject: 'Physics',
    text: 'A body is projected with speed u at angle theta. Radius of curvature at highest point is:',
    options: ['u^2/g', 'u^2 cos^2(theta)/g', 'u^2 sin^2(theta)/g', 'u^2 sin(2theta)/g'],
    correct: 1,
    explanation: 'At top, speed = u cos(theta) and normal acceleration = g, so R = v^2/g = u^2 cos^2(theta)/g.'
  },
  {
    id: 'bph6', subject: 'Physics',
    text: 'Two resistors 3 ohm and 6 ohm are connected in parallel across 18 V. Heat ratio H3:H6 in same time is:',
    options: ['1:2', '2:1', '4:1', '1:4'],
    correct: 1,
    explanation: 'H = V^2 t / R for each branch in parallel. Ratio = (1/3):(1/6) = 2:1.'
  },
  {
    id: 'bph7', subject: 'Physics',
    text: 'For an ideal gas in adiabatic process, PV^gamma = constant. Work done from (P1,V1) to (P2,V2) is:',
    options: ['(P2V2-P1V1)/(gamma-1)', '(P1V1-P2V2)/(gamma-1)', 'gamma(P1V1-P2V2)', '(P1V1+P2V2)/2'],
    correct: 1,
    explanation: 'Standard result for adiabatic work by gas: W = (P1V1 - P2V2)/(gamma - 1).'
  },
  {
    id: 'bph8', subject: 'Physics',
    text: 'A charged particle enters perpendicular to uniform B with speed v. If speed doubles, cyclotron frequency becomes:',
    options: ['2 times', '1/2 times', 'Unchanged', '4 times'],
    correct: 2,
    explanation: 'Cyclotron frequency f = qB/(2pi m), independent of speed.'
  },
];

const bitsatChemistryHard = [
  {
    id: 'bch1', subject: 'Chemistry',
    text: 'For first-order reaction, half-life t1/2 is related to rate constant k as:',
    options: ['t1/2 = 0.693/k', 't1/2 = 1/k', 't1/2 = k/0.693', 't1/2 = 2.303/k'],
    correct: 0,
    explanation: 'For first-order kinetics, t1/2 = ln2/k = 0.693/k.'
  },
  {
    id: 'bch2', subject: 'Chemistry',
    text: 'In SN1 reactions, rate depends on:',
    options: ['[substrate][nucleophile]', '[substrate]^2', '[substrate]', '[nucleophile]'],
    correct: 2,
    explanation: 'Rate-determining step is carbocation formation, so rate = k[substrate].'
  },
  {
    id: 'bch3', subject: 'Chemistry',
    text: 'Among the following, strongest reducing agent in aqueous medium is:',
    options: ['Zn', 'Al', 'Li', 'Na'],
    correct: 2,
    explanation: 'Lithium has most negative E degree value considering hydration effects, making it strongest reducing agent in water.'
  },
  {
    id: 'bch4', subject: 'Chemistry',
    text: 'Magnetic moment (spin-only) of [FeF6]3- (high spin) is closest to:',
    options: ['1.73 BM', '3.87 BM', '5.92 BM', '4.90 BM'],
    correct: 2,
    explanation: 'Fe3+ is d5 high spin with 5 unpaired electrons. mu = sqrt(n(n+2)) = sqrt(35) approx 5.92 BM.'
  },
  {
    id: 'bch5', subject: 'Chemistry',
    text: 'pH of 10^-8 M HCl at 25 degree C is approximately:',
    options: ['8.00', '7.00', '6.98', '6.00'],
    correct: 2,
    explanation: 'Need to include water autoionization, giving [H+] slightly above 10^-7; pH is slightly below 7, about 6.98.'
  },
  {
    id: 'bch6', subject: 'Chemistry',
    text: 'Which is aromatic?',
    options: ['Cyclobutadiene', 'Cyclooctatetraene', 'Pyridine', 'Cyclopentadiene'],
    correct: 2,
    explanation: 'Pyridine has 6 pi electrons satisfying Huckel rule and is aromatic.'
  },
  {
    id: 'bch7', subject: 'Chemistry',
    text: 'Order of acidic strength is:',
    options: ['HF > HCl > HBr > HI', 'HI > HBr > HCl > HF', 'HCl > HBr > HI > HF', 'HBr > HI > HCl > HF'],
    correct: 1,
    explanation: 'In aqueous medium for HX, acidity increases down group due to weaker H-X bond: HI > HBr > HCl > HF.'
  },
  {
    id: 'bch8', subject: 'Chemistry',
    text: 'Equivalent conductivity at infinite dilution is maximum for:',
    options: ['CH3COOH', 'HCl', 'NaCl', 'NH4OH'],
    correct: 1,
    explanation: 'H+ has exceptionally high ionic mobility, so HCl has very high limiting conductivity.'
  },
];

const bitsatMathHard = [
  {
    id: 'bmh1', subject: 'Mathematics',
    text: 'If roots of 2x^2 - 5x + k = 0 differ by 1, then k equals:',
    options: ['2', '21/8', '5/2', '3'],
    correct: 1,
    explanation: 'For ax^2+bx+c=0, (r1-r2)^2 = (b^2-4ac)/a^2. Here (25-8k)/4 = 1 => 25-8k = 4 => k = 21/8.'
  },
  {
    id: 'bmh2', subject: 'Mathematics',
    text: 'If roots of x^2 - px + q = 0 are in ratio 2:3 and their sum is 20, then q is:',
    options: ['60', '64', '96', '100'],
    correct: 2,
    explanation: 'Roots are 8 and 12 (2k,3k with 5k=20). Product q = 8 x 12 = 96.'
  },
  {
    id: 'bmh3', subject: 'Mathematics',
    text: 'Number of ways to arrange letters of MISSISSIPPI is:',
    options: ['34650', '27720', '25200', '13860'],
    correct: 0,
    explanation: '11!/(4!4!2!) = 34650.'
  },
  {
    id: 'bmh4', subject: 'Mathematics',
    text: 'If determinant |x 1 1; 1 x 1; 1 1 x| = 0, then x can be:',
    options: ['-2 only', '1 only', '-2 or 1', '0 or 1'],
    correct: 2,
    explanation: 'Determinant equals (x-1)^2(x+2), hence roots are x=1 and x=-2.'
  },
  {
    id: 'bmh5', subject: 'Mathematics',
    text: 'If sin(theta)+cos(theta)=sqrt(2)cos(alpha), then alpha equals:',
    options: ['theta-45 degree', 'theta+45 degree', '45 degree-theta', '90 degree-theta'],
    correct: 0,
    explanation: 'sin(theta)+cos(theta) = sqrt(2)cos(theta-45 degree).'
  },
  {
    id: 'bmh6', subject: 'Mathematics',
    text: 'The tangent to y=x^2 at point (1,1) meets y-axis at:',
    options: ['(0,1)', '(0,-1)', '(0,2)', '(0,-2)'],
    correct: 1,
    explanation: 'Slope = 2x at x=1 is 2. Equation y-1 = 2(x-1) => y = 2x-1, y-intercept -1.'
  },
  {
    id: 'bmh7', subject: 'Mathematics',
    text: 'If A and B are independent with P(A)=0.4 and P(B)=0.5, then P(A U B) is:',
    options: ['0.2', '0.7', '0.9', '0.6'],
    correct: 1,
    explanation: 'P(A U B) = P(A)+P(B)-P(A)P(B) = 0.4+0.5-0.2 = 0.7.'
  },
  {
    id: 'bmh8', subject: 'Mathematics',
    text: 'Solution set of |2x-3| < 5 is:',
    options: ['-1 < x < 4', '-4 < x < 1', 'x < 4', 'x > -1'],
    correct: 0,
    explanation: '-5 < 2x-3 < 5 => -2 < 2x < 8 => -1 < x < 4.'
  },
  {
    id: 'bmh9', subject: 'Mathematics',
    text: 'If z = 3 - 4i, then |z| is:',
    options: ['5', '7', '1', '25'],
    correct: 0,
    explanation: '|z| = sqrt(3^2 + (-4)^2) = 5.'
  },
  {
    id: 'bmh10', subject: 'Mathematics',
    text: 'The angle between vectors i+2j+2k and 2i+j+2k is:',
    options: ['cos^-1(8/9)', '30 degree', '45 degree', '60 degree'],
    correct: 0,
    explanation: 'Dot product is 8 and each magnitude is 3, so cos(theta)=8/9 and theta=cos^-1(8/9).'
  },
  {
    id: 'bmh11', subject: 'Mathematics',
    text: 'If sum to infinity of a GP is 12 and first term is 3, common ratio is:',
    options: ['1/4', '3/4', '1/2', '2/3'],
    correct: 1,
    explanation: 'S = a/(1-r) => 12 = 3/(1-r) => 1-r = 1/4 => r = 3/4.'
  },
  {
    id: 'bmh12', subject: 'Mathematics',
    text: 'If f(x)=x^3-3x, local minima value is:',
    options: ['-2', '2', '0', '-1'],
    correct: 0,
    explanation: 'f\'(x)=3x^2-3=0 => x=+-1. f\"(1)>0 so minima at x=1 with value -2.'
  },
];

const bitsatEnglishHard = [
  {
    id: 'beh1', subject: 'English',
    text: 'Choose the correctly spelt word:',
    options: ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
    correct: 2,
    explanation: 'Correct spelling is accommodate.'
  },
  {
    id: 'beh2', subject: 'English',
    text: 'Select the sentence with correct subject-verb agreement:',
    options: ['Neither the boys nor the girl are ready.', 'Neither the boys nor the girl is ready.', 'Neither the boys nor the girl were ready.', 'Neither boys nor girl are ready.'],
    correct: 1,
    explanation: 'With neither...nor, verb agrees with nearest subject girl, so is is correct.'
  },
  {
    id: 'beh3', subject: 'English',
    text: 'Antonym of "obscure" is:',
    options: ['Vague', 'Clear', 'Hidden', 'Uncertain'],
    correct: 1,
    explanation: 'Obscure means unclear/hidden; antonym is clear.'
  },
  {
    id: 'beh4', subject: 'English',
    text: 'Choose the correct indirect speech: He said, "I have finished my work."',
    options: ['He said that he has finished his work.', 'He said that he had finished his work.', 'He said he finished my work.', 'He says that he had finished his work.'],
    correct: 1,
    explanation: 'In past reporting, present perfect usually backshifts to past perfect.'
  },
];

const bitsatLogicHard = [
  {
    id: 'blh1', subject: 'Logical Reasoning',
    text: 'If in a code language, DELHI is coded as EFMIJ, how is MUMBAI coded?',
    options: ['NVNCBJ', 'NVNABJ', 'NVMBAJ', 'NUNCBJ'],
    correct: 0,
    explanation: 'Each letter is shifted by +1 alphabetically: M->N, U->V, M->N, B->C, A->B, I->J.'
  },
  {
    id: 'blh2', subject: 'Logical Reasoning',
    text: 'Statement: All engineers are logical. Some logical people are artists. Conclusion: Some engineers are artists.',
    options: ['Definitely true', 'Definitely false', 'Cannot be determined', 'Only if all artists are engineers'],
    correct: 2,
    explanation: 'No direct overlap between engineers and artists is guaranteed.'
  },
  {
    id: 'blh3', subject: 'Logical Reasoning',
    text: 'A is north of B. C is east of B. D is south of C. D is in which direction from A?',
    options: ['South-East', 'East', 'South', 'South-West'],
    correct: 0,
    explanation: 'Take B as origin: A(0,1), C(1,0), D(1,-1). From A to D direction is south-east.'
  },
  {
    id: 'blh4', subject: 'Logical Reasoning',
    text: 'Find next term: 3, 8, 15, 24, 35, ?',
    options: ['46', '48', '49', '50'],
    correct: 1,
    explanation: 'Differences are 5, 7, 9, 11; next is 13. So 35+13 = 48.'
  },
  {
    id: 'blh5', subject: 'Logical Reasoning',
    text: 'In a row of 40 students, Ravi is 12th from left. What is his position from right?',
    options: ['27th', '28th', '29th', '30th'],
    correct: 2,
    explanation: 'Position from right = 40 - 12 + 1 = 29.'
  },
  {
    id: 'blh6', subject: 'Logical Reasoning',
    text: 'If today is Wednesday, what day will it be after 100 days?',
    options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    correct: 1,
    explanation: '100 mod 7 = 2, so two days after Wednesday is Friday.'
  },
];

export const bitsatPhysics = [
  ...bitsatPhysicsBase,
  ...bitsatDailyPhysics,
];

export const bitsatChemistry = [
  ...bitsatChemistryBase,
  ...bitsatDailyChemistry,
];

export const bitsatMath = [
  ...bitsatMathBase,
  ...bitsatDailyMath,
];

export const bitsatEnglish = [
  ...bitsatEnglishBase,
  ...bitsatDailyEnglish,
];

export const bitsatLogic = [
  ...bitsatLogicBase,
  ...bitsatDailyLogic,
];

export const bitsatDailyPapers = [latestBitsatDailyPaper];

export const bitsatTenYearBlueprint = {
  span: '2016-2025',
  pattern: {
    Physics: 30,
    Chemistry: 30,
    Mathematics: 40,
    English: 10,
    'Logical Reasoning': 20,
  },
  focus: [
    'Physics: Mechanics + Electrostatics + Modern Physics remain high-yield anchors.',
    'Chemistry: Organic named reactions and Inorganic periodic trends recur consistently.',
    'Mathematics: Calculus and Algebra together drive most score separation.',
    'English/Logic: Stable and speed-sensitive section that rewards daily short drills.',
  ],
};

const SUBJECT_PAPER_SERIES = {
  physics: [
    {
      name: 'Mechanics Core',
      topics: '30 Physics questions | Kinematics, laws of motion, work-energy, rotation, gravitation',
      keywords: ['kinematics', 'laws of motion', 'mechanics', 'rotation', 'collision', 'gravitation', 'projectile', 'moment of inertia'],
      hardRatio: 0.62,
      description: 'BITSAT-style physics drill centered on mechanics, gravitation, collisions, and rotational applications.',
    },
    {
      name: 'Electrostatics and Current Electricity',
      topics: '30 Physics questions | Electric field, potential, circuits, capacitors, Wheatstone bridge',
      keywords: ['electrostatics', 'electric field', 'potential', 'capacitor', 'current electricity', 'wheatstone', 'resistor', 'ohm'],
      hardRatio: 0.68,
      description: 'A circuit-heavy paper with electric field, potential, resistance networks, and capacitor reasoning.',
    },
    {
      name: 'Magnetism to EMI',
      topics: '30 Physics questions | Magnetism, moving charges, AC, inductors, transformers, EMI',
      keywords: ['magnetic', 'magnetism', 'cyclotron', 'inductor', 'lenz', 'ac', 'transformer', 'impedance'],
      hardRatio: 0.7,
      description: 'Covers moving charges in magnetic fields, induction, AC circuits, and transformer-style numericals.',
    },
    {
      name: 'Optics and Modern Physics',
      topics: '30 Physics questions | Ray optics, wave optics, atoms, nuclei, photoelectric effect, semiconductors',
      keywords: ['optics', 'lens', 'mirror', 'young', 'photoelectric', 'hydrogen', 'nuclear', 'semiconductor', 'de broglie'],
      hardRatio: 0.72,
      description: 'Mixes optics with atoms, nuclei, photoelectric effect, and early modern physics patterns seen in BITSAT.',
    },
    {
      name: 'Thermal Physics and Fluids',
      topics: '30 Physics questions | Thermodynamics, kinetic theory, heat, elasticity, fluids, surface tension',
      keywords: ['thermodynamics', 'adiabatic', 'carnot', 'gas', 'kinetic', 'surface tension', 'bernoulli', 'capillary'],
      hardRatio: 0.58,
      description: 'A moderate-difficulty physics set built around thermodynamics, gas laws, and fluid mechanics.',
    },
    {
      name: 'Wave Motion and SHM',
      topics: '30 Physics questions | SHM, waves, resonance, Doppler effect, sound, wave optics',
      keywords: ['shm', 'simple pendulum', 'wave', 'resonance', 'doppler', 'sound', 'interference', 'fringe'],
      hardRatio: 0.66,
      description: 'Focuses on oscillations, sound, resonance, and interference-heavy BITSAT question framing.',
    },
    {
      name: 'Formula Sprint',
      topics: '30 Physics questions | Direct-formula application across the full syllabus',
      keywords: ['rms', 'escape velocity', 'bandwidth', 'frequency', 'work function', 'angular momentum', 'wavelength', 'efficiency'],
      hardRatio: 0.5,
      description: 'A faster-scoring subject paper built around direct formulas, standard results, and quick elimination.',
    },
    {
      name: 'High Difficulty Mixed',
      topics: '30 Physics questions | Tougher multi-concept numericals from across BITSAT physics',
      keywords: ['rotation', 'electromagnetism', 'current electricity', 'wave optics', 'modern physics', 'thermodynamics', 'collision', 'center of mass'],
      hardRatio: 0.82,
      description: 'Deliberately tougher subject paper that leans toward multi-step numericals and mixed-concept traps.',
    },
    {
      name: '2026 Shift Mirror',
      topics: '30 Physics questions | Moderate-to-tough mix mirroring recent shift trends',
      keywords: ['mechanics', 'electrostatics', 'current electricity', 'optics', 'modern physics', 'thermodynamics', 'semiconductor'],
      hardRatio: 0.67,
      description: 'Built to resemble recent BITSAT shift balance: moderate physics with a few high-leverage tough problems.',
    },
    {
      name: 'Last Mile Revision',
      topics: '30 Physics questions | Final revision paper with high-frequency BITSAT areas',
      keywords: ['mechanics', 'electrostatics', 'optics', 'modern physics', 'thermodynamics', 'magnetic', 'ac'],
      hardRatio: 0.6,
      description: 'Final revision-oriented physics paper featuring the most repeated BITSAT-ready chapters and models.',
    },
  ],
  chemistry: [
    {
      name: 'Physical Chemistry Core',
      topics: '30 Chemistry questions | Mole concept, thermodynamics, equilibrium, kinetics, solutions',
      keywords: ['thermodynamics', 'equilibrium', 'chemical kinetics', 'mole', 'colligative', 'electrochemistry', 'solution', 'ph'],
      hardRatio: 0.64,
      description: 'A physical-chemistry dominant paper with pH, equilibrium, thermodynamics, and rate-law style problems.',
    },
    {
      name: 'Organic Reactions Engine',
      topics: '30 Chemistry questions | GOC, named reactions, hydrocarbons, carbonyls, biomolecules',
      keywords: ['organic', 'goc', 'named reaction', 'aldehyde', 'ketone', 'grignard', 'iodoform', 'biomolecule'],
      hardRatio: 0.7,
      description: 'Designed around the organic reaction patterns and reagent recognition that recur in BITSAT.',
    },
    {
      name: 'Chemical Bonding and Periodicity',
      topics: '30 Chemistry questions | Chemical bonding, periodic table, hybridisation, molecular shapes',
      keywords: ['chemical bonding', 'hybridization', 'vsepr', 'periodic', 'molecular', 'dipole', 'if₅', 'lattice'],
      hardRatio: 0.68,
      description: 'Focuses on bonding logic, periodic trends, hybridisation, and structure-property questions.',
    },
    {
      name: 'Coordination and d-f Block',
      topics: '30 Chemistry questions | Coordination compounds, ligand field ideas, transition elements, metallurgy',
      keywords: ['coordination', 'ligand', 'd and f block', 'transition', 'magnetic moment', 'complex', 'metal'],
      hardRatio: 0.72,
      description: 'A tougher inorganic paper built around coordination chemistry, transition-metal behavior, and complexes.',
    },
    {
      name: 'Electrochemistry and Redox',
      topics: '30 Chemistry questions | Redox, electrochemistry, conductance, cells, ionic equilibrium',
      keywords: ['electrochemistry', 'redox', 'cell', 'conductance', 'ionic', 'equilibrium', 'nernst', 'ph'],
      hardRatio: 0.69,
      description: 'Cell reactions, redox balancing, electrochemical reasoning, and ionic-equilibrium trap questions.',
    },
    {
      name: 'Thermo and Equilibrium Drill',
      topics: '30 Chemistry questions | Thermodynamics, chemical equilibrium, surface chemistry, states of matter',
      keywords: ['thermodynamics', 'equilibrium', 'surface chemistry', 'adsorption', 'entropy', 'gibbs', 'gas'],
      hardRatio: 0.62,
      description: 'A steady-scoring chemistry set with thermodynamics, equilibria, and classic state-of-matter concepts.',
    },
    {
      name: 'NCERT Fast Revision',
      topics: '30 Chemistry questions | Direct NCERT-style facts across physical, organic, and inorganic chemistry',
      keywords: ['polymer', 'biomolecule', 'vitamin', 'polymerisation', 'periodic', 'acid', 'base', 'salt'],
      hardRatio: 0.48,
      description: 'A quicker chemistry revision paper closer to direct NCERT recall and fact-pattern questions.',
    },
    {
      name: 'High Difficulty Mixed',
      topics: '30 Chemistry questions | Tough mixed chemistry with conceptual traps and hybrid framing',
      keywords: ['electrochemistry', 'coordination', 'thermodynamics', 'equilibrium', 'named reaction', 'isomerism', 'chemical bonding', 'chemical kinetics'],
      hardRatio: 0.82,
      description: 'A hard mixed paper intended to pressure-test chemical concepts, not just memory.',
    },
    {
      name: '2026 Shift Mirror',
      topics: '30 Chemistry questions | Organic + coordination + thermodynamics mix like recent shifts',
      keywords: ['organic', 'coordination', 'thermodynamics', 'equilibrium', 'chemical bonding', 'electrochemistry', 'isomerism'],
      hardRatio: 0.66,
      description: 'Built around the recent BITSAT chemistry feel: scoring overall, but with pockets of tricky conceptual items.',
    },
    {
      name: 'Last Mile Revision',
      topics: '30 Chemistry questions | Final revision set from the most repeated BITSAT chemistry areas',
      keywords: ['organic', 'chemical bonding', 'coordination', 'equilibrium', 'electrochemistry', 'thermodynamics', 'periodic'],
      hardRatio: 0.58,
      description: 'A balanced revision paper covering the chemistry chapters most likely to move the BITSAT score quickly.',
    },
  ],
  mathematics: [
    {
      name: 'Calculus Core',
      topics: '40 Mathematics questions | Limits, differentiation, application of derivatives, integration',
      keywords: ['calculus', 'differential', 'integration', 'derivative', 'limit', 'area', 'tangent'],
      hardRatio: 0.8,
      description: 'A calculus-heavy mathematics paper modeled on the single biggest score-separating zone in BITSAT.',
    },
    {
      name: 'Algebra and Sequences',
      topics: '40 Mathematics questions | Complex numbers, quadratic equations, sequence-series, binomial theorem',
      keywords: ['algebra', 'sequence', 'series', 'binomial', 'complex', 'quadratic', 'progression'],
      hardRatio: 0.74,
      description: 'Targets the algebra core: complex numbers, equations, progressions, and standard BITSAT algebra twists.',
    },
    {
      name: 'Coordinate Geometry',
      topics: '40 Mathematics questions | Straight lines, circles, parabola, ellipse, hyperbola',
      keywords: ['coordinate', 'circle', 'parabola', 'ellipse', 'hyperbola', 'line', 'conic'],
      hardRatio: 0.76,
      description: 'Conic-section and coordinate-geometry set with the medium-length analytical style common in BITSAT.',
    },
    {
      name: 'Matrices, Determinants and Vectors',
      topics: '40 Mathematics questions | Matrices, determinants, vectors, 3D geometry, transformations',
      keywords: ['matrices', 'determinants', 'vector', '3d', 'plane', 'direction ratio', 'transformation'],
      hardRatio: 0.8,
      description: 'A strong vectors-plus-linear-algebra paper built for accuracy under time pressure.',
    },
    {
      name: 'Probability and Statistics',
      topics: '40 Mathematics questions | Probability, P&C, distributions, statistics, linear programming',
      keywords: ['probability', 'permutation', 'combination', 'statistics', 'mean', 'variance', 'linear programming'],
      hardRatio: 0.72,
      description: 'Focuses on probability setups, counting logic, and data interpretation style questions.',
    },
    {
      name: 'Trigonometry and Geometry',
      topics: '40 Mathematics questions | Trigonometry, heights and distances, properties, coordinate applications',
      keywords: ['trigonometry', 'triangle', 'angle', 'height', 'distance', 'coordinate', 'identity'],
      hardRatio: 0.69,
      description: 'A medium-to-tough trigonometry paper that blends identities, angles, and geometry-based solving.',
    },
    {
      name: 'Formula Sprint',
      topics: '40 Mathematics questions | Faster one-minute questions across algebra, trigonometry, and vectors',
      keywords: ['algebra', 'trigonometry', 'matrices', 'determinants', 'vector', 'probability', 'coordinate'],
      hardRatio: 0.56,
      description: 'A faster mathematics set designed for revision speed, option elimination, and confidence building.',
    },
    {
      name: 'High Difficulty Mixed',
      topics: '40 Mathematics questions | Tough mixed paper with longer calculus and probability-heavy items',
      keywords: ['integration', 'differential', 'vector', '3d', 'probability', 'matrices', 'statistics', 'conic'],
      hardRatio: 0.9,
      description: 'A hard mixed mathematics paper that intentionally leans into the lengthier BITSAT-style problems.',
    },
    {
      name: '2026 Shift Mirror',
      topics: '40 Mathematics questions | Lengthy mixed maths mirroring recent BITSAT shifts',
      keywords: ['calculus', 'integration', 'differential', 'algebra', 'coordinate', 'vector', 'probability', '3d'],
      hardRatio: 0.85,
      description: 'Built to mirror recent BITSAT mathematics: long, accuracy-sensitive, and heavy on calculus and vectors.',
    },
    {
      name: 'Last Mile Revision',
      topics: '40 Mathematics questions | Final revision of the most repeated BITSAT maths chapters',
      keywords: ['calculus', 'algebra', 'coordinate', 'vector', 'probability', 'matrices', 'trigonometry'],
      hardRatio: 0.74,
      description: 'A final revision paper combining the chapters that most often determine BITSAT maths performance.',
    },
  ],
  english: [
    {
      name: 'Grammar Core',
      topics: '10 English questions | Tenses, agreement, articles, prepositions, sentence correction',
      keywords: ['grammar', 'sentence', 'error spotting', 'agreement', 'passive', 'punctuation'],
      hardRatio: 0.46,
      description: 'Grammar-first English practice set with sentence correction and structure-heavy questions.',
    },
    {
      name: 'Vocabulary Builder',
      topics: '10 English questions | Synonyms, antonyms, word usage, idioms, verbal precision',
      keywords: ['synonym', 'antonym', 'word', 'idiom', 'meaning', 'vocabulary', 'enervate', 'taciturn'],
      hardRatio: 0.42,
      description: 'A vocabulary-focused paper built around high-yield word meaning and usage patterns.',
    },
    {
      name: 'Usage and Error Spotting',
      topics: '10 English questions | Usage, tense, parallelism, sentence error, correction',
      keywords: ['error spotting', 'sentence', 'agreement', 'grammar', 'correct sentence', 'identify the error'],
      hardRatio: 0.48,
      description: 'Targets the quick grammar traps that frequently appear in the BITSAT English section.',
    },
    {
      name: 'Reading and Inference',
      topics: '10 English questions | Short comprehension, inference, tone, central idea',
      keywords: ['comprehension', 'passage', 'primarily discusses', 'tone', 'inference', 'reading'],
      hardRatio: 0.44,
      description: 'A short-reading English set focused on passage intent, inference, and quick verbal extraction.',
    },
    {
      name: 'Spelling and Idiom Mix',
      topics: '10 English questions | Spelling, idioms, phrases, precise expression',
      keywords: ['spelled', 'idiom', 'correctly spelled', 'phrase', 'usage', 'word'],
      hardRatio: 0.35,
      description: 'Designed for fast verbal scoring through spelling accuracy and idiom recognition.',
    },
    {
      name: 'Figure of Speech and Usage',
      topics: '10 English questions | Figures of speech, parts of speech, sentence transformation',
      keywords: ['figure of speech', 'part of speech', 'passive voice', 'sentence', 'personification'],
      hardRatio: 0.38,
      description: 'Covers stylistic language, grammar labels, and simple transformation questions.',
    },
    {
      name: 'Fast Revision',
      topics: '10 English questions | Mixed quick-score English drill across grammar and vocabulary',
      keywords: ['grammar', 'synonym', 'antonym', 'idiom', 'spelled', 'sentence'],
      hardRatio: 0.32,
      description: 'A quick mixed verbal drill built for final-week English revision.',
    },
    {
      name: 'High Accuracy Challenge',
      topics: '10 English questions | Slightly tougher verbal set with close options and subtle traps',
      keywords: ['grammar', 'comprehension', 'sentence', 'meaning', 'punctuation', 'usage'],
      hardRatio: 0.52,
      description: 'A precision-oriented English paper where distractors are closer and elimination matters more.',
    },
    {
      name: '2026 Shift Mirror',
      topics: '10 English questions | Recent-pattern mix of vocabulary, grammar, and short comprehension',
      keywords: ['synonym', 'grammar', 'comprehension', 'idiom', 'spelled', 'sentence'],
      hardRatio: 0.4,
      description: 'Mirrors the recent BITSAT English feel: mostly scoring, but costly if rushed carelessly.',
    },
    {
      name: 'Last Mile Revision',
      topics: '10 English questions | Final compact English revision from recurring BITSAT formats',
      keywords: ['grammar', 'synonym', 'antonym', 'idiom', 'spelled', 'comprehension'],
      hardRatio: 0.34,
      description: 'A last-mile English paper built around the recurring BITSAT verbal formats students should finish quickly.',
    },
  ],
  logic: [
    {
      name: 'Series and Coding',
      topics: '20 Logical Reasoning questions | Number series, letter series, coding-decoding',
      keywords: ['series', 'coding', 'number', 'letter', 'pattern'],
      hardRatio: 0.46,
      description: 'A fast logic paper covering the two most common scoring areas: series and coding-decoding.',
    },
    {
      name: 'Syllogism and Venn',
      topics: '20 Logical Reasoning questions | Syllogism, Venn diagrams, set logic, statements',
      keywords: ['syllogism', 'venn', 'statement', 'conclusion', 'set'],
      hardRatio: 0.5,
      description: 'Targets classic BITSAT set reasoning and syllogism formats with moderate logical density.',
    },
    {
      name: 'Arrangement Drill',
      topics: '20 Logical Reasoning questions | Seating arrangement, linear order, ranking, queue',
      keywords: ['arrangement', 'queue', 'ranking', 'order', 'seating'],
      hardRatio: 0.58,
      description: 'Arrangement-heavy paper built for the longer reasoning questions that can burn time quickly.',
    },
    {
      name: 'Directions and Blood Relations',
      topics: '20 Logical Reasoning questions | Direction sense, family tree, relation mapping',
      keywords: ['direction', 'blood relation', 'family', 'clockwise', 'relative'],
      hardRatio: 0.42,
      description: 'A moderate set focused on relation-mapping and direction-sense diagrams.',
    },
    {
      name: 'Analogy and Classification',
      topics: '20 Logical Reasoning questions | Analogy, odd one out, classification, grouping',
      keywords: ['analogy', 'classification', 'odd', 'group', 'relation'],
      hardRatio: 0.34,
      description: 'Shorter and faster logic set emphasizing analogy, classification, and quick pattern recognition.',
    },
    {
      name: 'Clock, Calendar and Time',
      topics: '20 Logical Reasoning questions | Clock, calendar, time sequence, scheduling patterns',
      keywords: ['clock', 'calendar', 'time', 'schedule', 'day'],
      hardRatio: 0.44,
      description: 'A time-logic paper built around clocks, calendars, and sequence-based logical interpretation.',
    },
    {
      name: 'Fast Revision',
      topics: '20 Logical Reasoning questions | Mixed quick-score LR paper across common BITSAT formats',
      keywords: ['series', 'coding', 'syllogism', 'venn', 'direction', 'clock'],
      hardRatio: 0.38,
      description: 'Final revision set combining the quickest and most repeated BITSAT logical reasoning formats.',
    },
    {
      name: 'High Difficulty Mixed',
      topics: '20 Logical Reasoning questions | Tougher mixed LR with longer arrangements and dense logic',
      keywords: ['syllogism', 'arrangement', 'coding', 'venn', 'clock', 'series', 'direction', 'queue'],
      hardRatio: 0.62,
      description: 'A harder reasoning set designed to test patience, tracking accuracy, and option elimination.',
    },
    {
      name: '2026 Shift Mirror',
      topics: '20 Logical Reasoning questions | Recent-pattern LR mix with mostly scoring but varied question types',
      keywords: ['series', 'coding', 'syllogism', 'arrangement', 'blood relation', 'direction', 'venn'],
      hardRatio: 0.46,
      description: 'Mirrors recent BITSAT LR shifts: mostly scoring, but with a few time-consuming arrangement clusters.',
    },
    {
      name: 'Last Mile Revision',
      topics: '20 Logical Reasoning questions | Final LR revision from the most common BITSAT patterns',
      keywords: ['series', 'coding', 'syllogism', 'venn', 'direction', 'clock', 'arrangement'],
      hardRatio: 0.4,
      description: 'A final logic paper covering the patterns students should be able to solve rapidly on exam day.',
    },
  ],
};

const SUBJECT_META = {
  physics: {
    label: 'Physics',
    slugPrefix: 'subject-physics',
    questions: 30,
    durationMinutes: 45,
    duration: '45 Min',
    maxMarks: 90,
  },
  chemistry: {
    label: 'Chemistry',
    slugPrefix: 'subject-chemistry',
    questions: 30,
    durationMinutes: 45,
    duration: '45 Min',
    maxMarks: 90,
  },
  mathematics: {
    label: 'Mathematics',
    slugPrefix: 'subject-mathematics',
    questions: 40,
    durationMinutes: 60,
    duration: '60 Min',
    maxMarks: 120,
  },
  english: {
    label: 'English',
    slugPrefix: 'subject-english',
    questions: 10,
    durationMinutes: 15,
    duration: '15 Min',
    maxMarks: 30,
  },
  logic: {
    label: 'Logical Reasoning',
    slugPrefix: 'subject-logical-reasoning',
    questions: 20,
    durationMinutes: 30,
    duration: '30 Min',
    maxMarks: 60,
  },
};

export const bitsatSubjectWisePapers = Object.entries(SUBJECT_PAPER_SERIES).flatMap(([subjectKey, papers], subjectIndex) => {
  const meta = SUBJECT_META[subjectKey];
  return papers.map((paper, index) => ({
    id: 101 + subjectIndex * 10 + index,
    slug: `${meta.slugPrefix}-${index + 1}`,
    title: `BITSAT ${meta.label} Subject Test ${index + 1} — ${paper.name}`,
    topics: paper.topics,
    questions: meta.questions,
    duration: meta.duration,
    durationMinutes: meta.durationMinutes,
    maxMarks: meta.maxMarks,
    scoring: '+3 / -1',
    description: paper.description,
    subjectKey,
    keywords: paper.keywords,
    hardRatio: paper.hardRatio,
  }));
});

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

function prioritizeByKeywords(questions, keywords, count) {
  const lowered = keywords.map((k) => k.toLowerCase());
  const prioritized = questions.filter((q) => {
    const hay = `${q.text} ${q.explanation}`.toLowerCase();
    return lowered.some((k) => hay.includes(k));
  });
  const remaining = questions.filter((q) => !prioritized.includes(q));
  return [...prioritized, ...remaining].slice(0, count);
}

function buildSectionWithHardRatio(questions, keywords, count, hardRatio = 0.65) {
  const lowered = keywords.map((k) => k.toLowerCase());
  const hardPool = questions.filter((q) => {
    const hay = `${q.text} ${q.explanation}`.toLowerCase();
    return lowered.some((k) => hay.includes(k));
  });
  const remainingPool = questions.filter((q) => !hardPool.includes(q));

  const hardTarget = Math.min(count, Math.max(1, Math.round(count * hardRatio)));
  const hardChosen = hardPool.slice(0, hardTarget);
  const fillCount = Math.max(0, count - hardChosen.length);

  return [...hardChosen, ...remainingPool.slice(0, fillCount)];
}

const HARD_TOPIC_KEYWORDS = {
  physics: ['rotation', 'electromagnetism', 'current electricity', 'wave optics', 'modern physics', 'thermodynamics', 'semiconductor', 'gravitation', 'center of mass', 'collision'],
  chemistry: ['electrochemistry', 'chemical bonding', 'coordination', 'thermodynamics', 'equilibrium', 'named reaction', 'isomerism', 'goc', 'chemical kinetics', 'd and f block', 'p-block', 'redox'],
  math: ['integration', 'differential', 'vector', '3d', 'probability', 'linear programming', 'matrices', 'statistics', 'calculus', 'differential equation', 'determinants', 'conic', 'coordinate'],
  english: ['grammar', 'error spotting', 'comprehension', 'homophone', 'antonym', 'synonym'],
  logic: ['syllogism', 'arrangement', 'coding', 'venn', 'clock', 'series', 'direction', 'blood relation'],
};

const VERY_HARD_TOPIC_KEYWORDS = {
  physics: ['rotation', 'electromagnetism', 'current electricity', 'wave optics', 'modern physics', 'semiconductor', 'thermodynamics', 'laws of motion', 'gravitation', 'center of mass'],
  chemistry: ['electrochemistry', 'coordination', 'thermodynamics', 'equilibrium', 'named reaction', 'isomerism', 'surface chemistry', 'chemical bonding', 'chemical kinetics', 'd and f block', 'p-block'],
  math: ['integration', 'differential', 'vector', '3d', 'probability', 'linear programming', 'matrices', 'statistics', 'calculus', 'sequence', 'differential equation', 'determinants', 'conic'],
  english: ['grammar', 'error spotting', 'comprehension', 'homophone', 'antonym'],
  logic: ['syllogism', 'arrangement', 'coding', 'venn', 'clock', 'series', 'direction'],
};

// Derived from recent shift analyses: maths is usually the toughest/lengthiest,
// physics is moderate-to-tough, chemistry is moderate with tricky pockets,
// and English/LR remain mostly easy-scoring.
const BITSAT_STYLE_HARD_RATIO = {
  physics: 0.64,
  chemistry: 0.58,
  math: 0.84,
  english: 0.38,
  logic: 0.45,
};

const BITSAT_HIGH_DIFFICULTY_HARD_RATIO = {
  physics: 0.78,
  chemistry: 0.72,
  math: 0.9,
  english: 0.5,
  logic: 0.6,
};

export function getBitsatPaper(paperId) {
  const dailyPaper = bitsatDailyPapers.find((paper) => (
    String(paper.id) === String(paperId) || paper.slug === paperId
  ));

  if (dailyPaper) {
    return {
      id: dailyPaper.id,
      slug: dailyPaper.slug,
      title: dailyPaper.title,
      description: dailyPaper.description,
      duration: dailyPaper.durationMinutes,
      totalMarks: dailyPaper.maxMarks,
      correctMarks: 3,
      wrongMarks: -1,
      questions: dailyPaper.questionSet,
    };
  }

  const subjectPaper = bitsatSubjectWisePapers.find((paper) => paper.slug === paperId);
  const id = subjectPaper ? subjectPaper.id : parseInt(paperId, 10);
  const shuffledPh = seededShuffle(bitsatPhysics, id * 7331);
  const shuffledCh = seededShuffle(bitsatChemistry, id * 7331 + 1);
  const shuffledMa = seededShuffle(bitsatMath, id * 7331 + 2);
  const shuffledEn = seededShuffle(bitsatEnglish, id * 7331 + 3);
  const shuffledLo = seededShuffle(bitsatLogic, id * 7331 + 4);

  if (subjectPaper) {
    const subjectQuestionBankMap = {
      physics: shuffledPh,
      chemistry: shuffledCh,
      mathematics: shuffledMa,
      english: shuffledEn,
      logic: shuffledLo,
    };
    const subjectQuestions = buildSectionWithHardRatio(
      subjectQuestionBankMap[subjectPaper.subjectKey] || [],
      subjectPaper.keywords || [],
      subjectPaper.questions,
      subjectPaper.hardRatio
    );

    return {
      id: subjectPaper.id,
      slug: subjectPaper.slug,
      title: subjectPaper.title,
      description: subjectPaper.description,
      duration: subjectPaper.durationMinutes,
      totalMarks: subjectPaper.maxMarks,
      correctMarks: 3,
      wrongMarks: -1,
      questions: subjectQuestions,
    };
  }

  const names = [
    '', 'BITSAT 2026 Mixed Practice Paper',
    'BITSAT Mock Test 2 – Mixed Syllabus',
    'BITSAT Mock Test 3 – Speed Focus',
    'BITSAT Mock Test 4 – Concept Based',
    'BITSAT Mock Test 5 – High Difficulty',
    'BITSAT Mock Test 6 – Chemistry Heavy',
    'BITSAT Mock Test 7 – Physics Heavy',
    'BITSAT Mock Test 8 – Math Heavy',
    'BITSAT Mock Test 9 – English Focus',
    'BITSAT Mock Test 10 – Final Simulation',
    'BITSAT Mock Test 11 – Phase 2 Practice Forecast',
    'BITSAT Mock Test 12 – Phase 1 Public Reconstruction',
    'BITSAT Mock Test 13 – 2025 Public Reconstruction',
    'BITSAT Mock Test 14 – 2024 Public Reconstruction',
    'BITSAT Mock Test 15 – 2023 Public Reconstruction',
    'BITSAT Mock Test 16 – 2022 Public Reconstruction',
    'BITSAT Mock Test 17 – 2021 Public Reconstruction',
  ];

  const isPhase2Forecast = id === 11;
  const isPhase1Memory = id === 12;
  const isYearlyMemory = id >= 13 && id <= 17;
  const isHighDifficultyPaper = id === 5;
  const isGeneralMockPaper = !isPhase2Forecast && !isPhase1Memory && !isYearlyMemory;

  const yearlyKeywordMap = {
    13: {
      physics: ['mechanics', 'electromagnetism', 'current electricity', 'modern physics', 'optics'],
      chemistry: ['organic', 'coordination', 'equilibrium', 'electrochemistry', 'chemical bonding'],
      math: ['calculus', 'algebra', 'probability', 'coordinate', 'vector'],
      english: ['synonym', 'antonym', 'grammar', 'comprehension'],
      logic: ['series', 'coding', 'syllogism', 'venn', 'arrangement'],
    },
    14: {
      physics: ['electrostatics', 'magnetism', 'semiconductor', 'wave optics', 'kinematics'],
      chemistry: ['thermodynamics', 'organic', 'periodic', 'chemical bonding', 'inorganic'],
      math: ['integration', 'differential', 'matrices', '3d', 'sequence'],
      english: ['grammar', 'error spotting', 'synonym', 'comprehension'],
      logic: ['analogy', 'series', 'blood relation', 'direction', 'coding'],
    },
    15: {
      physics: ['mechanics', 'rotation', 'thermodynamics', 'electromagnetism', 'modern physics'],
      chemistry: ['goc', 'isomerism', 'named reaction', 'equilibrium', 'coordination'],
      math: ['calculus', 'algebra', 'coordinate', 'vector', 'probability'],
      english: ['antonym', 'synonym', 'grammar', 'comprehension'],
      logic: ['syllogism', 'venn', 'series', 'coding', 'clock'],
    },
    16: {
      physics: ['electrostatics', 'current electricity', 'optics', 'wave', 'modern physics'],
      chemistry: ['chemical bonding', 'periodicity', 'thermodynamics', 'organic', 'electrochemistry'],
      math: ['differential', 'integration', 'algebra', '3d', 'statistics'],
      english: ['grammar', 'homophone', 'synonym', 'comprehension'],
      logic: ['series', 'arrangement', 'venn', 'analogy', 'syllogism'],
    },
    17: {
      physics: ['mechanics', 'kinematics', 'laws of motion', 'electromagnetism', 'optics'],
      chemistry: ['organic', 'inorganic', 'coordination', 'equilibrium', 'thermodynamics'],
      math: ['calculus', 'coordinate', 'vector', 'probability', 'algebra'],
      english: ['synonym', 'antonym', 'grammar', 'comprehension'],
      logic: ['coding', 'series', 'syllogism', 'direction', 'venn'],
    },
  };

  const yearlyKeywords = yearlyKeywordMap[id] || yearlyKeywordMap[13];

  const physicsQuestions = isPhase2Forecast
    ? prioritizeByKeywords(shuffledPh, [
      'kinematics', 'electrostatics', 'current electricity', 'thermodynamics',
      'rotation', 'optics', 'laws of motion', 'electromagnetism',
    ], 30)
    : isPhase1Memory
      ? prioritizeByKeywords(shuffledPh, [
        'mechanics', 'electrostatics', 'current electricity', 'magnetism',
        'optics', 'modern physics', 'wave optics', 'semiconductor',
      ], 30)
    : isYearlyMemory
      ? prioritizeByKeywords(shuffledPh, yearlyKeywords.physics, 30)
      : isHighDifficultyPaper
        ? buildSectionWithHardRatio(shuffledPh, VERY_HARD_TOPIC_KEYWORDS.physics, 30, BITSAT_HIGH_DIFFICULTY_HARD_RATIO.physics)
        : isGeneralMockPaper
          ? buildSectionWithHardRatio(shuffledPh, HARD_TOPIC_KEYWORDS.physics, 30, BITSAT_STYLE_HARD_RATIO.physics)
          : prioritizeByKeywords(shuffledPh, HARD_TOPIC_KEYWORDS.physics, 30);

  const chemistryQuestions = isPhase2Forecast
    ? prioritizeByKeywords(shuffledCh, [
      'organic', 'electrochemistry', 'chemical bonding', 'periodicity',
      'surface chemistry', 'thermodynamics', 'isomerism', 'coordination', 'goc',
    ], 30)
    : isPhase1Memory
      ? prioritizeByKeywords(shuffledCh, [
        'organic', 'named reaction', 'thermodynamics', 'equilibrium',
        'chemical bonding', 'periodic', 'coordination', 'biomolecule',
      ], 30)
    : isYearlyMemory
      ? prioritizeByKeywords(shuffledCh, yearlyKeywords.chemistry, 30)
      : isHighDifficultyPaper
        ? buildSectionWithHardRatio(shuffledCh, VERY_HARD_TOPIC_KEYWORDS.chemistry, 30, BITSAT_HIGH_DIFFICULTY_HARD_RATIO.chemistry)
        : isGeneralMockPaper
          ? buildSectionWithHardRatio(shuffledCh, HARD_TOPIC_KEYWORDS.chemistry, 30, BITSAT_STYLE_HARD_RATIO.chemistry)
          : prioritizeByKeywords(shuffledCh, HARD_TOPIC_KEYWORDS.chemistry, 30);

  const mathQuestions = isPhase2Forecast
    ? prioritizeByKeywords(shuffledMa, [
      'calculus', 'differential', 'integration', 'probability', 'vector',
      '3d', 'coordinate', 'statistics', 'linear programming', 'algebra',
    ], 40)
    : isPhase1Memory
      ? prioritizeByKeywords(shuffledMa, [
        'calculus', 'integration', 'differential', 'algebra', 'coordinate',
        'vector', '3d', 'probability', 'sequence', 'matrices',
      ], 40)
    : isYearlyMemory
      ? prioritizeByKeywords(shuffledMa, yearlyKeywords.math, 40)
      : isHighDifficultyPaper
        ? buildSectionWithHardRatio(shuffledMa, VERY_HARD_TOPIC_KEYWORDS.math, 40, BITSAT_HIGH_DIFFICULTY_HARD_RATIO.math)
        : isGeneralMockPaper
          ? buildSectionWithHardRatio(shuffledMa, HARD_TOPIC_KEYWORDS.math, 40, BITSAT_STYLE_HARD_RATIO.math)
          : prioritizeByKeywords(shuffledMa, HARD_TOPIC_KEYWORDS.math, 40);

  const englishQuestions = isPhase2Forecast
    ? prioritizeByKeywords(shuffledEn, [
      'synonym', 'antonym', 'homophone', 'grammar', 'comprehension',
    ], 10)
    : isPhase1Memory
      ? prioritizeByKeywords(shuffledEn, [
        'synonym', 'antonym', 'grammar', 'error spotting', 'comprehension',
      ], 10)
    : isYearlyMemory
      ? prioritizeByKeywords(shuffledEn, yearlyKeywords.english, 10)
      : isHighDifficultyPaper
        ? buildSectionWithHardRatio(shuffledEn, VERY_HARD_TOPIC_KEYWORDS.english, 10, BITSAT_HIGH_DIFFICULTY_HARD_RATIO.english)
        : isGeneralMockPaper
          ? buildSectionWithHardRatio(shuffledEn, HARD_TOPIC_KEYWORDS.english, 10, BITSAT_STYLE_HARD_RATIO.english)
          : prioritizeByKeywords(shuffledEn, HARD_TOPIC_KEYWORDS.english, 10);

  const logicQuestions = isPhase2Forecast
    ? prioritizeByKeywords(shuffledLo, [
      'series', 'venn', 'coding', 'queue', 'clock', 'syllogism', 'mirror',
    ], 20)
    : isPhase1Memory
      ? prioritizeByKeywords(shuffledLo, [
        'series', 'coding', 'syllogism', 'arrangement', 'blood relation',
        'direction', 'venn', 'analogy',
      ], 20)
    : isYearlyMemory
      ? prioritizeByKeywords(shuffledLo, yearlyKeywords.logic, 20)
      : isHighDifficultyPaper
        ? buildSectionWithHardRatio(shuffledLo, VERY_HARD_TOPIC_KEYWORDS.logic, 20, BITSAT_HIGH_DIFFICULTY_HARD_RATIO.logic)
        : isGeneralMockPaper
          ? buildSectionWithHardRatio(shuffledLo, HARD_TOPIC_KEYWORDS.logic, 20, BITSAT_STYLE_HARD_RATIO.logic)
          : prioritizeByKeywords(shuffledLo, HARD_TOPIC_KEYWORDS.logic, 20);

  return {
    id,
    title: names[id] || `BITSAT Mock Test ${id}`,
    description: id === 1
      ? 'A broad mixed practice paper built from the current BITSAT question bank and common exam patterns'
      : id === 11
        ? 'A practice paper shaped around recent shift patterns: lengthy maths, selective chemistry spikes, moderate physics, and scoring English/LR'
        : id === 12
          ? 'Public reconstruction set based on discussed BITSAT 2026 Session-1 patterns (not an official released paper)'
          : id >= 13 && id <= 17
            ? `Public reconstruction set modeled on discussed ${2026 - (id - 12)} exam patterns (not an official released paper)`
      : 'Mixed syllabus adaptive paper',
    duration: 180,
    totalMarks: 390,
    correctMarks: 3,
    wrongMarks: -1,
    questions: [
      ...physicsQuestions,
      ...chemistryQuestions,
      ...mathQuestions,
      ...englishQuestions,
      ...logicQuestions,
    ]
  };
}

// ── BITSAT RANK PREDICTOR ────────────────────────────────────
// Based on BITSAT 2021-2025 published cutoffs (PCM cutoffs for various campuses)
export const bitsatRankBands = [
  { minScore: 360, maxScore: 390, rankRange: '< 100', admission: 'BITS Pilani – CS/ECE very strong' },
  { minScore: 330, maxScore: 359, rankRange: '100 – 500', admission: 'BITS Pilani/Goa – top branches' },
  { minScore: 300, maxScore: 329, rankRange: '500 – 2,000', admission: 'BITS Goa/Hyderabad – CS/ECE likely' },
  { minScore: 270, maxScore: 299, rankRange: '2,000 – 5,000', admission: 'BITS campuses – core branches competitive' },
  { minScore: 240, maxScore: 269, rankRange: '5,000 – 10,000', admission: 'BITS Hyderabad/Goa – selective options' },
  { minScore: 210, maxScore: 239, rankRange: '10,000 – 20,000', admission: 'Dual degree and lower-demand options' },
  { minScore: 0, maxScore: 209, rankRange: '20,000+', admission: 'Lower chance in top rounds' },
];

export const allBitsatPapers = [
  ...bitsatDailyPapers,
  ...Array.from({ length: 17 }, (_, i) => {
  const id = i + 1;
  const topics = [
    'Mixed Practice | Broad Syllabus Coverage',
    'Mixed Syllabus | Standard Difficulty',
    'Speed Focus | 130 Qs / 180 min',
    'Concept Based | Reasoning Heavy',
    'High Difficulty | Previous Year Pattern',
    'Chemistry Intensive | Organic Focus',
    'Physics Intensive | Modern Physics',
    'Mathematics Intensive | Calculus',
    'English & Logic | Speed Scoring',
    'Full Simulation | Final Practice',
    'Phase 2 Forecast | Practice Set Inspired by Recent Shifts',
    'Phase 1 Public Reconstruction | Session-1 Discussion Based',
    '2025 Public Reconstruction | Discussion Based',
    '2024 Public Reconstruction | Discussion Based',
    '2023 Public Reconstruction | Discussion Based',
    '2022 Public Reconstruction | Discussion Based',
    '2021 Public Reconstruction | Discussion Based',
  ];
  return {
    id,
    title:
      id === 1
        ? 'BITSAT 2026 Mixed Practice Paper'
        : id === 11
          ? 'BITSAT Phase 2 Practice Forecast'
          : id === 12
            ? 'BITSAT Phase 1 Public Reconstruction'
            : id === 13
              ? 'BITSAT 2025 Public Reconstruction'
              : id === 14
                ? 'BITSAT 2024 Public Reconstruction'
                : id === 15
                  ? 'BITSAT 2023 Public Reconstruction'
                  : id === 16
                    ? 'BITSAT 2022 Public Reconstruction'
                    : id === 17
                      ? 'BITSAT 2021 Public Reconstruction'
            : `Mock Test ${id}`,
    topics: topics[i],
    questions: 130,
    duration: '3 Hours',
    maxMarks: 390,
    scoring: '+3 / −1',
  };
  }),
];
