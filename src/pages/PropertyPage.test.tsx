import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppProviders } from '../app/AppProviders'
import PropertyPage from './PropertyPage'

function renderProperty(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyPage />} />
        </Routes>
      </AppProviders>
    </MemoryRouter>,
  )
}

it('shows property details and an operable gallery', async () => {
  const user = userEvent.setup()
  renderProperty('/properties/khamovniki-residence')

  const heading = screen.getByRole('heading', { level: 1, name: 'Резиденция в Хамовниках' })
  expect(heading).toBeInTheDocument()
  expect(screen.getByText('420 млн ₽')).toBeInTheDocument()
  expect(within(heading.closest('header')!).getByText('Усачёва, 9')).toBeInTheDocument()
  expect(screen.getByRole('list', { name: 'Особенности объекта' })).toBeInTheDocument()
  expect(screen.getByText('Кадр 1 из 3')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Следующий кадр' }))
  expect(screen.getByText('Кадр 2 из 3')).toBeInTheDocument()

  const recommendations = screen.getByRole('region', { name: 'Похожие объекты' })
  expect(within(recommendations).getAllByRole('article')).toHaveLength(2)
  expect(screen.getByRole('button', { name: 'Записаться на просмотр' })).toBeInTheDocument()
})

it('resets the gallery when another property opens in place', async () => {
  const user = userEvent.setup()
  renderProperty('/properties/khamovniki-residence')

  await user.click(screen.getByRole('button', { name: 'Следующий кадр' }))
  expect(screen.getByText('Кадр 2 из 3')).toBeInTheDocument()

  const recommendations = screen.getByRole('region', { name: 'Похожие объекты' })
  await user.click(within(recommendations).getByRole('link', { name: 'Резиденция на Остоженке' }))

  expect(screen.getByRole('heading', { level: 1, name: 'Резиденция на Остоженке' })).toBeInTheDocument()
  expect(screen.getByText('Кадр 1 из 1')).toBeInTheDocument()
})

it('resets the viewing form when another property opens in place', async () => {
  const user = userEvent.setup()
  renderProperty('/properties/khamovniki-residence')

  await user.type(screen.getByLabelText('Ваше имя'), 'Анна')
  await user.type(screen.getByLabelText('Телефон'), '+7 999 123-45-67')
  await user.click(screen.getByLabelText('Согласие на обработку данных'))
  await user.click(screen.getByRole('button', { name: 'Записаться на просмотр' }))
  expect(screen.getByRole('status')).toBeInTheDocument()

  const recommendations = screen.getByRole('region', { name: 'Похожие объекты' })
  await user.click(within(recommendations).getByRole('link', { name: 'Резиденция на Остоженке' }))

  expect(screen.getByRole('button', { name: 'Записаться на просмотр' })).toBeInTheDocument()
})

it('guides visitors back when a property slug is unknown', () => {
  renderProperty('/properties/not-in-collection')

  expect(screen.getByRole('heading', { name: 'Объект не найден' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Вернуться в коллекцию' })).toHaveAttribute('href', '/properties')
})
