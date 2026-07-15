import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyFilters } from '../components/PropertyFilters'
import { properties } from '../data/properties'
import { filterProperties } from '../domain/filterProperties'
import type { PropertyFilters as Filters, PropertyType } from '../domain/property'
import { useFavorites } from '../features/favorites/FavoritesContext'

const propertyTypes: PropertyType[] = ['Квартира', 'Пентхаус', 'Дом']
const districts = new Set(properties.map((property) => property.district))

function parseFilters(params: URLSearchParams): Filters {
  const type = params.get('type')
  const district = params.get('district')
  const maxPrice = Number(params.get('maxPrice'))
  const bedrooms = Number(params.get('bedrooms'))
  return {
    type: propertyTypes.includes(type as PropertyType) ? type as PropertyType : undefined,
    district: district && districts.has(district) ? district : undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    bedrooms: Number.isInteger(bedrooms) && bedrooms > 0 ? bedrooms : undefined,
  }
}

function resultLabel(count: number) {
  if (count === 1) return 'Найден 1 объект'
  if (count > 1 && count < 5) return `Найдено ${count} объекта`
  return `Найдено ${count} объектов`
}

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { favorites } = useFavorites()
  const filters = parseFilters(searchParams)
  const favoritesOnly = searchParams.get('favorites') === '1'
  const emptyFavorites = favoritesOnly && !properties.some((property) => favorites.includes(property.id))
  const results = useMemo(() => {
    const filtered = filterProperties(properties, filters)
    return favoritesOnly ? filtered.filter((property) => favorites.includes(property.id)) : filtered
  }, [favorites, favoritesOnly, filters])

  function changeFilter(key: keyof Filters, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  function resetFilters() {
    const next = new URLSearchParams()
    if (favoritesOnly) next.set('favorites', '1')
    setSearchParams(next)
  }

  return (
    <div className="catalog-page">
      <header className="catalog-hero shell">
        <div><p className="eyebrow">Locus collection · 2026</p><h1>{favoritesOnly ? 'Сохранённые объекты' : 'Коллекция недвижимости'}</h1></div>
        <p>Резиденции Москвы и Подмосковья, отобранные по архитектуре, качеству среды и чистоте сделки.</p>
      </header>

      <div className="catalog-toolbar shell">
        <p aria-live="polite">{resultLabel(results.length)}</p>
        <button className="catalog-filter-toggle" type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((current) => !current)}>Фильтры</button>
        <div className="catalog-view-toggle" aria-label="Вид каталога">
          <button type="button" aria-label="Показать сеткой" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>▦</button>
          <button type="button" aria-label="Показать списком" aria-pressed={view === 'list'} onClick={() => setView('list')}>☰</button>
        </div>
      </div>

      <div className={`catalog-filters-wrap shell ${filtersOpen ? 'is-open' : ''}`}>
        <PropertyFilters filters={filters} onChange={changeFilter} onReset={resetFilters} />
      </div>

      {results.length === 0 ? (
        <section className="catalog-empty shell">
          <span>{emptyFavorites ? 'Saved · 0' : '0 / 38'}</span>
          <h2>{emptyFavorites ? 'В избранном пока пусто' : 'Таких объектов сейчас нет'}</h2>
          <p>{emptyFavorites
            ? 'Сохраняйте понравившиеся резиденции, чтобы быстро вернуться к ним и сравнить детали.'
            : 'Измените параметры или оставьте заявку на закрытый подбор — часть коллекции не публикуется.'}</p>
          {emptyFavorites
            ? <Link to="/properties">Смотреть всю коллекцию</Link>
            : <button type="button" onClick={resetFilters}>Сбросить фильтры</button>}
        </section>
      ) : (
        <div className={`catalog-grid shell catalog-grid--${view}`} data-testid="property-results">
          {results.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
          {results.length > 4 && (
            <aside className="catalog-private-cta">
              <span>Private search</span>
              <h2>Ищете то, чего нет в выдаче?</h2>
              <p>Откроем непубличную часть коллекции после короткого разговора.</p>
              <Link to="/contact">Запросить подбор →</Link>
            </aside>
          )}
        </div>
      )}
    </div>
  )
}
