import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Notifications from './components/Notifications';
import WishlistPage from './pages/Wishlist';
import CompareProducts from './components/CompareProducts';
import LiveChat from './components/LiveChat';
import AIAssistant from './components/AIAssistant';
import SocialProof from './components/SocialProof';
import OfflineNotification from './components/OfflineNotification';
import LoyaltyProgram from './pages/LoyaltyProgram';
import MetaverseStore from './pages/MetaverseStore';
import PersonalStylist from './pages/PersonalStylist';
import Dashboard from './pages/Dashboard';
import { useStore } from './store/useStore';

export default function App() {
  const theme = useStore(state => state.theme);
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <OfflineNotification />
      <Navbar />
      <Notifications />
      <CompareProducts />

      <AIAssistant />
      <SocialProof />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/loyalty" element={<LoyaltyProgram />} />
        <Route path="/metaverse" element={<MetaverseStore />} />
        <Route path="/stylist" element={<PersonalStylist />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
