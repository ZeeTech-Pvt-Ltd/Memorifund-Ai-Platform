export default function Logo({ onDark = false }) {
  return (
    <a className="logo" href="/" aria-label="Memorifund Ai Platform home">
      <span className="logo-mark">M</span>
      <span className={`logo-text ${onDark ? 'on-dark' : ''}`}>
        Memorifund <span>Ai Platform</span>
      </span>
    </a>
  )
}
