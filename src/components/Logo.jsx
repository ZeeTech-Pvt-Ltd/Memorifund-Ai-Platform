import LogoMark from './LogoMark.jsx'

export default function Logo({ onDark = false }) {
  return (
    <a className="logo" href="/" aria-label="Memorifund Ai Platform home">
      <LogoMark size={40} />
      <span className={`logo-text ${onDark ? 'on-dark' : ''}`}>
        Memorifund <span>Ai Platform</span>
      </span>
    </a>
  )
}
