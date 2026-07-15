import { useFavorites } from '../features/favorites/FavoritesContext'

export function FavoriteButton({ id, title }: { id: string; title: string }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      className={`favorite-button ${active ? 'favorite-button--active' : ''}`}
      type="button"
      aria-label={`${active ? 'Убрать из избранного' : 'Добавить в избранное'}: ${title}`}
      aria-pressed={active}
      onClick={() => toggleFavorite(id)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.4 4.3 13A4.7 4.7 0 0 1 11 6.5l1 1 1-1A4.7 4.7 0 0 1 19.7 13Z" />
      </svg>
    </button>
  )
}
