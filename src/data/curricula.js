export const ACTIVE_PHASE = {
  label: 'Active Phase',
  semester: 'Semester III',
  subtitle: 'Core Syllabus',
}

export const COMING_SOON_MESSAGE = {
  headline: 'Archive Launching Soon',
  subline: 'Stay Tuned',
}

export const CHAPTER_CATALOG = {
  'discrete-mathematics': [
    { number: 1, title: 'Set, Relations and Functions', subtitle: 'Foundations of discrete structures' },
    { number: 2, title: 'Mathematical Induction, Recursion and Counting Techniques', subtitle: 'Proof methods and combinatorics' },
    { number: 3, title: 'Propositional Logic and Proof Techniques', subtitle: 'Formal reasoning and inference' },
    { number: 4, title: 'Algebraic Structures and Boolean Algebra', subtitle: 'Groups, rings, and logic circuits' },
    { number: 5, title: 'Graph theory and Trees', subtitle: 'Networks, traversals, and spanning trees' },
  ],
  'operating-system': [
    { number: 1, title: 'Introduction', subtitle: 'OS fundamentals and system architecture' },
    { number: 2, title: 'Processes, Threads and Process Scheduling', subtitle: 'Execution models and CPU scheduling' },
    { number: 3, title: 'Inter-Process Communication', subtitle: 'Shared memory, message passing, and IPC primitives' },
    { number: 4, title: 'Deadlocks', subtitle: 'Detection, prevention, and recovery strategies' },
    { number: 5, title: 'Memory Management & Virtual Memory', subtitle: 'Paging, segmentation, and address translation' },
    { number: 6, title: 'I/O Systems, File & Disk Management', subtitle: 'Storage hierarchy and file system design' },
  ],
  'computer-organization-microprocessor': {
    masterFile: true,
    title: '📜 The Master File',
    subtitle: 'Unified course PPT repository — Computer Organisation and Microprocessor Architecture',
  },
}

export const branches = [
  {
    id: 'engineering',
    title: 'Faculty of Engineering & Technology',
    shortTitle: 'Engineering',
    stream: 'Computer Science And Engineering',
    description: 'Semester III core curriculum for Computer Science And Engineering — theory, architecture, and systems.',
    theme: 'engineering',
    comingSoon: false,
    subjects: [
      {
        id: 'discrete-mathematics',
        code: 'MA301',
        title: 'Discrete Mathematics',
        chapters: CHAPTER_CATALOG['discrete-mathematics'].length,
        readingTime: '5h 10m',
        color: '#7B6B8A',
        labels: ['Core Theory'],
      },
      {
        id: 'operating-system',
        code: 'OS301',
        title: 'Operating Systems',
        chapters: CHAPTER_CATALOG['operating-system'].length,
        readingTime: '5h 45m',
        color: '#5C7A6B',
        labels: ['Core Theory', 'Lab Component'],
      },
      {
        id: 'computer-organization-microprocessor',
        code: 'CO301',
        title: 'Computer Organisation and Microprocessor Architecture (C.O.M.A.)',
        chapters: 1,
        readingTime: '6h 25m',
        color: '#4A6FA5',
        labels: ['Core Theory', 'Architecture Lab'],
        masterFile: true,
      },
    ],
  },
  {
    id: 'pharmacy',
    title: 'Faculty of Pharmacy',
    shortTitle: 'Pharmacy',
    description: 'Pharmacology, medicinal chemistry, and clinical pharmaceutical sciences for advanced study.',
    theme: 'pharmacy',
    comingSoon: true,
    subjects: [],
  },
  {
    id: 'diploma',
    title: 'Diploma Studies',
    shortTitle: 'Diploma',
    description: 'Industry-aligned vocational modules and applied technical coursework from semester three.',
    theme: 'diploma',
    comingSoon: true,
    subjects: [],
  },
]

export function getBranch(branchId) {
  return branches.find((b) => b.id === branchId) ?? null
}

export function getSubject(branchId, subjectId) {
  const branch = getBranch(branchId)
  if (!branch || branch.comingSoon) return null

  const subject = branch.subjects.find((s) => s.id === subjectId)
  if (!subject) return null

  return {
    branch,
    semester: { number: 3, title: 'Semester III' },
    subject,
  }
}

export function getChapterTitles(subject) {
  const catalog = CHAPTER_CATALOG[subject.id]

  if (!catalog) return []

  if (catalog.masterFile) {
    return [{
      number: 1,
      title: catalog.title,
      subtitle: catalog.subtitle,
      isMasterFile: true,
    }]
  }

  return catalog.map((chapter) => ({
    ...chapter,
    readingTime: `${12 + (chapter.number % 4) * 5} min`,
  }))
}

export function getMasterFileMeta(subjectId) {
  const catalog = CHAPTER_CATALOG[subjectId]
  if (!catalog?.masterFile) return null
  return catalog
}
