import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import GlobalSearch from '../components/GlobalSearch'
import { ACTIVE_PHASE, branches, COMING_SOON_MESSAGE } from '../data/curricula'

function EngineeringPattern() {
  return (
    <div className="branch-card__pattern branch-card__pattern--engineering" aria-hidden="true">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="eng-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#eng-grid)" />
        <text x="16" y="140" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.25">
          struct Node {'{'} int val; {'}'}
        </text>
        <text x="16" y="155" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.2">
          void traverse(Node* root)
        </text>
        <text x="16" y="170" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.15">
          return f(x) dx
        </text>
      </svg>
    </div>
  )
}

function PharmacyPattern() {
  return (
    <div className="branch-card__pattern branch-card__pattern--pharmacy" aria-hidden="true">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="80" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="88" cy="80" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <path
          d="M60 140 Q80 110 100 130 Q120 150 140 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.18"
        />
        <path
          d="M70 155 L75 135 L85 150 L95 125 L105 145 L115 130 L125 155"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.15"
        />
        <text x="130" y="50" fontFamily="serif" fontSize="11" fill="currentColor" opacity="0.12">
          C₆H₁₂O₆
        </text>
      </svg>
    </div>
  )
}

function DiplomaPattern() {
  return (
    <div className="branch-card__pattern branch-card__pattern--diploma" aria-hidden="true">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        <rect x="30" y="40" width="140" height="100" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="4 3" />
        <line x1="30" y1="90" x2="170" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.12" strokeDasharray="2 2" />
        <line x1="100" y1="40" x2="100" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.12" strokeDasharray="2 2" />
        <circle cx="100" cy="90" r="22" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.18" />
        <path d="M40 160 L60 150 L80 165 L100 145 L120 160 L140 148 L160 158" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
        <text x="36" y="58" fontFamily="monospace" fontSize="7" fill="currentColor" opacity="0.2">SCALE 1:50</text>
      </svg>
    </div>
  )
}

function ComingSoonBadge() {
  return (
    <div className="coming-soon-badge">
      <span className="coming-soon-badge__line meta-label">{COMING_SOON_MESSAGE.headline}</span>
      <span className="coming-soon-badge__divider" aria-hidden="true" />
      <span className="coming-soon-badge__subline">{COMING_SOON_MESSAGE.subline}</span>
    </div>
  )
}

const patternMap = {
  engineering: EngineeringPattern,
  pharmacy: PharmacyPattern,
  diploma: DiplomaPattern,
}

