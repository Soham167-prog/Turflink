import Button from './Button'

function PlayerRequestCard({ request, onJoin, joined = false }) {
  const spotsLeft = request.needed - request.joined
  const full = spotsLeft <= 0

  return (
    <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-text-primary truncate">{request.turfName}</h3>
        <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">
          {request.date} · {request.time} · {request.sport}
        </p>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          By {request.createdBy} · {request.joined}/{request.needed} players
        </p>
        {!full && (
          <span className="inline-block mt-2 text-success text-sm font-medium">
            {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left
          </span>
        )}
      </div>
      <div className="flex-shrink-0">
        <Button
          variant={full ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => onJoin?.(request)}
          disabled={full || joined}
        >
          {full ? 'Full' : joined ? 'Joined' : 'Join'}
        </Button>
      </div>
    </div>
  )
}

export default PlayerRequestCard
