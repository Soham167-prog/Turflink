const TIME_SLOTS = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getNext7Days = () => {
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push({
      date: d.toISOString().split('T')[0],
      day: DAYS[d.getDay()],
      label: d.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()].slice(0,3)
    })
  }
  return days
}

export const turfs = [
  { id: '1', name: 'Green Valley Sports Arena', location: 'Mumbai, Maharashtra', sport: 'Football', price: 750, priceDisplay: '₹750/hr', rating: 4.2, lat: 19.076, lng: 72.8777 },
  { id: '2', name: 'Royal Turf Club', location: 'Bangalore, Karnataka', sport: 'Cricket', price: 900, priceDisplay: '₹900/hr', rating: 4.5, lat: 12.9716, lng: 77.5946 },
  { id: '3', name: 'Sky Sports Complex', location: 'Delhi NCR', sport: 'Football', price: 800, priceDisplay: '₹800/hr', rating: 4.2, lat: 28.7041, lng: 77.1025 },
  { id: '4', name: 'Coastal Arena', location: 'Chennai, Tamil Nadu', sport: 'Hockey', price: 700, priceDisplay: '₹700/hr', rating: 4.4, lat: 13.0827, lng: 80.2707 },
  { id: '5', name: 'Metro Turf Ground', location: 'Hyderabad, Telangana', sport: 'Football', price: 600, priceDisplay: '₹600/hr', rating: 4.0, lat: 17.385, lng: 78.4867 },
]

const bookedSlots = {
  '1': [
    { date: getNext7Days()[0].date, time: '6:00 PM' },
    { date: getNext7Days()[0].date, time: '7:00 PM' },
    { date: getNext7Days()[1].date, time: '10:00 AM' },
    { date: getNext7Days()[2].date, time: '5:00 PM' },
  ],
  '2': [
    { date: getNext7Days()[0].date, time: '9:00 AM' },
    { date: getNext7Days()[1].date, time: '3:00 PM' },
  ],
  '3': [
    { date: getNext7Days()[0].date, time: '6:00 PM' },
    { date: getNext7Days()[0].date, time: '7:00 PM' },
    { date: getNext7Days()[1].date, time: '8:00 PM' },
  ],
  '4': [],
  '5': [
    { date: getNext7Days()[0].date, time: '4:00 PM' },
  ],
}

export const getSlotsForTurf = (turfId, date) => {
  const turfBooked = bookedSlots[turfId] || []
  const bookedForDate = turfBooked.filter(b => b.date === date).map(b => b.time)
  return TIME_SLOTS.map(time => ({
    time,
    available: !bookedForDate.includes(time),
  }))
}

export const getAllSlotsGrid = (turfId) => {
  const days = getNext7Days()
  const turfBooked = bookedSlots[turfId] || []
  const grid = {}
  days.forEach(d => {
    grid[d.date] = getSlotsForTurf(turfId, d.date)
  })
  return { days, grid }
}

export const playerRequests = [
  { id: 'pr1', turfId: '1', turfName: 'Green Valley Sports Arena', date: getNext7Days()[0].date, time: '6:00 PM', sport: 'Football', needed: 4, joined: 2, createdBy: 'Rahul K.' },
  { id: 'pr2', turfId: '3', turfName: 'Sky Sports Complex', date: getNext7Days()[1].date, time: '5:00 PM', sport: 'Football', needed: 6, joined: 5, createdBy: 'Priya S.' },
  { id: 'pr3', turfId: '2', turfName: 'Royal Turf Club', date: getNext7Days()[2].date, time: '3:00 PM', sport: 'Cricket', needed: 10, joined: 7, createdBy: 'Arjun M.' },
  { id: 'pr4', turfId: '1', turfName: 'Green Valley Sports Arena', date: getNext7Days()[0].date, time: '8:00 PM', sport: 'Football', needed: 4, joined: 0, createdBy: 'Vikram R.' },
]

const pDays = getNext7Days()

