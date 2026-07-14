import { Link } from 'react-router-dom'
import GlobalSearch from './GlobalSearch'
import { useTheme } from '../hooks/useTheme'

function CrestMark() {
  return (
    <svg className="navbar__crest" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="18" height="18" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" />
      <path d="M10 1v4M10 15v4M1 10h4M15 10h4" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    </svg>
  )
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <CrestMark />
          <span className="navbar__wordmark">Marginalia</span>
        </Link>

        <div className="navbar__search">
          <GlobalSearch variant="compact" placeholder="Quick search — DCR, IPC, graphs…" />
        </div>

        <div className="navbar__actions">
          <div className="theme-switch" role="group" aria-label="Colour mode">
            <button
              type="button"
              className={`theme-switch__option ${theme === 'light' ? 'theme-switch__option--active' : ''}`}
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
            >
              Light
            </button>
            <button
              type="button"
              className={`theme-switch__option ${theme === 'dark' ? 'theme-switch__option--active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
