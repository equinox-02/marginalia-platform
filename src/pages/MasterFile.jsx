import { Link, useParams } from 'react-router-dom'
import { getMasterFileMeta, getSubject } from '../data/curricula'

export default function MasterFile() {
  const { branchId, subjectId } = useParams()
  const result = getSubject(branchId, subjectId)
  const masterFile = getMasterFileMeta(subjectId)

  if (!result || !masterFile) {
    return (
      <div className="not-found">
        <h1>Master File not found</h1>
        <p>This repository entry does not exist in our catalogue.</p>
        <Link to="/">Return to home</Link>
      </div>
    )
  }

  const { branch, semester, subject } = result

  return (
    <article className="master-file-viewport">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <Link to={`/?branch=${branch.id}`}>{branch.shortTitle}</Link>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <Link to={`/${branch.id}/${subject.id}`}>{subject.title}</Link>
        <span className="breadcrumb__sep" aria-hidden="true">/</span>
        <span aria-current="page">Master File</span>
      </nav>

      <header className="master-file-viewport__header">
        <span className="master-file-viewport__badge meta-label">Unified Repository</span>
        <h1 className="master-file-viewport__title">{masterFile.title}</h1>
        <p className="master-file-viewport__desc">{masterFile.subtitle}</p>
        <p className="master-file-viewport__meta">
          {branch.stream} · {semester.title} · {subject.code}
        </p>
      </header>

      <section className="master-file-viewport__panel" aria-labelledby="master-file-contents">
        <p id="master-file-contents" className="section-label">Course PPT Archive</p>
        <div className="master-file-viewport__canvas">
          <div className="master-file-viewport__scroll">
            <p className="master-file-viewport__placeholder">
              The complete C.O.M.A. slide deck — microprocessor architecture, memory interfacing,
              instruction sets, and I/O subsystems — lives here as a single navigable master file.
            </p>
            <ul className="master-file-viewport__topics">
              <li>8085 / 8086 Architecture &amp; Register Organisation</li>
              <li>Addressing Modes &amp; Instruction Cycle</li>
              <li>Memory Interfacing &amp; Bus Timing</li>
              <li>I/O Mapped vs Memory Mapped I/O · DCR Registers</li>
              <li>Interrupt Structures &amp; DMA Controllers</li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  )
}
