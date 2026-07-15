import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppProviders } from '../app/AppProviders'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import NotFoundPage from './NotFoundPage'
import ServicesPage from './ServicesPage'

function renderPage(page: React.ReactNode) {
  return render(<MemoryRouter><AppProviders>{page}</AppProviders></MemoryRouter>)
}

it('presents four services and a four-step process', () => {
  renderPage(<ServicesPage />)
  expect(screen.getByRole('heading', { level: 1, name: 'Сопровождаем решение целиком' })).toBeInTheDocument()
  expect(within(screen.getByRole('region', { name: 'Услуги' })).getAllByRole('heading', { level: 2 })).toHaveLength(4)
  expect(screen.getAllByTestId('process-step')).toHaveLength(4)
})

it('presents the bureau manifesto, metrics and team', () => {
  renderPage(<AboutPage />)
  expect(screen.getByRole('heading', { level: 1, name: 'Недвижимость начинается с доверия' })).toBeInTheDocument()
  expect(screen.getByText('340+')).toBeInTheDocument()
  expect(screen.getByText('Елена Воронцова')).toBeInTheDocument()
  expect(screen.getByText('Михаил Арсеньев')).toBeInTheDocument()
  expect(screen.getByText('Анна Левина')).toBeInTheDocument()
})

it('shows office details and a consultation form', () => {
  renderPage(<ContactPage />)
  expect(screen.getByRole('heading', { level: 1, name: 'Начнём с разговора' })).toBeInTheDocument()
  expect(screen.getAllByText('Пречистенская набережная, 17')).toHaveLength(2)
  expect(screen.getByLabelText('Ваше имя')).toBeInTheDocument()
  expect(screen.getByLabelText('Телефон')).toBeInTheDocument()
})

it('renders an intentional not-found page', () => {
  renderPage(<NotFoundPage />)
  expect(screen.getByRole('heading', { name: 'Страница вне коллекции' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Вернуться на главную' })).toHaveAttribute('href', '/')
})
