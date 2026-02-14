import { useParams, Link, useNavigate } from 'react-router-dom'
import SlotSelector from '../components/SlotSelector'
import EmptyState from '../components/EmptyState'
import TurfMap from '../components/TurfMap'
import { getTurfById, turfs } from '../data/mockData'

function TurfDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const turf = getTurfById(id)

  const handleBook = (slot) => {
    navigate('/payment', { state: { turf, slot, amount: turf?.price ?? 800 } })
  }

  if (!turf) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-16">
          <EmptyState
            icon="default"
            title="Turf not found"
            description="The turf you're looking for doesn't exist or has been removed"
            actionLabel="Back to Dashboard"
            onAction={() => navigate('/player')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link
        to="/player"
        className="text-primary hover:underline font-medium mb-6 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 sticky top-24 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h1 className="text-xl font-semibold text-text-primary">{turf.name}</h1>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">{turf.location}</p>
            <span className="inline-block mt-3 bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">
              {turf.sport}
            </span>
            <p className="text-xl font-semibold text-text-primary mt-4">{turf.priceDisplay}</p>
            <p className="text-sm text-text-secondary leading-relaxed">★ {turf.rating} rating</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary mb-2">Location</h2>
            <TurfMap turfs={turfs} singleTurfId={id} showUserLocation={true} height="240px" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <SlotSelector turfId={id} onBook={handleBook} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TurfDetails
