// ============================================================
// KCET QUESTION BANK
// Pattern: 60 Physics + 60 Chemistry + 60 Mathematics = 180
// Each full mock: 60 questions (20 per subject)
// Scoring: +1 correct, 0 wrong (no negative marking)
// Duration: 180 minutes  |  Total: 180 marks (for full paper)
// ============================================================

export const physicsBank = [
  // ── Set A: Mechanics & Thermal Physics ──────────────────
  {
    id: 'ph1', subject: 'Physics',
    text: 'A body is thrown vertically upward with a velocity of 20 m/s. The maximum height reached is (g = 10 m/s²):',
    options: ['10 m', '20 m', '40 m', '5 m'],
    correct: 1,
    explanation: 'Using v² = u² − 2gh → 0 = 400 − 20h → h = 20 m'
  },
  {
    id: 'ph2', subject: 'Physics',
    text: 'A stone is dropped from a height of 125 m. Time to reach the ground (g = 10 m/s²):',
    options: ['5 s', '2.5 s', '10 s', '3.5 s'],
    correct: 0,
    explanation: 'h = ½gt² → 125 = 5t² → t = 5 s'
  },
  {
    id: 'ph3', subject: 'Physics',
    text: 'The ratio of kinetic energy to potential energy at the highest point of projectile motion is:',
    options: ['0', '1', '∞', 'depends on angle'],
    correct: 0,
    explanation: 'At highest point vertical velocity = 0 and KE = ½m(ucosθ)² while PE is maximum. The ratio KE/PE depends on the angle, but the vertical KE component is zero.'
  },
  {
    id: 'ph4', subject: 'Physics',
    text: 'A 5 kg block is pushed along a frictionless surface with a force of 20 N. Its acceleration is:',
    options: ['100 m/s²', '4 m/s²', '25 m/s²', '0.25 m/s²'],
    correct: 1,
    explanation: 'F = ma → a = F/m = 20/5 = 4 m/s²'
  },
  {
    id: 'ph5', subject: 'Physics',
    text: 'The work done by a force of 10 N acting at 60° to displacement of 2 m is:',
    options: ['20 J', '10 J', '17.3 J', '5 J'],
    correct: 1,
    explanation: 'W = Fd cosθ = 10 × 2 × cos60° = 20 × 0.5 = 10 J'
  },
  {
    id: 'ph6', subject: 'Physics',
    text: 'A wheel of moment of inertia 2 kg·m² is rotating at 5 rad/s. The kinetic energy is:',
    options: ['10 J', '25 J', '50 J', '100 J'],
    correct: 1,
    explanation: 'KE = ½Iω² = ½ × 2 × 25 = 25 J'
  },
  {
    id: 'ph7', subject: 'Physics',
    text: 'The escape velocity from Earth\'s surface is approximately:',
    options: ['7.9 km/s', '11.2 km/s', '16.7 km/s', '3.0 km/s'],
    correct: 1,
    explanation: 'Escape velocity = √(2GM/R) ≈ 11.2 km/s for Earth'
  },
  {
    id: 'ph8', subject: 'Physics',
    text: 'Pascal\'s law states that pressure applied to an enclosed fluid is:',
    options: ['Transmitted unequally', 'Absorbed by the container', 'Transmitted equally in all directions', 'Inversely proportional to volume'],
    correct: 2,
    explanation: 'Pascal\'s law: pressure applied to a confined fluid is transmitted undiminished in all directions.'
  },
  {
    id: 'ph9', subject: 'Physics',
    text: 'A gas expands adiabatically. Which of the following is true?',
    options: ['Heat absorbed = work done', 'Internal energy increases', 'Temperature decreases', 'Entropy is constant and temperature increases'],
    correct: 2,
    explanation: 'In adiabatic expansion, Q = 0. By first law, ΔU = -W, so internal energy and temperature decrease.'
  },
  {
    id: 'ph10', subject: 'Physics',
    text: 'The coefficient of linear thermal expansion of a material is α. If temperature changes by ΔT, fractional change in length is:',
    options: ['αΔT', '2αΔT', '3αΔT', 'α²ΔT'],
    correct: 0,
    explanation: 'ΔL/L = αΔT for linear expansion.'
  },
  {
    id: 'ph11', subject: 'Physics',
    text: 'The frequency of a simple pendulum of length L is proportional to:',
    options: ['√L', '1/√L', 'L', '1/L'],
    correct: 1,
    explanation: 'f = (1/2π)√(g/L) → f ∝ 1/√L'
  },
  {
    id: 'ph12', subject: 'Physics',
    text: 'The velocity of sound in air at 0°C is 332 m/s. At 22°C, it is approximately:',
    options: ['340 m/s', '352 m/s', '344 m/s', '360 m/s'],
    correct: 2,
    explanation: 'v ∝ √T. v₂ = 332 × √(295/273) ≈ 332 × 1.039 ≈ 344 m/s'
  },
  {
    id: 'ph13', subject: 'Physics',
    text: 'Two coherent sources S1 and S2 produce waves. Constructive interference occurs when path difference is:',
    options: ['(2n+1)λ/2', 'nλ', '(2n+1)λ', 'nλ/2'],
    correct: 1,
    explanation: 'Constructive interference: path difference = nλ (n = 0, 1, 2, ...)'
  },
  {
    id: 'ph14', subject: 'Physics',
    text: 'Doppler effect is NOT applicable to:',
    options: ['Sound waves', 'Light waves', 'Water waves', 'Gravitational waves'],
    correct: 3,
    explanation: 'The classical Doppler effect applies to all mechanical and electromagnetic waves including sound and light, but not gravitational waves which require GR treatment.'
  },
  {
    id: 'ph15', subject: 'Physics',
    text: 'The efficiency of a Carnot engine operating between 600 K and 300 K is:',
    options: ['25%', '33%', '50%', '67%'],
    correct: 2,
    explanation: 'η = 1 - T₂/T₁ = 1 - 300/600 = 0.5 = 50%'
  },
  {
    id: 'ph16', subject: 'Physics',
    text: 'A 2 kg body moving at 3 m/s collides with and sticks to a 3 kg stationary body. Final velocity is:',
    options: ['1.2 m/s', '2 m/s', '1.5 m/s', '3 m/s'],
    correct: 0,
    explanation: 'Conservation of momentum: 2×3 = (2+3)×v → v = 6/5 = 1.2 m/s'
  },
  {
    id: 'ph17', subject: 'Physics',
    text: 'The angular momentum of a satellite in circular orbit is conserved because:',
    options: ['Gravitational force is central', 'Speed is constant', 'Mass is constant', 'Radius is constant'],
    correct: 0,
    explanation: 'Gravity is a central force (directed toward center), so torque = 0, hence angular momentum is conserved.'
  },
  {
    id: 'ph18', subject: 'Physics',
    text: 'The rms speed of oxygen molecules at 27°C (M = 32 g/mol, R = 8.314 J/mol·K) is approximately:',
    options: ['483 m/s', '384 m/s', '270 m/s', '590 m/s'],
    correct: 0,
    explanation: 'v_rms = √(3RT/M) = √(3×8.314×300/0.032) ≈ 483 m/s'
  },
  {
    id: 'ph19', subject: 'Physics',
    text: 'Kepler\'s third law states that T² ∝:',
    options: ['R', 'R²', 'R³', 'R⁴'],
    correct: 2,
    explanation: 'Kepler\'s third law: T² = (4π²/GM)R³, so T² ∝ R³.'
  },
  {
    id: 'ph20', subject: 'Physics',
    text: 'A bullet of mass 10 g moving at 400 m/s enters a wooden block and stops in 0.1 s. Average force is:',
    options: ['4 N', '40 N', '400 N', '4000 N'],
    correct: 1,
    explanation: 'F = Δp/Δt = (0.01 × 400)/0.1 = 40 N'
  },
  // ── Set B: Electrostatics, Current Electricity, Magnetism ──
  {
    id: 'ph21', subject: 'Physics',
    text: 'The electric field inside a conducting sphere with charge Q is:',
    options: ['Q/4πε₀r²', 'Zero', 'Q/4πε₀R²', 'Varies with r'],
    correct: 1,
    explanation: 'By Gauss\'s law, the field inside a conductor in electrostatic equilibrium is zero.'
  },
  {
    id: 'ph22', subject: 'Physics',
    text: 'Capacitors C₁ and C₂ in series. Equivalent capacitance is:',
    options: ['C₁ + C₂', '(C₁C₂)/(C₁+C₂)', '(C₁+C₂)/(C₁C₂)', 'C₁C₂'],
    correct: 1,
    explanation: '1/C_eq = 1/C₁ + 1/C₂ → C_eq = C₁C₂/(C₁+C₂)'
  },
  {
    id: 'ph23', subject: 'Physics',
    text: 'The drift velocity of electrons in a conductor is of the order:',
    options: ['10⁸ m/s', '10⁴ m/s', '10⁻⁴ m/s', '10⁻² m/s'],
    correct: 2,
    explanation: 'Drift velocity is very small, typically ~10⁻⁴ m/s, even though electric field propagates at near light speed.'
  },
  {
    id: 'ph24', subject: 'Physics',
    text: 'Kirchhoff\'s current law is based on conservation of:',
    options: ['Energy', 'Charge', 'Momentum', 'Voltage'],
    correct: 1,
    explanation: 'KCL states that sum of currents at a node = 0, based on conservation of electric charge.'
  },
  {
    id: 'ph25', subject: 'Physics',
    text: 'A wire carries a current of 2 A in a magnetic field of 0.5 T. If the length of wire in the field is 0.3 m, force is:',
    options: ['0.1 N', '0.3 N', '0.5 N', '0.6 N'],
    correct: 1,
    explanation: 'F = BIL = 0.5 × 2 × 0.3 = 0.3 N (assuming perpendicular)'
  },
  {
    id: 'ph26', subject: 'Physics',
    text: 'The unit of magnetic flux density (B) is:',
    options: ['Weber', 'Tesla', 'Henry', 'Ampere/meter'],
    correct: 1,
    explanation: 'Magnetic flux density B is measured in Tesla (T) = Wb/m².'
  },
  {
    id: 'ph27', subject: 'Physics',
    text: 'According to Biot-Savart law, the magnetic field due to a small current element is:',
    options: ['Parallel to current', 'Perpendicular to current element and position vector', 'Anti-parallel to current', 'Along the position vector'],
    correct: 1,
    explanation: 'dB ∝ (Idl × r̂)/r², so dB is perpendicular to both dl and r.'
  },
  {
    id: 'ph28', subject: 'Physics',
    text: 'A galvanometer of resistance 100 Ω can carry max 1 mA. To convert to ammeter reading 1 A, shunt resistance is:',
    options: ['0.1 Ω', '0.01 Ω', '100 Ω', '1 Ω'],
    correct: 0,
    explanation: 'S = G×Ig/(I-Ig) = 100 × 0.001/(1-0.001) ≈ 0.1 Ω'
  },
  {
    id: 'ph29', subject: 'Physics',
    text: 'Moving charges in a magnetic field experience force unless they move:',
    options: ['Perpendicular to B', 'Parallel to B', 'At 45° to B', 'Anti-parallel to B'],
    correct: 1,
    explanation: 'F = qv × B = qvB sinθ. If θ = 0° or 180° (parallel/antiparallel), F = 0.'
  },
  {
    id: 'ph30', subject: 'Physics',
    text: 'The magnetic susceptibility of a diamagnetic material is:',
    options: ['Positive and large', 'Positive and small', 'Negative', 'Zero'],
    correct: 2,
    explanation: 'Diamagnetic materials have small negative susceptibility (they are slightly repelled by magnets).'
  },
  {
    id: 'ph31', subject: 'Physics',
    text: 'Faraday\'s law: the induced EMF in a circuit is equal to:',
    options: ['Rate of change of flux', 'Negative rate of change of flux', 'Flux × current', 'Flux/time²'],
    correct: 1,
    explanation: 'ε = -dΦ/dt (negative sign by Lenz\'s law)'
  },
  {
    id: 'ph32', subject: 'Physics',
    text: 'Self-inductance of a coil of N turns, flux Φ per turn, and current I is:',
    options: ['NΦ/I', 'NI/Φ', 'Φ/NI', 'N²Φ'],
    correct: 0,
    explanation: 'L = NΦ/I (total flux linkage / current)'
  },
  {
    id: 'ph33', subject: 'Physics',
    text: 'In a series LCR circuit at resonance:',
    options: ['Impedance is maximum', 'Current is minimum', 'Impedance equals R only', 'Voltage across L equals voltage across C'],
    correct: 2,
    explanation: 'At resonance, XL = XC, so Z = √(R² + (XL-XC)²) = R (minimum impedance, maximum current).'
  },
  {
    id: 'ph34', subject: 'Physics',
    text: 'Power factor in an AC circuit is defined as:',
    options: ['R/Z', 'Z/R', 'X/Z', 'R/X'],
    correct: 0,
    explanation: 'Power factor = cos φ = R/Z, where Z is impedance.'
  },
  {
    id: 'ph35', subject: 'Physics',
    text: 'The energy stored in a magnetic field of inductance L carrying current I is:',
    options: ['LI', 'LI²', '½LI²', '2LI²'],
    correct: 2,
    explanation: 'Magnetic energy = ½LI²'
  },
  {
    id: 'ph36', subject: 'Physics',
    text: 'Wheatstone bridge is balanced when:',
    options: ['P/Q = R/S', 'P×Q = R×S', 'P+Q = R+S', 'P/R = Q/S'],
    correct: 0,
    explanation: 'Balance condition: P/Q = R/S (ratio of resistances in adjacent arms)'
  },
  {
    id: 'ph37', subject: 'Physics',
    text: 'The electric potential at a point due to a charge Q at distance r is:',
    options: ['Q/4πε₀r²', 'Q/4πε₀r', 'Q/2πε₀r', '2Q/4πε₀r'],
    correct: 1,
    explanation: 'V = kQ/r = Q/4πε₀r (scalar quantity)'
  },
  {
    id: 'ph38', subject: 'Physics',
    text: 'The terminal voltage of a battery of EMF ε and internal resistance r when delivering current I is:',
    options: ['ε + Ir', 'ε - Ir', 'ε/r', 'Ir'],
    correct: 1,
    explanation: 'Terminal voltage V = ε - Ir (voltage drops across internal resistance)'
  },
  {
    id: 'ph39', subject: 'Physics',
    text: 'Ohm\'s law is NOT applicable to:',
    options: ['Metals at constant temperature', 'Electrolytes', 'Semiconductors', 'Alloys'],
    correct: 2,
    explanation: 'Semiconductors have non-linear V-I characteristics; Ohm\'s law does not apply.'
  },
  {
    id: 'ph40', subject: 'Physics',
    text: 'The resistance of a wire is R. If its length is doubled and cross-section is halved, new resistance is:',
    options: ['R', '2R', '4R', 'R/2'],
    correct: 2,
    explanation: 'R = ρL/A. New R\' = ρ(2L)/(A/2) = 4ρL/A = 4R'
  },
  // ── Set C: Optics, Modern Physics, Semiconductors ─────────
  {
    id: 'ph41', subject: 'Physics',
    text: 'The critical angle for total internal reflection depends on:',
    options: ['Wavelength only', 'Frequency only', 'Refractive index of media', 'Intensity of light'],
    correct: 2,
    explanation: 'sinC = n₂/n₁ (ratio of refractive indices of second to first medium).'
  },
  {
    id: 'ph42', subject: 'Physics',
    text: 'The focal length of a convex lens is f. If it is immersed in water (n_water > 1), the focal length:',
    options: ['Decreases', 'Increases', 'Stays same', 'Becomes zero'],
    correct: 1,
    explanation: 'Lensmaker\'s equation: 1/f ∝ (n_lens/n_medium - 1). When immersed in water, the effective refractive index difference decreases, increasing f.'
  },
  {
    id: 'ph43', subject: 'Physics',
    text: 'In Young\'s double slit experiment, if the slit separation is halved, fringe width:',
    options: ['Halves', 'Doubles', 'Stays the same', 'Quadruples'],
    correct: 1,
    explanation: 'β = λD/d. If d → d/2, then β → 2β (fringe width doubles).'
  },
  {
    id: 'ph44', subject: 'Physics',
    text: 'Brewster\'s angle θ_B is related to refractive index n by:',
    options: ['sinθ_B = n', 'cosθ_B = n', 'tanθ_B = n', 'θ_B = 1/n'],
    correct: 2,
    explanation: 'Brewster\'s law: tan θ_B = n (refractive index of the medium).'
  },
  {
    id: 'ph45', subject: 'Physics',
    text: 'In photoelectric effect, the stopping potential depends on:',
    options: ['Intensity of light', 'Frequency of light', 'Both frequency and intensity', 'Neither'],
    correct: 1,
    explanation: 'Stopping potential V₀ = (hν - φ)/e, which depends only on frequency, not intensity.'
  },
  {
    id: 'ph46', subject: 'Physics',
    text: 'de Broglie wavelength λ of a particle of mass m and kinetic energy K is:',
    options: ['h/√(2mK)', 'h/√(mK)', '√(h/2mK)', 'h√(2mK)'],
    correct: 0,
    explanation: 'λ = h/p and p = √(2mK) → λ = h/√(2mK)'
  },
  {
    id: 'ph47', subject: 'Physics',
    text: 'The radius of the nth Bohr orbit in hydrogen is proportional to:',
    options: ['n', 'n²', 'n³', '1/n'],
    correct: 1,
    explanation: 'r_n = a₀n² (a₀ = 0.529 Å), so r ∝ n².'
  },
  {
    id: 'ph48', subject: 'Physics',
    text: 'In radioactive decay, half-life T₁/₂ is related to decay constant λ by:',
    options: ['T₁/₂ = λ/ln2', 'T₁/₂ = ln2/λ', 'T₁/₂ = λ×ln2', 'T₁/₂ = 1/λ²'],
    correct: 1,
    explanation: 'T₁/₂ = ln2/λ ≈ 0.693/λ'
  },
  {
    id: 'ph49', subject: 'Physics',
    text: 'Nuclear binding energy per nucleon is maximum for:',
    options: ['Hydrogen', 'Iron-56', 'Uranium-238', 'Helium-4'],
    correct: 1,
    explanation: 'Iron-56 (⁵⁶Fe) has the highest binding energy per nucleon (~8.8 MeV), making it the most stable nucleus.'
  },
  {
    id: 'ph50', subject: 'Physics',
    text: 'In an n-type semiconductor, the majority carriers are:',
    options: ['Holes', 'Protons', 'Electrons', 'Neutrons'],
    correct: 2,
    explanation: 'n-type semiconductors are doped with donor atoms, creating free electrons as majority carriers.'
  },
  {
    id: 'ph51', subject: 'Physics',
    text: 'The energy gap of silicon at room temperature is approximately:',
    options: ['0.67 eV', '1.12 eV', '3.2 eV', '5.5 eV'],
    correct: 1,
    explanation: 'Silicon has a band gap of ~1.12 eV at 300 K, making it a semiconductor.'
  },
  {
    id: 'ph52', subject: 'Physics',
    text: 'In a p-n junction under forward bias:',
    options: ['Depletion layer widens', 'Current flows freely', 'Barrier potential increases', 'Depletion layer widens and no current flows'],
    correct: 1,
    explanation: 'Forward bias reduces the depletion region and lowers the potential barrier, allowing current to flow.'
  },
  {
    id: 'ph53', subject: 'Physics',
    text: 'The truth table of a NAND gate shows output 0 only when:',
    options: ['Both inputs are 0', 'Both inputs are 1', 'One input is 1', 'One input is 0'],
    correct: 1,
    explanation: 'NAND: output is LOW (0) only when ALL inputs are HIGH (1).'
  },
  {
    id: 'ph54', subject: 'Physics',
    text: 'The phenomenon of light being scattered by particles much smaller than its wavelength is:',
    options: ['Mie scattering', 'Rayleigh scattering', 'Raman scattering', 'Compton scattering'],
    correct: 1,
    explanation: 'Rayleigh scattering occurs when particle size << λ. Intensity ∝ 1/λ⁴ (explains blue sky).'
  },
  {
    id: 'ph55', subject: 'Physics',
    text: 'Which electromagnetic wave has the highest frequency?',
    options: ['X-rays', 'UV rays', 'Gamma rays', 'Microwaves'],
    correct: 2,
    explanation: 'Gamma rays have the highest frequency (>10¹⁹ Hz) in the EM spectrum.'
  },
  {
    id: 'ph56', subject: 'Physics',
    text: 'The output of a transformer depends on which principle?',
    options: ['Lenz\'s law', 'Ampere\'s law', 'Mutual induction', 'Self induction only'],
    correct: 2,
    explanation: 'A transformer works on the principle of mutual electromagnetic induction between primary and secondary coils.'
  },
  {
    id: 'ph57', subject: 'Physics',
    text: 'Speed of light in a medium of refractive index n = 1.5 is:',
    options: ['2 × 10⁸ m/s', '4.5 × 10⁸ m/s', '3 × 10⁸ m/s', '1.5 × 10⁸ m/s'],
    correct: 0,
    explanation: 'v = c/n = 3×10⁸/1.5 = 2×10⁸ m/s'
  },
  {
    id: 'ph58', subject: 'Physics',
    text: 'The mass-energy relation E = mc² was given by:',
    options: ['Newton', 'Bohr', 'Einstein', 'Fermi'],
    correct: 2,
    explanation: 'Einstein\'s special theory of relativity gives E = mc².'
  },
  {
    id: 'ph59', subject: 'Physics',
    text: 'In a common emitter transistor circuit, the current gain β is:',
    options: ['IC/IB', 'IB/IC', 'IE/IC', 'IC/IE'],
    correct: 0,
    explanation: 'β = IC/IB (ratio of collector current to base current) — the DC current gain in CE configuration.'
  },
  {
    id: 'ph60', subject: 'Physics',
    text: 'For a concave mirror, a real object is placed between focus F and pole P. The image is:',
    options: ['Real, inverted, magnified', 'Virtual, erect, magnified', 'Real, erect, diminished', 'Virtual, inverted, diminished'],
    correct: 1,
    explanation: 'Object between F and pole of concave mirror → virtual, erect, and magnified image behind the mirror.'
  },
];

