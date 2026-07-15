import { expect, it } from 'vitest'
import { validateLead } from './leadValidation'

it('returns field errors for an invalid lead', () => {
  expect(validateLead({ name: '', phone: '12', consent: false })).toEqual({
    name: 'Укажите имя',
    phone: 'Укажите телефон полностью',
    consent: 'Необходимо согласие',
  })
})

it('accepts a complete lead', () => {
  expect(validateLead({ name: 'Анна', phone: '+7 999 123-45-67', consent: true })).toEqual({})
})
