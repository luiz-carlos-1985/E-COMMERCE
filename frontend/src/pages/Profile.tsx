import { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Mail, Shield, Calendar, Award, ShoppingBag, Heart, Edit2, Save, X, Camera } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Profile() {
  const { user, cart, wishlist } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const t = useTranslation();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">Please login to view your profile</p>
      </div>
    );
  }

  const stats = [
    { icon: ShoppingBag, label: 'Cart Items', value: cart.length, color: 'from-blue-500 to-cyan-500' },
    { icon: Heart, label: 'Wishlist', value: wishlist.length, color: 'from-pink-500 to-red-500' },
    { icon: Award, label: 'Points', value: '1,250', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white dark:border-gray-800 shadow-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:scale-110 transition">
                  <Camera size={20} className="text-purple-600 dark:text-purple-400" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                {editing ? (
                  <div className="space-y-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-3xl font-bold bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg w-full"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg w-full"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">{user.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">{user.email}</p>
                  </>
                )}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold">
                    <Shield size={16} />
                    {user.role}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                    <Calendar size={16} />
                    Member since 2024
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
                    >
                      <Save size={20} />
                      Save
                    </button>
                    <button
                      onClick={() => { setEditing(false); setName(user.name); setEmail(user.email); }}
                      className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
                  >
                    <Edit2 size={20} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon size={32} className="text-white" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Account Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <User className="text-purple-600 dark:text-purple-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Mail className="text-purple-600 dark:text-purple-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Security</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <span className="font-semibold text-gray-800 dark:text-gray-100">Change Password</span>
                <Edit2 size={20} className="text-purple-600 dark:text-purple-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <span className="font-semibold text-gray-800 dark:text-gray-100">Two-Factor Auth</span>
                <Shield size={20} className="text-purple-600 dark:text-purple-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
