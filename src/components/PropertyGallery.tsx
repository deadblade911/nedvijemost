import { useState } from 'react'

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const move = (direction: number) => setActive((current) => (current + direction + images.length) % images.length)

  return (
    <div
      className="property-gallery"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1)
        if (event.key === 'ArrowRight') move(1)
      }}
    >
      <img src={images[active]} alt={`${title}, кадр ${active + 1}`} onError={(event) => { event.currentTarget.src = '/images/image-fallback.svg' }} />
      <div className="property-gallery__controls">
        <button type="button" aria-label="Предыдущий кадр" onClick={() => move(-1)}>←</button>
        <span aria-live="polite">Кадр {active + 1} из {images.length}</span>
        <button type="button" aria-label="Следующий кадр" onClick={() => move(1)}>→</button>
      </div>
      <div className="property-gallery__thumbs" aria-label="Миниатюры галереи">
        {images.map((image, index) => (
          <button key={`${image}-${index}`} type="button" aria-label={`Показать кадр ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}>
            <img src={image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
