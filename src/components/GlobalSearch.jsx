import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { querySearchIndex } from '../data/searchIndex'

export default function GlobalSearch({ variant = 'compact', placeholder = 'Search concepts, registers, theorems…' }) {
  const inputId = useId()
  const listboxId = useId()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const matches = querySearchIndex(query)
    setResults(matches)
    setActiveIndex(matches.length > 0 ? 0 : -1)
    setIsOpen(query.trim().length > 0 && matches.length > 0)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function navigateToResult(result) {
    if (!result) return
    navigate(result.route)
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.blur()
  }

  function handleKeyDown(event) {
    if (!isOpen || results.length === 0) {
      if (event.key === 'Escape') {
        setQuery('')
        setIsOpen(false)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      navigateToResult(results[activeIndex >= 0 ? activeIndex : 0])
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div
      ref={containerRef}
      className={['global-search', `global-search--${variant}`].join(' ')}
      role="search"
    >
      <label htmlFor={inputId} className="visually-hidden">
        Deep-content search
      </label>
      <div className="global-search__field">
        <svg className="global-search__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.25" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className="global-search__input"
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (query.trim() && results.length > 0) setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="global-search__clear"
            onClick={() => {
              setQuery('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <ul id={listboxId} className="global-search__results" role="listbox">
          {results.map((result, index) => (
            <li key={result.id} role="presentation">
              <button
                id={`${listboxId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={[
                  'global-search__result',
                  index === activeIndex && 'global-search__result--active',
                ].filter(Boolean).join(' ')}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => navigateToResult(result)}
              >
                <span className="global-search__result-label">{result.label}</span>
                <span className="global-search__result-desc">{result.description}</span>
                <span className="global-search__result-module meta-label">{result.module}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
