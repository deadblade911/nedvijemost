import { LeadForm } from '../components/LeadForm'
import { LocationMap } from '../components/LocationMap'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <header className="inner-hero shell">
        <p className="eyebrow">Контакты</p>
        <h1>Начнём <em>с разговора</em></h1>
        <p>Расскажите о задаче. Советник задаст несколько точных вопросов и предложит следующий шаг без обязательств.</p>
      </header>

      <section className="contact-grid shell">
        <div className="contact-details">
          <div><span>Телефон</span><a href="tel:+74950211717">+7 (495) 021-17-17</a></div>
          <div><span>Email</span><a href="mailto:hello@locus-estate.ru">hello@locus-estate.ru</a></div>
          <div><span>Офис</span><strong>Пречистенская набережная, 17</strong><small>по предварительной записи</small></div>
          <div><span>Часы</span><strong>Пн — Сб, 09:00 — 20:00</strong></div>
          <p>Telegram · WhatsApp</p>
        </div>
        <LeadForm />
      </section>

      <section className="contact-map shell">
        <div><p className="eyebrow">Офис Locus</p><h2>В двух минутах<br />от Москвы-реки.</h2><p>Встречи проходят в приватной переговорной. Сообщите номер автомобиля — подготовим гостевой пропуск.</p></div>
        <LocationMap district="Хамовники" address="Пречистенская набережная, 17" coordinates={[55.7383, 37.5966]} />
      </section>
    </div>
  )
}
