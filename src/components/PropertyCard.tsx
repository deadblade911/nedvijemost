import { Link } from 'react-router-dom'
import { formatPrice } from '../domain/filterProperties'
import type { Property } from '../domain/property'
import { FavoriteButton } from './FavoriteButton'

export function PropertyCard({ property, index }: { property: Property; index?: number }) {
  return (
    <article className="property-card">
      <div className="property-card__image-wrap">
        <Link to={`/properties/${property.slug}`} aria-label={`${property.title} — открыть объект`}>
          <img src={property.image} alt={`Интерьер объекта «${property.title}»`} loading="lazy" onError={(event) => { event.currentTarget.src = import.meta.env.BASE_URL + 'images/image-fallback.svg' }} />
        </Link>
        <span className="property-card__tag">{property.tag}</span>
        <FavoriteButton id={property.id} title={property.title} />
        {index !== undefined && <span className="property-card__index">{String(index + 1).padStart(2, '0')}</span>}
      </div>
      <div className="property-card__meta">
        <span>{property.district}</span>
        <span>{property.area} м² · {property.bedrooms} спальни</span>
      </div>
      <div className="property-card__title-row">
        <h3><Link to={`/properties/${property.slug}`}>{property.title}</Link></h3>
        <p>{formatPrice(property.price)}</p>
      </div>
    </article>
  )
}
