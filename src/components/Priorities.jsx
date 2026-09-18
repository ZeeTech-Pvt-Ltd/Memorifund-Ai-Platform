import { Check } from './icons.jsx'
import { priorities } from '../data/content.js'

// Homepage "Our priorities" section — stat-led cards with a gold number
// watermark, checklist, and tags. No repeated icon-grid feel.
export default function Priorities() {
  return (
    <section className="section prio" id="priorities">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">{priorities.title}<mark>{priorities.titleMark}</mark></h2>
          <p className="lead">{priorities.lead}</p>
        </div>

        <div className="prio-grid">
          {priorities.cards.map((card) => (
            <article className="prio-card reveal" key={card.title}>
              <div className="prio-stat">
                <span className="big">
                  {card.big}
                  {card.bigNote && <small>{card.bigNote}</small>}
                </span>
                <span className="cap">{card.cap}</span>
              </div>
              <h3>{card.title}</h3>
              <p className="prio-sub">{card.sub}</p>
              <ul className="prio-list">
                {card.items.map((item) => (
                  <li key={item}>
                    <span className="tick"><Check /></span> {item}
                  </li>
                ))}
              </ul>
              <div className="tags">
                {card.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
