// Verified CBSE Official SQP & MS Master Links
export const OFFICIAL_CBSE_LINKS = {
  class10: 'https://cbseacademic.nic.in/sqp_classx_2024-25.html',
  class12: 'https://cbseacademic.nic.in/sqp_classxii_2024-25.html'
};

export const previousYearsPapers = [
  // ==================== CLASS 10 (2022 - 2026) ====================
  // SCIENCE
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c10-sci-${year}`,
    grade: 'Class 10',
    subject: 'Science',
    year: year,
    paperType: 'All Sets & Regions (Delhi + All India)',
    format: 'ZIP Archive',
    fileSize: '16.5 MB',
    paperUrl: `/papers/class10/${year}/Science.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class10,
    isOfficial: true
  })),

  // MATHEMATICS STANDARD
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c10-math-std-${year}`,
    grade: 'Class 10',
    subject: 'Mathematics Standard',
    year: year,
    paperType: 'All Sets & Regions (Delhi + All India)',
    format: 'ZIP Archive',
    fileSize: '15.1 MB',
    paperUrl: `/papers/class10/${year}/Maths_Standard.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class10,
    isOfficial: true
  })),

  // MATHEMATICS BASIC
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c10-math-bsc-${year}`,
    grade: 'Class 10',
    subject: 'Mathematics Basic',
    year: year,
    paperType: 'All Sets & Regions',
    format: 'ZIP Archive',
    fileSize: '14.8 MB',
    paperUrl: `/papers/class10/${year}/Maths_Basic.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class10,
    isOfficial: true
  })),

  // SOCIAL SCIENCE
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c10-sst-${year}`,
    grade: 'Class 10',
    subject: 'Social Science',
    year: year,
    paperType: 'All Sets & Regions',
    format: 'ZIP Archive',
    fileSize: '21.4 MB',
    paperUrl: `/papers/class10/${year}/Social_Science.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class10,
    isOfficial: true
  })),

  // ENGLISH LITERATURE
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c10-eng-${year}`,
    grade: 'Class 10',
    subject: 'English Language & Lit.',
    year: year,
    paperType: 'All Sets & Regions',
    format: 'ZIP Archive',
    fileSize: '8.58 MB',
    paperUrl: `/papers/class10/${year}/English_Literature.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class10,
    isOfficial: true
  })),

  // HINDI A
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c10-hin-a-${year}`,
    grade: 'Class 10',
    subject: 'Hindi Course A',
    year: year,
    paperType: 'All Sets & Regions',
    format: 'ZIP Archive',
    fileSize: '10.6 MB',
    paperUrl: `/papers/class10/${year}/Hindi_A.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class10,
    isOfficial: true
  })),

  // ==================== CLASS 12 (2022 - 2026) ====================
  // PHYSICS
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-phy-${year}`,
    grade: 'Class 12',
    subject: 'Physics',
    year: year,
    paperType: 'All Sets Bundle (Delhi + All India)',
    format: 'ZIP Archive',
    fileSize: '24.6 MB',
    paperUrl: `/papers/class12/${year}/Physics.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // CHEMISTRY
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-chem-${year}`,
    grade: 'Class 12',
    subject: 'Chemistry',
    year: year,
    paperType: 'All Sets Bundle (Delhi + All India)',
    format: 'ZIP Archive',
    fileSize: '18.5 MB',
    paperUrl: `/papers/class12/${year}/Chemistry.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // MATHEMATICS
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-math-${year}`,
    grade: 'Class 12',
    subject: 'Mathematics',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '19.2 MB',
    paperUrl: `/papers/class12/${year}/Math.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // BIOLOGY
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-bio-${year}`,
    grade: 'Class 12',
    subject: 'Biology',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '19.8 MB',
    paperUrl: `/papers/class12/${year}/Biology.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // COMPUTER SCIENCE
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-cs-${year}`,
    grade: 'Class 12',
    subject: 'Computer Science (Python)',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '1.53 MB',
    paperUrl: `/papers/class12/${year}/Computer_Science.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // INFORMATICS PRACTICES
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-ip-${year}`,
    grade: 'Class 12',
    subject: 'Informatics Practices',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '1.35 MB',
    paperUrl: `/papers/class12/${year}/Informatics_Practices.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // ACCOUNTANCY
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-acc-${year}`,
    grade: 'Class 12',
    subject: 'Accountancy',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '40.3 MB',
    paperUrl: `/papers/class12/${year}/Accountancy.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // BUSINESS STUDIES
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-bst-${year}`,
    grade: 'Class 12',
    subject: 'Business Studies',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '22.9 MB',
    paperUrl: `/papers/class12/${year}/BS.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // ECONOMICS
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-eco-${year}`,
    grade: 'Class 12',
    subject: 'Economics',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '15.4 MB',
    paperUrl: `/papers/class12/${year}/Economics.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // APPLIED MATHEMATICS
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-appmath-${year}`,
    grade: 'Class 12',
    subject: 'Applied Mathematics',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '510 KB',
    paperUrl: `/papers/class12/${year}/Applied_Mathematics.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // ENGLISH CORE
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-eng-${year}`,
    grade: 'Class 12',
    subject: 'English Core',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '24.4 MB',
    paperUrl: `/papers/class12/${year}/Eng_Core.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  })),

  // PHYSICAL EDUCATION
  ...['2026', '2025', '2024', '2023', '2022'].map(year => ({
    id: `c12-phyedu-${year}`,
    grade: 'Class 12',
    subject: 'Physical Education',
    year: year,
    paperType: 'All Sets Bundle',
    format: 'ZIP Archive',
    fileSize: '1.55 MB',
    paperUrl: `/papers/class12/${year}/Phy_Edu.zip`,
    officialSqpUrl: OFFICIAL_CBSE_LINKS.class12,
    isOfficial: true
  }))
];
