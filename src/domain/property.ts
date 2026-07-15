export type PropertyType = 'Квартира' | 'Пентхаус' | 'Дом'

export interface Property {
  id: string
  slug: string
  title: string
  district: string
  address: string
  type: PropertyType
  price: number
  area: number
  bedrooms: number
  image: string
  images: string[]
  tag: string
  description: string
  features: string[]
  coordinates: [number, number]
}

export interface PropertyFilters {
  district?: string
  type?: PropertyType
  maxPrice?: number
  bedrooms?: number
}
