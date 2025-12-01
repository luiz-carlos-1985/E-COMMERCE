import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Notifications from './components/Notifications';
import Wishlist from './components/Wishlist';
import CompareProducts from './components/CompareProducts';
import LiveChat from './components/LiveChat';
import AIAssistant from './components/AIAssistant';
import SocialProof from './components/SocialProof';
import OfflineNotification from './components/OfflineNotification';
import { useStore } from './store/useStore';

export default function App() {
  const theme = useStore(state => state.theme);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <OfflineNotification />
      <Navbar />
      <Notifications />
      <Wishlist />
      <CompareProducts />
      <LiveChat />
      <AIAssistant />
      <SocialProof />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
