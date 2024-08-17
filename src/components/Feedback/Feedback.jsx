import css from "./Feedback.module.css"

export default function Feedback ({ items, totalFeedback, positivePercentage }) {
  return (
          <div>
            <ul className={css.noTi}>
              <li>Good: {items.good}</li>
              <li>Neutral: {items.neutral}</li>
              <li>Bad: {items.bad}</li>
              <li>Total: {totalFeedback}</li>
              <li>Positive: {positivePercentage}%</li>
            </ul>
          </div>

  )

}