import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import PostGameModal from './components/PostGameModal'
import { RouteGuard } from './components/RouteGuard'
import PlayerDashboard from './pages/PlayerDashboard'
import ProviderDashboard from './pages/ProviderDashboard'
import ProviderManage from './pages/ProviderManage'
import ProviderSlots from './pages/ProviderSlots'
import ProviderReviews from './pages/ProviderReviews'
import ProviderAIInsights from './pages/ProviderAIInsights'
import PlayerProfile from './pages/PlayerProfile'
import ActivityFeed from './pages/ActivityFeed'
import Landing from './pages/Landing'
import LoginPlayer from './pages/LoginPlayer'
import LoginProvider from './pages/LoginProvider'
import Payment from './pages/Payment'
import TurfDetails from './pages/TurfDetails'
import CreateRequest from './pages/CreateRequest'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface">
      <Toast />
      <PostGameModal />
      <Navbar
        isLanding={location.pathname === '/'}
        isLoginOrPayment={location.pathname.startsWith('/login') || location.pathname === '/payment'}
      />
      <main className="min-h-[calc(100vh-4rem)]">
        <RouteGuard>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/player" element={<LoginPlayer />} />
            <Route path="/login/provider" element={<LoginProvider />} />
            <Route path="/player" element={<PlayerDashboard />} />
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/manage" element={<ProviderManage />} />
            <Route path="/provider/slots" element={<ProviderSlots />} />
            <Route path="/provider/reviews" element={<ProviderReviews />} />
            <Route path="/provider/ai-insights" element={<ProviderAIInsights />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/activity" element={<ActivityFeed />} />
            <Route path="/profile/:id" element={<PlayerProfile />} />
            <Route path="/turf/:id" element={<TurfDetails />} />
            <Route path="/create-request" element={<CreateRequest />} />
          </Routes>
        </RouteGuard>
      </main>
    </div>
  )
}

export default App
