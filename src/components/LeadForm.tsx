import { useState } from 'react'
import type { FormEvent } from 'react'
import { validateLead } from '../domain/leadValidation'
import type { LeadValues } from '../domain/leadValidation'

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<LeadValues>({ name: '', phone: '', consent: false })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadValues, string>>>({})
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateLead(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSent(true)
  }

  if (sent) {
    return (
      <div className="lead-success" role="status">
        <span>Демо-режим</span>
        <strong>Форма заполнена.</strong>
        <p>Данные не отправлены. В рабочей версии советник связался бы с вами в рабочее время.</p>
      </div>
    )
  }

  return (
    <form className={`lead-form ${compact ? 'lead-form--compact' : ''}`} onSubmit={submit} noValidate>
      <div className="lead-form__heading">
        <span className="eyebrow">Приватный просмотр</span>
        <h2>Увидеть объект лично</h2>
        <p>Предложим удобное время и заранее подготовим ответы по объекту.</p>
      </div>
      <label>
        <span>Ваше имя</span>
        <input value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} aria-invalid={Boolean(errors.name)} />
        {errors.name && <small>{errors.name}</small>}
      </label>
      <label>
        <span>Телефон</span>
        <input type="tel" value={values.phone} placeholder="+7 999 000-00-00" onChange={(event) => setValues({ ...values, phone: event.target.value })} aria-invalid={Boolean(errors.phone)} />
        {errors.phone && <small>{errors.phone}</small>}
      </label>
      <label className="lead-form__consent">
        <input type="checkbox" checked={values.consent} onChange={(event) => setValues({ ...values, consent: event.target.checked })} aria-label="Согласие на обработку данных" />
        <span>Согласен на обработку данных</span>
      </label>
      {errors.consent && <small className="lead-form__consent-error">{errors.consent}</small>}
      <button type="submit">Записаться на просмотр <span aria-hidden="true">→</span></button>
      <div className="lead-form__status" aria-live="polite">{Object.keys(errors).length > 0 ? 'Проверьте заполнение формы' : ''}</div>
    </form>
  )
}