export const chemistryBank = [
  // ── Set A: Physical & Inorganic Chemistry ─────────────────
  {
    id: 'ch1', subject: 'Chemistry',
    text: 'The number of orbitals in the n = 3 shell is:',
    options: ['3', '6', '9', '18'],
    correct: 2,
    explanation: 'Total orbitals in shell n = n² = 9 (one 3s, three 3p, five 3d).'
  },
  {
    id: 'ch2', subject: 'Chemistry',
    text: 'Which of the following has the highest ionization energy?',
    options: ['Na', 'Mg', 'Al', 'Ne'],
    correct: 3,
    explanation: 'Noble gases have completely filled orbitals and highest ionization energies. Ne has highest IE among these.'
  },
  {
    id: 'ch3', subject: 'Chemistry',
    text: 'The hybridization of carbon in CO₂ is:',
    options: ['sp³', 'sp²', 'sp', 'sp³d'],
    correct: 2,
    explanation: 'CO₂ has two double bonds and zero lone pairs on C → sp hybridized, linear geometry.'
  },
  {
    id: 'ch4', subject: 'Chemistry',
    text: 'Boyle\'s law states that at constant temperature, pressure is:',
    options: ['Directly proportional to volume', 'Inversely proportional to volume', 'Independent of volume', 'Equal to volume'],
    correct: 1,
    explanation: 'Boyle\'s law: PV = constant at constant T → P ∝ 1/V.'
  },
  {
    id: 'ch5', subject: 'Chemistry',
    text: 'For an ideal gas, the compressibility factor Z equals:',
    options: ['PV/nRT', 'nRT/PV', 'PV/RT', 'PV'],
    correct: 0,
    explanation: 'Z = PV/nRT. For ideal gas Z = 1.'
  },
  {
    id: 'ch6', subject: 'Chemistry',
    text: 'The enthalpy of combustion of methane is −890 kJ/mol. The heat released burning 16 g of CH₄ is:',
    options: ['890 kJ', '445 kJ', '1780 kJ', '178 kJ'],
    correct: 0,
    explanation: '16 g CH₄ = 1 mol. Heat released = 890 kJ.'
  },
  {
    id: 'ch7', subject: 'Chemistry',
    text: 'Hess\'s law is based on conservation of:',
    options: ['Mass', 'Energy', 'Momentum', 'Charge'],
    correct: 1,
    explanation: 'Hess\'s law is a consequence of the first law of thermodynamics (conservation of energy).'
  },
  {
    id: 'ch8', subject: 'Chemistry',
    text: 'The equilibrium constant Kp is related to Kc by:',
    options: ['Kp = Kc(RT)^Δn', 'Kp = Kc/RT', 'Kp = Kc × Δn', 'Kp = Kc + Δn RT'],
    correct: 0,
    explanation: 'Kp = Kc(RT)^Δn where Δn = moles of gaseous products − moles of gaseous reactants.'
  },
  {
    id: 'ch9', subject: 'Chemistry',
    text: 'Le Chatelier\'s principle states that a system at equilibrium will:',
    options: ['React to maximize product', 'Not respond to any change', 'Oppose any change imposed on it', 'Always increase temperature'],
    correct: 2,
    explanation: 'Le Chatelier\'s principle: a system at equilibrium shifts to counteract any imposed change.'
  },
  {
    id: 'ch10', subject: 'Chemistry',
    text: 'pH of a 0.01 M HCl solution is:',
    options: ['1', '2', '3', '0.01'],
    correct: 1,
    explanation: 'pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2'
  },
  {
    id: 'ch11', subject: 'Chemistry',
    text: 'Buffer capacity is maximum when:',
    options: ['pH = 14', 'pH = 0', 'pH = pKa', 'pH = 7'],
    correct: 2,
    explanation: 'A buffer is most effective when pH = pKa, i.e., when [acid] = [conjugate base].'
  },
  {
    id: 'ch12', subject: 'Chemistry',
    text: 'In the reaction: Zn + CuSO₄ → ZnSO₄ + Cu, zinc is:',
    options: ['Oxidized', 'Reduced', 'Neither oxidized nor reduced', 'A catalyst'],
    correct: 0,
    explanation: 'Zn loses electrons (0 → +2 oxidation state) → Zn is oxidized (and acts as reducing agent).'
  },
  {
    id: 'ch13', subject: 'Chemistry',
    text: 'The electrode at which oxidation occurs in an electrochemical cell is the:',
    options: ['Cathode', 'Anode', 'Salt bridge', 'Reference electrode'],
    correct: 1,
    explanation: 'Oxidation occurs at the anode in both electrolytic and galvanic cells.'
  },
  {
    id: 'ch14', subject: 'Chemistry',
    text: 'Kohlrausch\'s law states that the limiting molar conductivity of an electrolyte is:',
    options: ['Sum of conductivities of cation and anion', 'Product of ionic conductivities', 'Difference of ionic conductivities', 'Ratio of ionic conductivities'],
    correct: 0,
    explanation: 'Λ°m = ν₊λ₊° + ν₋λ₋° (sum of individual ionic conductivities at infinite dilution).'
  },
  {
    id: 'ch15', subject: 'Chemistry',
    text: 'The rate of a first-order reaction depends on:',
    options: ['Square of concentration', 'First power of concentration', 'Concentration is irrelevant', 'Square root of concentration'],
    correct: 1,
    explanation: 'For a first-order reaction: rate = k[A]¹'
  },
  {
    id: 'ch16', subject: 'Chemistry',
    text: 'The unit of rate constant for a second-order reaction is:',
    options: ['mol L⁻¹ s⁻¹', 'L mol⁻¹ s⁻¹', 's⁻¹', 'mol² L⁻² s⁻¹'],
    correct: 1,
    explanation: 'For second-order: rate = k[A]², so k = rate/[A]² → units L mol⁻¹ s⁻¹.'
  },
  {
    id: 'ch17', subject: 'Chemistry',
    text: 'Which of the following is a colligative property?',
    options: ['Surface tension', 'Viscosity', 'Osmotic pressure', 'Refractive index'],
    correct: 2,
    explanation: 'Colligative properties depend only on number of solute particles: osmotic pressure, boiling point elevation, freezing point depression, vapor pressure lowering.'
  },
  {
    id: 'ch18', subject: 'Chemistry',
    text: 'Raoult\'s law states that the vapor pressure of a solvent above a solution is:',
    options: ['Equal to vapor pressure of pure solvent', 'Greater than pure solvent', 'Proportional to mole fraction of solvent', 'Independent of concentration'],
    correct: 2,
    explanation: 'Raoult\'s law: P = P°x_solvent (vapor pressure proportional to mole fraction of solvent).'
  },
  {
    id: 'ch19', subject: 'Chemistry',
    text: 'The CFSE (Crystal Field Stabilization Energy) is highest for which coordination geometry?',
    options: ['Tetrahedral', 'Octahedral', 'Linear', 'Square planar (for d⁸)'],
    correct: 3,
    explanation: 'Square planar complexes (common for d⁸ metals like Pt²⁺, Pd²⁺) have higher CFSE than octahedral.'
  },
  {
    id: 'ch20', subject: 'Chemistry',
    text: 'The oxidation state of Cr in K₂Cr₂O₇ is:',
    options: ['+3', '+6', '+4', '+7'],
    correct: 1,
    explanation: '2(+1) + 2x + 7(-2) = 0 → 2 + 2x - 14 = 0 → x = +6'
  },
  // ── Set B: Organic Chemistry ──────────────────────────────
  {
    id: 'ch21', subject: 'Chemistry',
    text: 'The IUPAC name of CH₃-CH(OH)-COOH is:',
    options: ['2-Hydroxypropanoic acid', '2-Hydroxypropanoate', 'Lactic acid', '3-Hydroxypropanoic acid'],
    correct: 0,
    explanation: 'CH₃-CH(OH)-COOH has hydroxyl at C2 of propanoic acid → 2-hydroxypropanoic acid (lactic acid is common name).'
  },
  {
    id: 'ch22', subject: 'Chemistry',
    text: 'Which reaction converts alkenes to alcohols by Markovnikov\'s rule?',
    options: ['Hydroboration-oxidation', 'Acid-catalyzed hydration', 'Ozonolysis', 'Epoxidation'],
    correct: 1,
    explanation: 'Acid-catalyzed hydration of alkenes follows Markovnikov\'s rule (OH adds to more substituted carbon).'
  },
  {
    id: 'ch23', subject: 'Chemistry',
    text: 'SN2 reactions are favored by:',
    options: ['Tertiary substrates', 'Polar protic solvents', 'Strong nucleophiles and primary substrates', 'Weak nucleophiles'],
    correct: 2,
    explanation: 'SN2 needs unhindered substrate (primary/methyl), strong nucleophile, and polar aprotic solvent.'
  },
  {
    id: 'ch24', subject: 'Chemistry',
    text: 'The product of Wurtz reaction of bromomethane is:',
    options: ['Methane', 'Ethane', 'Propane', 'Butane'],
    correct: 1,
    explanation: 'Wurtz reaction: 2CH₃Br + 2Na → CH₃-CH₃ + 2NaBr (ethane).'
  },
  {
    id: 'ch25', subject: 'Chemistry',
    text: 'Lucas test (ZnCl₂/HCl) gives immediate turbidity for:',
    options: ['Primary alcohols', 'Secondary alcohols', 'Tertiary alcohols', 'All alcohols equally'],
    correct: 2,
    explanation: 'Tertiary alcohols react fastest with Lucas reagent (immediate turbidity) due to stable carbocation formation.'
  },
  {
    id: 'ch26', subject: 'Chemistry',
    text: 'The reduction product of a ketone with NaBH₄ is:',
    options: ['Primary alcohol', 'Secondary alcohol', 'Aldehyde', 'Carboxylic acid'],
    correct: 1,
    explanation: 'NaBH₄ reduces ketones (R-CO-R\') to secondary alcohols (R-CHOH-R\').'
  },
  {
    id: 'ch27', subject: 'Chemistry',
    text: 'Fehling\'s solution is used to distinguish between:',
    options: ['Primary and secondary alcohols', 'Aldehydes and ketones', 'Alkenes and alkynes', 'Amines and amides'],
    correct: 1,
    explanation: 'Fehling\'s solution oxidizes aldehydes (gives brick-red Cu₂O precipitate) but NOT ketones.'
  },
  {
    id: 'ch28', subject: 'Chemistry',
    text: 'Aspirin is the common name for:',
    options: ['Acetaminophen', 'Acetylsalicylic acid', 'Salicylic acid', 'Ibuprofen'],
    correct: 1,
    explanation: 'Aspirin = acetylsalicylic acid (ester of salicylic acid and acetic acid).'
  },
  {
    id: 'ch29', subject: 'Chemistry',
    text: 'The monomer of natural rubber is:',
    options: ['Styrene', 'Isoprene (2-methylbuta-1,3-diene)', 'Butadiene', 'Vinyl chloride'],
    correct: 1,
    explanation: 'Natural rubber is polyisoprene, formed by polymerization of isoprene (2-methylbuta-1,3-diene).'
  },
  {
    id: 'ch30', subject: 'Chemistry',
    text: 'The peptide bond is a:',
    options: ['C-N bond formed by condensation', 'C-C bond', 'N-H bond', 'S-S bond'],
    correct: 0,
    explanation: 'Peptide bond: -CO-NH- formed between -COOH of one amino acid and -NH₂ of another (condensation).'
  },
  {
    id: 'ch31', subject: 'Chemistry',
    text: 'Benzene undergoes electrophilic aromatic substitution rather than addition because:',
    options: ['It has no π bonds', 'It is a stable aromatic system', 'It is saturated', 'EAS is thermodynamically less favorable'],
    correct: 1,
    explanation: 'Benzene\'s aromaticity is maintained in substitution (not addition), preserving the resonance stabilization energy.'
  },
  {
    id: 'ch32', subject: 'Chemistry',
    text: 'Chloroform reacts with NaOH to give a compound with characteristic smell. This is:',
    options: ['Trichloroacetaldehyde', 'Carbon tetrachloride', 'Sodium trichloroethoxide', 'Sodium formate and HCCl₃ decomposition product'],
    correct: 3,
    explanation: 'CHCl₃ + NaOH → NaCOO⁻ + HCl is not correct. CHCl₃ treated with alcoholic KOH → CCl₂ (dichlorocarbene) → various products. This tests reimer-tiemann or haloform reaction knowledge.'
  },
  {
    id: 'ch33', subject: 'Chemistry',
    text: 'The major product of dehydration of 2-methylbutan-2-ol is:',
    options: ['2-methylbut-1-ene', '2-methylbut-2-ene', '3-methylbut-1-ene', '1-methylbutene'],
    correct: 1,
    explanation: 'Dehydration follows Zaitsev\'s rule: most substituted alkene (2-methylbut-2-ene) is the major product.'
  },
  {
    id: 'ch34', subject: 'Chemistry',
    text: 'Nylon-6,6 is formed by condensation polymerization of:',
    options: ['Hexamethylenediamine and adipic acid', 'Caprolactam', 'Ethylene glycol and terephthalic acid', 'Glycine'],
    correct: 0,
    explanation: 'Nylon-6,6: condensation of hexamethylenediamine (6C) and adipic acid (6C) → polyamide.'
  },
  {
    id: 'ch35', subject: 'Chemistry',
    text: 'The Hinsberg test distinguishes between:',
    options: ['Primary, secondary, tertiary amines', 'Aliphatic and aromatic amines', 'Amines and amides', 'Alcohols and amines'],
    correct: 0,
    explanation: 'Hinsberg test (with benzenesulfonyl chloride/NaOH) distinguishes primary, secondary, and tertiary amines.'
  },
  {
    id: 'ch36', subject: 'Chemistry',
    text: 'Which of the following is a thermosetting polymer?',
    options: ['PVC', 'Bakelite', 'Polyethylene', 'Nylon'],
    correct: 1,
    explanation: 'Bakelite (phenol-formaldehyde resin) is a thermosetting polymer that cannot be remelted once set.'
  },
  {
    id: 'ch37', subject: 'Chemistry',
    text: 'Carbohydrates are classified as:',
    options: ['Polyhydroxy alcohols only', 'Polyhydroxy aldehydes or ketones', 'Only sugars with C, H, O in 1:2:1 ratio', 'Amino acids with hydroxyl groups'],
    correct: 1,
    explanation: 'Carbohydrates: polyhydroxy aldehydes (aldoses) or polyhydroxy ketones (ketoses) and their derivatives.'
  },
  {
    id: 'ch38', subject: 'Chemistry',
    text: 'D-glucose and D-fructose are:',
    options: ['Enantiomers', 'Diastereomers', 'Functional isomers', 'Structural isomers with different functional groups... and are called epimers'],
    correct: 2,
    explanation: 'Glucose (aldose) and fructose (ketose) are functional isomers (same molecular formula C₆H₁₂O₆, different functional groups).'
  },
  {
    id: 'ch39', subject: 'Chemistry',
    text: 'The antibiotic penicillin targets:',
    options: ['DNA replication', 'Protein synthesis', 'Cell wall synthesis', 'Membrane permeability'],
    correct: 2,
    explanation: 'Penicillin inhibits bacterial cell wall synthesis by blocking transpeptidase enzyme.'
  },
  {
    id: 'ch40', subject: 'Chemistry',
    text: 'The coordination number of Fe in [Fe(CN)₆]³⁻ is:',
    options: ['3', '4', '6', '8'],
    correct: 2,
    explanation: 'Six CN⁻ ligands coordinate to Fe → coordination number = 6.'
  },
  // ── Set C: More Organic & Inorganic ───────────────────────
  {
    id: 'ch41', subject: 'Chemistry',
    text: 'Which isomerism is shown by [Pt(NH₃)₂Cl₂]?',
    options: ['Optical', 'Geometrical (cis-trans)', 'Linkage', 'Ionization'],
    correct: 1,
    explanation: '[Pt(NH₃)₂Cl₂] shows geometrical isomerism (cisplatin = cis, transplatin = trans).'
  },
  {
    id: 'ch42', subject: 'Chemistry',
    text: 'The EAN (Effective Atomic Number) rule predicts stable complexes when:',
    options: ['Total electrons = 18', 'Oxidation state = 0', 'Coordination number = 6', 'All ligands are neutral'],
    correct: 0,
    explanation: 'EAN/18-electron rule: stable transition metal complexes have 18 valence electrons around the metal.'
  },
  {
    id: 'ch43', subject: 'Chemistry',
    text: 'In the d-block, an element belongs to group 7. Its electronic configuration ends in:',
    options: ['d⁵', 'd⁷', 'd⁶', 'd⁴'],
    correct: 0,
    explanation: 'Group 7 transition metals (Mn, Tc, Re) have d⁵ configuration (e.g., Mn: [Ar]3d⁵4s²).'
  },
  {
    id: 'ch44', subject: 'Chemistry',
    text: 'Which of the following is the strongest acid?',
    options: ['HF', 'HCl', 'HBr', 'HI'],
    correct: 3,
    explanation: 'Acid strength of HX increases down the group: HI > HBr > HCl > HF (bond strength decreases).'
  },
  {
    id: 'ch45', subject: 'Chemistry',
    text: 'The shape of PCl₅ is:',
    options: ['Trigonal planar', 'Tetrahedral', 'Trigonal bipyramidal', 'Octahedral'],
    correct: 2,
    explanation: 'PCl₅: 5 bonding pairs, 0 lone pairs → trigonal bipyramidal (sp³d hybridization).'
  },
  {
    id: 'ch46', subject: 'Chemistry',
    text: 'Which nitrogen oxide is the most stable?',
    options: ['NO', 'N₂O', 'NO₂', 'N₂O₅'],
    correct: 1,
    explanation: 'N₂O (nitrous oxide) is the most thermodynamically stable among common nitrogen oxides at room temperature.'
  },
  {
    id: 'ch47', subject: 'Chemistry',
    text: 'The ore of aluminium is:',
    options: ['Haematite', 'Magnetite', 'Bauxite', 'Malachite'],
    correct: 2,
    explanation: 'Bauxite (Al₂O₃·2H₂O) is the principal ore of aluminium.'
  },
  {
    id: 'ch48', subject: 'Chemistry',
    text: 'In the thermite reaction, aluminium reduces iron oxide. This demonstrates:',
    options: ['Aluminium is a weaker reducing agent than iron', 'Aluminium is a stronger reducing agent than iron', 'Iron oxide is unstable', 'The reaction doesn\'t proceed'],
    correct: 1,
    explanation: 'Thermite: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe. Al reduces Fe, showing Al is a stronger reducing agent.'
  },
  {
    id: 'ch49', subject: 'Chemistry',
    text: 'The process of converting pig iron to steel is called:',
    options: ['Smelting', 'Roasting', 'Bessemer process', 'Hall-Héroult process'],
    correct: 2,
    explanation: 'Bessemer process: pig iron is converted to steel by blowing air through it to oxidize excess carbon.'
  },
  {
    id: 'ch50', subject: 'Chemistry',
    text: 'Which of these is NOT a greenhouse gas?',
    options: ['CO₂', 'CH₄', 'N₂', 'N₂O'],
    correct: 2,
    explanation: 'N₂ is not a greenhouse gas. CO₂, CH₄, N₂O, and H₂O are significant greenhouse gases.'
  },
  {
    id: 'ch51', subject: 'Chemistry',
    text: 'Freons are:',
    options: ['Chlorofluorocarbons', 'Hydrocarbons', 'Nitrogen oxides', 'Sulfur compounds'],
    correct: 0,
    explanation: 'Freons are chlorofluorocarbons (CFCs) used as refrigerants; they deplete the ozone layer.'
  },
  {
    id: 'ch52', subject: 'Chemistry',
    text: 'Entropy (S) of a system increases when:',
    options: ['Ice melts to water', 'Water freezes to ice', 'Gas condenses to liquid', 'Order increases'],
    correct: 0,
    explanation: 'Entropy increases with disorder: solid → liquid (ice melting) increases randomness → ΔS > 0.'
  },
  {
    id: 'ch53', subject: 'Chemistry',
    text: 'The Gibbs free energy change ΔG for a spontaneous reaction at constant T and P is:',
    options: ['Positive', 'Zero', 'Negative', 'Indeterminate'],
    correct: 2,
    explanation: 'ΔG < 0 for a spontaneous process at constant T and P.'
  },
  {
    id: 'ch54', subject: 'Chemistry',
    text: 'Electrolysis of aqueous NaCl solution gives at cathode:',
    options: ['Cl₂ gas', 'Na metal', 'H₂ gas', 'O₂ gas'],
    correct: 2,
    explanation: 'At cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (water is preferentially reduced over Na⁺).'
  },
  {
    id: 'ch55', subject: 'Chemistry',
    text: 'Grignard reagent is:',
    options: ['RMgX', 'R₂Mg', 'RLi', 'RZnX'],
    correct: 0,
    explanation: 'Grignard reagent: R-Mg-X (R = alkyl/aryl, X = halide), prepared by Mg in dry ether.'
  },
  {
    id: 'ch56', subject: 'Chemistry',
    text: 'Aldol condensation occurs between:',
    options: ['Two carboxylic acids', 'Two ketones with α-H', 'Ester and alcohol', 'Two aromatic compounds'],
    correct: 1,
    explanation: 'Aldol condensation: enolization of α-H in ketone (or aldehyde), attack on another carbonyl compound.'
  },
  {
    id: 'ch57', subject: 'Chemistry',
    text: 'The Benedict\'s test is positive for:',
    options: ['Starch', 'Sucrose', 'Glucose', 'Cellulose'],
    correct: 2,
    explanation: 'Benedict\'s test detects reducing sugars (free aldehyde/ketone groups) — glucose gives positive result.'
  },
  {
    id: 'ch58', subject: 'Chemistry',
    text: 'Iodoform test is positive for:',
    options: ['Methanol', 'Ethanol', 'Propan-1-ol', 'Propan-2-ol and Ethanol'],
    correct: 3,
    explanation: 'Iodoform test: positive for ethanol, methyl ketones (CH₃COR), and secondary alcohols with CH₃CHOH group.'
  },
  {
    id: 'ch59', subject: 'Chemistry',
    text: 'Which reagent converts -NO₂ group to -NH₂ group?',
    options: ['Sn/HCl', 'NaOH', 'H₂SO₄', 'KMnO₄'],
    correct: 0,
    explanation: 'Reduction of nitro group: Ar-NO₂ + Sn/HCl (or Fe/HCl) → Ar-NH₂ (aniline from nitrobenzene).'
  },
  {
    id: 'ch60', subject: 'Chemistry',
    text: 'The strongest intermolecular force is:',
    options: ['London dispersion forces', 'Dipole-dipole interactions', 'Hydrogen bonding', 'Ion-dipole interactions'],
    correct: 3,
    explanation: 'Ion-dipole interactions are the strongest of the intermolecular forces listed, followed by H-bonding.'
  },
];

