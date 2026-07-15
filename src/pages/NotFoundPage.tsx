import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page-not-found shell">
      <div className="page-not-found__number">404</div>
      <p className="eyebrow">Locus Estate</p>
      <h1>Страница вне коллекции</h1>
      <p>Этого адреса нет в нашей навигации. Вернитесь на главную или продолжите выбор объектов.</p>
      <div><Link to="/">Вернуться на главную</Link><Link to="/properties">Открыть коллекцию</Link></div>
    </section>
  )
}
