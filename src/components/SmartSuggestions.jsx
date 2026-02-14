import { Link } from 'react-router-dom'
import Button from './Button'
import { getSmartSuggestions } from '../data/mockData'
import { useApp } from '../context/AppContext'

function SmartSuggestions() {
  const { followingIds } = useApp()
  const { friendSuggestions, similarPlayers } = getSmartSuggestions(followingIds)

  return (
    <div className="space-y-6">
      {friendSuggestions.length > 0 && (
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Friends Playing</h3>
          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            Your connections are playing soon. Join them?
          </p>
          <div className="space-y-3">
            {friendSuggestions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-surface border border-blue-100 shadow-md transition-all duration-200"
              >
                <div className="min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {s.userName} · {s.sport}
                  </p>
                  <p className="text-sm text-text-secondary truncate">
                    {s.turfName} at {s.time}
                  </p>
                </div>
                <Link to={s.turfId ? `/turf/${s.turfId}` : '/player'} className="flex-shrink-0">
                  <Button variant="primary" size="sm">
                    Join
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {similarPlayers.length > 0 && (
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Similar Players</h3>
          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            Players with similar interests at nearby turfs
          </p>
          <div className="space-y-3">
            {similarPlayers.map((s) => (
              <Link
                key={s.id}
                to={`/profile/${s.userId}`}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-surface border border-blue-100 shadow-md hover:border-primary/30 transition-all duration-200"
              >
                <div className="min-w-0">
                  <p className="font-medium text-text-primary truncate">{s.userName}</p>
                  <p className="text-sm text-text-secondary truncate">
                    {s.sport} · {s.turfName} at {s.time}
                  </p>
                </div>
                <span className="text-primary text-sm font-medium flex-shrink-0">View Profile</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartSuggestions
