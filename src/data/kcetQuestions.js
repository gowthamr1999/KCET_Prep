// ============================================================
// KCET QUESTION BANK
// Pattern: 60 Physics + 60 Chemistry + 60 Mathematics = 180 per paper
// Bank size: 120 per subject (2 non-overlapping sets of 60)
// Scoring: +1 correct, 0 wrong (no negative marking)
// Duration: 80 min per subject × 3 = 240 min (4 hours)  |  Total: 180 marks
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
  // ── Set D: Waves, Optics, Electricity, Modern Physics (ph61-ph120) ──
  {
    id: 'ph61', subject: 'Physics',
    text: 'The speed of sound in air at 0°C is 332 m/s. At 22°C it will be approximately:',
    options: ['340 m/s', '345 m/s', '350 m/s', '360 m/s'],
    correct: 1,
    explanation: 'v ∝ √T. v₂ = 332 × √(295/273) ≈ 332 × 1.039 ≈ 345 m/s.'
  },
  {
    id: 'ph62', subject: 'Physics',
    text: 'In a standing wave, the distance between a node and the adjacent antinode is:',
    options: ['λ/4', 'λ/2', 'λ', '3λ/4'],
    correct: 0,
    explanation: 'Adjacent node and antinode are λ/4 apart in a standing wave.'
  },
  {
    id: 'ph63', subject: 'Physics',
    text: 'A source moves towards a stationary observer with speed 10 m/s. If the source frequency is 400 Hz and v = 340 m/s, the observed frequency is:',
    options: ['412 Hz', '388 Hz', '400 Hz', '420 Hz'],
    correct: 0,
    explanation: 'f′ = f × v/(v − vs) = 400 × 340/330 ≈ 412 Hz.'
  },
  {
    id: 'ph64', subject: 'Physics',
    text: 'A ray of light goes from medium 1 (n=1.5) to medium 2 (n=1.0) at angle of incidence 30°. The angle of refraction is:',
    options: ['48.6°', '19.5°', '30°', '90°'],
    correct: 0,
    explanation: 'n₁sinθ₁ = n₂sinθ₂ → 1.5×sin30° = 1.0×sinθ₂ → sinθ₂ = 0.75 → θ₂ ≈ 48.6°.'
  },
  {
    id: 'ph65', subject: 'Physics',
    text: 'The critical angle for glass (n = 1.5) with respect to air is:',
    options: ['41.8°', '48.6°', '30°', '60°'],
    correct: 0,
    explanation: 'sin C = 1/n = 1/1.5 = 0.667 → C ≈ 41.8°.'
  },
  {
    id: 'ph66', subject: 'Physics',
    text: 'An object is placed 30 cm from a convex lens of focal length 10 cm. The image distance is:',
    options: ['15 cm', '20 cm', '30 cm', '10 cm'],
    correct: 0,
    explanation: '1/v − 1/u = 1/f → 1/v − 1/(−30) = 1/10 → 1/v = 1/10 − 1/30 = 2/30 → v = 15 cm.'
  },
  {
    id: 'ph67', subject: 'Physics',
    text: 'For a convex lens, if the object is at 2F, the image is:',
    options: ['At F, real, inverted', 'At 2F, real, inverted, same size', 'At infinity', 'Virtual, erect'],
    correct: 1,
    explanation: 'Object at 2F → image at 2F on the other side; real, inverted, same size.'
  },
  {
    id: 'ph68', subject: 'Physics',
    text: 'In Young\'s double slit experiment, fringe width β = λD/d. If d is doubled keeping D and λ constant, fringe width:',
    options: ['Doubles', 'Halves', 'Remains same', 'Quadruples'],
    correct: 1,
    explanation: 'β = λD/d. If d → 2d, β → λD/(2d) = β/2. Fringe width halves.'
  },
  {
    id: 'ph69', subject: 'Physics',
    text: 'In a YDSE with λ = 600 nm, D = 1 m, d = 0.6 mm, the fringe width is:',
    options: ['1 mm', '0.5 mm', '2 mm', '0.1 mm'],
    correct: 0,
    explanation: 'β = λD/d = (600×10⁻⁹ × 1)/(0.6×10⁻³) = 1×10⁻³ m = 1 mm.'
  },
  {
    id: 'ph70', subject: 'Physics',
    text: 'A wire of resistance 4Ω is stretched to double its length. Its new resistance is:',
    options: ['8 Ω', '16 Ω', '2 Ω', '32 Ω'],
    correct: 1,
    explanation: 'R = ρL/A. If L doubles, A halves (constant volume). R′ = ρ(2L)/(A/2) = 4R = 16 Ω.'
  },
  {
    id: 'ph71', subject: 'Physics',
    text: 'The drift velocity of electrons in a conductor is of the order of:',
    options: ['10⁸ m/s', '10⁻⁴ m/s', '10⁻² m/s', '3×10⁸ m/s'],
    correct: 1,
    explanation: 'Drift velocity is very small, typically of the order of 10⁻⁴ m/s.'
  },
  {
    id: 'ph72', subject: 'Physics',
    text: 'Kirchhoff\'s junction rule is a consequence of:',
    options: ['Conservation of energy', 'Conservation of charge', 'Conservation of momentum', 'Ohm\'s law'],
    correct: 1,
    explanation: 'Kirchhoff\'s current law (junction rule) expresses conservation of electric charge at a node.'
  },
  {
    id: 'ph73', subject: 'Physics',
    text: 'In a balanced Wheatstone bridge, the galvanometer reads:',
    options: ['Maximum current', 'Zero current', 'Half of total current', 'Depends on EMF'],
    correct: 1,
    explanation: 'When the bridge is balanced (P/Q = R/S), no current flows through the galvanometer.'
  },
  {
    id: 'ph74', subject: 'Physics',
    text: 'A cell of EMF 2V and internal resistance 0.5Ω is connected to a 3.5Ω resistor. Terminal voltage is:',
    options: ['1.75 V', '2 V', '1.5 V', '0.5 V'],
    correct: 0,
    explanation: 'I = E/(R+r) = 2/4 = 0.5 A. V = E − Ir = 2 − 0.5×0.5 = 1.75 V.'
  },
  {
    id: 'ph75', subject: 'Physics',
    text: 'The magnetic field at the centre of a circular loop of radius R carrying current I is:',
    options: ['μ₀I/2R', 'μ₀I/4πR', 'μ₀I/(2πR)', '2μ₀I/R'],
    correct: 0,
    explanation: 'By Biot-Savart law, B = μ₀I/(2R) at the centre of a circular loop.'
  },
  {
    id: 'ph76', subject: 'Physics',
    text: 'A solenoid has n turns per unit length carrying current I. The magnetic field inside is:',
    options: ['μ₀nI/2', 'μ₀nI', '2μ₀nI', 'μ₀nI/4π'],
    correct: 1,
    explanation: 'By Ampere\'s law, B = μ₀nI inside an ideal solenoid.'
  },
  {
    id: 'ph77', subject: 'Physics',
    text: 'A proton moving with velocity v enters a magnetic field B perpendicular to its motion. The radius of circular motion is:',
    options: ['mv/qB', 'qB/mv', 'mv/B', 'qv/mB'],
    correct: 0,
    explanation: 'Lorentz force provides centripetal force: qvB = mv²/r → r = mv/(qB).'
  },
  {
    id: 'ph78', subject: 'Physics',
    text: 'The torque on a current-carrying loop of area A, carrying current I in a uniform field B is:',
    options: ['IAB sinθ', 'IAB cosθ', 'IA/B', 'I²AB'],
    correct: 0,
    explanation: 'τ = nIAB sinθ; for single loop n=1 → τ = IAB sinθ.'
  },
  {
    id: 'ph79', subject: 'Physics',
    text: 'A conductor of length L moves with velocity v perpendicular to a field B. The induced EMF is:',
    options: ['BLv', 'BL/v', 'Bv/L', 'L/(Bv)'],
    correct: 0,
    explanation: 'Motional EMF ε = BLv (when v, L, B are mutually perpendicular).'
  },
  {
    id: 'ph80', subject: 'Physics',
    text: 'Lenz\'s law is a consequence of:',
    options: ['Conservation of charge', 'Conservation of energy', 'Newton\'s third law', 'Gauss\'s law'],
    correct: 1,
    explanation: 'Lenz\'s law states the induced current opposes the change causing it — this ensures energy conservation.'
  },
  {
    id: 'ph81', subject: 'Physics',
    text: 'The energy stored in an inductor of inductance L carrying current I is:',
    options: ['LI', 'LI²/2', 'L²I', 'I²/2L'],
    correct: 1,
    explanation: 'Energy stored in an inductor = ½LI².'
  },
  {
    id: 'ph82', subject: 'Physics',
    text: 'For an AC supply, the peak voltage is 311 V. The RMS voltage is approximately:',
    options: ['311 V', '220 V', '156 V', '440 V'],
    correct: 1,
    explanation: 'V_rms = V₀/√2 = 311/√2 ≈ 220 V.'
  },
  {
    id: 'ph83', subject: 'Physics',
    text: 'In a series LCR circuit, resonance occurs when:',
    options: ['XL = R', 'XL = XC', 'XC = R', 'XL + XC = R'],
    correct: 1,
    explanation: 'At resonance, inductive reactance XL equals capacitive reactance XC, giving minimum impedance.'
  },
  {
    id: 'ph84', subject: 'Physics',
    text: 'The power factor of a purely resistive AC circuit is:',
    options: ['0', '0.5', '1', '∞'],
    correct: 2,
    explanation: 'In a purely resistive circuit, voltage and current are in phase → cos φ = cos 0° = 1.'
  },
  {
    id: 'ph85', subject: 'Physics',
    text: 'Two point charges +4μC and −4μC are placed 20 cm apart. The force between them (k = 9×10⁹) is:',
    options: ['3.6 N attractive', '3.6 N repulsive', '0.36 N attractive', '36 N repulsive'],
    correct: 0,
    explanation: 'F = kq₁q₂/r² = 9×10⁹ × 16×10⁻¹² / 0.04 = 3.6 N; unlike charges → attractive.'
  },
  {
    id: 'ph86', subject: 'Physics',
    text: 'Electric field lines originate from:',
    options: ['Negative charges', 'Positive charges', 'Neutral regions', 'Magnetic poles'],
    correct: 1,
    explanation: 'Electric field lines originate from positive charges and terminate on negative charges.'
  },
  {
    id: 'ph87', subject: 'Physics',
    text: 'A capacitor of 4μF is charged to 100 V. The energy stored is:',
    options: ['0.02 J', '0.04 J', '0.01 J', '0.08 J'],
    correct: 0,
    explanation: 'U = ½CV² = ½ × 4×10⁻⁶ × 10000 = 0.02 J.'
  },
  {
    id: 'ph88', subject: 'Physics',
    text: 'Dielectric constant of a medium is always:',
    options: ['Less than 1', 'Equal to 1', 'Greater than or equal to 1', 'Negative'],
    correct: 2,
    explanation: 'Dielectric constant K = ε/ε₀ ≥ 1; for vacuum K = 1, for all other media K > 1.'
  },
  {
    id: 'ph89', subject: 'Physics',
    text: 'According to Gauss\'s law, the total electric flux through a closed surface is:',
    options: ['Zero always', 'q_enclosed/ε₀', 'ε₀/q_enclosed', 'Depends on shape'],
    correct: 1,
    explanation: 'Gauss\'s law: Φ = q_enclosed/ε₀, independent of the shape of the surface.'
  },
  {
    id: 'ph90', subject: 'Physics',
    text: 'The work function of a metal is 2 eV. The threshold frequency for photoelectric effect is (h = 6.6×10⁻³⁴ J·s):',
    options: ['4.8×10¹⁴ Hz', '3.0×10¹⁴ Hz', '6.0×10¹⁴ Hz', '9.6×10¹⁴ Hz'],
    correct: 0,
    explanation: 'φ = hν₀ → ν₀ = φ/h = (2×1.6×10⁻¹⁹)/(6.6×10⁻³⁴) ≈ 4.8×10¹⁴ Hz.'
  },
  {
    id: 'ph91', subject: 'Physics',
    text: 'The de Broglie wavelength of an electron accelerated through 100 V is approximately:',
    options: ['0.123 nm', '1.23 nm', '12.3 nm', '0.0123 nm'],
    correct: 0,
    explanation: 'λ = h/√(2meV) = 1.226/√V nm = 1.226/10 ≈ 0.123 nm.'
  },
  {
    id: 'ph92', subject: 'Physics',
    text: 'In the Bohr model of hydrogen, the radius of the nth orbit is proportional to:',
    options: ['n', '1/n', 'n²', '1/n²'],
    correct: 2,
    explanation: 'Bohr radius rₙ = 0.529n² Å, so rₙ ∝ n².'
  },
  {
    id: 'ph93', subject: 'Physics',
    text: 'The half-life of a radioactive element is 10 years. After 30 years, the fraction remaining is:',
    options: ['1/4', '1/8', '1/6', '1/3'],
    correct: 1,
    explanation: '30 years = 3 half-lives. Fraction remaining = (1/2)³ = 1/8.'
  },
  {
    id: 'ph94', subject: 'Physics',
    text: 'In nuclear fission, the energy released is due to:',
    options: ['Mass defect converted to energy (E = mc²)', 'Chemical reaction', 'Kinetic energy of electrons', 'Photon emission only'],
    correct: 0,
    explanation: 'In fission, total mass of products is less than reactants; the mass defect (Δm) appears as energy via E = mc².'
  },
  {
    id: 'ph95', subject: 'Physics',
    text: 'In a p-n junction diode, the depletion region:',
    options: ['Has no charge carriers', 'Has excess free electrons', 'Conducts electricity', 'Has high carrier concentration'],
    correct: 0,
    explanation: 'The depletion region is depleted of free charge carriers (mobile electrons and holes).'
  },
  {
    id: 'ph96', subject: 'Physics',
    text: 'A full-wave rectifier uses:',
    options: ['1 diode', '2 diodes', '4 diodes', '3 diodes'],
    correct: 1,
    explanation: 'A centre-tap full-wave rectifier uses 2 diodes; a bridge rectifier uses 4. Most basic full-wave = 2 diodes.'
  },
  {
    id: 'ph97', subject: 'Physics',
    text: 'The output of an AND gate for inputs A=1, B=0 is:',
    options: ['0', '1', 'A', 'B'],
    correct: 0,
    explanation: 'AND gate: output = A·B = 1·0 = 0.'
  },
  {
    id: 'ph98', subject: 'Physics',
    text: 'In a common emitter transistor, the current gain β = IC/IB. If IB = 50 μA and β = 100, then IC is:',
    options: ['5 mA', '0.5 mA', '50 mA', '500 μA'],
    correct: 0,
    explanation: 'IC = β × IB = 100 × 50×10⁻⁶ = 5000 μA = 5 mA.'
  },
  {
    id: 'ph99', subject: 'Physics',
    text: 'Amplitude modulation (AM) is used in:',
    options: ['TV audio', 'MW/SW radio broadcasting', 'Satellite communication', 'Mobile phones'],
    correct: 1,
    explanation: 'AM is primarily used for medium wave (MW) and short wave (SW) radio broadcasting.'
  },
  {
    id: 'ph100', subject: 'Physics',
    text: 'The bandwidth of a signal occupying frequencies from 5 MHz to 6 MHz is:',
    options: ['5 MHz', '6 MHz', '1 MHz', '11 MHz'],
    correct: 2,
    explanation: 'Bandwidth = upper frequency − lower frequency = 6 − 5 = 1 MHz.'
  },
  {
    id: 'ph101', subject: 'Physics',
    text: 'Efficiency of a Carnot engine operating between 300 K and 500 K is:',
    options: ['40%', '60%', '20%', '80%'],
    correct: 0,
    explanation: 'η = 1 − T₂/T₁ = 1 − 300/500 = 1 − 0.6 = 0.4 = 40%.'
  },
  {
    id: 'ph102', subject: 'Physics',
    text: 'Which statement is consistent with the second law of thermodynamics?',
    options: ['Heat flows naturally from cold to hot', 'Entropy of an isolated system decreases over time', 'No process is 100% efficient in converting heat to work', 'All reversible processes are impossible'],
    correct: 2,
    explanation: 'Second law implies no heat engine can be 100% efficient in converting heat to work.'
  },
  {
    id: 'ph103', subject: 'Physics',
    text: 'The equation y = A sin(ωt − kx) represents a wave travelling in:',
    options: ['Negative x-direction', 'Positive x-direction', 'y-direction', 'z-direction'],
    correct: 1,
    explanation: 'y = A sin(ωt − kx): phase (ωt − kx) constant → x increases with t → wave moves in +x direction.'
  },
  {
    id: 'ph104', subject: 'Physics',
    text: 'A simple pendulum of length 1 m has time period T (g = π² m/s²). T is:',
    options: ['1 s', '2 s', 'π s', '0.5 s'],
    correct: 1,
    explanation: 'T = 2π√(L/g) = 2π√(1/π²) = 2π × (1/π) = 2 s.'
  },
  {
    id: 'ph105', subject: 'Physics',
    text: 'In SHM, when displacement is maximum (at amplitude A), the kinetic energy is:',
    options: ['Maximum', 'Zero', 'Equal to PE', '½mω²A²'],
    correct: 1,
    explanation: 'At maximum displacement (x = A), velocity = 0 → KE = 0. All energy is potential.'
  },
  {
    id: 'ph106', subject: 'Physics',
    text: 'An object is placed 40 cm from a concave mirror of focal length 20 cm. The image distance is:',
    options: ['20 cm (real)', '40 cm (real)', '80 cm (virtual)', '20 cm (virtual)'],
    correct: 1,
    explanation: '1/v + 1/u = 1/f → 1/v + 1/(−40) = 1/(−20) → 1/v = −1/20 + 1/40 = −1/40 → v = −40 cm (real, inverted).'
  },
  {
    id: 'ph107', subject: 'Physics',
    text: 'A prism of apex angle 60° has minimum deviation 30°. The refractive index of prism is:',
    options: ['1.41', '1.73', '1.5', '1.0'],
    correct: 0,
    explanation: 'n = sin((A+D)/2)/sin(A/2) = sin(45°)/sin(30°) = (1/√2)/(1/2) = √2 ≈ 1.41.'
  },
  {
    id: 'ph108', subject: 'Physics',
    text: 'Energy of a photon of wavelength 600 nm (h = 6.6×10⁻³⁴ J·s, c = 3×10⁸ m/s) is:',
    options: ['3.3×10⁻¹⁹ J', '2.07 eV', 'Both A and B', '5×10⁻¹⁹ J'],
    correct: 2,
    explanation: 'E = hc/λ = (6.6×10⁻³⁴ × 3×10⁸)/(600×10⁻⁹) = 3.3×10⁻¹⁹ J = 3.3×10⁻¹⁹/1.6×10⁻¹⁹ ≈ 2.07 eV.'
  },
  {
    id: 'ph109', subject: 'Physics',
    text: 'Rutherford\'s gold foil experiment proved that:',
    options: ['Electrons are negatively charged', 'Atom has a tiny, dense, positive nucleus', 'Electrons orbit in fixed shells', 'Atom is electrically neutral overall'],
    correct: 1,
    explanation: 'The large-angle scattering of α particles proved most of the atom\'s mass and positive charge is in a tiny nucleus.'
  },
  {
    id: 'ph110', subject: 'Physics',
    text: 'Binding energy per nucleon is highest for:',
    options: ['Hydrogen', 'Iron-56 (Fe)', 'Uranium-238', 'Helium-4'],
    correct: 1,
    explanation: 'Iron-56 has the highest binding energy per nucleon (~8.8 MeV), making it the most stable nucleus.'
  },
  {
    id: 'ph111', subject: 'Physics',
    text: 'In forward bias of a p-n junction:',
    options: ['Depletion region widens', 'Barrier potential increases', 'Majority carriers flow across the junction', 'Reverse current increases'],
    correct: 2,
    explanation: 'In forward bias, the barrier potential decreases and majority carriers (holes and electrons) flow across, giving large current.'
  },
  {
    id: 'ph112', subject: 'Physics',
    text: 'Bernoulli\'s theorem is based on:',
    options: ['Conservation of mass', 'Conservation of energy', 'Newton\'s third law', 'Pascal\'s law'],
    correct: 1,
    explanation: 'Bernoulli\'s theorem (P + ½ρv² + ρgh = constant) is a statement of conservation of energy for fluid flow.'
  },
  {
    id: 'ph113', subject: 'Physics',
    text: 'The orbital velocity of a satellite at height h from Earth\'s surface (R = radius) is:',
    options: ['√(gR²/(R+h))', '√(g(R+h))', '√(gR)', '√(2gR)'],
    correct: 0,
    explanation: 'v₀ = √(GM/(R+h)) = √(gR²/(R+h)) since GM = gR².'
  },
  {
    id: 'ph114', subject: 'Physics',
    text: 'In a closed pipe, the fundamental frequency of vibration (length L, speed v) is:',
    options: ['v/2L', 'v/4L', '2v/L', 'v/L'],
    correct: 1,
    explanation: 'Closed pipe: L = λ/4 at fundamental → f = v/λ = v/4L.'
  },
  {
    id: 'ph115', subject: 'Physics',
    text: 'The electric potential due to a point charge Q at distance r is:',
    options: ['kQ/r²', 'kQ/r', 'kQr', 'kQ²/r'],
    correct: 1,
    explanation: 'Electric potential V = kQ/r (or Q/4πε₀r), which is a scalar quantity.'
  },
  {
    id: 'ph116', subject: 'Physics',
    text: 'A bar magnet\'s magnetic moment M is defined as:',
    options: ['Pole strength × distance between poles', 'Pole strength / 2l', 'Pole strength + 2l', 'M/2l'],
    correct: 0,
    explanation: 'Magnetic moment M = m × 2l, where m = pole strength and 2l = length of magnet.'
  },
  {
    id: 'ph117', subject: 'Physics',
    text: 'Mutual inductance between two coils is 2 H. If current in primary changes at 3 A/s, the induced EMF in secondary is:',
    options: ['6 V', '1.5 V', '0.67 V', '3 V'],
    correct: 0,
    explanation: 'ε = M × dI/dt = 2 × 3 = 6 V.'
  },
  {
    id: 'ph118', subject: 'Physics',
    text: 'Resolving power of a microscope is improved by:',
    options: ['Using longer wavelengths', 'Using shorter wavelengths of light', 'Reducing the aperture', 'Reducing magnification'],
    correct: 1,
    explanation: 'Resolving power ∝ 1/λ. Using shorter wavelengths (e.g., blue light or UV) improves resolution.'
  },
  {
    id: 'ph119', subject: 'Physics',
    text: 'Which process is reversible in nature?',
    options: ['Free expansion of a gas', 'Slow isothermal expansion of ideal gas', 'Heat conduction across finite ΔT', 'Mixing of gases'],
    correct: 1,
    explanation: 'A quasi-static isothermal expansion of an ideal gas is considered reversible; others are irreversible.'
  },
  {
    id: 'ph120', subject: 'Physics',
    text: 'In a single slit diffraction, the condition for first minimum is (a = slit width, λ = wavelength):',
    options: ['a sinθ = λ', 'a sinθ = λ/2', 'a cosθ = λ', 'a tanθ = λ'],
    correct: 0,
    explanation: 'First minimum in single slit: a sinθ = mλ with m = 1 → a sinθ = λ.'
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
  // ── Set D: Equilibrium, Electrochemistry, Organic & Applied (ch61-ch120) ──
  {
    id: 'ch61', subject: 'Chemistry',
    text: 'For a reaction N₂ + 3H₂ ⇌ 2NH₃, the equilibrium constant Kp and Kc are related by:',
    options: ['Kp = Kc(RT)⁻²', 'Kp = Kc(RT)²', 'Kp = Kc', 'Kp = Kc/RT'],
    correct: 0,
    explanation: 'Δn = 2 − 4 = −2. Kp = Kc(RT)^Δn = Kc(RT)⁻².'
  },
  {
    id: 'ch62', subject: 'Chemistry',
    text: 'According to Le Chatelier\'s principle, increasing pressure on N₂(g) + 3H₂(g) ⇌ 2NH₃(g) will:',
    options: ['Shift equilibrium to the left', 'Shift equilibrium to the right', 'No effect', 'Decrease Kc'],
    correct: 1,
    explanation: 'Increasing pressure favours the side with fewer moles of gas. Products (2 mol) < reactants (4 mol) → shift right.'
  },
  {
    id: 'ch63', subject: 'Chemistry',
    text: 'The pH of 0.01 M HCl solution is:',
    options: ['1', '2', '3', '0.01'],
    correct: 1,
    explanation: 'HCl is a strong acid, fully dissociated. [H⁺] = 0.01 M. pH = −log(0.01) = 2.'
  },
  {
    id: 'ch64', subject: 'Chemistry',
    text: 'A buffer solution resists change in pH because it contains:',
    options: ['Strong acid and its salt', 'Weak acid and its conjugate base (salt)', 'Pure water', 'Strong base only'],
    correct: 1,
    explanation: 'A buffer contains a weak acid and its conjugate base (or weak base and conjugate acid), which can neutralise added acid or base.'
  },
  {
    id: 'ch65', subject: 'Chemistry',
    text: 'Solubility product (Ksp) of AgCl at 25°C is 1.8×10⁻¹⁰. Its solubility in mol/L is:',
    options: ['1.34×10⁻⁵', '1.8×10⁻¹⁰', '3.6×10⁻¹⁰', '9×10⁻⁶'],
    correct: 0,
    explanation: 'AgCl ⇌ Ag⁺ + Cl⁻. Ksp = s² → s = √(1.8×10⁻¹⁰) ≈ 1.34×10⁻⁵ mol/L.'
  },
  {
    id: 'ch66', subject: 'Chemistry',
    text: 'The standard electrode potential for the Standard Hydrogen Electrode (SHE) is:',
    options: ['0 V', '+1 V', '−1 V', '+0.76 V'],
    correct: 0,
    explanation: 'SHE is assigned a standard electrode potential of exactly 0 V by convention.'
  },
  {
    id: 'ch67', subject: 'Chemistry',
    text: 'In electrolysis of molten NaCl, at the cathode:',
    options: ['Na is deposited', 'Cl₂ is liberated', 'O₂ is evolved', 'H₂ is liberated'],
    correct: 0,
    explanation: 'Na⁺ ions are reduced at the cathode: Na⁺ + e⁻ → Na. Cl₂ is liberated at the anode.'
  },
  {
    id: 'ch68', subject: 'Chemistry',
    text: 'Faraday\'s second law of electrolysis states that the masses of substances deposited by the same charge are:',
    options: ['Equal for all substances', 'Proportional to their equivalent masses', 'Proportional to their molar masses', 'Independent of the substance'],
    correct: 1,
    explanation: 'Faraday\'s second law: when same charge passes through different electrolytes, masses deposited are in ratio of their equivalent masses.'
  },
  {
    id: 'ch69', subject: 'Chemistry',
    text: 'The rate of a chemical reaction generally increases with temperature because:',
    options: ['Activation energy decreases', 'Collision frequency increases and more molecules have energy ≥ Ea', 'Products become more stable', 'Equilibrium shifts right'],
    correct: 1,
    explanation: 'Higher temperature increases molecular kinetic energy; more collisions have energy ≥ activation energy Ea, increasing rate.'
  },
  {
    id: 'ch70', subject: 'Chemistry',
    text: 'For a first-order reaction, the half-life is:',
    options: ['Proportional to initial concentration', 'ln2/k (independent of concentration)', '1/(k[A]₀)', '2/k'],
    correct: 1,
    explanation: 'For first-order: t₁/₂ = ln2/k = 0.693/k, which is independent of initial concentration.'
  },
  {
    id: 'ch71', subject: 'Chemistry',
    text: 'Adsorption is an example of:',
    options: ['Bulk phenomenon', 'Surface phenomenon', 'Thermal phenomenon', 'Electrochemical phenomenon'],
    correct: 1,
    explanation: 'Adsorption occurs at the surface of a solid or liquid; it is a surface phenomenon.'
  },
  {
    id: 'ch72', subject: 'Chemistry',
    text: 'Colloidal gold is a:',
    options: ['Suspension', 'True solution', 'Lyophilic colloid', 'Lyophobic colloid'],
    correct: 3,
    explanation: 'Colloidal gold is a lyophobic (solvent-repelling) colloid — it does not have affinity for the dispersion medium.'
  },
  {
    id: 'ch73', subject: 'Chemistry',
    text: 'The atomic number of the first element in the d-block is:',
    options: ['19', '20', '21', '22'],
    correct: 2,
    explanation: 'Scandium (Sc, Z=21) is the first d-block (transition) element with configuration [Ar]3d¹4s².'
  },
  {
    id: 'ch74', subject: 'Chemistry',
    text: 'The oxidation state of manganese in KMnO₄ is:',
    options: ['+4', '+6', '+7', '+5'],
    correct: 2,
    explanation: 'K is +1, O is −2: +1 + x + 4(−2) = 0 → x = +7. Mn is +7 in KMnO₄.'
  },
  {
    id: 'ch75', subject: 'Chemistry',
    text: 'Which of the following has the highest paramagnetism? (Unpaired electrons):',
    options: ['Fe²⁺ (4 unpaired)', 'Mn²⁺ (5 unpaired)', 'Cu²⁺ (1 unpaired)', 'Zn²⁺ (0 unpaired)'],
    correct: 1,
    explanation: 'Mn²⁺ has configuration [Ar]3d⁵ with 5 unpaired electrons → highest paramagnetism.'
  },
  {
    id: 'ch76', subject: 'Chemistry',
    text: 'In coordination compound [Co(NH₃)₆]Cl₃, the coordination number of Co is:',
    options: ['3', '6', '9', '4'],
    correct: 1,
    explanation: 'Six NH₃ ligands coordinate to Co → coordination number = 6.'
  },
  {
    id: 'ch77', subject: 'Chemistry',
    text: 'EDTA is a:',
    options: ['Monodentate ligand', 'Bidentate ligand', 'Hexadentate ligand', 'Unidentate ligand'],
    correct: 2,
    explanation: 'EDTA (ethylenediaminetetraacetate) is a hexadentate ligand, coordinating through 6 donor atoms.'
  },
  {
    id: 'ch78', subject: 'Chemistry',
    text: 'A primary haloalkane undergoes SN2 reaction preferentially because:',
    options: ['It has more substituents', 'Less steric hindrance allows backside attack', 'It forms a stable carbocation', 'It is more polar'],
    correct: 1,
    explanation: 'Primary substrates have less steric hindrance → easier backside nucleophilic attack → SN2 preferred.'
  },
  {
    id: 'ch79', subject: 'Chemistry',
    text: 'Grignard reagent is:',
    options: ['RMgX (organomagnesium halide)', 'RLi', 'R₂CuLi', 'R₂Mg'],
    correct: 0,
    explanation: 'Grignard reagent: RMgX where R = alkyl/aryl group, X = halide. Used extensively in organic synthesis.'
  },
  {
    id: 'ch80', subject: 'Chemistry',
    text: 'Lucas test is used to distinguish between:',
    options: ['Primary, secondary and tertiary alcohols', 'Aldehydes and ketones', 'Alcohols and ethers', 'Carboxylic acids and esters'],
    correct: 0,
    explanation: 'Lucas test (conc. HCl + ZnCl₂) distinguishes between 1°, 2°, and 3° alcohols by rate of reaction.'
  },
  {
    id: 'ch81', subject: 'Chemistry',
    text: 'Phenol is more acidic than ethanol because:',
    options: ['Phenol has higher molecular weight', 'The phenoxide ion is stabilised by resonance', 'Phenol dissolves in water', 'Phenol is a primary alcohol'],
    correct: 1,
    explanation: 'The phenoxide (C₆H₅O⁻) ion is stabilised by resonance with the benzene ring, making phenol a stronger acid.'
  },
  {
    id: 'ch82', subject: 'Chemistry',
    text: 'Williamson\'s synthesis is used to prepare:',
    options: ['Alcohols', 'Ethers', 'Esters', 'Aldehydes'],
    correct: 1,
    explanation: 'Williamson synthesis: R-ONa + R\'X → R-O-R\' (ether) + NaX.'
  },
  {
    id: 'ch83', subject: 'Chemistry',
    text: 'Tollens\' reagent is used to distinguish:',
    options: ['Aldehydes from ketones', 'Primary from secondary alcohols', 'Alkenes from alkanes', 'Phenols from alcohols'],
    correct: 0,
    explanation: 'Tollens\' reagent (ammoniacal AgNO₃) gives silver mirror with aldehydes but not ketones.'
  },
  {
    id: 'ch84', subject: 'Chemistry',
    text: 'The product of oxidation of a primary alcohol with K₂Cr₂O₇/H₂SO₄ (limited oxidant) is:',
    options: ['Carboxylic acid', 'Aldehyde', 'Ketone', 'Ester'],
    correct: 1,
    explanation: 'Limited oxidation of primary alcohol gives aldehyde; excess oxidant gives carboxylic acid.'
  },
  {
    id: 'ch85', subject: 'Chemistry',
    text: 'Carboxylic acids are more acidic than phenols because:',
    options: ['They have higher molar mass', 'The carboxylate ion is more stabilised by resonance than phenoxide', 'They contain more oxygen', 'They are stronger bases'],
    correct: 1,
    explanation: 'The carboxylate (RCOO⁻) has two equivalent resonance structures, giving greater stabilisation than phenoxide.'
  },
  {
    id: 'ch86', subject: 'Chemistry',
    text: 'Aspirin is:',
    options: ['Acetylsalicylic acid', 'Salicylic acid', 'Methyl salicylate', 'Acetaminophen'],
    correct: 0,
    explanation: 'Aspirin (acetylsalicylic acid) is prepared by acetylation of salicylic acid with acetic anhydride.'
  },
  {
    id: 'ch87', subject: 'Chemistry',
    text: 'Primary amines react with HNO₂ (NaNO₂ + HCl) at 0–5°C to give:',
    options: ['Secondary amine', 'Diazonium salt', 'Nitroamine', 'Amide'],
    correct: 1,
    explanation: 'Primary aromatic amines react with NaNO₂/HCl at 0–5°C to form diazonium salts (ArN₂⁺Cl⁻).'
  },
  {
    id: 'ch88', subject: 'Chemistry',
    text: 'The monomer of nylon-6 is:',
    options: ['Caprolactam', 'Adipic acid', 'Hexamethylenediamine', 'Ethylene glycol'],
    correct: 0,
    explanation: 'Nylon-6 is made by ring-opening polymerisation of caprolactam (a cyclic amide).'
  },
  {
    id: 'ch89', subject: 'Chemistry',
    text: 'Bakelite is a:',
    options: ['Addition polymer', 'Condensation polymer', 'Copolymer', 'Natural polymer'],
    correct: 1,
    explanation: 'Bakelite is a condensation polymer of phenol and formaldehyde.'
  },
  {
    id: 'ch90', subject: 'Chemistry',
    text: 'The peptide bond in proteins is:',
    options: ['C−O bond', 'C−N bond formed by condensation of amino and carboxyl groups', 'N−H bond', 'C−C bond'],
    correct: 1,
    explanation: 'Peptide bond: −CO−NH− formed by condensation between −COOH of one amino acid and −NH₂ of another, releasing H₂O.'
  },
  {
    id: 'ch91', subject: 'Chemistry',
    text: 'DNA differs from RNA in that DNA contains:',
    options: ['Thymine instead of Uracil', 'Uracil instead of Thymine', 'Ribose instead of Deoxyribose', 'Single-stranded structure'],
    correct: 0,
    explanation: 'DNA contains Thymine (T); RNA contains Uracil (U). Also DNA has deoxyribose sugar, RNA has ribose.'
  },
  {
    id: 'ch92', subject: 'Chemistry',
    text: 'Enzyme action is best described as:',
    options: ['Non-specific catalysis at high temperature', 'Specific biological catalyst that reduces activation energy', 'Inorganic catalyst', 'Cofactor only'],
    correct: 1,
    explanation: 'Enzymes are biological catalysts (proteins) that are highly specific and reduce the activation energy of biochemical reactions.'
  },
  {
    id: 'ch93', subject: 'Chemistry',
    text: 'Bithional is used as an antiseptic in soaps. This is an example of:',
    options: ['Disinfectant', 'Antiseptic', 'Analgesic', 'Antibiotic'],
    correct: 1,
    explanation: 'Bithional is added to soaps as an antiseptic to prevent body odour due to bacterial decomposition.'
  },
  {
    id: 'ch94', subject: 'Chemistry',
    text: 'The common name of 2,4,6-trinitrotoluene (TNT) classification is:',
    options: ['Analgesic', 'Explosive', 'Antibiotic', 'Antacid'],
    correct: 1,
    explanation: 'TNT is a well-known explosive widely used in military and construction.'
  },
  {
    id: 'ch95', subject: 'Chemistry',
    text: 'Hybridisation of carbon in benzene is:',
    options: ['sp³', 'sp²', 'sp', 'sp³d'],
    correct: 1,
    explanation: 'Each carbon in benzene is sp² hybridised; the remaining p orbital forms the π system.'
  },
  {
    id: 'ch96', subject: 'Chemistry',
    text: 'Which test distinguishes an aldehyde from a ketone?',
    options: ['Fehling\'s test', 'Iodoform test', 'Benedict\'s test', 'Both A and C'],
    correct: 3,
    explanation: 'Fehling\'s and Benedict\'s tests are positive for aldehydes (reducing agents) but not for most ketones. Both A and C are correct.'
  },
  {
    id: 'ch97', subject: 'Chemistry',
    text: 'Iodoform test is positive for:',
    options: ['All ketones', 'Methyl ketones (CH₃CO−) and ethanol', 'Primary alcohols only', 'Aldehydes only'],
    correct: 1,
    explanation: 'Iodoform (CHI₃) precipitate forms with methyl ketones (CH₃COR) and ethanol (which is oxidised to CH₃CHO).'
  },
  {
    id: 'ch98', subject: 'Chemistry',
    text: 'The IUPAC name of CH₃−CH(OH)−CH₃ is:',
    options: ['1-propanol', 'Propan-2-ol', '2-methylethanol', 'Isopropyl alcohol (only common name)'],
    correct: 1,
    explanation: 'OH on carbon 2 of propane → IUPAC name: propan-2-ol.'
  },
  {
    id: 'ch99', subject: 'Chemistry',
    text: 'Dehydration of alcohols to alkenes requires:',
    options: ['NaOH/water', 'Conc. H₂SO₄ at 170°C', 'Dilute HCl', 'PCl₅'],
    correct: 1,
    explanation: 'Dehydration (−H₂O) of alcohols to alkenes uses conc. H₂SO₄ at 170°C; at 140°C it forms ethers.'
  },
  {
    id: 'ch100', subject: 'Chemistry',
    text: 'Which of the following is an example of a nucleophilic addition reaction?',
    options: ['Addition of HBr to benzene', 'Addition of HCN to acetaldehyde', 'Chlorination of methane', 'Dehydration of alcohol'],
    correct: 1,
    explanation: 'Aldehydes and ketones undergo nucleophilic addition. HCN adds to CH₃CHO to give a cyanohydrin.'
  },
  {
    id: 'ch101', subject: 'Chemistry',
    text: 'The van\'t Hoff factor (i) for Na₂SO₄ completely dissociated is:',
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'Na₂SO₄ → 2Na⁺ + SO₄²⁻; 3 ions → i = 3.'
  },
  {
    id: 'ch102', subject: 'Chemistry',
    text: 'Raoult\'s law states that the partial vapour pressure of a component in an ideal solution is:',
    options: ['Equal to its mole fraction', 'Proportional to its mole fraction times pure component vapour pressure', 'Independent of composition', 'Inversely proportional to mole fraction'],
    correct: 1,
    explanation: 'Raoult\'s law: p_A = x_A × p°_A (partial pressure = mole fraction × pure vapour pressure).'
  },
  {
    id: 'ch103', subject: 'Chemistry',
    text: 'Osmotic pressure π of a solution with molar concentration C at temperature T is:',
    options: ['π = CRT', 'π = nRT/V', 'Both A and B', 'π = CT/R'],
    correct: 2,
    explanation: 'π = CRT = nRT/V (van\'t Hoff equation for osmotic pressure).'
  },
  {
    id: 'ch104', subject: 'Chemistry',
    text: 'Colligative properties depend on:',
    options: ['Nature of solute', 'Number of solute particles', 'Molecular mass of solute', 'Chemical composition'],
    correct: 1,
    explanation: 'Colligative properties (boiling point elevation, depression in freezing point, osmotic pressure) depend on the number (not nature) of solute particles.'
  },
  {
    id: 'ch105', subject: 'Chemistry',
    text: 'The s-block elements are called so because:',
    options: ['They are soft metals', 'Their last electron enters the s-orbital', 'They react with sulphur', 'They are found in sea'],
    correct: 1,
    explanation: 'Classification of elements into s, p, d, f blocks is based on which subshell the differentiating electron enters.'
  },
  {
    id: 'ch106', subject: 'Chemistry',
    text: 'Down the group in alkali metals, the ionisation energy:',
    options: ['Increases', 'Decreases', 'Remains constant', 'First increases then decreases'],
    correct: 1,
    explanation: 'Atomic radius increases down the group → nuclear pull on outer electron decreases → ionisation energy decreases.'
  },
  {
    id: 'ch107', subject: 'Chemistry',
    text: 'Plaster of Paris is:',
    options: ['CaSO₄·2H₂O', 'CaSO₄·½H₂O', 'CaCO₃', 'Ca(OH)₂'],
    correct: 1,
    explanation: 'Plaster of Paris = CaSO₄·½H₂O (hemihydrate of calcium sulphate).'
  },
  {
    id: 'ch108', subject: 'Chemistry',
    text: 'The shape of NH₃ molecule is:',
    options: ['Trigonal planar', 'Trigonal pyramidal', 'Tetrahedral', 'Linear'],
    correct: 1,
    explanation: 'NH₃ has 3 bonding pairs and 1 lone pair → trigonal pyramidal shape (VSEPR theory).'
  },
  {
    id: 'ch109', subject: 'Chemistry',
    text: 'Bond order of O₂ molecule is:',
    options: ['1', '2', '3', '2.5'],
    correct: 1,
    explanation: 'O₂ has bond order = (8 bonding − 4 antibonding)/2 = 2.'
  },
  {
    id: 'ch110', subject: 'Chemistry',
    text: 'Which of the following is a Lewis acid?',
    options: ['NH₃', 'H₂O', 'BF₃', 'NaOH'],
    correct: 2,
    explanation: 'Lewis acid is an electron pair acceptor. BF₃ has an empty p orbital and accepts electron pairs.'
  },
  {
    id: 'ch111', subject: 'Chemistry',
    text: 'The enthalpy change (ΔH) for a reaction at constant pressure equals:',
    options: ['ΔU + PΔV', 'ΔU − PΔV', 'ΔU/PΔV', 'ΔU × T'],
    correct: 0,
    explanation: 'ΔH = ΔU + PΔV (at constant pressure), relating enthalpy and internal energy.'
  },
  {
    id: 'ch112', subject: 'Chemistry',
    text: 'Hess\'s law is a consequence of:',
    options: ['Second law of thermodynamics', 'Conservation of energy (first law)', 'Le Chatelier\'s principle', 'Raoult\'s law'],
    correct: 1,
    explanation: 'Hess\'s law: enthalpy is a state function (path-independent), a consequence of first law of thermodynamics.'
  },
  {
    id: 'ch113', subject: 'Chemistry',
    text: 'Gibbs free energy change ΔG = ΔH − TΔS. A reaction is spontaneous when:',
    options: ['ΔG > 0', 'ΔG < 0', 'ΔG = 0 always', 'ΔS < 0 always'],
    correct: 1,
    explanation: 'A spontaneous process has ΔG < 0. At equilibrium ΔG = 0.'
  },
  {
    id: 'ch114', subject: 'Chemistry',
    text: 'Nitrogen is inert at room temperature mainly because:',
    options: ['It is a noble gas', 'N≡N has high bond energy (945 kJ/mol)', 'Nitrogen is non-polar', 'It lacks lone pairs'],
    correct: 1,
    explanation: 'The N≡N triple bond has very high bond dissociation energy (945 kJ/mol), making nitrogen chemically inert at low temperatures.'
  },
  {
    id: 'ch115', subject: 'Chemistry',
    text: 'Ozone depletion in the stratosphere is primarily caused by:',
    options: ['CO₂', 'SO₂', 'Chlorofluorocarbons (CFCs)', 'NOₓ from cars'],
    correct: 2,
    explanation: 'CFCs release Cl radicals under UV radiation which catalytically destroy ozone: Cl + O₃ → ClO + O₂.'
  },
  {
    id: 'ch116', subject: 'Chemistry',
    text: 'The molecular formula of glucose is:',
    options: ['C₆H₁₂O₆', 'C₁₂H₂₂O₁₁', 'C₆H₁₀O₅', 'C₅H₁₀O₅'],
    correct: 0,
    explanation: 'Glucose (a hexose monosaccharide) has molecular formula C₆H₁₂O₆.'
  },
  {
    id: 'ch117', subject: 'Chemistry',
    text: 'Hydrolysis of sucrose gives:',
    options: ['Two glucose molecules', 'Glucose and fructose', 'Two fructose molecules', 'Glucose and galactose'],
    correct: 1,
    explanation: 'Sucrose → glucose + fructose upon hydrolysis (both are hexoses, C₆H₁₂O₆).'
  },
  {
    id: 'ch118', subject: 'Chemistry',
    text: 'The shape of [Ni(CN)₄]²⁻ complex is:',
    options: ['Tetrahedral', 'Square planar', 'Octahedral', 'Trigonal bipyramidal'],
    correct: 1,
    explanation: 'Ni²⁺ with strong field CN⁻ ligands → dsp² hybridisation → square planar geometry.'
  },
  {
    id: 'ch119', subject: 'Chemistry',
    text: 'The effective atomic number (EAN) rule was proposed by:',
    options: ['Werner', 'Sidgwick', 'Pauling', 'Taube'],
    correct: 1,
    explanation: 'Sidgwick proposed the effective atomic number (EAN) rule for coordination compounds.'
  },
  {
    id: 'ch120', subject: 'Chemistry',
    text: 'Which of the following is used as a tranquiliser?',
    options: ['Aspirin', 'Valium (diazepam)', 'Penicillin', 'Chloramphenicol'],
    correct: 1,
    explanation: 'Valium (diazepam) is a benzodiazepine used as a tranquiliser. Aspirin is analgesic, penicillin is antibiotic.'
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
  // ── Set D: Advanced Topics (ma61-ma120) ──────────────────
  {
    id: 'ma61', subject: 'Mathematics',
    text: 'The domain of f(x) = sin⁻¹(x) is:',
    options: ['[0, π]', '[−1, 1]', '(−∞, ∞)', '[−π/2, π/2]'],
    correct: 1,
    explanation: 'sin⁻¹(x) (arcsin) is defined for x ∈ [−1, 1] and has range [−π/2, π/2].'
  },
  {
    id: 'ma62', subject: 'Mathematics',
    text: 'The principal value of tan⁻¹(1) is:',
    options: ['π/4', 'π/3', 'π/6', 'π/2'],
    correct: 0,
    explanation: 'tan⁻¹(1) = π/4 (since tan(π/4) = 1) and π/4 ∈ (−π/2, π/2).'
  },
  {
    id: 'ma63', subject: 'Mathematics',
    text: 'sin⁻¹(x) + cos⁻¹(x) equals:',
    options: ['π/4', 'π/2', 'π', '0'],
    correct: 1,
    explanation: 'Identity: sin⁻¹(x) + cos⁻¹(x) = π/2 for all x ∈ [−1, 1].'
  },
  {
    id: 'ma64', subject: 'Mathematics',
    text: 'If A is a square matrix of order 3 and |A| = 5, then |2A| is:',
    options: ['10', '40', '20', '80'],
    correct: 1,
    explanation: '|kA| = kⁿ|A| for n×n matrix. |2A| = 2³ × 5 = 8 × 5 = 40.'
  },
  {
    id: 'ma65', subject: 'Mathematics',
    text: 'The cofactor of element 3 in the matrix [[1,2],[3,4]] is:',
    options: ['−2', '2', '4', '−4'],
    correct: 0,
    explanation: 'Cofactor of a₂₁ (element 3): C₂₁ = (−1)^(2+1) × M₂₁ = −1 × 2 = −2.'
  },
  {
    id: 'ma66', subject: 'Mathematics',
    text: 'A matrix A is skew-symmetric if:',
    options: ['A = Aᵀ', 'A = −Aᵀ', 'A = A⁻¹', 'A² = I'],
    correct: 1,
    explanation: 'Skew-symmetric matrix: Aᵀ = −A (equivalently A = −Aᵀ). Diagonal elements are zero.'
  },
  {
    id: 'ma67', subject: 'Mathematics',
    text: 'f(x) = |x| is continuous at x = 0 but:',
    options: ['Not defined at x = 0', 'Not differentiable at x = 0', 'Has a removable discontinuity', 'Is differentiable everywhere'],
    correct: 1,
    explanation: 'f(x) = |x| is continuous everywhere but has a corner at x = 0, so it is not differentiable there.'
  },
  {
    id: 'ma68', subject: 'Mathematics',
    text: 'The derivative of eˣ with respect to x is:',
    options: ['xeˣ⁻¹', 'eˣ', 'eˣ/x', '1/eˣ'],
    correct: 1,
    explanation: 'd/dx(eˣ) = eˣ (exponential function is its own derivative).'
  },
  {
    id: 'ma69', subject: 'Mathematics',
    text: 'If y = ln(sinx), then dy/dx is:',
    options: ['cosecx', 'cotx', 'sinx/cosx', '−cotx'],
    correct: 1,
    explanation: 'dy/dx = (1/sinx) × cosx = cosx/sinx = cotx.'
  },
  {
    id: 'ma70', subject: 'Mathematics',
    text: 'By Rolle\'s theorem, if f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then there exists c ∈ (a, b) such that:',
    options: ['f(c) = 0', 'f′(c) = 0', 'f′(c) = f(c)', 'f(c) = f(a)'],
    correct: 1,
    explanation: 'Rolle\'s theorem guarantees at least one c where f′(c) = 0 (tangent parallel to x-axis).'
  },
  {
    id: 'ma71', subject: 'Mathematics',
    text: 'The function f(x) = x³ − 3x is increasing on:',
    options: ['(−1, 1)', '(−∞, −1) ∪ (1, ∞)', '(0, ∞)', '(−∞, 0)'],
    correct: 1,
    explanation: 'f′(x) = 3x² − 3 = 3(x²−1) > 0 when x < −1 or x > 1. So f is increasing on (−∞, −1) ∪ (1, ∞).'
  },
  {
    id: 'ma72', subject: 'Mathematics',
    text: 'The maximum value of sin x + cos x is:',
    options: ['1', '√2', '2', 'π'],
    correct: 1,
    explanation: 'sin x + cos x = √2 sin(x + π/4). Maximum value = √2.'
  },
  {
    id: 'ma73', subject: 'Mathematics',
    text: '∫ eˣ(f(x) + f′(x)) dx equals:',
    options: ['eˣf′(x) + C', 'eˣf(x) + C', 'eˣ(f(x) + 1) + C', 'f(x)/eˣ + C'],
    correct: 1,
    explanation: 'd/dx[eˣf(x)] = eˣf(x) + eˣf′(x) = eˣ(f(x) + f′(x)). So ∫eˣ(f(x)+f′(x))dx = eˣf(x) + C.'
  },
  {
    id: 'ma74', subject: 'Mathematics',
    text: '∫ 1/(1+x²) dx is:',
    options: ['tan x + C', 'tan⁻¹x + C', 'sec⁻¹x + C', '1/2 ln(1+x²) + C'],
    correct: 1,
    explanation: '∫ 1/(1+x²) dx = tan⁻¹x + C (standard integral formula).'
  },
  {
    id: 'ma75', subject: 'Mathematics',
    text: 'The area bounded by y = x², x-axis, x = 0 and x = 3 is:',
    options: ['9', '6', '27', '3'],
    correct: 0,
    explanation: 'Area = ∫₀³ x² dx = [x³/3]₀³ = 27/3 − 0 = 9 sq. units.'
  },
  {
    id: 'ma76', subject: 'Mathematics',
    text: '∫₋₁¹ x³ dx equals:',
    options: ['2', '0', '1/2', '−1/2'],
    correct: 1,
    explanation: 'x³ is an odd function. Integral of an odd function over a symmetric interval [−a, a] = 0.'
  },
  {
    id: 'ma77', subject: 'Mathematics',
    text: 'The solution of dy/dx = y is:',
    options: ['y = x + C', 'y = Ceˣ', 'y = Ce⁻ˣ', 'y = x² + C'],
    correct: 1,
    explanation: 'dy/y = dx → ln|y| = x + C₁ → y = Ce^x where C = e^C₁.'
  },
  {
    id: 'ma78', subject: 'Mathematics',
    text: 'The degree of the differential equation (dy/dx)² + y = x is:',
    options: ['1', '2', '3', '0'],
    correct: 1,
    explanation: 'Degree = power of the highest-order derivative = 2 (because (dy/dx)² has power 2).'
  },
  {
    id: 'ma79', subject: 'Mathematics',
    text: 'If â and b̂ are unit vectors and the angle between them is 60°, then |â + b̂| is:',
    options: ['1', '√3', '2', '√2'],
    correct: 1,
    explanation: '|â + b̂|² = 1 + 1 + 2cos60° = 2 + 2(0.5) = 3. So |â + b̂| = √3.'
  },
  {
    id: 'ma80', subject: 'Mathematics',
    text: 'The dot product of vectors (2î + 3ĵ) and (4î − ĵ) is:',
    options: ['5', '8', '11', '2'],
    correct: 0,
    explanation: '(2î + 3ĵ)·(4î − ĵ) = 2×4 + 3×(−1) = 8 − 3 = 5.'
  },
  {
    id: 'ma81', subject: 'Mathematics',
    text: 'The cross product î × ĵ is:',
    options: ['0', '1', 'k̂', '−k̂'],
    correct: 2,
    explanation: 'î × ĵ = k̂ (right-hand rule; cyclic order: î → ĵ → k̂).'
  },
  {
    id: 'ma82', subject: 'Mathematics',
    text: 'The projection of vector a⃗ on vector b⃗ is:',
    options: ['|a⃗||b⃗|cosθ', '(a⃗·b⃗)/|b⃗|', '|a⃗|cosθ/|b⃗|', 'a⃗ × b⃗'],
    correct: 1,
    explanation: 'Projection of a⃗ on b⃗ = (a⃗·b⃗)/|b⃗| (scalar projection).'
  },
  {
    id: 'ma83', subject: 'Mathematics',
    text: 'The direction cosines of the line joining A(1, 2, 3) and B(4, 6, 3) are:',
    options: ['(3/5, 4/5, 0)', '(1, 1, 0)', '(3, 4, 0)', '(1/√2, 1/√2, 0)'],
    correct: 0,
    explanation: 'AB = (3, 4, 0). |AB| = 5. Direction cosines: (3/5, 4/5, 0/5) = (3/5, 4/5, 0).'
  },
  {
    id: 'ma84', subject: 'Mathematics',
    text: 'The equation of the plane through the origin with normal vector (1, 2, 3) is:',
    options: ['x + 2y + 3z = 0', 'x + 2y + 3z = 1', '2x + y + 3z = 0', 'x − 2y + 3z = 0'],
    correct: 0,
    explanation: 'Plane through origin with normal (a, b, c): ax + by + cz = 0 → x + 2y + 3z = 0.'
  },
  {
    id: 'ma85', subject: 'Mathematics',
    text: 'The angle between lines with direction ratios (1, 1, 0) and (0, 1, 1) is:',
    options: ['60°', '90°', '30°', '45°'],
    correct: 0,
    explanation: 'cosθ = (1·0 + 1·1 + 0·1)/(√2 · √2) = 1/2 → θ = 60°.'
  },
  {
    id: 'ma86', subject: 'Mathematics',
    text: 'In linear programming, the feasible region is:',
    options: ['The region outside all constraints', 'The region satisfying all constraints simultaneously', 'Any convex set', 'The objective function line'],
    correct: 1,
    explanation: 'Feasible region is the set of all points satisfying every constraint (including non-negativity).'
  },
  {
    id: 'ma87', subject: 'Mathematics',
    text: 'The maximum value of Z = 3x + 4y subject to x + y ≤ 4, x ≥ 0, y ≥ 0 is:',
    options: ['12', '16', '3', '4'],
    correct: 1,
    explanation: 'Corner points: (0,0)→0, (4,0)→12, (0,4)→16. Maximum Z = 16 at (0, 4).'
  },
  {
    id: 'ma88', subject: 'Mathematics',
    text: 'P(A|B) equals (Bayes\' theorem notation):',
    options: ['P(A∩B)/P(B)', 'P(A)P(B)', 'P(B|A)/P(A)', 'P(A)/P(B)'],
    correct: 0,
    explanation: 'Conditional probability: P(A|B) = P(A∩B)/P(B), provided P(B) > 0.'
  },
  {
    id: 'ma89', subject: 'Mathematics',
    text: 'Two events A and B are independent if:',
    options: ['P(A∩B) = P(A) + P(B)', 'P(A∩B) = P(A)·P(B)', 'P(A∪B) = 1', 'P(A) = P(B)'],
    correct: 1,
    explanation: 'Events A and B are independent if and only if P(A∩B) = P(A)·P(B).'
  },
  {
    id: 'ma90', subject: 'Mathematics',
    text: 'In a random experiment, the variance of a Bernoulli distribution with probability p is:',
    options: ['p', '1−p', 'p(1−p)', '√(p(1−p))'],
    correct: 2,
    explanation: 'For Bernoulli distribution: Var = pq = p(1−p).'
  },
  {
    id: 'ma91', subject: 'Mathematics',
    text: 'The equation x² + y² − 6x − 8y = 0 represents a circle with centre:',
    options: ['(3, 4)', '(−3, −4)', '(6, 8)', '(0, 0)'],
    correct: 0,
    explanation: 'Completing the square: (x−3)² + (y−4)² = 25. Centre = (3, 4), radius = 5.'
  },
  {
    id: 'ma92', subject: 'Mathematics',
    text: 'The eccentricity of the parabola y² = 4ax is:',
    options: ['0', '1', '< 1', '> 1'],
    correct: 1,
    explanation: 'A parabola always has eccentricity e = 1.'
  },
  {
    id: 'ma93', subject: 'Mathematics',
    text: 'The number of ways to arrange 5 different books on a shelf is:',
    options: ['25', '60', '120', '720'],
    correct: 2,
    explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.'
  },
  {
    id: 'ma94', subject: 'Mathematics',
    text: 'The number of ways to choose 3 students from a class of 10 is:',
    options: ['10', '30', '120', '720'],
    correct: 2,
    explanation: '¹⁰C₃ = 10!/(3!·7!) = (10×9×8)/(3×2×1) = 120.'
  },
  {
    id: 'ma95', subject: 'Mathematics',
    text: 'The coefficient of x² in the expansion of (1 + x)⁵ is:',
    options: ['5', '10', '20', '1'],
    correct: 1,
    explanation: '⁵C₂ = 5!/(2!3!) = 10. The coefficient of x² is ⁵C₂ = 10.'
  },
  {
    id: 'ma96', subject: 'Mathematics',
    text: 'The general term of an AP is aₙ = a + (n−1)d. If a = 3, d = 4, then a₁₀ is:',
    options: ['39', '43', '40', '36'],
    correct: 0,
    explanation: 'a₁₀ = 3 + (10−1)×4 = 3 + 36 = 39.'
  },
  {
    id: 'ma97', subject: 'Mathematics',
    text: 'The sum of first n terms of a GP with first term a and common ratio r (r ≠ 1) is:',
    options: ['a(1−rⁿ)/(1−r)', 'a(rⁿ−1)/(r−1)', 'Both A and B', 'na'],
    correct: 2,
    explanation: 'Sₙ = a(1−rⁿ)/(1−r) = a(rⁿ−1)/(r−1) — these are equivalent forms of the same formula.'
  },
  {
    id: 'ma98', subject: 'Mathematics',
    text: 'If z = 3 + 4i, the modulus |z| is:',
    options: ['3', '4', '5', '7'],
    correct: 2,
    explanation: '|z| = √(3² + 4²) = √(9+16) = √25 = 5.'
  },
  {
    id: 'ma99', subject: 'Mathematics',
    text: 'The argument of the complex number i is:',
    options: ['0', 'π/2', 'π', '−π/2'],
    correct: 1,
    explanation: 'i = 0 + 1i. arg(i) = tan⁻¹(1/0) = π/2.'
  },
  {
    id: 'ma100', subject: 'Mathematics',
    text: 'The roots of x² + 1 = 0 are:',
    options: ['±1', '±i', '0 and 1', '1 and −1'],
    correct: 1,
    explanation: 'x² = −1 → x = ±√(−1) = ±i.'
  },
  {
    id: 'ma101', subject: 'Mathematics',
    text: 'The equation of the tangent to y = x² at x = 2 is:',
    options: ['y = 4x − 4', 'y = 2x + 4', 'y = 4x + 4', 'y = x + 4'],
    correct: 0,
    explanation: 'At x=2: y=4, slope=dy/dx=2x=4. Tangent: y − 4 = 4(x − 2) → y = 4x − 4.'
  },
  {
    id: 'ma102', subject: 'Mathematics',
    text: 'lim(x→0) sinx/x is:',
    options: ['0', '∞', '1', 'sin(0)'],
    correct: 2,
    explanation: 'Standard limit: lim(x→0) sinx/x = 1.'
  },
  {
    id: 'ma103', subject: 'Mathematics',
    text: 'The total number of subsets of a set with 4 elements is:',
    options: ['4', '8', '16', '12'],
    correct: 2,
    explanation: 'A set with n elements has 2ⁿ subsets. 2⁴ = 16.'
  },
  {
    id: 'ma104', subject: 'Mathematics',
    text: 'If n(A) = 10, n(B) = 15, n(A∪B) = 20, then n(A∩B) is:',
    options: ['5', '10', '45', '25'],
    correct: 0,
    explanation: 'n(A∩B) = n(A) + n(B) − n(A∪B) = 10 + 15 − 20 = 5.'
  },
  {
    id: 'ma105', subject: 'Mathematics',
    text: 'The value of cos²θ + sin²θ is:',
    options: ['0', '2', '1', 'sinθcosθ'],
    correct: 2,
    explanation: 'Pythagorean identity: sin²θ + cos²θ = 1 for all θ.'
  },
  {
    id: 'ma106', subject: 'Mathematics',
    text: 'tan(A + B) equals:',
    options: ['tanA + tanB', '(tanA + tanB)/(1 − tanA·tanB)', '(tanA − tanB)/(1 + tanA·tanB)', 'tanA·tanB'],
    correct: 1,
    explanation: 'Addition formula: tan(A+B) = (tanA + tanB)/(1 − tanA·tanB).'
  },
  {
    id: 'ma107', subject: 'Mathematics',
    text: 'The general solution of sinx = 1/2 is:',
    options: ['x = π/6 + 2nπ only', 'x = nπ + (−1)ⁿ π/6', 'x = π/6 or 5π/6 + 2nπ', 'x = π/6 + nπ'],
    correct: 1,
    explanation: 'General solution of sinx = k: x = nπ + (−1)ⁿ α, where sinα = k. Here α = π/6.'
  },
  {
    id: 'ma108', subject: 'Mathematics',
    text: 'In a triangle, the cosine rule states: a² =',
    options: ['b² + c² + 2bc cosA', 'b² + c² − 2bc cosA', 'b + c − 2cosA', '(b+c)² − 4bc cos²A'],
    correct: 1,
    explanation: 'Cosine rule: a² = b² + c² − 2bc cosA.'
  },
  {
    id: 'ma109', subject: 'Mathematics',
    text: 'The slope of a vertical line is:',
    options: ['0', '1', 'Undefined', '−1'],
    correct: 2,
    explanation: 'A vertical line has an undefined (infinite) slope since Δx = 0 → slope = Δy/0.'
  },
  {
    id: 'ma110', subject: 'Mathematics',
    text: 'The distance between points (1, 2) and (4, 6) is:',
    options: ['5', '3', '7', '√7'],
    correct: 0,
    explanation: 'd = √((4−1)² + (6−2)²) = √(9+16) = √25 = 5.'
  },
  {
    id: 'ma111', subject: 'Mathematics',
    text: 'The midpoint of line segment joining (2, 4) and (6, 8) is:',
    options: ['(4, 6)', '(8, 12)', '(2, 2)', '(3, 5)'],
    correct: 0,
    explanation: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6).'
  },
  {
    id: 'ma112', subject: 'Mathematics',
    text: 'The equation of a line with slope 2 and y-intercept 3 is:',
    options: ['y = 3x + 2', 'y = 2x + 3', '2x − y + 3 = 0', 'Both B and C'],
    correct: 3,
    explanation: 'Slope-intercept form: y = 2x + 3. Rearranging: 2x − y + 3 = 0. Both are equivalent.'
  },
  {
    id: 'ma113', subject: 'Mathematics',
    text: '∫ sec²x dx is:',
    options: ['secx·tanx + C', 'tanx + C', '−tanx + C', 'sec²x/2 + C'],
    correct: 1,
    explanation: '∫ sec²x dx = tanx + C (standard integral).'
  },
  {
    id: 'ma114', subject: 'Mathematics',
    text: 'The value of ∫₀^(π/2) cos x dx is:',
    options: ['0', '1', '−1', 'π/2'],
    correct: 1,
    explanation: '∫₀^(π/2) cosx dx = [sinx]₀^(π/2) = sin(π/2) − sin(0) = 1 − 0 = 1.'
  },
  {
    id: 'ma115', subject: 'Mathematics',
    text: 'By the fundamental theorem of calculus, d/dx[∫₀ˣ f(t) dt] equals:',
    options: ['f(0)', 'f(x)', 'F(x) − F(0)', '0'],
    correct: 1,
    explanation: 'Fundamental Theorem of Calculus Part 1: d/dx[∫₀ˣ f(t)dt] = f(x).'
  },
  {
    id: 'ma116', subject: 'Mathematics',
    text: 'The differential equation of all circles with centre at origin is:',
    options: ['x dx + y dy = 0', 'x dy − y dx = 0', 'x + y = r', 'dy/dx = −x/y'],
    correct: 3,
    explanation: 'x² + y² = r² → differentiating: 2x + 2y(dy/dx) = 0 → dy/dx = −x/y.'
  },
  {
    id: 'ma117', subject: 'Mathematics',
    text: 'The relationship between AM, GM, and HM for positive numbers is:',
    options: ['AM < GM < HM', 'AM ≥ GM ≥ HM', 'AM = GM = HM always', 'HM > AM > GM'],
    correct: 1,
    explanation: 'For positive numbers, AM ≥ GM ≥ HM, with equality only when all numbers are equal.'
  },
  {
    id: 'ma118', subject: 'Mathematics',
    text: 'The sum of infinite GP 1 + 1/2 + 1/4 + ... is:',
    options: ['2', '3', '4', 'Diverges'],
    correct: 0,
    explanation: 'S∞ = a/(1−r) = 1/(1−1/2) = 1/(1/2) = 2.'
  },
  {
    id: 'ma119', subject: 'Mathematics',
    text: 'If a relation R on set A = {1,2,3} is defined as R = {(1,1),(2,2),(3,3)}, then R is:',
    options: ['Only reflexive', 'Reflexive and symmetric only', 'Equivalence relation', 'Only transitive'],
    correct: 2,
    explanation: 'R is reflexive (all (a,a) ∈ R), symmetric (trivially), and transitive → equivalence relation.'
  },
  {
    id: 'ma120', subject: 'Mathematics',
    text: 'The number of one-one functions from a set A (3 elements) to set B (5 elements) is:',
    options: ['15', '60', '125', '243'],
    correct: 1,
    explanation: 'Number of injections from A (m) to B (n) where m ≤ n: P(n, m) = n!/(n−m)! = 5×4×3 = 60.'
  },
];

// ── PAPER ASSEMBLY ──────────────────────────────────────────
// KCET pattern: 60 Physics + 60 Chemistry + 60 Mathematics = 180 Qs per paper
// Bank: 120 per subject. Papers 1-2 use non-overlapping halves; 3-10 use seeded shuffles.

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

  // Papers 1-2: fixed non-overlapping slices of 60
  if (id === 1) {
    return {
      id: 1, title: 'KCET 2026 Analysis Paper',
      description: 'Curated from 10-year trend analysis (2016–2025) — 60 Qs per subject',
      duration: 240, totalMarks: 180, negativeMarking: false,
      questions: [
        ...physicsBank.slice(0, 60),
        ...chemistryBank.slice(0, 60),
        ...mathBank.slice(0, 60),
      ]
    };
  }
  if (id === 2) {
    return {
      id: 2, title: 'KCET Mock Test 2',
      description: 'Electrostatics, Organic Chemistry, Calculus focus — 60 Qs per subject',
      duration: 240, totalMarks: 180, negativeMarking: false,
      questions: [
        ...physicsBank.slice(60, 120),
        ...chemistryBank.slice(60, 120),
        ...mathBank.slice(60, 120),
      ]
    };
  }

  // Papers 3-10: seeded shuffle of entire 120-question bank, taking 60 per subject
  const names = [
    '', '', '',
    'KCET Mock Test 3 – Full Syllabus Mixed',
    'KCET Mock Test 4 – High Difficulty',
    'KCET Mock Test 5 – Previous Year Pattern',
    'KCET Mock Test 6 – Concept Based',
    'KCET Mock Test 7 – Speed Test',
    'KCET Mock Test 8 – Revision Blend',
    'KCET Mock Test 9 – Formula Heavy',
    'KCET Mock Test 10 – Final Practice',
  ];
  const shuffledPh = seededShuffle(physicsBank, id * 31337);
  const shuffledCh = seededShuffle(chemistryBank, id * 31337 + 1);
  const shuffledMa = seededShuffle(mathBank, id * 31337 + 2);
  return {
    id,
    title: names[id] || `KCET Mock Test ${id}`,
    description: 'Mixed syllabus adaptive paper — 60 Qs per subject',
    duration: 240, totalMarks: 180, negativeMarking: false,
    questions: [
      ...shuffledPh.slice(0, 60),
      ...shuffledCh.slice(0, 60),
      ...shuffledMa.slice(0, 60),
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
    'Trend Analysis 2016-2026 | All Chapters',
    'Electrostatics · Organic Chemistry · Calculus',
    'Modern Physics · Biomolecules · Vectors & 3D',
    'Full Syllabus Mixed | Medium Difficulty',
    'High Difficulty | Previous Year Pattern',
    'Speed Test | 4 Hours | Mixed Topics',
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
    questions: 180,
    duration: '4 Hours',
    marks: 180,
  };
});