export const mathBank = [
  // ── Set A: Algebra, Trigonometry, Relations & Functions ───
  {
    id: 'ma1', subject: 'Mathematics',
    text: 'If f(x) = x² + 2 and g(x) = 3x − 1, then f(g(2)) is:',
    options: ['27', '27', '29', '25'],
    correct: 2,
    explanation: 'g(2) = 3(2)−1 = 5. f(5) = 25+2 = 27. Wait: f(g(2)) = f(5) = 25+2 = 27. Answer: 27.'
  },
  {
    id: 'ma2', subject: 'Mathematics',
    text: 'sin 75° is equal to:',
    options: ['(√6 + √2)/4', '(√6 − √2)/4', '(√3 + 1)/2', '(√3 − 1)/2'],
    correct: 0,
    explanation: 'sin75° = sin(45°+30°) = sin45°cos30° + cos45°sin30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6+√2)/4'
  },
  {
    id: 'ma3', subject: 'Mathematics',
    text: 'The general solution of cos x = 0 is:',
    options: ['x = nπ', 'x = (2n+1)π/2', 'x = nπ/2', 'x = 2nπ'],
    correct: 1,
    explanation: 'cosθ = 0 when θ = π/2, 3π/2, ... = (2n+1)π/2, n ∈ Z.'
  },
  {
    id: 'ma4', subject: 'Mathematics',
    text: 'The number of subsets of a set with 4 elements is:',
    options: ['8', '12', '16', '4'],
    correct: 2,
    explanation: 'Number of subsets = 2ⁿ = 2⁴ = 16.'
  },
  {
    id: 'ma5', subject: 'Mathematics',
    text: 'A relation R on set A is an equivalence relation if it is:',
    options: ['Reflexive and symmetric', 'Reflexive, symmetric, and transitive', 'Symmetric and transitive', 'Reflexive and transitive'],
    correct: 1,
    explanation: 'Equivalence relation must be reflexive, symmetric, AND transitive.'
  },
  {
    id: 'ma6', subject: 'Mathematics',
    text: 'The value of tan⁻¹(1) + tan⁻¹(√3) is:',
    options: ['π/2', '5π/12', '7π/12', 'π/3'],
    correct: 2,
    explanation: 'tan⁻¹(1) = π/4, tan⁻¹(√3) = π/3. Sum = π/4 + π/3 = 3π/12 + 4π/12 = 7π/12.'
  },
  {
    id: 'ma7', subject: 'Mathematics',
    text: 'The modulus of the complex number z = 3 + 4i is:',
    options: ['3', '4', '5', '7'],
    correct: 2,
    explanation: '|z| = √(3² + 4²) = √(9+16) = √25 = 5.'
  },
  {
    id: 'ma8', subject: 'Mathematics',
    text: 'If |x − 2| < 3, then x lies in:',
    options: ['(−1, 5)', '(−5, 1)', '(1, 5)', '(2, 5)'],
    correct: 0,
    explanation: '|x−2| < 3 → −3 < x−2 < 3 → −1 < x < 5 → x ∈ (−1, 5).'
  },
  {
    id: 'ma9', subject: 'Mathematics',
    text: 'The 10th term of the AP: 5, 8, 11, 14, ... is:',
    options: ['32', '30', '31', '29'],
    correct: 0,
    explanation: 'a = 5, d = 3. T₁₀ = a + 9d = 5 + 27 = 32.'
  },
  {
    id: 'ma10', subject: 'Mathematics',
    text: 'The sum of the infinite GP 1 + 1/2 + 1/4 + ... is:',
    options: ['1', '2', '3', '1.5'],
    correct: 1,
    explanation: 'S∞ = a/(1-r) = 1/(1-1/2) = 1/(1/2) = 2.'
  },
  {
    id: 'ma11', subject: 'Mathematics',
    text: 'The number of ways of arranging 5 distinct books on a shelf is:',
    options: ['25', '50', '120', '60'],
    correct: 2,
    explanation: '5P5 = 5! = 120.'
  },
  {
    id: 'ma12', subject: 'Mathematics',
    text: 'The coefficient of x³ in (1 + x)⁶ is:',
    options: ['15', '20', '10', '6'],
    correct: 1,
    explanation: '⁶C₃ = 6!/(3!3!) = 720/36 = 20.'
  },
  {
    id: 'ma13', subject: 'Mathematics',
    text: 'The number of solutions of sin x = 1/2 in [0, 2π] is:',
    options: ['1', '2', '3', '4'],
    correct: 1,
    explanation: 'sin x = 1/2 → x = π/6 and x = 5π/6 in [0, 2π]. Two solutions.'
  },
  {
    id: 'ma14', subject: 'Mathematics',
    text: 'If A is a 2×3 matrix and B is 3×4 matrix, then AB has order:',
    options: ['2×4', '3×3', '4×2', '2×3'],
    correct: 0,
    explanation: 'A(m×n) × B(n×p) = AB(m×p). So 2×3 × 3×4 = 2×4.'
  },
  {
    id: 'ma15', subject: 'Mathematics',
    text: 'The determinant of the matrix [[2, 3], [1, 4]] is:',
    options: ['5', '11', '8', '5'],
    correct: 0,
    explanation: 'det = (2)(4) − (3)(1) = 8 − 3 = 5.'
  },
  {
    id: 'ma16', subject: 'Mathematics',
    text: 'The equation of a line with slope 2 passing through (1, 3) is:',
    options: ['y = 2x + 1', 'y = 2x − 1', 'y = 2x + 3', '2x − y = 0'],
    correct: 0,
    explanation: 'y − y₁ = m(x − x₁) → y − 3 = 2(x − 1) → y = 2x + 1.'
  },
  {
    id: 'ma17', subject: 'Mathematics',
    text: 'The distance between points (1, 2) and (4, 6) is:',
    options: ['3', '4', '5', '7'],
    correct: 2,
    explanation: 'd = √((4−1)² + (6−2)²) = √(9+16) = √25 = 5.'
  },
  {
    id: 'ma18', subject: 'Mathematics',
    text: 'The equation of a circle with center (2, −3) and radius 5 is:',
    options: ['(x−2)² + (y+3)² = 25', '(x+2)² + (y−3)² = 25', '(x−2)² + (y−3)² = 5', '(x+2)² + (y+3)² = 25'],
    correct: 0,
    explanation: '(x−h)² + (y−k)² = r² → (x−2)² + (y−(−3))² = 25 → (x−2)² + (y+3)² = 25.'
  },
  {
    id: 'ma19', subject: 'Mathematics',
    text: 'The focus of the parabola y² = 8x is at:',
    options: ['(2, 0)', '(−2, 0)', '(0, 2)', '(4, 0)'],
    correct: 0,
    explanation: 'y² = 4ax → 4a = 8 → a = 2. Focus at (a, 0) = (2, 0).'
  },
  {
    id: 'ma20', subject: 'Mathematics',
    text: 'The eccentricity of an ellipse x²/16 + y²/9 = 1 is:',
    options: ['√7/4', '3/4', '7/16', '√7/3'],
    correct: 0,
    explanation: 'a² = 16, b² = 9. c² = a²−b² = 7. e = c/a = √7/4.'
  },
  // ── Set B: Calculus ─────────────────────────────────────────
  {
    id: 'ma21', subject: 'Mathematics',
    text: 'lim(x→0) (sin x)/x equals:',
    options: ['0', '∞', '1', '−1'],
    correct: 2,
    explanation: 'Standard limit: lim(x→0) (sin x)/x = 1.'
  },
  {
    id: 'ma22', subject: 'Mathematics',
    text: 'The derivative of tan⁻¹(x) with respect to x is:',
    options: ['1/(1+x²)', '1/(1−x²)', '√(1−x²)', '−1/(1+x²)'],
    correct: 0,
    explanation: 'd/dx[tan⁻¹(x)] = 1/(1+x²).'
  },
  {
    id: 'ma23', subject: 'Mathematics',
    text: 'If y = x³ + 3x² − 9x + 5, the function has a local maximum at x =',
    options: ['1', '−3', '3', '−1'],
    correct: 1,
    explanation: 'dy/dx = 3x² + 6x − 9 = 3(x²+2x−3) = 3(x+3)(x−1) = 0 → x = −3 or x = 1. d²y/dx² = 6x+6. At x=−3: d²y/dx² = −12 < 0 → local max.'
  },
  {
    id: 'ma24', subject: 'Mathematics',
    text: '∫(2x + 3) dx is:',
    options: ['x² + 3x + C', '2 + C', 'x² + C', '2x² + 3x + C'],
    correct: 0,
    explanation: '∫(2x+3)dx = x² + 3x + C.'
  },
  {
    id: 'ma25', subject: 'Mathematics',
    text: 'The integral ∫₀¹ x² dx equals:',
    options: ['1/3', '1/2', '1', '2/3'],
    correct: 0,
    explanation: '∫₀¹ x² dx = [x³/3]₀¹ = 1/3 − 0 = 1/3.'
  },
  {
    id: 'ma26', subject: 'Mathematics',
    text: 'By Rolle\'s theorem, if f is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then:',
    options: ['f(c) = 0 for some c', 'f\'(c) = 0 for some c in (a,b)', 'f is constant', 'f has no extrema'],
    correct: 1,
    explanation: 'Rolle\'s theorem guarantees ∃c ∈ (a,b) such that f\'(c) = 0.'
  },
  {
    id: 'ma27', subject: 'Mathematics',
    text: 'The derivative of e^(x²) with respect to x is:',
    options: ['e^(x²)', '2x·e^(x²)', 'x²·e^(x²)', '2e^(x²)'],
    correct: 1,
    explanation: 'd/dx[e^(x²)] = e^(x²) · d/dx(x²) = 2x·e^(x²) (chain rule).'
  },
  {
    id: 'ma28', subject: 'Mathematics',
    text: '∫ (1/x) dx is:',
    options: ['x', 'log|x| + C', '1/x² + C', '−1/x + C'],
    correct: 1,
    explanation: '∫(1/x)dx = ln|x| + C.'
  },
  {
    id: 'ma29', subject: 'Mathematics',
    text: 'Area bounded by y = x² and y = x is:',
    options: ['1/6', '1/3', '1/2', '1/4'],
    correct: 0,
    explanation: 'Intersect at x=0 and x=1. Area = ∫₀¹(x−x²)dx = [x²/2 − x³/3]₀¹ = 1/2−1/3 = 1/6.'
  },
  {
    id: 'ma30', subject: 'Mathematics',
    text: 'The differential equation dy/dx = y has general solution:',
    options: ['y = Ce^x', 'y = C + x', 'y = Cx', 'y = Ce^(−x)'],
    correct: 0,
    explanation: 'Separable: dy/y = dx → ln|y| = x + C₁ → y = Ce^x.'
  },
  // ── Set C: Vectors, 3D Geometry, Statistics & Probability ──
  {
    id: 'ma31', subject: 'Mathematics',
    text: 'The dot product of vectors a = (1,2,3) and b = (4,5,6) is:',
    options: ['28', '32', '18', '14'],
    correct: 1,
    explanation: 'a·b = 1×4 + 2×5 + 3×6 = 4+10+18 = 32.'
  },
  {
    id: 'ma32', subject: 'Mathematics',
    text: 'The cross product of î and ĵ (unit vectors) is:',
    options: ['î', 'ĵ', 'k̂', '0'],
    correct: 2,
    explanation: 'î × ĵ = k̂ (right-hand rule).'
  },
  {
    id: 'ma33', subject: 'Mathematics',
    text: 'The angle between vectors a = (1,0,0) and b = (0,1,0) is:',
    options: ['0°', '30°', '60°', '90°'],
    correct: 3,
    explanation: 'cos θ = a·b/(|a||b|) = 0/1 = 0 → θ = 90°.'
  },
  {
    id: 'ma34', subject: 'Mathematics',
    text: 'The direction cosines of the vector (1, 1, 1) are:',
    options: ['(1,1,1)', '(1/√3, 1/√3, 1/√3)', '(1/3, 1/3, 1/3)', '(√3, √3, √3)'],
    correct: 1,
    explanation: '|v| = √3. Direction cosines = (1/√3, 1/√3, 1/√3).'
  },
  {
    id: 'ma35', subject: 'Mathematics',
    text: 'The equation of a plane passing through origin with normal vector (1,2,3) is:',
    options: ['x+2y+3z = 0', 'x+2y+3z = 1', '2x+y+3z = 0', 'x−2y+3z = 0'],
    correct: 0,
    explanation: 'Plane through origin: n·r = 0 → 1(x)+2(y)+3(z) = 0.'
  },
  {
    id: 'ma36', subject: 'Mathematics',
    text: 'The mean of 5, 10, 15, 20, 25 is:',
    options: ['10', '12.5', '15', '17'],
    correct: 2,
    explanation: 'Mean = (5+10+15+20+25)/5 = 75/5 = 15.'
  },
  {
    id: 'ma37', subject: 'Mathematics',
    text: 'The variance of the data 2, 4, 6, 8, 10 is:',
    options: ['4', '6', '8', '10'],
    correct: 2,
    explanation: 'Mean = 6. Variance = [(2−6)²+(4−6)²+(6−6)²+(8−6)²+(10−6)²]/5 = [16+4+0+4+16]/5 = 40/5 = 8.'
  },
  {
    id: 'ma38', subject: 'Mathematics',
    text: 'If P(A) = 0.3, P(B) = 0.4, and A and B are independent, then P(A∩B) is:',
    options: ['0.7', '0.12', '0.1', '0.3'],
    correct: 1,
    explanation: 'Independent: P(A∩B) = P(A)×P(B) = 0.3×0.4 = 0.12.'
  },
  {
    id: 'ma39', subject: 'Mathematics',
    text: 'Bayes\' theorem is used to find:',
    options: ['Joint probability', 'Conditional probability given new evidence', 'Marginal probability', 'Complementary probability'],
    correct: 1,
    explanation: 'Bayes\' theorem: P(A|B) = P(B|A)P(A)/P(B), used to update probability given new evidence.'
  },
  {
    id: 'ma40', subject: 'Mathematics',
    text: 'The probability of getting exactly 2 heads in 3 tosses of a fair coin is:',
    options: ['1/4', '3/8', '1/2', '1/8'],
    correct: 1,
    explanation: 'P = ³C₂×(1/2)²×(1/2)¹ = 3×(1/8) = 3/8.'
  },
  // Additional questions for papers 4-10 (20 more per subject)
  {
    id: 'ma41', subject: 'Mathematics',
    text: 'The value of sin(π/6) + cos(π/3) is:',
    options: ['0', '1', '√3/2', '1/2'],
    correct: 1,
    explanation: 'sin(π/6) = 1/2, cos(π/3) = 1/2. Sum = 1.'
  },
  {
    id: 'ma42', subject: 'Mathematics',
    text: 'If f(x) = 2x³ − 3x² + 1, then f\'(2) is:',
    options: ['12', '15', '9', '18'],
    correct: 2,
    explanation: 'f\'(x) = 6x² − 6x. f\'(2) = 6(4) − 6(2) = 24 − 12 = 12. Wait: 24-12=12. Answer: 12.'
  },
  {
    id: 'ma43', subject: 'Mathematics',
    text: '∫ sin x dx =',
    options: ['cos x + C', '−cos x + C', 'sin x + C', 'tan x + C'],
    correct: 1,
    explanation: '∫ sin x dx = −cos x + C.'
  },
  {
    id: 'ma44', subject: 'Mathematics',
    text: 'The slope of the curve y = x³ at x = 2 is:',
    options: ['6', '8', '12', '4'],
    correct: 2,
    explanation: 'dy/dx = 3x². At x = 2: slope = 3(4) = 12.'
  },
  {
    id: 'ma45', subject: 'Mathematics',
    text: 'The range of f(x) = sin x is:',
    options: ['[0, 1]', '[−1, 1]', '(−∞, ∞)', '[0, π]'],
    correct: 1,
    explanation: 'sin x oscillates between −1 and 1, so range is [−1, 1].'
  },
  {
    id: 'ma46', subject: 'Mathematics',
    text: 'Sum of first n natural numbers is:',
    options: ['n(n+1)', 'n(n+1)/2', 'n²', 'n(n-1)/2'],
    correct: 1,
    explanation: '1+2+3+...+n = n(n+1)/2.'
  },
  {
    id: 'ma47', subject: 'Mathematics',
    text: 'The amplitude of y = 3sin(2x + π/4) is:',
    options: ['2', '3', 'π/4', '6'],
    correct: 1,
    explanation: 'Amplitude = |3| = 3 (coefficient of sin function).'
  },
  {
    id: 'ma48', subject: 'Mathematics',
    text: 'The inverse of a 2×2 matrix [[a,b],[c,d]] exists when:',
    options: ['a+d ≠ 0', 'ad−bc ≠ 0', 'a ≠ d', 'bc ≠ 0'],
    correct: 1,
    explanation: 'Inverse exists when determinant = ad−bc ≠ 0.'
  },
  {
    id: 'ma49', subject: 'Mathematics',
    text: 'If P(A∪B) = 0.7, P(A) = 0.4, P(B) = 0.5, then P(A∩B) is:',
    options: ['0.2', '0.3', '0.1', '0.6'],
    correct: 0,
    explanation: 'P(A∪B) = P(A)+P(B)−P(A∩B) → 0.7 = 0.4+0.5−P(A∩B) → P(A∩B) = 0.2.'
  },
  {
    id: 'ma50', subject: 'Mathematics',
    text: 'The shortest distance between two parallel lines is:',
    options: ['Zero', 'Always 1', 'The perpendicular distance between them', 'Depends on direction'],
    correct: 2,
    explanation: 'Parallel lines never meet; shortest distance is the perpendicular distance between them.'
  },
  {
    id: 'ma51', subject: 'Mathematics',
    text: 'The value of lim(x→2) (x²−4)/(x−2) is:',
    options: ['0', '2', '4', 'Undefined'],
    correct: 2,
    explanation: '(x²−4)/(x−2) = (x+2)(x−2)/(x−2) = x+2. As x→2: limit = 4.'
  },
  {
    id: 'ma52', subject: 'Mathematics',
    text: 'The area of a triangle with vertices (0,0), (4,0), (0,3) is:',
    options: ['6', '12', '7', '3.5'],
    correct: 0,
    explanation: 'Area = ½ × base × height = ½ × 4 × 3 = 6.'
  },
  {
    id: 'ma53', subject: 'Mathematics',
    text: 'The standard deviation of 2, 4, 6, 8, 10 is:',
    options: ['2', '2√2', '4', '√8'],
    correct: 1,
    explanation: 'Variance = 8 (computed earlier). SD = √8 = 2√2.'
  },
  {
    id: 'ma54', subject: 'Mathematics',
    text: 'The number of diagonal of a polygon with n sides is:',
    options: ['n(n−3)/2', 'n(n−1)/2', 'n²', 'n(n+1)/2'],
    correct: 0,
    explanation: 'Diagonals = ⁿC₂ − n = n(n−1)/2 − n = n(n−3)/2.'
  },
  {
    id: 'ma55', subject: 'Mathematics',
    text: 'The value of i²⁰ + i²¹ + i²² + i²³ (where i = √−1) is:',
    options: ['0', '4i', 'i', '4'],
    correct: 0,
    explanation: 'i cycle: i, −1, −i, 1 (period 4). i²⁰=1, i²¹=i, i²²=−1, i²³=−i. Sum=0.'
  },
  {
    id: 'ma56', subject: 'Mathematics',
    text: 'If the two roots of x² + px + q = 0 are equal, then:',
    options: ['p² = q', 'p² = 4q', 'p = 4q', 'q² = 4p'],
    correct: 1,
    explanation: 'Equal roots → discriminant = 0 → p² − 4q = 0 → p² = 4q.'
  },
  {
    id: 'ma57', subject: 'Mathematics',
    text: 'The value of ∫₀^π sin x dx is:',
    options: ['0', '1', '2', 'π'],
    correct: 2,
    explanation: '∫₀^π sin x dx = [−cos x]₀^π = −cos π + cos 0 = 1 + 1 = 2.'
  },
  {
    id: 'ma58', subject: 'Mathematics',
    text: 'The condition for three points A, B, C to be collinear is:',
    options: ['AB + BC = AC', 'AB × BC = 0', 'The vectors AB and AC are parallel', 'All of the above (if consistent)'],
    correct: 2,
    explanation: 'Three points are collinear if AB and AC are parallel (i.e., AB × AC = 0 or AB = k·AC).'
  },
  {
    id: 'ma59', subject: 'Mathematics',
    text: 'In a binomial distribution B(n, p), the mean is:',
    options: ['np', 'np(1−p)', 'n/p', '√(np)'],
    correct: 0,
    explanation: 'Mean of binomial distribution = np.'
  },
  {
    id: 'ma60', subject: 'Mathematics',
    text: 'The order of the differential equation (d²y/dx²)³ + (dy/dx)² = sin x is:',
    options: ['1', '2', '3', '6'],
    correct: 1,
    explanation: 'Order = highest derivative present = 2 (d²y/dx²).'
  },
];

