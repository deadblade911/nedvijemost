import { describe, expect, it } from 'vitest'
import { filterProperties, formatPrice } from './filterProperties'
import type { Property } from './property'

const sample: Property[] = [
  { id: '1', slug: 'one', title: 'One', district: 'Хамовники', address: 'Москва', type: 'Квартира', price: 190_000_000, area: 120, bedrooms: 2, image: '/one.webp', images: ['/one.webp'], tag: 'Новая коллекция', description: 'Описание', features: ['Терраса'], coordinates: [55.74, 37.58] },
  { id: '2', slug: 'two', title: 'Two', district: 'Остоженка', address: 'Москва', type: 'Пентхаус', price: 420_000_000, area: 240, bedrooms: 4, image: '/two.webp', images: ['/two.webp'], tag: 'Эксклюзив', description: 'Описание', features: ['Камин'], coordinates: [55.73, 37.6] },
]

describe('filterProperties', () => {
  it('combines district, type, maximum price and bedrooms', () => {
    expect(filterProperties(sample, { district: 'Хамовники', type: 'Квартира', maxPrice: 250_000_000, bedrooms: 2 })).toEqual([sample[0]])
  })

  it('returns all properties for empty filters', () => {
    expect(filterProperties(sample, {})).toEqual(sample)
  })
})

it('formats price as compact Russian rubles', () => {
  expect(formatPrice(190_000_000)).toBe('190 млн ₽')
})
