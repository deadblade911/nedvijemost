import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it } from 'vitest'
import { FavoritesProvider, useFavorites } from './FavoritesContext'

function Harness() {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <button type="button" onClick={() => toggleFavorite('estate-1')}>
      {favorites.includes('estate-1') ? 'Сохранено' : 'Сохранить'}
    </button>
  )
}

beforeEach(() => localStorage.clear())

it('toggles a favorite and persists it', async () => {
  const user = userEvent.setup()
  render(
    <FavoritesProvider>
      <Harness />
    </FavoritesProvider>,
  )

  await user.click(screen.getByRole('button', { name: 'Сохранить' }))

  expect(screen.getByRole('button', { name: 'Сохранено' })).toBeInTheDocument()
  expect(localStorage.getItem('locus-favorites')).toBe('["estate-1"]')
})
