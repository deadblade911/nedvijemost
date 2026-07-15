import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AppProviders } from './AppProviders'
import { AppRoutes } from './App'

afterEach(cleanup)

const routes = [
  ['/', 'Недвижимость как личная координата'],
  ['/properties', 'Коллекция недвижимости'],
  ['/properties/khamovniki-residence', 'Резиденция в Хамовниках'],
  ['/services', 'Сопровождаем решение целиком'],
  ['/about', 'Недвижимость начинается с доверия'],
  ['/contact', 'Начнём с разговора'],
  ['/missing', 'Страница вне коллекции'],
]

it.each(routes)('renders %s as a direct route', (path, heading) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders><AppRoutes /></AppProviders>
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
})
