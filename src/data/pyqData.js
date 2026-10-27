export const pyqDatabase = [
  // ================= CLASS 10 SCIENCE =================
  {
    id: 'c10-sci-01',
    grade: 'Class 10',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    frequency: '5x Repeated (2018, 2019, 2021, 2023, 2024)',
    frequencyBadge: '5x Board Favorite',
    marks: 3,
    type: 'Short Answer',
    question: 'Why does the colour of copper sulphate solution change when an iron nail is dipped in it? Write the balanced chemical equation and state the type of reaction.',
    answerKey: [
      'Step 1 (Reason - 1 Mark): Iron is more reactive than copper (placed above copper in the reactivity series). It displaces copper from copper sulphate solution.',
      'Step 2 (Equation - 1 Mark): Fe (s) + CuSO4 (aq) [Blue] -> FeSO4 (aq) [Pale Green] + Cu (s) [Brown coating].',
      'Step 3 (Type - 1 Mark): Displacement Reaction / Single Replacement Reaction.'
    ],
    cbseTip: 'Always mention original color (Blue) and final color (Pale green) to secure the presentation half-mark.'
  },
  {
    id: 'c10-sci-02',
    grade: 'Class 10',
    subject: 'Science',
    chapter: 'Light - Reflection and Refraction',
    frequency: '4x Repeated (2017, 2019, 2022, 2024)',
    frequencyBadge: 'High Yield',
    marks: 5,
    type: 'Long / Numerical',
    question: 'A convex lens of focal length 15 cm forms an image 10 cm from the lens. How far is the object placed from the lens? Draw the ray diagram.',
    answerKey: [
      'Step 1 (Sign convention - 1 Mark): Focal length f = +15 cm (convex lens). Since image is real (or virtual), v = +10 cm (or -10 cm based on case). Here concave/convex virtual image v = -10 cm.',
      'Step 2 (Formula substitution - 2 Marks): 1/f = 1/v - 1/u => 1/u = 1/v - 1/f = 1/(-10) - 1/15 = -5/30 = -1/6 => u = -30 cm.',
      'Step 3 (Ray diagram - 2 Marks): Clean ray diagram showing optical centre O, principal focus F1 & F2, with object placed beyond 2F1.'
    ],
    cbseTip: 'Never omit directional arrows on light rays. Arrows missing = deduction of 1 full mark in CBSE.'
  },
  {
    id: 'c10-sci-03',
    grade: 'Class 10',
    subject: 'Science',
    chapter: 'Life Processes',
    frequency: '5x Repeated (2015, 2017, 2019, 2020, 2023)',
    frequencyBadge: '5x Board Favorite',
    marks: 3,
    type: 'Short Answer',
    question: 'Differentiate between aerobic and anaerobic respiration on the basis of: (i) Presence/absence of oxygen (ii) End products formed (iii) Energy released (ATP yield).',
    answerKey: [
      'Tabular Answer (1 Mark per point):',
      '(i) Oxygen requirement: Aerobic requires molecular O2; Anaerobic occurs in absence of O2.',
      '(ii) End products: Aerobic produces CO2 + H2O; Anaerobic in yeast produces Ethanol + CO2 (in muscle cells: Lactic acid).',
      '(iii) ATP Yield: Aerobic yields 36-38 ATP per glucose; Anaerobic yields only 2 ATP.'
    ],
    cbseTip: 'Always use a tabular column for differentiation questions. Point-wise paragraphs lose presentation marks.'
  },

  // ================= CLASS 10 MATHEMATICS =================
  {
    id: 'c10-math-01',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapter: 'Real Numbers',
    frequency: '6x Repeated (Guaranteed Board Question)',
    frequencyBadge: 'Guaranteed 3 Marks',
    marks: 3,
    type: 'Proof',
    question: 'Prove that √5 is an irrational number.',
    answerKey: [
      'Step 1 (1 Mark): Assume on the contrary that √5 is rational. Then √5 = a/b where a and b are co-prime integers and b ≠ 0.',
      'Step 2 (1 Mark): Squaring both sides: 5 = a²/b² => 5b² = a². Therefore 5 divides a², which implies 5 divides a. Let a = 5c for some integer c.',
      'Step 3 (1 Mark): Substitute: 5b² = (5c)² = 25c² => b² = 5c². Thus 5 divides b², so 5 divides b. This contradicts that a and b are co-prime. Hence, √5 is irrational.'
    ],
    cbseTip: 'Statement "a and b are co-prime" carries an independent half mark. Do not miss it.'
  },
  {
    id: 'c10-math-02',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapter: 'Triangles',
    frequency: '5x Repeated (2016, 2018, 2019, 2022, 2024)',
    frequencyBadge: 'Theorem',
    marks: 5,
    type: 'Theorem Proof',
    question: 'State and prove Basic Proportionality Theorem (Thales Theorem).',
    answerKey: [
      'Statement (1 Mark): If a line is drawn parallel to one side of a triangle intersecting other two sides, then it divides the two sides in the same ratio.',
      'Given, To Prove, Construction (1.5 Marks): Triangle ABC, DE || BC. Draw DM ⊥ AC, EN ⊥ AB. Join BE and CD.',
      'Proof (2.5 Marks): Area(ADE) = 1/2 * AD * EN. Area(BDE) = 1/2 * DB * EN. Ratio = AD/DB. Similarly Area(ADE)/Area(DEC) = AE/EC. Since Area(BDE) = Area(DEC) (same base DE and between parallel lines DE and BC), AD/DB = AE/EC.'
    ],
    cbseTip: 'Write "Given", "To Prove", and "Construction" with clear headings before starting proof.'
  },

  // ================= CLASS 12 PHYSICS =================
  {
    id: 'c12-phy-01',
    grade: 'Class 12',
    subject: 'Physics',
    chapter: 'Ray Optics & Optical Instruments',
    frequency: '5x Repeated (2016, 2018, 2019, 2023, 2024)',
    frequencyBadge: 'Top Derivation',
    marks: 5,
    type: 'Derivation',
    question: 'Derive Lens Maker’s Formula (1/f = (μ - 1)(1/R1 - 1/R2)) for a thin double convex lens.',
    answerKey: [
      'Step 1 (Diagram & Assumptions - 1.5 Marks): Thin lens with refractive index μ2 placed in medium μ1. Two spherical surfaces with radii R1 and R2. Ray diagram showing first refraction at surface 1 forming virtual object for surface 2.',
      'Step 2 (Surface Refractions - 2 Marks): Surface 1: μ2/v1 - μ1/u = (μ2 - μ1)/R1. Surface 2: μ1/v - μ2/v1 = (μ1 - μ2)/R2 = -(μ2 - μ1)/R2.',
      'Step 3 (Adding equations - 1.5 Marks): Adding gives μ1(1/v - 1/u) = (μ2 - μ1)(1/R1 - 1/R2). Using 1/f = 1/v - 1/u and μ = μ2/μ1: 1/f = (μ - 1)(1/R1 - 1/R2).'
    ],
    cbseTip: 'Explicitly state thin-lens approximations (aperture is small, angles are paraxial).'
  },
  {
    id: 'c12-phy-02',
    grade: 'Class 12',
    subject: 'Physics',
    chapter: 'Electrostatics',
    frequency: '4x Repeated (2017, 2020, 2022, 2024)',
    frequencyBadge: 'High Yield',
    marks: 3,
    type: 'Derivation',
    question: 'Using Gauss’s Theorem, derive an expression for the electric field due to an infinitely long straight uniformly charged wire.',
    answerKey: [
      'Step 1 (Symmetry & Gaussian surface - 1 Mark): Coaxial cylindrical Gaussian surface of radius r and length l. Flux through flat circular caps is zero as E is perpendicular to area vector.',
      'Step 2 (Flux calculation - 1 Mark): Φ = E * (2πrl) (curved surface area). Total charge enclosed q = λ * l.',
      'Step 3 (Gauss Law Equating - 1 Mark): Φ = q / ε0 => E * (2πrl) = (λl) / ε0 => E = λ / (2πε0r).'
    ],
    cbseTip: 'Vector notation for electric field direction (radially outward for positive λ) carries half mark.'
  },

  // ================= CLASS 12 CHEMISTRY =================
  {
    id: 'c12-chem-01',
    grade: 'Class 12',
    subject: 'Chemistry',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    frequency: '5x Repeated (2015, 2018, 2019, 2022, 2024)',
    frequencyBadge: 'Named Reactions',
    marks: 3,
    type: 'Reactions',
    question: 'Write chemical equations for the following named organic reactions: (i) Aldol Condensation (ii) Cannizzaro Reaction (iii) Hell-Volhard-Zelinsky (HVZ) Reaction.',
    answerKey: [
      '(i) Aldol (1 Mark): 2 CH3CHO --[dil. NaOH]--> CH3-CH(OH)-CH2-CHO --[Heat, -H2O]--> CH3-CH=CH-CHO (But-2-enal).',
      '(ii) Cannizzaro (1 Mark): 2 HCHO + conc. NaOH -> CH3OH (Methanol) + HCOONa (Sodium formate). Aldehydes without α-hydrogen disproportionate.',
      '(iii) HVZ Reaction (1 Mark): R-CH2-COOH --[1. X2 / Red P, 2. H2O]--> R-CH(X)-COOH (α-halocarboxylic acid).'
    ],
    cbseTip: 'Reagents & catalysts (dil. NaOH vs conc. NaOH vs Red P/X2) must be explicitly written over reaction arrow.'
  }
];
