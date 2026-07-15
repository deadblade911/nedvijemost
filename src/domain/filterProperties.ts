import type { Property, PropertyFilters } from './property'

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters,
): Property[] {
  return properties.filter(
    (property) =>
      (filters.district === undefined || property.district === filters.district) &&
      (filters.type === undefined || property.type === filters.type) &&
      (filters.maxPrice === undefined || property.price <= filters.maxPrice) &&
      (filters.bedrooms === undefined || property.bedrooms === filters.bedrooms),
  )
}

export function formatPrice(price: number): string {
  const millions = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 1,
  }).format(price / 1_000_000)

  return `${millions} млн ₽`
}
