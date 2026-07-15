import type { PropertyFilters as Filters, PropertyType } from '../domain/property'

const districts = ['Хамовники', 'Остоженка', 'Патриаршие пруды', 'Раменки', 'Рублёво-Успенское направление']

export function PropertyFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters
  onChange: (key: keyof Filters, value: string) => void
  onReset: () => void
}) {
  return (
    <div className="property-filters">
      <label>
        <span>Тип недвижимости</span>
        <select value={filters.type ?? ''} onChange={(event) => onChange('type', event.target.value)}>
          <option value="">Все типы</option>
          {(['Квартира', 'Пентхаус', 'Дом'] satisfies PropertyType[]).map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label>
        <span>Район</span>
        <select value={filters.district ?? ''} onChange={(event) => onChange('district', event.target.value)}>
          <option value="">Все районы</option>
          {districts.map((district) => <option key={district}>{district}</option>)}
        </select>
      </label>
      <label>
        <span>Бюджет до</span>
        <select value={filters.maxPrice ?? ''} onChange={(event) => onChange('maxPrice', event.target.value)}>
          <option value="">Без ограничения</option>
          <option value="200000000">200 млн ₽</option>
          <option value="400000000">400 млн ₽</option>
          <option value="700000000">700 млн ₽</option>
          <option value="900000000">900 млн ₽</option>
        </select>
      </label>
      <label>
        <span>Спальни</span>
        <select value={filters.bedrooms ?? ''} onChange={(event) => onChange('bedrooms', event.target.value)}>
          <option value="">Любое число</option>
          {[2, 3, 4, 5, 6].map((bedrooms) => <option key={bedrooms} value={bedrooms}>{bedrooms}</option>)}
        </select>
      </label>
      <button type="button" onClick={onReset}>Сбросить</button>
    </div>
  )
}
