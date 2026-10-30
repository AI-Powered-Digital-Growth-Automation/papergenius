export const class10Pyqs = [
  // 1. SCIENCE (086) - Q1
  {
    id: 'c10-sci-2024-q1',
    grade: 'Class 10',
    subject: 'Science',
    year: '2024',
    set: 'Set 1 (Delhi)',
    chapter: 'Light - Reflection and Refraction',
    marks: '3 Marks',
    question: 'A convex lens of focal length 20 cm can produce a magnified virtual as well as real image. Is this a correct statement? If yes, where should the object be placed in each case for these images to be formed? Draw ray diagram for virtual image.',
    solution: `1. Statement Verification: Yes, the statement is completely correct. A convex lens can produce both real magnified and virtual magnified images.
2. Position for Real Magnified Image: The object must be placed between Focus (F1) and 2F1 (i.e. between 20 cm and 40 cm from optical center).
3. Position for Virtual Magnified Image: The object must be placed between Focus (F1) and Optical Centre (O) (i.e. at a distance less than 20 cm).
4. Ray Diagram Rules: Ray parallel to principal axis passes through F2. Ray through optical center goes undeviated. Extend rays backward with dotted lines to meet on the same side as object.`,
    stepMarking: [
      { step: 'Correct statement verification', marks: '0.5 Mark' },
      { step: 'Position of object for real magnified image (between F and 2F)', marks: '0.5 Mark' },
      { step: 'Position of object for virtual magnified image (between O and F)', marks: '0.5 Mark' },
      { step: 'Ray diagram with directional arrowheads & dotted virtual lines', marks: '1.5 Marks' }
    ],
    topperTip: 'In optics ray diagrams, forgetting arrowheads results in a mandatory 0.5-mark deduction even if the image position is accurate.'
  },
  // 1. SCIENCE (086) - Q2
  {
    id: 'c10-sci-2023-q2',
    grade: 'Class 10',
    subject: 'Science',
    year: '2023',
    set: 'Set 2 (All India)',
    chapter: 'Chemical Reactions and Equations',
    marks: '3 Marks',
    question: 'On heating green coloured ferrous sulphate crystals in a dry boiling tube: (a) What change in colour is observed? (b) Name the gases released and write their characteristic smell. (c) Write balanced chemical equation with state symbols.',
    solution: `(a) Initial green colour changes to white (loss of water of crystallization) and finally turns reddish-brown due to the formation of ferric oxide (Fe2O3).
(b) Two gases are released: Sulphur dioxide (SO2) and Sulphur trioxide (SO3). Characteristic smell: Choking smell of burning sulphur.
(c) Balanced Equation: 2FeSO4(s) --[Heat]--> Fe2O3(s) + SO2(g) + SO3(g)`,
    stepMarking: [
      { step: 'Colour change: green to reddish-brown', marks: '1.0 Mark' },
      { step: 'Names of gases (SO2 & SO3) and smell of burning sulphur', marks: '1.0 Mark' },
      { step: 'Balanced equation with state symbols and Heat condition', marks: '1.0 Mark' }
    ],
    topperTip: 'Always write condition [Heat] above the reaction arrow and state symbols (s, g) for 100% credit.'
  },

  // 2. MATHEMATICS STANDARD (041) - Q1
  {
    id: 'c10-math-std-2024-q1',
    grade: 'Class 10',
    subject: 'Mathematics Standard',
    year: '2024',
    set: 'Set 1 (Delhi)',
    chapter: 'Triangles',
    marks: '5 Marks',
    question: 'State and prove Basic Proportionality Theorem (Thales Theorem).',
    solution: `Statement: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.
Given: In triangle ABC, line DE || BC intersecting AB at D and AC at E.
To Prove: AD/DB = AE/EC.
Construction: Join BE and CD. Draw DM perpendicular to AC and EN perpendicular to AB.
Proof:
Area(triangle ADE) = 1/2 * AD * EN
Area(triangle BDE) = 1/2 * DB * EN
Area(ADE) / Area(BDE) = AD / DB  --- (1)
Similarly:
Area(triangle ADE) = 1/2 * AE * DM
Area(triangle CDE) = 1/2 * EC * DM
Area(ADE) / Area(CDE) = AE / EC  --- (2)
Since triangle BDE and triangle CDE are on the same base DE and between same parallels DE and BC:
Area(triangle BDE) = Area(triangle CDE)  --- (3)
From (1), (2), and (3): AD/DB = AE/EC. Hence Proved.`,
    stepMarking: [
      { step: 'Statement & accurate labeled figure', marks: '1.0 Mark' },
      { step: 'Given, To Prove, and Construction statements', marks: '1.0 Mark' },
      { step: 'Ratio of areas (Equations 1 & 2)', marks: '1.5 Marks' },
      { step: 'Same base and parallels justification (Equation 3) & conclusion', marks: '1.5 Marks' }
    ],
    topperTip: 'Box the final statement "AD/DB = AE/EC" and never skip construction statements.'
  },
  // 2. MATHEMATICS STANDARD (041) - Q2
  {
    id: 'c10-math-std-2023-q2',
    grade: 'Class 10',
    subject: 'Mathematics Standard',
    year: '2023',
    set: 'Set 3 (All India)',
    chapter: 'Introduction to Trigonometry',
    marks: '3 Marks',
    question: 'Prove that: (sin theta - 2 sin^3 theta) / (2 cos^3 theta - cos theta) = tan theta.',
    solution: `LHS = (sin theta - 2 sin^3 theta) / (2 cos^3 theta - cos theta)
= [sin theta (1 - 2 sin^2 theta)] / [cos theta (2 cos^2 theta - 1)]
= (sin theta / cos theta) * [ (1 - 2(1 - cos^2 theta)) / (2 cos^2 theta - 1) ]
= tan theta * [ (1 - 2 + 2 cos^2 theta) / (2 cos^2 theta - 1) ]
= tan theta * [ (2 cos^2 theta - 1) / (2 cos^2 theta - 1) ]
= tan theta * 1
= tan theta = RHS. Hence Proved.`,
    stepMarking: [
      { step: 'Factoring sin theta from numerator and cos theta from denominator', marks: '1.0 Mark' },
      { step: 'Substituting sin^2 theta = 1 - cos^2 theta identity', marks: '1.0 Mark' },
      { step: 'Simplification and cancellation to achieve RHS', marks: '1.0 Mark' }
    ],
    topperTip: 'Declare the identity used (sin^2 theta + cos^2 theta = 1) in the right-side margin.'
  },

  // 3. MATHEMATICS BASIC (241) - Q1
  {
    id: 'c10-math-bsc-2024-q1',
    grade: 'Class 10',
    subject: 'Mathematics Basic',
    year: '2024',
    set: 'Set 1 (Delhi)',
    chapter: 'Quadratic Equations',
    marks: '3 Marks',
    question: 'Find the roots of the quadratic equation: 2x^2 - 5x + 3 = 0 using the quadratic formula.',
    solution: `Comparing 2x^2 - 5x + 3 = 0 with ax^2 + bx + c = 0:
a = 2, b = -5, c = 3
Discriminant (D) = b^2 - 4ac
D = (-5)^2 - 4(2)(3) = 25 - 24 = 1
Since D > 0, real and distinct roots exist.
Quadratic Formula: x = [-b +- sqrt(D)] / (2a)
x = [-(-5) +- sqrt(1)] / (2 * 2) = (5 +- 1) / 4
Case 1: x = (5 + 1) / 4 = 6/4 = 3/2
Case 2: x = (5 - 1) / 4 = 4/4 = 1
Final Roots: x = 3/2 and x = 1.`,
    stepMarking: [
      { step: 'Identification of a, b, c and calculation of D = 1', marks: '1.0 Mark' },
      { step: 'Correct statement of quadratic formula', marks: '1.0 Mark' },
      { step: 'Calculation of both roots (3/2 and 1)', marks: '1.0 Mark' }
    ],
    topperTip: 'Always calculate D first to confirm nature of roots before applying the quadratic formula.'
  },
  // 3. MATHEMATICS BASIC (241) - Q2
  {
    id: 'c10-math-bsc-2023-q2',
    grade: 'Class 10',
    subject: 'Mathematics Basic',
    year: '2023',
    set: 'Set 2 (All India)',
    chapter: 'Arithmetic Progressions',
    marks: '3 Marks',
    question: 'Find the 20th term from the end of the AP: 3, 8, 13, ..., 253.',
    solution: `Given AP: 3, 8, 13, ..., 253
First term (a) = 3, Common difference (d) = 8 - 3 = 5, Last term (l) = 253
Method: Reversing the AP gives: 253, 248, ..., 13, 8, 3
New first term (a) = 253
New common difference (d) = -5
To find: a_20 = a + (20 - 1)d
a_20 = 253 + (19)(-5) = 253 - 95 = 158
The 20th term from the end is 158.`,
    stepMarking: [
      { step: 'Reversing AP or using formula l - (n - 1)d', marks: '1.0 Mark' },
      { step: 'Correct substitution of values (253, 19, 5)', marks: '1.0 Mark' },
      { step: 'Final accurate answer (158)', marks: '1.0 Mark' }
    ],
    topperTip: 'Reversing the AP is the safest approach and avoids sign calculation errors.'
  },

  // 4. SOCIAL SCIENCE (087) - Q1
  {
    id: 'c10-sst-2024-q1',
    grade: 'Class 10',
    subject: 'Social Science',
    year: '2024',
    set: 'Set 1 (Delhi)',
    chapter: 'Nationalism in India',
    marks: '5 Marks',
    question: 'Why did Mahatma Gandhi launch the Non-Cooperation Movement? Why did he decide to withdraw it in 1922?',
    solution: `Reasons for Launching the Movement:
1. Rowlatt Act (1919): Allowed detention of political prisoners without trial for up to two years.
2. Jallianwala Bagh Massacre (13 April 1919): General Dyer fired upon peaceful protesters, causing nationwide outrage.
3. Khilafat Issue: To bring Hindus and Muslims together on a common national platform.
4. Attainment of Swaraj: Non-cooperation with British institutions (schools, courts, foreign goods).

Reasons for Withdrawal (February 1922):
1. Chauri Chaura Incident: A peaceful procession in Gorakhpur turned violent, burning a police station and killing 22 policemen.
2. Gandhiji felt the movement was turning violent in many places and satyagrahis needed proper training before massive struggles.`,
    stepMarking: [
      { step: '3 distinct launch causes (Rowlatt, Jallianwala, Khilafat)', marks: '3.0 Marks' },
      { step: 'Chauri Chaura violent incident explanation', marks: '1.0 Mark' },
      { step: 'Gandhian philosophy on satyagrahi training', marks: '1.0 Mark' }
    ],
    topperTip: 'Always write answers under clear bold sub-headings with numbered points.'
  },
  // 4. SOCIAL SCIENCE (087) - Q2
  {
    id: 'c10-sst-2023-q2',
    grade: 'Class 10',
    subject: 'Social Science',
    year: '2023',
    set: 'Set 2 (All India)',
    chapter: 'Federalism',
    marks: '3 Marks',
    question: 'Differentiate between "Coming Together" and "Holding Together" Federations with examples.',
    solution: `1. Coming Together Federation:
- Independent states come together on their own to form a bigger unit to increase security by pooling sovereignty and retaining identity.
- All constituent states usually have equal powers and are strong vis-a-vis the federal government.
- Examples: USA, Switzerland, Australia.

2. Holding Together Federation:
- A large country decides to divide its power between constituent states and the national government.
- The central government tends to be more powerful vis-a-vis the states, and some constituent units may have special status.
- Examples: India, Spain, Belgium.`,
    stepMarking: [
      { step: 'Definition and formation mechanism of both', marks: '1.5 Marks' },
      { step: 'Power distribution difference between Centre & States', marks: '0.5 Mark' },
      { step: 'Correct examples for both categories', marks: '1.0 Mark' }
    ],
    topperTip: 'Present comparisons in a tabular format for neat examiner readability.'
  },

  // 5. ENGLISH LANGUAGE & LITERATURE (184) - Q1
  {
    id: 'c10-eng-2024-q1',
    grade: 'Class 10',
    subject: 'English Language and Literature',
    year: '2024',
    set: 'Set 1 (Delhi)',
    chapter: 'A Letter to God',
    marks: '3 Marks',
    question: 'Why did Lencho write a letter to God? How did the postmaster react after reading it?',
    solution: `1. Lencho's Motive: A devastating hailstorm completely destroyed Lencho's ripe cornfields, leaving his family facing starvation. Having immense and unwavering faith in God, he wrote a letter requesting 100 pesos to sow his field again and survive until the next harvest.
2. Postmaster's Reaction: The postmaster initially laughed at the unusual address, but soon turned serious. Deeply moved by the writer's extraordinary faith, he resolved not to shake Lencho's belief in God. He collected part of his salary and contributions from employees to send 70 pesos signed as "God".`,
    stepMarking: [
      { step: 'Destruction of corn crop & demand of 100 pesos', marks: '1.5 Marks' },
      { step: 'Postmaster reaction (laughter to admiration and collection of 70 pesos)', marks: '1.5 Marks' }
    ],
    topperTip: 'Mention the exact figure (70 pesos sent out of 100 requested) for full marks.'
  },
  // 5. ENGLISH LANGUAGE & LITERATURE (184) - Q2
  {
    id: 'c10-eng-2023-q2',
    grade: 'Class 10',
    subject: 'English Language and Literature',
    year: '2023',
    set: 'Set 3 (All India)',
    chapter: 'Nelson Mandela: Long Walk to Freedom',
    marks: '3 Marks',
    question: 'What "twin obligations" does Nelson Mandela mention in his autobiography?',
    solution: `According to Nelson Mandela, every man has twin obligations in life:
1. First Obligation: To his personal family, parents, wife, and children.
2. Second Obligation: To his people, his community, and his country.
Mandela emphasizes that in a civilized and humane society, each man is able to fulfil both obligations according to his inclinations. However, in South Africa under apartheid, it was practically impossible for a person of colour to fulfil both without being isolated, branded a rebel, and imprisoned.`,
    stepMarking: [
      { step: 'Obligation to family, parents, wife & children', marks: '1.0 Mark' },
      { step: 'Obligation to people, community & country', marks: '1.0 Mark' },
      { step: 'Explanation in the context of apartheid struggle', marks: '1.0 Mark' }
    ],
    topperTip: 'Use exact textual vocabulary like "obligations", "inclinations", and "apartheid".'
  },

  // 6. HINDI COURSE A (002) - Q1
  {
    id: 'c10-hin-a-2024-q1',
    grade: 'Class 10',
    subject: 'Hindi Course A',
    year: '2024',
    set: 'Set 1 (Delhi)',
    chapter: 'नेताजी का चश्मा',
    marks: '3 Marks',
    question: 'सेनानी न होते हुए भी चश्मेवाले को लोग "कैप्टन" क्यों कहते थे? "नेताजी का चश्मा" पाठ के आधार पर स्पष्ट कीजिए।',
    solution: `चश्मेवाला कोई फौजी या स्वतंत्रता सेनानी नहीं था, फिर भी लोग उसे आदर और व्यंग्य के मिले-जुले भाव से "कैप्टन" कहते थे, इसके मुख्य कारण निम्नलिखित हैं:
1. देशभक्ति की भावना: उसके हृदय में देश के शहीदों और स्वतंत्रता सेनानियों के प्रति अपार श्रद्धा और देशभक्ति की प्रबल भावना थी।
2. नेताजी के प्रति सम्मान: उसे नेताजी सुभाषचंद्र बोस की बिना चश्मे वाली मूर्ति देखकर दिली दुख होता था। वह अपनी छोटी सी फेरी के चश्मों में से एक चश्मा मूर्ति को पहनाकर उनकी कमी को पूरा करता था।
उसका यह समर्पण और देशप्रेम फौजियों जैसा था, इसलिए कस्बे के लोग उसे कैप्टन कहते थे।`,
    stepMarking: [
      { step: 'देशभक्ति और शहीदों के प्रति सम्मान का उल्लेख', marks: '1.5 Marks' },
      { step: 'मूर्ति पर चश्मा लगाने और समर्पण भाव का विवरण', marks: '1.5 Marks' }
    ],
    topperTip: 'उत्तर को साहित्यिक और शुद्ध हिंदी वर्तनी (spelling) में लिखें।'
  },
  // 6. HINDI COURSE A (002) - Q2
  {
    id: 'c10-hin-a-2023-q2',
    grade: 'Class 10',
    subject: 'Hindi Course A',
    year: '2023',
    set: 'Set 2 (All India)',
    chapter: 'बालगोबिन भगत',
    marks: '3 Marks',
    question: 'बालगोबिन भगत की दिनचर्या लोगों के अचरज का कारण क्यों थी? पाठ के आधार पर समझाइए।',
    solution: `बालगोबिन भगत की दिनचर्या लोगों के विस्मय (अचरज) का कारण इसलिए थी क्योंकि:
1. अत्यंत कठोर नियम: वे भोर में तारे टिमटिमाते समय उठकर दो मील दूर नदी स्नान के लिए जाते थे, चाहे जाड़े की दांत किटकिटाने वाली ठंड ही क्यों न हो।
2. कर्म और भक्ति का समन्वय: दिनभर खेतों में कमरतोड़ परिश्रम करते और साथ ही खंजड़ी बजाकर कबीर के पदों को तल्लीन होकर गाते थे।
3. वृद्धावस्था में भी अविचलित निष्ठा: बुढ़ापे में भी उनकी स्फूर्ति और नियम-पालन युवकों से अधिक दृढ़ था। उनका यह निस्वार्थ साधु जीवन लोगों को चकित कर देता था।`,
    stepMarking: [
      { step: 'जाड़े की भोर में नदी स्नान और नियम-निष्ठा का उल्लेख', marks: '1.5 Marks' },
      { step: 'खेतों में काम के साथ कबीर पदों के गायन और वृद्धावस्था की स्फूर्ति', marks: '1.5 Marks' }
    ],
    topperTip: "पाठ के प्रमुख प्रसंगों का उल्लेख अवश्य करें।"
  }
];