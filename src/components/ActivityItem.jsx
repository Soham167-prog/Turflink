import { Link } from 'react-router-dom'

const NameLink = ({ userId, children }) =>
  userId ? (
    <Link to={`/profile/${userId}`} className="font-semibold text-text-primary hover:text-primary transition-colors">
      {children}
    </Link>
  ) : (
    <span className="font-semibold text-text-primary">{children}</span>
  )

const icons = {
  booked: (
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  ),
  need_players: (
    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
  ),
  played: (
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
  feedback: (
    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
}

function ActivityItem({ item }) {
  const icon = icons[item.type] || icons.booked

  const renderContent = () => {
    switch (item.type) {
      case 'booked':
        return (
          <>
            <NameLink userId={item.userId}>{item.userName}</NameLink>
            {' booked '}
            <span className="font-medium text-text-primary">{item.turfName}</span>
            {' at '}
            <span className="text-primary font-medium">{item.time}</span>
          </>
        )
      case 'need_players':
        return (
          <>
            <NameLink userId={item.userId}>{item.userName}</NameLink>
            {' is looking for '}
            <span className="text-primary font-medium">{item.count} {item.count === 1 ? 'more player' : 'more players'}</span>
            {' for '}
            <span className="font-medium text-text-primary">{item.sport}</span>
            {item.turfName && (
              <>
                {' at '}
                <span className="font-medium">{item.turfName}</span>
                {item.time && (
                  <>
                    {' '}
                    <span className="text-text-secondary">at {item.time}</span>
                  </>
                )}
              </>
            )}
          </>
        )
      case 'played':
        return (
          <>
            <NameLink userId={item.userId}>{item.userName}</NameLink>
            {' played '}
            <span className="font-medium text-text-primary">{item.sport}</span>
            {' '}
            <span className="text-text-secondary">{item.when}</span>
          </>
        )
      case 'feedback':
        return (
          <>
            <NameLink userId={item.userId}>{item.userName}</NameLink>
            {' shared: "'}
            <span className="italic text-text-secondary">{item.summary}</span>
            {'"'}
            {item.rating && (
              <span className="ml-2 text-primary">★ {item.rating}/5</span>
            )}
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary leading-relaxed">{renderContent()}</p>
          <p className="text-sm text-text-secondary mt-2">{item.timestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default ActivityItem
