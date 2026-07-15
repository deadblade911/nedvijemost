export interface LeadValues {
  name: string
  phone: string
  consent: boolean
}

type LeadErrors = Partial<Record<keyof LeadValues, string>>

export function validateLead(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {}

  if (!values.name.trim()) errors.name = 'Укажите имя'
  if (values.phone.replace(/\D/g, '').length < 11) {
    errors.phone = 'Укажите телефон полностью'
  }
  if (!values.consent) errors.consent = 'Необходимо согласие'

  return errors
}
