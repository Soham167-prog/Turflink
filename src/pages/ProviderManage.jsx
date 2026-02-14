import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProvider } from '../context/ProviderContext'

function ProviderManage() {
  const { locations, activeLocationId, setActiveLocationId, addLocation } = useProvider()
  const [turfName, setTurfName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [sportsInput, setSportsInput] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const sports = sportsInput.split(',').map((s) => s.trim()).filter(Boolean)
    addLocation({
      turfName: turfName.trim() || 'New Turf',
      address: address.trim() || '',
      city: city.trim() || '',
      basePrice: Number(basePrice) || 600,
      sports: sports.length ? sports : ['Football'],
    })
    setTurfName('')
    setAddress('')
    setCity('')
    setBasePrice('')
    setSportsInput('')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link
        to="/provider"
        className="text-primary hover:underline font-medium mb-6 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>
      <h1 className="text-xl font-semibold text-text-primary mb-8">Manage Locations</h1>

      {/* SECTION 1 — Add New Location */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Add New Location</h2>
        <form
          onSubmit={handleAdd}
          className="bg-card rounded-2xl border border-blue-100 p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="turfName" className="block text-sm font-medium text-text-secondary mb-1.5">Turf Name</label>
              <input
                id="turfName"
                type="text"
                value={turfName}
                onChange={(e) => setTurfName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface text-text-primary placeholder:text-text-secondary"
                placeholder="e.g. Central Sports Arena"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-1.5">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface text-text-primary placeholder:text-text-secondary"
                placeholder="Street, area"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-1.5">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface text-text-primary placeholder:text-text-secondary"
                placeholder="e.g. Mumbai"
              />
            </div>
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium text-text-secondary mb-1.5">Base Price per Hour (₹)</label>
              <input
                id="basePrice"
                type="number"
                min="0"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface text-text-primary placeholder:text-text-secondary"
                placeholder="600"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="sports" className="block text-sm font-medium text-text-secondary mb-1.5">Supported Sports (comma separated)</label>
            <input
              id="sports"
              type="text"
              value={sportsInput}
              onChange={(e) => setSportsInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface text-text-primary placeholder:text-text-secondary"
              placeholder="Football, Cricket, Badminton"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-2xl font-medium bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 shadow-sm transition-all duration-200"
          >
            Add Location
          </button>
        </form>
      </section>

      {/* SECTION 2 — Location Selector */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Select Active Location</h2>
        {locations.length === 0 ? (
          <div className="bg-card rounded-2xl border border-blue-100 p-12 text-center shadow-sm">
            <p className="text-text-500">No locations yet. Add one above.</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-blue-100 p-6 shadow-sm">
            <label htmlFor="activeLocation" className="block text-sm font-medium text-text-secondary mb-2">
              Select Active Location
            </label>
            <select
              id="activeLocation"
              value={activeLocationId ?? ''}
              onChange={(e) => setActiveLocationId(e.target.value || null)}
              className="w-full max-w-md px-4 py-2.5 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-surface text-text-primary placeholder:text-text-secondary"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.turfName} — {loc.city}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProviderManage
