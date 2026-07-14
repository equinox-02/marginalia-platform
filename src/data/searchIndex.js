/**
 * Simulated deep-content index — maps structural key concepts to module routes.
 * Queries match against keywords, labels, and descriptions (case-insensitive).
 */
export const searchIndex = [
  {
    id: 'dcr-register',
    keywords: ['dcr', 'data communication register', 'device control register'],
    label: 'DCR — Data Communication Register',
    description: 'Microprocessor I/O control registers in C.O.M.A.',
    module: 'C.O.M.A. · Master File',
    route: '/engineering/computer-organization-microprocessor/master-file',
  },
  {
    id: 'deadlock-banker',
    keywords: ['deadlock', 'banker algorithm', 'resource allocation'],
    label: 'Deadlocks — Banker\'s Algorithm',
    description: 'Safe-state detection and avoidance in Operating Systems',
    module: 'Operating Systems · Ch. 4',
    route: '/engineering/operating-system/chapter/4',
  },
  {
    id: 'virtual-memory',
    keywords: ['virtual memory', 'paging', 'page table', 'tlb'],
    label: 'Memory Management & Virtual Memory',
    description: 'Address translation, paging, and TLB caching',
    module: 'Operating Systems · Ch. 5',
    route: '/engineering/operating-system/chapter/5',
  },
  {
    id: 'graph-trees',
    keywords: ['graph', 'tree', 'spanning tree', 'bfs', 'dfs'],
    label: 'Graph Theory and Trees',
    description: 'Traversals, connectivity, and spanning tree algorithms',
    module: 'Discrete Mathematics · Ch. 5',
    route: '/engineering/discrete-mathematics/chapter/5',
  },
  {
    id: 'boolean-algebra',
    keywords: ['boolean', 'logic gate', 'k-map', 'karnaugh'],
    label: 'Algebraic Structures and Boolean Algebra',
    description: 'Boolean functions, minimization, and logic design',
    module: 'Discrete Mathematics · Ch. 4',
    route: '/engineering/discrete-mathematics/chapter/4',
  },
  {
    id: 'ipc',
    keywords: ['ipc', 'inter-process communication', 'semaphore', 'pipe'],
    label: 'Inter-Process Communication',
    description: 'Synchronization primitives and IPC mechanisms',
    module: 'Operating Systems · Ch. 3',
    route: '/engineering/operating-system/chapter/3',
  },
  {
    id: 'induction',
    keywords: ['induction', 'recursion', 'counting', 'permutation', 'combination'],
    label: 'Mathematical Induction & Counting',
    description: 'Proof by induction, recurrence, and combinatorics',
    module: 'Discrete Mathematics · Ch. 2',
    route: '/engineering/discrete-mathematics/chapter/2',
  },
  {
    id: '8085-architecture',
    keywords: ['8085', 'microprocessor', 'accumulator', 'flag register'],
    label: '8085 Microprocessor Architecture',
    description: 'Register set, ALU, and instruction cycle overview',
    module: 'C.O.M.A. · Master File',
    route: '/engineering/computer-organization-microprocessor/master-file',
  },
  {
    id: 'process-scheduling',
    keywords: ['scheduling', 'fcfs', 'round robin', 'priority scheduling', 'thread'],
    label: 'Processes, Threads & Scheduling',
    description: 'CPU scheduling algorithms and concurrency models',
    module: 'Operating Systems · Ch. 2',
    route: '/engineering/operating-system/chapter/2',
  },
  {
    id: 'propositional-logic',
    keywords: ['propositional', 'predicate logic', 'proof', 'tautology'],
    label: 'Propositional Logic & Proof Techniques',
    description: 'Logical connectives, equivalence, and formal proofs',
    module: 'Discrete Mathematics · Ch. 3',
    route: '/engineering/discrete-mathematics/chapter/3',
  },
]

export function querySearchIndex(query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return searchIndex.filter((entry) => {
    const haystack = [
      entry.label,
      entry.description,
      entry.module,
      ...entry.keywords,
    ].join(' ').toLowerCase()

    return entry.keywords.some((kw) => kw.includes(normalized) || normalized.includes(kw))
      || haystack.includes(normalized)
  })
}
