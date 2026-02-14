import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'

// Fix default marker icons in Vite (paths break otherwise)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = defaultIcon

const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#4F46E5;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

function FitBounds({ turfs, userPosition }) {
  const map = useMap()
  useEffect(() => {
    const positions = [...(turfs || []).filter((t) => t.lat != null && t.lng != null).map((t) => [t.lat, t.lng])]
    if (userPosition) positions.push([userPosition.lat, userPosition.lng])
    if (positions.length === 0) return
    if (positions.length === 1) {
      map.setView(positions[0], 14)
      return
    }
    map.fitBounds(positions, { padding: [40, 40], maxZoom: 12 })
  }, [map, turfs, userPosition])
  return null
}

function TurfMap({ turfs = [], singleTurfId = null, showUserLocation = true, className = '', height = '400px' }) {
  const [userPosition, setUserPosition] = useState(null)
  const [locationError, setLocationError] = useState(null)

  const turfsToShow = singleTurfId
    ? turfs.filter((t) => t.id === singleTurfId)
    : turfs.filter((t) => t.lat != null && t.lng != null)

  useEffect(() => {
    if (!showUserLocation || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocationError(true),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [showUserLocation])

  const center = turfsToShow.length
    ? [turfsToShow[0].lat, turfsToShow[0].lng]
    : userPosition
      ? [userPosition.lat, userPosition.lng]
      : [20.5937, 78.9629]
  const zoom = singleTurfId && turfsToShow.length === 1 ? 15 : 5

  return (
    <div className={className} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="h-full w-full rounded-2xl border border-gray-200 z-0"
        style={{ minHeight: 280 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {turfsToShow.length > 0 && <FitBounds turfs={turfsToShow} userPosition={userPosition} />}
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userLocationIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}
        {turfsToShow.map((turf) => (
          <Marker key={turf.id} position={[turf.lat, turf.lng]}>
            <Popup>
              <div className="min-w-[140px]">
                <p className="font-semibold text-gray-900">{turf.name}</p>
                <p className="text-sm text-gray-500">{turf.location}</p>
                <p className="text-sm text-primary mt-1">{turf.priceDisplay}</p>
                <Link to={`/turf/${turf.id}`} className="text-sm font-medium text-primary hover:underline mt-1 inline-block">
                  View & book →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {showUserLocation && locationError && (
        <p className="text-xs text-gray-500 mt-1">Location unavailable; showing turfs only.</p>
      )}
    </div>
  )
}

export default TurfMap
