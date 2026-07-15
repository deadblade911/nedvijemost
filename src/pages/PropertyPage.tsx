import { Link, useParams } from 'react-router-dom'
import { FavoriteButton } from '../components/FavoriteButton'
import { LeadForm } from '../components/LeadForm'
import { LocationMap } from '../components/LocationMap'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyGallery } from '../components/PropertyGallery'
import { properties } from '../data/properties'
import { formatPrice } from '../domain/filterProperties'

export default function PropertyPage() {
  const { slug } = useParams()
  const property = properties.find((item) => item.slug === slug)

  if (!property) {
    return (
      <section className="object-not-found shell">
        <span>404 · Collection</span>
        <h1>Объект не найден</h1>
        <p>Возможно, предложение уже продано или перешло в закрытую коллекцию.</p>
        <Link to="/properties">Вернуться в коллекцию</Link>
      </section>
    )
  }

  const recommendations = properties.filter((item) => item.id !== property.id).slice(0, 2)

  return (
    <div className="property-page">
      <header className="property-hero shell">
        <div className="property-hero__breadcrumb"><Link to="/properties">Коллекция</Link><span>/</span><span>{property.district}</span></div>
        <div className="property-hero__title">
          <div><p className="eyebrow">{property.tag}</p><h1>{property.title}</h1><p>{property.address}</p></div>
          <div className="property-hero__price"><FavoriteButton id={property.id} title={property.title} /><strong>{formatPrice(property.price)}</strong><span>Комиссия агентства включена</span></div>
        </div>
      </header>

      <div className="property-gallery-wrap shell">
        <PropertyGallery key={property.id} images={property.images} title={property.title} />
      </div>

      <section className="property-overview shell">
        <div className="property-overview__main">
          <p className="eyebrow">Об объекте</p>
          <h2>Пространство, где <em>каждая деталь</em> остаётся уместной.</h2>
          <p className="property-overview__description">{property.description} Планировка разделяет приватную и гостевую зоны, а натуральные материалы сохраняют спокойную палитру в любое время дня.</p>
          <ul className="property-features" aria-label="Особенности объекта">
            {property.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <div className="property-characteristics">
            <div><span>Площадь</span><strong>{property.area} м²</strong></div>
            <div><span>Спальни</span><strong>{property.bedrooms}</strong></div>
            <div><span>Тип</span><strong>{property.type}</strong></div>
            <div><span>Статус</span><strong>Готов к показу</strong></div>
          </div>
          <div className="property-location">
            <div><p className="eyebrow">Окружение</p><h2>{property.district}</h2><p>Прогулочные маршруты, лучшие школы, рестораны и приватная городская инфраструктура — в пределах привычного дня.</p></div>
            <LocationMap district={property.district} address={property.address} coordinates={property.coordinates} />
          </div>
        </div>
        <aside className="property-overview__form"><LeadForm key={property.id} compact /></aside>
      </section>

      <section className="recommendations shell" aria-label="Похожие объекты">
        <header><p className="eyebrow">Продолжить выбор</p><h2>Похожие по характеру</h2></header>
        <div>{recommendations.map((item) => <PropertyCard key={item.id} property={item} />)}</div>
      </section>
    </div>
  )
}
