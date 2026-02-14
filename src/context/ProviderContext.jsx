import { createContext, useContext, useState } from 'react'

const initialLocations = [
  { id: 'loc1', turfName: 'Green Valley Sports Arena', address: 'Sector 1, Andheri East', city: 'Mumbai', basePrice: 750, sports: ['Football'] },
  { id: 'loc2', turfName: 'Royal Turf Club', address: 'Koramangala', city: 'Bangalore', basePrice: 900, sports: ['Cricket'] },
]

const ProviderContext = createContext(null)

export function ProviderProvider({ children }) {
  const [locations, setLocations] = useState(initialLocations)
  const [activeLocationId, setActiveLocationId] = useState(initialLocations[0]?.id ?? null)

  const addLocation = (loc) => {
    const id = 'loc' + Date.now()
    setLocations((prev) => [...prev, { ...loc, id }])
    setActiveLocationId(id)
  }

  const activeLocation = locations.find((l) => l.id === activeLocationId) ?? null

  return (
    <ProviderContext.Provider
      value={{
        locations,
        activeLocationId,
        activeLocation,
        setActiveLocationId,
        addLocation,
      }}
    >
      {children}
    </ProviderContext.Provider>
  )
}

export function useProvider() {
  const ctx = useContext(ProviderContext)
  return ctx
}
