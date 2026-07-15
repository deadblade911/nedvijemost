import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it } from 'vitest'
import { AppProviders } from '../app/AppProviders'
import PropertiesPage from './PropertiesPage'

beforeEach(() => localStorage.clear())

it('filters the collection, shows an empty state and resets it', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={['/properties?district=Хамовники&type=Квартира']}>
      <AppProviders>
        <PropertiesPage />
      </AppProviders>
    </MemoryRouter>,
  )

  expect(screen.getByText('Найден 1 объект')).toBeInTheDocument()
  expect(screen.getAllByRole('article')).toHaveLength(1)

  await user.selectOptions(screen.getByLabelText('Тип недвижимости'), 'Дом')

  expect(screen.getByRole('heading', { name: 'Таких объектов сейчас нет' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Сбросить фильтры' }))

  expect(screen.getByText('Найдено 8 объектов')).toBeInTheDocument()
  expect(screen.getAllByRole('article')).toHaveLength(8)
})

it('switches between grid and list views', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={['/properties']}>
      <AppProviders>
        <PropertiesPage />
      </AppProviders>
    </MemoryRouter>,
  )

  const listButton = screen.getByRole('button', { name: 'Показать списком' })
  expect(listButton).toHaveAttribute('aria-pressed', 'false')
  await user.click(listButton)
  expect(listButton).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByTestId('property-results')).toHaveClass('catalog-grid--list')
})

it('keeps favorites mode when filters are reset', async () => {
  const user = userEvent.setup()
  localStorage.setItem('locus-favorites', '["1"]')
  render(
    <MemoryRouter initialEntries={['/properties?favorites=1&type=Дом']}>
      <AppProviders>
        <PropertiesPage />
      </AppProviders>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Таких объектов сейчас нет' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Сбросить фильтры' }))

  expect(screen.getByRole('heading', { level: 1, name: 'Сохранённые объекты' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Резиденция на Остоженке' })).toBeInTheDocument()
  expect(screen.getAllByRole('article')).toHaveLength(1)
})

it('guides visitors from an empty saved collection back to all properties', () => {
  render(
    <MemoryRouter initialEntries={['/properties?favorites=1']}>
      <AppProviders>
        <PropertiesPage />
      </AppProviders>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'В избранном пока пусто' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Смотреть всю коллекцию' })).toHaveAttribute('href', '/properties')
  expect(screen.queryByRole('button', { name: 'Сбросить фильтры' })).not.toBeInTheDocument()
})