export const providerStats = {
  totalBookingsThisMonth: 12,
  upcomingMatches: 3,
  averageRating: 4.2,
  revenueThisWeek: 7200,
}

const LOC_GREEN = 'loc1'
const LOC_ROYAL = 'loc2'

export const providerSlots = [
  { id: 's1', locationId: LOC_GREEN, turfName: 'Green Valley Sports Arena', date: pDays[0].date, time: '6:00 PM', sport: 'Football', status: 'booked', bookedBy: 'Rahul K.' },
  { id: 's2', locationId: LOC_GREEN, turfName: 'Green Valley Sports Arena', date: pDays[0].date, time: '7:00 PM', sport: 'Football', status: 'booked', bookedBy: 'Priya S.' },
  { id: 's3', locationId: LOC_GREEN, turfName: 'Green Valley Sports Arena', date: pDays[0].date, time: '8:00 PM', sport: 'Football', status: 'available', bookedBy: null },
  { id: 's4', locationId: LOC_GREEN, turfName: 'Green Valley Sports Arena', date: pDays[1].date, time: '10:00 AM', sport: 'Football', status: 'booked', bookedBy: 'Arjun' },
  { id: 's5', locationId: LOC_ROYAL, turfName: 'Royal Turf Club', date: pDays[1].date, time: '3:00 PM', sport: 'Cricket', status: 'booked', bookedBy: 'Team Alpha' },
  { id: 's6', locationId: LOC_ROYAL, turfName: 'Royal Turf Club', date: pDays[1].date, time: '4:00 PM', sport: 'Cricket', status: 'available', bookedBy: null },
]

export const providerUpcomingMatches = [
  { id: 'pm1', locationId: LOC_GREEN, sport: 'Football', date: '18 Feb', time: '6:00 PM', bookedBy: 'Arjun', playersJoined: 9, playersNeeded: 10 },
  { id: 'pm2', locationId: LOC_GREEN, sport: 'Badminton', date: '19 Feb', time: '7:00 PM', bookedBy: 'Sneha', playersJoined: 3, playersNeeded: 4 },
  { id: 'pm3', locationId: LOC_ROYAL, sport: 'Football', date: '20 Feb', time: '5:00 PM', bookedBy: 'Rohit', playersJoined: 6, playersNeeded: 8 },
]

export const providerReviews = [
  { id: 'r1', locationId: LOC_GREEN, playerName: 'Arjun', sport: 'Football', date: '12 Feb 2026', rating: 4.5, text: 'Well maintained turf. Lighting was good.' },
  { id: 'r2', locationId: LOC_GREEN, playerName: 'Sneha', sport: 'Badminton', date: '10 Feb 2026', rating: 4, text: 'Clean courts. Would book again.' },
  { id: 'r3', locationId: LOC_ROYAL, playerName: 'Rohit', sport: 'Football', date: '8 Feb 2026', rating: 5, text: 'Best turf in the area. Highly recommend.' },
]

export const TIME_SLOTS_LIST = TIME_SLOTS
export const getNextDays = getNext7Days
export const getTurfById = (id) => turfs.find((t) => t.id === id)

const days = getNext7Days()

export const currentUserId = 'me'
export const profiles = [
  { id: 'me', name: 'You', followers: 8, following: 6, upcomingGames: 1, pastGames: 4 },
  { id: 'u1', name: 'Ram S.', followers: 6, following: 4, upcomingGames: 1, pastGames: 8 },
  { id: 'u2', name: 'Ananya K.', followers: 4, following: 3, upcomingGames: 0, pastGames: 5 },
  { id: 'u3', name: 'Rahul K.', followers: 7, following: 5, upcomingGames: 1, pastGames: 9 },
  { id: 'u4', name: 'Priya S.', followers: 5, following: 4, upcomingGames: 0, pastGames: 6 },
  { id: 'u5', name: 'Vikram R.', followers: 3, following: 2, upcomingGames: 0, pastGames: 3 },
]

