import { Link } from 'react-router-dom'
import Button from './Button'

function TurfCard({ turf }) {
  return (
    <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{turf.name}</h3>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">{turf.location}</p>
        </div>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-sm font-medium">
          {turf.sport}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
        <span>{turf.priceDisplay}</span>
        <span className="text-primary">★ {turf.rating}</span>
      </div>
      <Link to={`/turf/${turf.id}`}>
        <Button variant="primary" size="sm" fullWidth>
          View & Book
        </Button>
      </Link>
    </div>
  )
}

export default TurfCard
