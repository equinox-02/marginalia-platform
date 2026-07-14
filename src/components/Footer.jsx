function LinkedInIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM3.75 7.25h1.5v9.5h-1.5v-9.5Zm4.25 0h1.44v1.3h.02c.2-.38.69-.78 1.42-.78 1.52 0 1.8 1 1.8 2.3v6.68h-1.5v-5.92c0-1.41-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.11v6.03H8V7.25Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2.5a7.5 7.5 0 0 0-2.37 14.62c.375.07.512-.16.512-.36 0-.18-.01-.77-.01-1.4-2.08.45-2.52-1-2.52-1-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.68 1.16 1.78.82 2.21.63.07-.49.27-.82.49-1.01-1.66-.19-3.4-.83-3.4-3.68 0-.81.29-1.48.76-2-.08-.19-.33-.96.07-2 0 0 .62-.2 2.03.76a7.02 7.02 0 0 1 1.86-.25c.63 0 1.26.08 1.86.25 1.41-.96 2.03-.76 2.03-.76.4 1.04.15 1.81.07 2 .47.52.76 1.19.76 2 0 2.86-1.75 3.49-3.42 3.67.27.23.51.68.51 1.37 0 .99-.01 1.79-.01 2.03 0 .2.14.44.52.36A7.5 7.5 0 0 0 10 2.5Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.5 5.75 10 10.75l6.5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: LinkedInIcon,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com',
    icon: GitHubIcon,
  },
  {
    id: 'gmail',
    label: 'Gmail',
    href: 'mailto:hello@marginalia.edu',
    icon: MailIcon,
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__about">
          <p className="site-footer__kicker meta-label">About Us</p>
          <p className="site-footer__text">
            Marginalia is a student-built open-access repository — curating semester syllabi,
            lecture archives, and deep-reference materials so every learner can study with clarity,
            without paywalls or clutter.
          </p>
        </div>

        <div className="site-footer__social">
          <p className="site-footer__kicker meta-label">Connect</p>
          <ul className="site-footer__links">
            {socialLinks.map(({ id, label, href, icon: Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  className="site-footer__link"
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bar">
        <span className="site-footer__copy meta-label">Marginalia · Semester III Core</span>
        <span className="site-footer__divider" aria-hidden="true" />
        <span className="site-footer__copy meta-label">Premium Editorial Desk</span>
      </div>
    </footer>
  )
}