export const initialFollowing = ['u1', 'u3', 'u4']

export const upcomingGames = [
  { id: 'g1', userId: 'me', turfId: '1', turfName: 'Green Valley Sports Arena', date: days[0].date, time: '7:00 PM', sport: 'Football' },
  { id: 'g3', userId: 'u1', turfId: '1', turfName: 'Green Valley Sports Arena', date: days[0].date, time: '7:00 PM', sport: 'Football' },
  { id: 'g4', userId: 'u1', turfId: '2', turfName: 'Royal Turf Club', date: days[1].date, time: '9:00 AM', sport: 'Cricket' },
  { id: 'g5', userId: 'u3', turfId: '5', turfName: 'Metro Turf Ground', date: days[0].date, time: '6:00 PM', sport: 'Football' },
]

export const pastGames = [
  { id: 'pg1', userId: 'me', turfName: 'Green Valley Sports Arena', date: '2026-02-10', time: '6:00 PM', sport: 'Football' },
  { id: 'pg2', userId: 'me', turfName: 'Royal Turf Club', date: '2026-02-08', time: '3:00 PM', sport: 'Cricket' },
  { id: 'pg3', userId: 'me', turfName: 'Sky Sports Complex', date: '2026-02-05', time: '5:00 PM', sport: 'Football' },
  { id: 'pg4', userId: 'me', turfName: 'Metro Turf Ground', date: '2026-02-01', time: '6:00 PM', sport: 'Football' },
  { id: 'pg6', userId: 'u1', turfName: 'Sky Sports Complex', date: '2026-02-11', time: '5:00 PM', sport: 'Football' },
]

export const initialActivityFeed = [
  { id: 'a1', type: 'booked', userId: 'u1', userName: 'Arjun', turfName: 'GreenField Turf', time: '6:00 PM', timestamp: '2h ago' },
  { id: 'a2', type: 'need_players', userId: 'u2', userName: 'Sneha', sport: 'Badminton', count: 1, turfName: 'Coastal Arena', time: '4:00 PM', timestamp: '3h ago' },
  { id: 'a3', type: 'played', userId: 'u3', userName: 'Rohit', sport: 'Football', when: 'yesterday', timestamp: '5h ago' },
  { id: 'a4', type: 'booked', userId: 'u4', userName: 'Priya S.', turfName: 'Sky Sports Complex', time: '5:00 PM', timestamp: '6h ago' },
  { id: 'a5', type: 'feedback', userId: 'u3', userName: 'Rahul K.', sport: 'Football', summary: 'Great match! 5-a-side with solid teamwork.', rating: 5, timestamp: '1d ago' },
]

export const getActivityForUser = (userId) => {
  const userGames = [...upcomingGames, ...pastGames].filter(g => g.userId === userId)
  const user = profiles.find(p => p.id === userId)
  return { games: userGames, profile: user }
}

export const getSmartSuggestions = (followingIds) => {
  const suggestions = []
  const myGames = upcomingGames.filter(g => g.userId === 'me')
  followingIds.forEach(fid => {
    const friendGames = upcomingGames.filter(g => g.userId === fid)
    friendGames.forEach(fg => {
      const profile = profiles.find(p => p.id === fid)
      suggestions.push({
        id: `s-${fg.id}`,
        type: 'friend_playing',
        userId: fid,
        userName: profile?.name || 'Friend',
        turfName: fg.turfName,
        turfId: fg.turfId,
        time: fg.time,
        date: fg.date,
        sport: fg.sport,
      })
    })
  })
  const similarPlayers = upcomingGames
    .filter(g => g.userId !== 'me')
    .slice(0, 3)
    .map(g => {
      const p = profiles.find(pr => pr.id === g.userId)
      return { id: `sim-${g.id}`, userId: g.userId, userName: p?.name, sport: g.sport, turfName: g.turfName, time: g.time, turfId: g.turfId }
    })
  return { friendSuggestions: suggestions.slice(0, 5), similarPlayers }
}