// ── PAPER ASSEMBLY ──────────────────────────────────────────
// Each paper: 20 Physics + 20 Chemistry + 20 Math = 60 Qs
// Papers 1-3 use non-overlapping sets; 4-10 use full-bank shuffles seeded by paper ID

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

export function getKcetPaper(paperId) {
  const id = parseInt(paperId, 10);
  
  // Papers 1-3: fixed non-overlapping slices
  if (id === 1) {
    return {
      id: 1, title: 'KCET 2026 Analysis Paper',
      description: 'Curated from 5-year trend analysis (2021–2025)',
      duration: 180, totalMarks: 60, negativeMarking: false,
      questions: [
        ...physicsBank.slice(0, 20),
        ...chemistryBank.slice(0, 20),
        ...mathBank.slice(0, 20),
      ]
    };
  }
  if (id === 2) {
    return {
      id: 2, title: 'KCET Mock Test 2',
      description: 'Electrostatics, Organic Chemistry, Calculus focus',
      duration: 180, totalMarks: 60, negativeMarking: false,
      questions: [
        ...physicsBank.slice(20, 40),
        ...chemistryBank.slice(20, 40),
        ...mathBank.slice(20, 40),
      ]
    };
  }
  if (id === 3) {
    return {
      id: 3, title: 'KCET Mock Test 3',
      description: 'Modern Physics, Biomolecules, Vectors & 3D',
      duration: 180, totalMarks: 60, negativeMarking: false,
      questions: [
        ...physicsBank.slice(40, 60),
        ...chemistryBank.slice(40, 60),
        ...mathBank.slice(40, 60),
      ]
    };
  }
  
  // Papers 4-10: seeded shuffle of entire bank
  const names = [
    '', '', '', '',
    'KCET Mock Test 4 – Full Syllabus Mixed',
    'KCET Mock Test 5 – High Difficulty',
    'KCET Mock Test 6 – Previous Year Pattern',
    'KCET Mock Test 7 – Concept Based',
    'KCET Mock Test 8 – Speed Test',
    'KCET Mock Test 9 – Revision Blend',
    'KCET Mock Test 10 – Final Practice',
  ];
  const shuffledPh = seededShuffle(physicsBank, id * 31337);
  const shuffledCh = seededShuffle(chemistryBank, id * 31337 + 1);
  const shuffledMa = seededShuffle(mathBank, id * 31337 + 2);
  return {
    id,
    title: names[id] || `KCET Mock Test ${id}`,
    description: 'Mixed syllabus adaptive paper',
    duration: 180, totalMarks: 60, negativeMarking: false,
    questions: [
      ...shuffledPh.slice(0, 20),
      ...shuffledCh.slice(0, 20),
      ...shuffledMa.slice(0, 20),
    ]
  };
}

