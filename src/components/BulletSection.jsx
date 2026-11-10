// One bullet section from the content brief, rendered as a card grid.
//
// Reuses the existing .caps-grid / .cap-card styles, so a section added from
// the brief looks like the rest of the page without inventing a new layout.
export default function BulletSection({ title, items, notice }) {
  return (
    <section className="section caps">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">{title}</h2>
        </div>

        <div className="caps-grid">
          {items.map((c) => (
            <div className="cap-card reveal" key={c.k}>
              <span className="cap-k">{c.k}</span>
              <span className="cap-v">{c.v}</span>
            </div>
          ))}
        </div>

        {notice && (
          <p className="lead" style={{ marginTop: 28, textAlign: 'center' }}>{notice}</p>
        )}
      </div>
    </section>
  )
}