const ENGINEERING_BRANCH_ID = 'engineering'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const branchFromUrl = searchParams.get('branch')
  const [activeBranchId, setActiveBranchId] = useState(
    branches.some((b) => b.id === branchFromUrl) ? branchFromUrl : null,
  )
  const [hoveredBranchId, setHoveredBranchId] = useState(null)

  useEffect(() => {
    if (branchFromUrl && branches.some((b) => b.id === branchFromUrl)) {
      setActiveBranchId(branchFromUrl)
    }
  }, [branchFromUrl])

  const activeBranch = branches.find((b) => b.id === activeBranchId) ?? null
  const showArchive = activeBranch && !activeBranch.comingSoon

  function selectBranch(branchId) {
    setActiveBranchId(branchId)
    setSearchParams({ branch: branchId })
  }

  function showComingSoonOverlay(branch, isActive) {
    return branch.comingSoon && (isActive || hoveredBranchId === branch.id)
  }

  return (
    <div className="home">
      <header className="editorial-banner" aria-labelledby="banner-title">
        <div className="editorial-banner__content">
          <p className="editorial-banner__kicker">Marginalia · Open Repository</p>
          <h1 id="banner-title" className="editorial-banner__title">
            The Open-Access Academic Repository.
          </h1>
        </div>
        <div className="editorial-banner__phase">
          <span className="editorial-banner__phase-label">{ACTIVE_PHASE.label}</span>
          <span className="editorial-banner__phase-value">
            {ACTIVE_PHASE.semester} {ACTIVE_PHASE.subtitle}
          </span>
        </div>
      </header>

      <section className="dashboard-search" aria-labelledby="dashboard-search-heading">
        <div className="dashboard-search__header">
          <p id="dashboard-search-heading" className="meta-label">Deep-Content Search</p>
          <p className="dashboard-search__hint">
            Query registers, theorems, and concepts — e.g. &ldquo;DCR&rdquo; routes to C.O.M.A.
          </p>
        </div>
        <GlobalSearch
          variant="prominent"
          placeholder="Search DCR, deadlocks, graph theory, virtual memory…"
        />
      </section>

      <section className="faculty-section" aria-labelledby="faculty-heading">
        <div className="section-header">
          <p id="faculty-heading" className="meta-label">Faculty Registry</p>
          <p className="section-header__note">
            Faculty of Engineering &amp; Technology resolves to Computer Science And Engineering
          </p>
        </div>

        <div className="branch-grid">
          {branches.map((branch) => {
            const Pattern = patternMap[branch.theme]
            const isActive = activeBranchId === branch.id
            const isLocked = branch.comingSoon
            const showOverlay = showComingSoonOverlay(branch, isActive)
            const isEngineering = branch.id === ENGINEERING_BRANCH_ID

            return (
              <button
                key={branch.id}
                type="button"
                className={[
                  'branch-card',
                  `branch-card--${branch.theme}`,
                  isActive && 'branch-card--active',
                  isLocked && 'branch-card--locked',
                  showOverlay && 'branch-card--show-lock',
                ].filter(Boolean).join(' ')}
                onClick={() => selectBranch(branch.id)}
                onMouseEnter={() => setHoveredBranchId(branch.id)}
                onMouseLeave={() => setHoveredBranchId(null)}
                aria-pressed={isActive}
              >
                <Pattern />

                {isLocked && (
                  <div className="branch-card__lock-overlay" aria-hidden={!showOverlay}>
                    <ComingSoonBadge />
                  </div>
                )}

                <div className="branch-card__body">
                  <span className="branch-card__index meta-label">{branch.shortTitle}</span>
                  <h2 className="branch-card__title">{branch.title}</h2>
                  {isEngineering && branch.stream && (
                    <p className="branch-card__stream branch-card__stream--resolved meta-label">
                      → {branch.stream}
                    </p>
                  )}
                  {!isEngineering && branch.stream && (
                    <p className="branch-card__stream meta-label">{branch.stream}</p>
                  )}
                  <p className="branch-card__desc">{branch.description}</p>
                  <span className="branch-card__cta meta-label">
                    {isLocked
                      ? 'Preview Archive'
                      : isActive
                        ? 'Archive Open'
                        : 'Open Archive →'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section
        className={`archive-panel ${activeBranch ? 'archive-panel--visible' : 'archive-panel--hidden'}`}
        aria-labelledby="archive-heading"
        aria-hidden={!activeBranch}
      >
        {activeBranch?.comingSoon && (
          <div className="archive-panel__coming-soon">
            <p className="meta-label">Curriculum Status</p>
            <ComingSoonBadge />
            <p className="archive-panel__coming-soon-note">
              The {activeBranch.shortTitle} archive is being prepared for Semester III and beyond.
            </p>
          </div>
        )}

        {showArchive && (
          <>
            <div className="archive-panel__header">
              <div>
                <p className="meta-label">Curriculum Archive</p>
                <h2 id="archive-heading" className="archive-panel__title">
                  Semester III Core
                </h2>
                {activeBranch.stream && (
                  <p className="archive-panel__stream">{activeBranch.stream}</p>
                )}
              </div>
              <div className="archive-panel__meta">
                <span className="meta-label">Faculty</span>
                <span className="archive-panel__faculty">{activeBranch.title}</span>
                <span className="archive-panel__count">
                  {activeBranch.subjects.length} core subjects
                </span>
              </div>
            </div>

            <ul className="chapter-capsules">
              {activeBranch.subjects.map((subject, index) => (
                <li key={subject.id}>
                  <Link
                    to={`/${activeBranch.id}/${subject.id}`}
                    className={[
                      'chapter-capsule',
                      subject.masterFile && 'chapter-capsule--master',
                    ].filter(Boolean).join(' ')}
                    style={{ '--subject-accent': subject.color }}
                  >
                    <div className="chapter-capsule__indicator" aria-hidden="true" />
                    <div className="chapter-capsule__index meta-label">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="chapter-capsule__main">
                      <div className="chapter-capsule__top">
                        <span className="chapter-capsule__code">{subject.code}</span>
                        <span className="chapter-capsule__time">{subject.readingTime} read</span>
                      </div>
                      <h3 className="chapter-capsule__title">{subject.title}</h3>
                      <div className="chapter-capsule__footer">
                        <p className="chapter-capsule__meta">
                          {subject.masterFile
                            ? 'Unified PPT repository · Semester III'
                            : `${subject.chapters} chapters · Semester III`}
                        </p>
                        {subject.labels?.length > 0 && (
                          <ul className="chapter-capsule__labels">
                            {subject.labels.map((label) => (
                              <li key={label} className="chapter-capsule__label">
                                {label}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <span className="chapter-capsule__arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  )
}
