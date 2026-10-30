import { class10Pyqs } from './pyqDataClass10';

export const class12Pyqs = [
  {
    "id": "c12-phy-2024-q1",
    "grade": "Class 12",
    "subject": "Physics",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "Ray Optics and Optical Instruments",
    "marks": "5 Marks",
    "question": "Derive the Lens Maker's Formula 1/f = (mu - 1)(1/R1 - 1/R2) for a double convex lens of refractive index mu placed in air. State the assumptions made.",
    "solution": "1. Assumptions: Thin lens, small aperture, paraxial rays from point object.\n2. Surface 1: (mu/v1) - (1/u) = (mu - 1)/R1\n3. Surface 2: (1/v) - (mu/v1) = -(mu - 1)/R2\n4. Adding both: (1/v) - (1/u) = (mu - 1)(1/R1 - 1/R2)\n5. When u = infinity, v = f => 1/f = (mu - 1)(1/R1 - 1/R2). Hence Proved.",
    "stepMarking": [
      {
        "step": "Assumptions and clearly labeled ray diagram with arrows",
        "marks": "1.5 Marks"
      },
      {
        "step": "Refraction equations for surface 1 and surface 2",
        "marks": "2.0 Marks"
      },
      {
        "step": "Addition of equations and final boxed lens maker formula",
        "marks": "1.5 Marks"
      }
    ],
    "topperTip": "Always box the final formula and state that virtual image I1 acts as the virtual object for the second surface."
  },
  {
    "id": "c12-phy-2023-q2",
    "grade": "Class 12",
    "subject": "Physics",
    "year": "2023",
    "set": "Set 2 (All India)",
    "chapter": "Electromagnetic Induction",
    "marks": "3 Marks",
    "question": "State Lenz's law. A metallic rod of length l is rotated with angular frequency omega in a uniform magnetic field B perpendicular to its plane of rotation. Derive an expression for the induced EMF between the ends of the rod.",
    "solution": "1. Lenz's Law: The polarity of induced EMF is such that it produces a current opposing the flux change.\n2. For small element dr at distance r: v = r*omega, dE = B*v*dr = B*omega*r*dr.\n3. Integrating from 0 to l: E = Integral [B*omega*r*dr] = (1/2) * B * omega * l^2.",
    "stepMarking": [
      {
        "step": "Lenz's law accurate statement",
        "marks": "1.0 Mark"
      },
      {
        "step": "Integration setup from 0 to l with dE = B*omega*r*dr",
        "marks": "1.0 Mark"
      },
      {
        "step": "Integration evaluation and final EMF result: (1/2) B omega l^2",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Lenz's law is a consequence of conservation of energy; note this in your answer."
  },
  {
    "id": "c12-chem-2024-q1",
    "grade": "Class 12",
    "subject": "Chemistry",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "marks": "3 Marks",
    "question": "Write chemical equations for the following named reactions: (a) Cannizzaro Reaction, (b) Aldol Condensation, (c) Hell-Volhard-Zelinsky (HVZ) Reaction.",
    "solution": "(a) Cannizzaro: 2 HCHO + Conc. NaOH --[Heat]--> CH3OH + HCOONa\n(b) Aldol: 2 CH3CHO --[Dil. NaOH]--> CH3CH(OH)CH2CHO --[Heat, -H2O]--> CH3CH=CHCHO (But-2-enal)\n(c) HVZ: R-CH2-COOH --[(i) X2 / Red P, (ii) H2O]--> R-CH(X)-COOH + HX",
    "stepMarking": [
      {
        "step": "Cannizzaro balanced reaction with alcohol & carboxylate salt",
        "marks": "1.0 Mark"
      },
      {
        "step": "Aldol addition intermediate and dehydrated product",
        "marks": "1.0 Mark"
      },
      {
        "step": "HVZ reaction with Red Phosphorus catalyst condition",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Explicitly mention whether the reaction occurs in dilute or concentrated alkaline medium."
  },
  {
    "id": "c12-chem-2023-q2",
    "grade": "Class 12",
    "subject": "Chemistry",
    "year": "2023",
    "set": "Set 3 (All India)",
    "chapter": "Electrochemistry",
    "marks": "3 Marks",
    "question": "Calculate the EMF of the cell at 298 K: Mg(s) | Mg2+(0.001 M) || Cu2+(0.0001 M) | Cu(s). Given E_cell_standard = +2.71 V. [log 10 = 1].",
    "solution": "Cell reaction: Mg(s) + Cu2+(aq) -> Mg2+(aq) + Cu(s) [n = 2].\nNernst Equation: E_cell = E0 - (0.0591 / 2) * log([Mg2+] / [Cu2+])\nE_cell = 2.71 - 0.02955 * log(0.001 / 0.0001) = 2.71 - 0.02955 * 1 = +2.68 V.",
    "stepMarking": [
      {
        "step": "Balanced cell reaction and identification of n = 2",
        "marks": "1.0 Mark"
      },
      {
        "step": "Correct statement of Nernst equation with quotient",
        "marks": "1.0 Mark"
      },
      {
        "step": "Log evaluation and final cell EMF with V unit (+2.68 V)",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Always write the positive sign (+2.68 V) for spontaneous galvanic cell potential."
  },
  {
    "id": "c12-math-2024-q1",
    "grade": "Class 12",
    "subject": "Mathematics",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "Integrals",
    "marks": "5 Marks",
    "question": "Evaluate the definite integral: Integral from 0 to pi of [ x sin(x) / (1 + cos^2(x)) ] dx.",
    "solution": "Let I = Integral 0 to pi [x sin x / (1 + cos^2 x)] dx --- (1)\nUsing property f(pi - x): I = Integral 0 to pi [(pi - x) sin x / (1 + cos^2 x)] dx --- (2)\nAdding (1) & (2): 2I = pi * Integral 0 to pi [sin x / (1 + cos^2 x)] dx\nPut cos x = t, sin x dx = -dt; limits from 1 to -1.\n2I = pi * [tan^-1(t)] from -1 to 1 = pi * (pi/2) = pi^2 / 2 => I = pi^2 / 4.",
    "stepMarking": [
      {
        "step": "Application of definite integral property f(a - x)",
        "marks": "1.5 Marks"
      },
      {
        "step": "Adding equations to eliminate x term: 2I = pi * integral",
        "marks": "1.5 Marks"
      },
      {
        "step": "Substitution t = cos(x) and limit transformation",
        "marks": "1.0 Mark"
      },
      {
        "step": "Evaluation using tan^-1 and final boxed result I = pi^2 / 4",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "State the definite integral property in the margin: Integral 0 to a f(x)dx = Integral 0 to a f(a - x)dx."
  },
  {
    "id": "c12-math-2023-q2",
    "grade": "Class 12",
    "subject": "Mathematics",
    "year": "2023",
    "set": "Set 2 (All India)",
    "chapter": "Three Dimensional Geometry",
    "marks": "5 Marks",
    "question": "Find the shortest distance between skew lines: r = (i + 2j + k) + lambda(i - j + k) and r = (2i - j - k) + mu(2i + j + 2k).",
    "solution": "1. (a2 - a1) = (2-1)i + (-1-2)j + (-1-1)k = i - 3j - 2k\n2. (b1 x b2) = |i j k; 1 -1 1; 2 1 2| = -3i + 0j + 3k = -3i + 3k\n3. |b1 x b2| = sqrt(9 + 9) = 3*sqrt(2)\n4. (b1 x b2) . (a2 - a1) = -3(1) + 3(-2) = -9\n5. Shortest Distance = |-9| / [3*sqrt(2)] = 3 / sqrt(2) = (3*sqrt(2))/2 units.",
    "stepMarking": [
      {
        "step": "Finding vector (a2 - a1) = i - 3j - 2k",
        "marks": "1.0 Mark"
      },
      {
        "step": "Determinant expansion of (b1 x b2) = -3i + 3k",
        "marks": "1.5 Marks"
      },
      {
        "step": "Magnitude calculation |b1 x b2| = 3*sqrt(2)",
        "marks": "1.0 Mark"
      },
      {
        "step": "Shortest distance formula application and final result (3/sqrt(2) units)",
        "marks": "1.5 Marks"
      }
    ],
    "topperTip": "Always take absolute value |...| for distance and append the word \"units\"."
  },
  {
    "id": "c12-app-math-2024-q1",
    "grade": "Class 12",
    "subject": "Applied Mathematics",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "Financial Mathematics",
    "marks": "3 Marks",
    "question": "A sinking fund is created for the redemption of debentures of Rs 1,00,000 at the end of 5 years at 8% compound interest p.a. How much money should be deposited annually? [Given (1.08)^5 = 1.4693].",
    "solution": "Formula: A = R * [((1 + i)^n - 1) / i]\n1,00,000 = R * [(1.4693 - 1) / 0.08] = R * [0.4693 / 0.08] = R * 5.86625\nR = 1,00,000 / 5.86625 = Rs 17,046.66 (approx Rs 17,047).",
    "stepMarking": [
      {
        "step": "Formula declaration for sinking fund amount A",
        "marks": "1.0 Mark"
      },
      {
        "step": "Substitution of (1.08)^5 = 1.4693 and i = 0.08",
        "marks": "1.0 Mark"
      },
      {
        "step": "Final accurate annual installment with currency symbol (Rs 17,047)",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Prefix the currency symbol (Rs) and round off to the nearest rupee."
  },
  {
    "id": "c12-app-math-2023-q2",
    "grade": "Class 12",
    "subject": "Applied Mathematics",
    "year": "2023",
    "set": "Set 2 (All India)",
    "chapter": "Linear Programming",
    "marks": "5 Marks",
    "question": "Maximize Z = 3x + 5y subject to: x + 2y <= 20, x + y <= 15, x >= 0, y >= 0 graphically.",
    "solution": "1. Boundary lines: Line 1 (x + 2y = 20), Line 2 (x + y = 15). Intersection point: B(10, 5).\n2. Corner points: O(0,0), A(15,0), B(10,5), C(0,10).\n3. Z values: Z(0,0) = 0, Z(15,0) = 45, Z(10,5) = 30 + 25 = 55, Z(0,10) = 50.\nMaximum value of Z is 55 at (10, 5).",
    "stepMarking": [
      {
        "step": "Accurate graph coordinates and boundary lines",
        "marks": "1.5 Marks"
      },
      {
        "step": "Shading feasible bounded region and finding corner point (10, 5)",
        "marks": "1.5 Marks"
      },
      {
        "step": "Corner point evaluation table and maximum Z = 55 declaration",
        "marks": "2.0 Marks"
      }
    ],
    "topperTip": "Draw the corner points table with column headers: \"Corner Point (x, y)\" and \"Z = 3x + 5y\"."
  },
  {
    "id": "c12-bio-2024-q1",
    "grade": "Class 12",
    "subject": "Biology",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "Molecular Basis of Inheritance",
    "marks": "5 Marks",
    "question": "Describe the experiment of Meselson and Stahl that proved DNA replicates semi-conservatively.",
    "solution": "1. Cultured E. coli in 15NH4Cl heavy medium for multiple generations.\n2. Transferred to 14NH4Cl light medium.\n3. Extracted DNA after Gen I (20 min) -> hybrid intermediate band (15N-14N) on CsCl gradient.\n4. Gen II (40 min) -> equal amounts of light DNA (14N-14N) and hybrid DNA (15N-14N).\nConclusion: DNA replication is semi-conservative.",
    "stepMarking": [
      {
        "step": "Medium preparation with 15N and transfer to 14N",
        "marks": "1.5 Marks"
      },
      {
        "step": "CsCl density gradient centrifugation technique",
        "marks": "1.0 Mark"
      },
      {
        "step": "Gen I (20 min) and Gen II (40 min) band observations",
        "marks": "1.5 Marks"
      },
      {
        "step": "Labeled band diagram & final semi-conservative conclusion",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Draw the test tubes showing CsCl gradient positions: heavy (bottom), hybrid (middle), light (top)."
  },
  {
    "id": "c12-bio-2023-q2",
    "grade": "Class 12",
    "subject": "Biology",
    "year": "2023",
    "set": "Set 2 (All India)",
    "chapter": "Biotechnology: Principles and Processes",
    "marks": "3 Marks",
    "question": "What is PCR (Polymerase Chain Reaction)? Explain the three main steps involved.",
    "solution": "PCR is in vitro enzymatic amplification of DNA segments.\n1. Denaturation (94 deg C): DNA strands separate.\n2. Annealing (50-60 deg C): Primers bind to 3' ends.\n3. Extension (72 deg C): Taq polymerase from Thermus aquaticus adds dNTPs.",
    "stepMarking": [
      {
        "step": "Definition and purpose of in vitro amplification",
        "marks": "0.5 Mark"
      },
      {
        "step": "Denaturation step with temperature (94 deg C)",
        "marks": "0.5 Mark"
      },
      {
        "step": "Annealing step with primer definition (50-60 deg C)",
        "marks": "1.0 Mark"
      },
      {
        "step": "Extension with Taq polymerase and Thermus aquaticus source (72 deg C)",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Mentioning the exact bacterium \"Thermus aquaticus\" is mandatory for full marks in extension."
  },
  {
    "id": "c12-cs-2024-q1",
    "grade": "Class 12",
    "subject": "Computer Science",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "File Handling in Python",
    "marks": "3 Marks",
    "question": "Write a Python function count_words() that reads \"STORY.TXT\" and counts words starting with letter \"A\" or \"a\".",
    "solution": "def count_words():\n    count = 0\n    with open(\"STORY.TXT\", \"r\") as file:\n        words = file.read().split()\n        for w in words:\n            if w[0].upper() == \"A\":\n                count += 1\n    print(\"Total words:\", count)",
    "stepMarking": [
      {
        "step": "Correct file opening in read mode using with open()",
        "marks": "1.0 Mark"
      },
      {
        "step": "Splitting text into words using split()",
        "marks": "1.0 Mark"
      },
      {
        "step": "Case-insensitive first letter check w[0].upper() == \"A\" and display",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Using with open(...) automatically closes the file handle and prevents memory leaks."
  },
  {
    "id": "c12-cs-2023-q2",
    "grade": "Class 12",
    "subject": "Computer Science",
    "year": "2023",
    "set": "Set 2 (All India)",
    "chapter": "Data Structure: Stacks",
    "marks": "3 Marks",
    "question": "Write Push(Stack, item) and Pop(Stack) functions in Python for a list-implemented Stack.",
    "solution": "def Push(Stack, item):\n    Stack.append(item)\n\ndef Pop(Stack):\n    if len(Stack) == 0:\n        print(\"Underflow: Stack is empty.\")\n        return None\n    return Stack.pop()",
    "stepMarking": [
      {
        "step": "Push function using append()",
        "marks": "1.0 Mark"
      },
      {
        "step": "Pop underflow condition check len(stack) == 0",
        "marks": "1.0 Mark"
      },
      {
        "step": "Pop implementation using pop() and return value",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Handling the Underflow condition in Pop() is strictly checked by examiners."
  },
  {
    "id": "c12-ip-2024-q1",
    "grade": "Class 12",
    "subject": "Informatics Practices",
    "year": "2024",
    "set": "Set 1 (Delhi)",
    "chapter": "Data Handling using Pandas",
    "marks": "3 Marks",
    "question": "Given DataFrame df with columns [Name, Marks]: (a) Display top 3 rows, (b) Add column \"Result\" with \"Pass\", (c) Rename \"Marks\" to \"Score\".",
    "solution": "(a) print(df.head(3))\n(b) df[\"Result\"] = \"Pass\"\n(c) df.rename(columns={\"Marks\": \"Score\"}, inplace=True)",
    "stepMarking": [
      {
        "step": "Correct df.head(3) syntax",
        "marks": "1.0 Mark"
      },
      {
        "step": "Adding column via df[\"Result\"] = \"Pass\"",
        "marks": "1.0 Mark"
      },
      {
        "step": "df.rename() with columns dictionary and inplace=True",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Always remember inplace=True parameter in pandas rename operation."
  },
  {
    "id": "c12-ip-2023-q2",
    "grade": "Class 12",
    "subject": "Informatics Practices",
    "year": "2023",
    "set": "Set 3 (All India)",
    "chapter": "Database Query using SQL",
    "marks": "3 Marks",
    "question": "Write SQL queries for table Student(RollNo, Name, Stream, Marks): (a) Display Stream and average marks of streams with > 5 students, (b) Display names in descending order of Marks.",
    "solution": "(a) SELECT Stream, AVG(Marks) FROM Student GROUP BY Stream HAVING COUNT(*) > 5;\n(b) SELECT Name FROM Student ORDER BY Marks DESC;",
    "stepMarking": [
      {
        "step": "SELECT with GROUP BY Stream",
        "marks": "1.0 Mark"
      },
      {
        "step": "HAVING COUNT(*) > 5 clause",
        "marks": "1.0 Mark"
      },
      {
        "step": "ORDER BY Marks DESC query",
        "marks": "1.0 Mark"
      }
    ],
    "topperTip": "Never use WHERE clause for group aggregate conditions; always use HAVING."
  }
];

export const pyqDatabase = [
  ...class10Pyqs,
  ...class12Pyqs
];
