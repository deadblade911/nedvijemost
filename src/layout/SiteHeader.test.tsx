import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { FavoritesProvider } from '../features/favorites/FavoritesContext'
import { SiteHeader } from './SiteHeader'

it('opens and closes the mobile menu with the keyboard', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <FavoritesProvider>
        <SiteHeader />
        <main id="main-content"><button type="button">Фоновое действие</button></main>
        <footer>Подвал</footer>
      </FavoritesProvider>
    </MemoryRouter>,
  )

  const menuButton = screen.getByRole('button', { name: 'Открыть меню' })
  await user.click(menuButton)

  expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  const dialog = screen.getByRole('dialog', { name: 'Навигация' })
  expect(dialog).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: 'Коллекция' })).toHaveLength(2)
  expect(within(dialog).getByRole('link', { name: 'Избранное · 0' })).toHaveAttribute(
    'href',
    '/properties?favorites=1',
  )
  const firstLink = within(dialog).getByRole('link', { name: 'Коллекция' })
  const lastLink = within(dialog).getByRole('link', { name: '+7 (495) 021-17-17' })
  expect(firstLink).toHaveFocus()
  expect(screen.getByRole('main')).toHaveAttribute('inert')
  expect(document.body).toHaveStyle({ overflow: 'hidden' })

  await user.tab({ shift: true })
  expect(lastLink).toHaveFocus()
  await user.tab()
  expect(firstLink).toHaveFocus()

  await user.keyboard('{Escape}')

  expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  expect(menuButton).toHaveFocus()
  expect(screen.getByRole('main')).not.toHaveAttribute('inert')
  expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
  expect(screen.queryByRole('dialog', { name: 'Навигация' })).not.toBeInTheDocument()
})
