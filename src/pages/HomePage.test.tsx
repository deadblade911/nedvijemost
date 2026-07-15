import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppProviders } from '../app/AppProviders'
import HomePage from './HomePage'

it('presents the complete editorial home page', () => {
  render(
    <MemoryRouter>
      <AppProviders>
        <HomePage />
      </AppProviders>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Недвижимость как личная координата' })).toBeInTheDocument()
  expect(screen.getByLabelText('Тип объекта')).toBeInTheDocument()
  expect(screen.getByLabelText('Район')).toBeInTheDocument()
  expect(screen.getByLabelText('Бюджет до')).toBeInTheDocument()
  expect(screen.getAllByRole('article')).toHaveLength(4)
  const districts = within(screen.getByRole('region', { name: 'Районы Москвы' }))
  expect(districts.getByText('Хамовники')).toBeInTheDocument()
  expect(districts.getByText('Патриаршие пруды')).toBeInTheDocument()
  expect(districts.getByText('Остоженка')).toBeInTheDocument()
  expect(districts.getByText('Раменки')).toBeInTheDocument()
  expect(districts.getByText('Рублёво-Успенское')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Работаем на вашей стороне' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Обсудить персональный подбор' })).toHaveAttribute('href', '/contact')
})