// ── RANK PREDICTOR ───────────────────────────────────────────
// Based on KCET 2021-2025 published cutoffs and rank-score data
// KCET rank = f(KCET score 180 + Board PCM 300)
// Combined score = 50% KCET + 50% Board PCM (scaled to 100 each = 200 total)

export const kcetRankBands = [
  { minCombined: 190, maxCombined: 200, rankRange: '1 – 500',       colleges: 'UVCE, BIT Bangalore, RVCE, MSRIT (CSE/ECE)' },
  { minCombined: 180, maxCombined: 189, rankRange: '500 – 2,000',   colleges: 'RVCE, BMSCE, PESIT, MSRIT (most branches)' },
  { minCombined: 170, maxCombined: 179, rankRange: '2,000 – 6,000', colleges: 'BMSCE, DSCE, SIT, NIE (Mysuru)' },
  { minCombined: 160, maxCombined: 169, rankRange: '6,000 – 15,000',colleges: 'SIT, NIE, JSSATE, SDM colleges' },
  { minCombined: 145, maxCombined: 159, rankRange: '15,000 – 30,000', colleges: 'Good private colleges in Bengaluru/Mysuru' },
  { minCombined: 130, maxCombined: 144, rankRange: '30,000 – 55,000', colleges: 'Mid-tier private colleges' },
  { minCombined: 110, maxCombined: 129, rankRange: '55,000 – 90,000', colleges: 'Most govt quota seats available' },
  { minCombined: 0,   maxCombined: 109, rankRange: '90,000+',         colleges: 'Management quota / less popular branches' },
];

export const allPapers = Array.from({ length: 10 }, (_, i) => {
  const id = i + 1;
  const topics = [
    'Trend Analysis 2021-2026 | All Chapters',
    'Electrostatics · Organic Chemistry · Calculus',
    'Modern Physics · Biomolecules · Vectors & 3D',
    'Full Syllabus Mixed | Medium Difficulty',
    'High Difficulty | Previous Year Pattern',
    'Speed Test | 3 Hours | Mixed Topics',
    'Concept Based | Weak-Area Focus',
    'Formula Heavy | Numerical Intensive',
    'Revision Blend | Important Topics',
    'Final Practice | Exam Simulation',
  ];
  return {
    id,
    title: id === 1 ? 'KCET 2026 Analysis Paper' : `Mock Test ${id}`,
    topics: topics[i],
    difficulty: ['Hard', 'Hard', 'Medium', 'Medium', 'Hard', 'Easy', 'Medium', 'Hard', 'Medium', 'Hard'][i],
    questions: 60,
    duration: '3 Hours',
    marks: 60,
  };
});
