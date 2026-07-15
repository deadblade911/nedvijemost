export function LocationMap({ district, address, coordinates }: { district: string; address: string; coordinates: [number, number] }) {
  return (
    <div className="location-map" role="img" aria-label={`Расположение: ${address}`}>
      <div className="location-map__river" aria-hidden="true" />
      <div className="location-map__street location-map__street--one" aria-hidden="true" />
      <div className="location-map__street location-map__street--two" aria-hidden="true" />
      <div className="location-map__marker"><i /><strong>{district}</strong><span>{address}</span></div>
      <span className="location-map__coordinates">{coordinates[0].toFixed(4)}° N<br />{coordinates[1].toFixed(4)}° E</span>
    </div>
  )
}
