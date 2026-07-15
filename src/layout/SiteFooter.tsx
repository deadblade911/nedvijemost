import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main shell">
        <div>
          <Link className="wordmark wordmark--footer" to="/">
            <span>LOCUS</span>
            <small>ESTATE</small>
          </Link>
          <p>Частное бюро премиальной недвижимости Москвы и Подмосковья.</p>
        </div>
        <nav aria-label="Навигация в подвале">
          <Link to="/properties">Коллекция</Link>
          <Link to="/services">Услуги</Link>
          <Link to="/about">О бюро</Link>
          <Link to="/contact">Контакты</Link>
        </nav>
        <div className="site-footer__contacts">
          <a href="tel:+74950211717">+7 (495) 021-17-17</a>
          <a href="mailto:hello@locus-estate.ru">hello@locus-estate.ru</a>
          <span>Пречистенская набережная, 17</span>
        </div>
      </div>
      <div className="site-footer__legal shell">
        <span>© 2026 Locus Estate</span>
        <span>Демонстрационный проект: объекты, цены и контакты вымышлены.</span>
      </div>
    </footer>
  )
}
