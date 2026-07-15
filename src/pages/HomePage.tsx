import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLink } from '../components/ArrowLink'
import { PropertyCard } from '../components/PropertyCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { properties } from '../data/properties'

const districts = [
  { name: 'Хамовники', note: 'Тихие переулки и набережные', count: '12 объектов' },
  { name: 'Патриаршие пруды', note: 'Редкие дома в центре жизни', count: '07 объектов' },
  { name: 'Остоженка', note: 'Архитектура частного масштаба', count: '09 объектов' },
  { name: 'Раменки', note: 'Высота, свет и новые клубные дома', count: '15 объектов' },
  { name: 'Рублёво-Успенское', note: 'Загородные резиденции', count: '18 объектов' },
]

const services = [
  ['01', 'Покупка', 'Находим объект под ваш ритм, проверяем историю и ведём переговоры до ключей.'],
  ['02', 'Продажа', 'Упаковываем ценность, выстраиваем закрытый маркетинг и защищаем цену сделки.'],
  ['03', 'Private search', 'Получаем доступ к предложениям, которые не выходят в открытую продажу.'],
  ['04', 'Инвестиции', 'Собираем сценарий доходности и сопровождаем управление активом.'],
]

export default function HomePage() {
  const navigate = useNavigate()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = new URLSearchParams()
    for (const key of ['type', 'district', 'maxPrice']) {
      const value = data.get(key)
      if (typeof value === 'string' && value) params.set(key, value)
    }
    navigate(`/properties${params.size ? `?${params}` : ''}`)
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}images/hero.webp" alt="" />
          <div className="home-hero__wash" />
        </div>
        <div className="home-hero__content shell">
          <div className="coordinate-spine">
            <span>55.7558° N</span>
            <i />
            <span>37.6173° E</span>
          </div>
          <div className="home-hero__copy">
            <p className="eyebrow">Частное бюро · Москва</p>
            <h1>Недвижимость <em>как личная</em> координата</h1>
            <p className="home-hero__intro">
              Отбираем резиденции, в которых архитектура совпадает с вашим способом жить.
            </p>
            <div className="home-hero__actions">
              <Link className="radial-button" to="/properties">
                <span>Смотреть коллекцию</span>
                <i aria-hidden="true" />
              </Link>
              <ArrowLink to="/contact">Запросить подбор</ArrowLink>
            </div>
          </div>
          <div className="home-hero__edition">
            <span>Collection</span>
            <strong>№ 07</strong>
            <span>Moscow · 2026</span>
          </div>
        </div>
      </section>

      <form className="quick-search shell" onSubmit={handleSearch}>
        <label>
          <span>Тип объекта</span>
          <select name="type" defaultValue="">
            <option value="">Любой</option>
            <option value="Квартира">Квартира</option>
            <option value="Пентхаус">Пентхаус</option>
            <option value="Дом">Дом</option>
          </select>
        </label>
        <label>
          <span>Район</span>
          <select name="district" defaultValue="">
            <option value="">Вся Москва</option>
            <option value="Хамовники">Хамовники</option>
            <option value="Остоженка">Остоженка</option>
            <option value="Патриаршие пруды">Патриаршие пруды</option>
            <option value="Раменки">Раменки</option>
          </select>
        </label>
        <label>
          <span>Бюджет до</span>
          <select name="maxPrice" defaultValue="">
            <option value="">Не ограничен</option>
            <option value="200000000">200 млн ₽</option>
            <option value="400000000">400 млн ₽</option>
            <option value="700000000">700 млн ₽</option>
          </select>
        </label>
        <button type="submit">Найти объекты <span aria-hidden="true">→</span></button>
      </form>

      <section className="featured-section shell">
        <Reveal>
          <SectionHeading
            eyebrow="Выбор бюро"
            title={<>Избранная <em>коллекция</em></>}
            aside={<p>Объекты, которые редко появляются на открытом рынке и остаются актуальными годами.</p>}
          />
        </Reveal>
        <div className="featured-grid">
          {properties.slice(0, 4).map((property, index) => (
            <Reveal key={property.id} className={`featured-grid__item featured-grid__item--${index + 1}`}>
              <PropertyCard property={property} index={index} />
            </Reveal>
          ))}
        </div>
        <div className="featured-section__all">
          <ArrowLink to="/properties">Вся коллекция · 38 объектов</ArrowLink>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-section__inner shell">
          <p className="eyebrow">Подход Locus</p>
          <blockquote>
            Москва, <em>выбранная точно.</em> Не больше вариантов — только те, которые стоит увидеть.
          </blockquote>
          <div className="manifesto-stats">
            <div><strong>12</strong><span>лет в премиальной недвижимости</span></div>
            <div><strong>340+</strong><span>закрытых сделок</span></div>
            <div><strong>68%</strong><span>клиентов по рекомендации</span></div>
          </div>
        </div>
      </section>

      <section className="services-preview shell">
        <Reveal>
          <SectionHeading
            eyebrow="Экспертиза"
            title={<>Работаем <em>на вашей стороне</em></>}
            aside={<ArrowLink to="/services">Все услуги</ArrowLink>}
          />
        </Reveal>
        <div className="services-preview__list">
          {services.map(([number, title, text]) => (
            <Reveal key={number} className="service-row">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span aria-hidden="true">↗</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="districts-section" aria-label="Районы Москвы">
        <div className="districts-section__ghost" aria-hidden="true">MOSCOW</div>
        <div className="districts-section__inner shell">
          <p className="eyebrow">География коллекции</p>
          <h2 id="districts-title">Знаем не адреса.<br />Знаем <em>место.</em></h2>
          <div className="district-list">
            {districts.map((district) => (
              <Link key={district.name} to={`/properties?district=${encodeURIComponent(district.name === 'Рублёво-Успенское' ? 'Рублёво-Успенское направление' : district.name)}`}>
                <span>{district.name}</span>
                <small>{district.note}</small>
                <small>{district.count}</small>
                <i aria-hidden="true">→</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-section shell">
        <Reveal className="founder-section__image">
          <img src={`${import.meta.env.BASE_URL}images/about.webp" alt="Современный интерьер с натуральным камнем" loading="lazy" />
          <span>Private office · Moscow</span>
        </Reveal>
        <Reveal className="founder-section__copy">
          <p className="eyebrow">Принцип бюро</p>
          <blockquote>«Хорошая сделка начинается не с показа. Она начинается с точного понимания, как вы хотите жить».</blockquote>
          <p>Елена Воронцова<br /><span>основатель Locus Estate</span></p>
          <ArrowLink to="/about">Познакомиться с бюро</ArrowLink>
        </Reveal>
      </section>

      <section className="home-cta">
        <div className="home-cta__inner shell">
          <div className="coordinate-spine coordinate-spine--light"><span>Private search</span><i /><span>24 / 7</span></div>
          <div>
            <p className="eyebrow">Начать разговор</p>
            <h2>Найдём пространство,<br />которое станет <em>вашим.</em></h2>
            <Link className="home-cta__link" to="/contact">Обсудить персональный подбор <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
