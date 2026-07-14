import { Link, useParams } from 'react-router-dom'
import GlobalSearch from '../components/GlobalSearch'
import { getChapterTitles, getSubject } from '../data/curricula'

export default function SubjectIndex() {
  const { branchId, subjectId } = useParams()
  const result = getSubject(branchId, subjectId)

  if (!result) {
    return (
      <div className="not-found">
        <h1>Subject not found</h1>
        <p>The course you are looking for does not exist in our catalogue.</p>
        <Link to="/">Return to home</Link>
      </div>
    )
  }

  const { branch, semester, subject } = result
  const chapters = getChapterTitles(subject)
  const isMasterFileSubject = subject.masterFile

  return (
    <article className="subject-index">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <Link to={`/?branch=${branch.id}`}>{branch.shortTitle}</Link>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <span aria-current="page">{subject.title}</span>
      </nav>

      <div className="subject-index__search">
        <GlobalSearch
          variant="compact"
          placeholder="Search within the syllabus index…"
        />
      </div>

      <header className="subject-header">
        <span className="subject-header__code">{subject.code}</span>
        <h1 className="subject-header__title">{subject.title}</h1>
        <p className="subject-header__desc">
          {branch.stream} · {semester.title}
          {isMasterFileSubject
            ? ' · Unified course repository'
            : ` · ${subject.chapters} chapters`}
          {subject.readingTime ? ` · ${subject.readingTime} total read` : ''}
        </p>
      </header>

      <section aria-labelledby="chapter-list-heading">
        <p id="chapter-list-heading" className="section-label">
          {isMasterFileSubject ? 'Course Repository' : 'Table of Contents'}
        </p>

        {isMasterFileSubject ? (
          <div className="master-file-card">
            {chapters.map((chapter) => (
              <Link
                key={chapter.number}
                to={`/${branch.id}/${subject.id}/master-file`}
                className="master-file-card__link"
              >
                <span className="master-file-card__icon" aria-hidden="true">📜</span>
                <div className="master-file-card__content">
                  <p className="master-file-card__title">{chapter.title.replace('📜 ', '')}</p>
                  <p className="master-file-card__subtitle">{chapter.subtitle}</p>
                </div>
                <span className="master-file-card__cta meta-label">Open Repository →</span>
              </Link>
            ))}
          </div>
        ) : (
          <ol className="chapter-list">
            {chapters.map((chapter) => (
              <li key={chapter.number}>
                <Link
                  to={`/${branch.id}/${subject.id}/chapter/${chapter.number}`}
                  className="chapter-item"
                >
                  <span className="chapter-item__number">{chapter.number}</span>
                  <div className="chapter-item__content">
                    <p className="chapter-item__title">{chapter.title}</p>
                    <p className="chapter-item__subtitle">{chapter.subtitle}</p>
                  </div>
                  <span className="chapter-item__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </article>
  )
}
