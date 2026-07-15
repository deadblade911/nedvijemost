import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'

const team = [
  { name: 'Елена Воронцова', role: 'Основатель, private clients', image: import.meta.env.BASE_URL + 'images/adviser-01.webp' },
  { name: 'Михаил Арсеньев', role: 'Партнёр, инвестиции', image: import.meta.env.BASE_URL + 'images/adviser-02.webp' },
  { name: 'Анна Левина', role: 'Советник, городская недвижимость', image: import.meta.env.BASE_URL + 'images/adviser-03.webp' },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="inner-hero inner-hero--about shell">
        <p className="eyebrow">Locus Estate · с 2014</p>
        <h1>Недвижимость начинается <em>с доверия</em></h1>
        <p>Мы небольшое бюро: каждый запрос ведёт старший советник, который остаётся рядом от первой встречи до передачи ключей.</p>
      </header>

      <section className="about-manifesto shell">
        <Reveal className="about-manifesto__image"><img src={`${import.meta.env.BASE_URL}images/about.webp" alt="Интерьер премиальной резиденции" /></Reveal>
        <Reveal className="about-manifesto__copy">
          <p className="eyebrow">Манифест</p>
          <h2>Мы не ускоряем выбор.<br />Мы делаем его <em>точнее.</em></h2>
          <p>Клиенту не нужен ещё один каталог. Ему нужен человек, который понимает рынок, слышит нюансы и способен спокойно сказать «этот объект вам не подходит».</p>
          <p>Поэтому мы работаем с ограниченным числом запросов, проверяем каждую деталь и отвечаем за итог своим именем.</p>
        </Reveal>
      </section>

      <section className="about-metrics">
        <div className="shell">
          <div><strong>340+</strong><span>сделок в Москве и Подмосковье</span></div>
          <div><strong>12 лет</strong><span>сосредоточены на премиальном сегменте</span></div>
          <div><strong>68%</strong><span>новых клиентов приходят по рекомендации</span></div>
          <div><strong>21 день</strong><span>медианный срок выхода на сделку</span></div>
        </div>
      </section>

      <section className="principles-section shell">
        <header><p className="eyebrow">Наши ориентиры</p><h2>Три принципа,<br />которые не меняются.</h2></header>
        <div>
          <article><span>01</span><h3>Честная редактура</h3><p>Не расширяем выбор ради объёма. Показываем только те объекты, которые выдержали наши критерии.</p></article>
          <article><span>02</span><h3>Сильная проверка</h3><p>Юристы, оценщики и технические специалисты подключаются до того, как эмоция превращается в обязательство.</p></article>
          <article><span>03</span><h3>Тихий сервис</h3><p>Держим процесс под контролем без лишней суеты и присутствуем ровно там, где это нужно.</p></article>
        </div>
      </section>

      <section className="team-section shell">
        <header><p className="eyebrow">Команда</p><h2>Советники,<br /><em>а не посредники.</em></h2></header>
        <div className="team-grid">
          {team.map((person) => (
            <figure key={person.name}><img src={person.image} alt={person.name} loading="lazy" /><figcaption><strong>{person.name}</strong><span>{person.role}</span></figcaption></figure>
          ))}
        </div>
      </section>

      <section className="inner-cta"><div className="shell"><p className="eyebrow">Личный контакт</p><h2>Познакомимся до того, как начнём искать.</h2><Link to="/contact">Связаться с советником <span>↗</span></Link></div></section>
    </div>
  )
}
