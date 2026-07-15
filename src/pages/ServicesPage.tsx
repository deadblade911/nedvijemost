import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'

const serviceDetails = [
  { number: '01', title: 'Покупка', lead: 'От запроса до ключей', text: 'Формулируем критерии, собираем открытую и закрытую выборку, организуем показы, проверяем объект и ведём переговоры.' },
  { number: '02', title: 'Продажа', lead: 'Точная стратегия выхода', text: 'Оцениваем позицию объекта, создаём редакционную подачу, адресно работаем с покупателями и защищаем условия сделки.' },
  { number: '03', title: 'Private search', lead: 'За пределами публичного рынка', text: 'Ищем через владельцев, управляющих клубных домов и профессиональное сообщество, сохраняя полную конфиденциальность.' },
  { number: '04', title: 'Инвестиционный подбор', lead: 'Недвижимость как актив', text: 'Сопоставляем доходность, ликвидность и сценарии использования. Готовим модель и сопровождаем управление после покупки.' },
]

const steps = [
  ['01', 'Контекст', 'Обсуждаем образ жизни, задачи и границы решения.'],
  ['02', 'Редактура рынка', 'Отсеиваем шум и оставляем короткую сильную выборку.'],
  ['03', 'Проверка', 'Проверяем право, технику, окружение и цену каждого финалиста.'],
  ['04', 'Сделка', 'Ведём переговоры, документы и передачу объекта одной командой.'],
]

export default function ServicesPage() {
  return (
    <div className="services-page">
      <header className="inner-hero shell">
        <p className="eyebrow">Услуги бюро</p>
        <h1>Сопровождаем решение <em>целиком</em></h1>
        <p>От первого разговора до момента, когда пространство становится вашим. Без потери контекста между подрядчиками.</p>
      </header>

      <section className="service-details shell" aria-label="Услуги">
        {serviceDetails.map((service) => (
          <Reveal key={service.number} className="service-detail">
            <span>{service.number}</span>
            <div><small>{service.lead}</small><h2>{service.title}</h2></div>
            <p>{service.text}</p>
          </Reveal>
        ))}
      </section>

      <section className="process-section">
        <div className="shell">
          <header><p className="eyebrow">Процесс</p><h2>Четыре шага.<br /><em>Одна ответственность.</em></h2></header>
          <div className="process-grid">
            {steps.map(([number, title, text]) => (
              <div key={number} className="process-step" data-testid="process-step">
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="confidential-section shell">
        <div className="confidential-section__mark">L</div>
        <div><p className="eyebrow">Конфиденциальность</p><h2>Ваш запрос остаётся <em>между нами.</em></h2></div>
        <p>Не передаём контакты третьим лицам, не публикуем историю поиска и показываем закрытые объекты только после согласования с владельцем.</p>
      </section>

      <section className="inner-cta"><div className="shell"><p className="eyebrow">Первый шаг</p><h2>Расскажите, что должно измениться.</h2><Link to="/contact">Назначить консультацию <span>↗</span></Link></div></section>
    </div>
  )
}
