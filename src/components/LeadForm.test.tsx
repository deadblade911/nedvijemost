import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { LeadForm } from './LeadForm'

it('reports an honest demo success without claiming data was sent', async () => {
  const user = userEvent.setup()
  render(<LeadForm />)

  await user.type(screen.getByLabelText('Ваше имя'), 'Анна')
  await user.type(screen.getByLabelText('Телефон'), '+7 999 123-45-67')
  await user.click(screen.getByLabelText('Согласие на обработку данных'))
  await user.click(screen.getByRole('button', { name: 'Записаться на просмотр' }))

  const status = screen.getByRole('status')
  expect(status).toHaveTextContent('Демо-режим')
  expect(status).toHaveTextContent('Данные не отправлены.')
  expect(status).not.toHaveTextContent('Заявка принята')
})
