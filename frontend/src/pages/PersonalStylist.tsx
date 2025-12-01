import { useState } from 'react';
import { Sparkles, Shirt, Heart, Wand2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function PersonalStylist() {
  const [profile, setProfile] = useState<any>(null);
  const t = useTranslation();

  const createProfile = (data: any) => {
    setProfile(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Wand2 className="text-pink-400" size={48} />
            {t.stylist?.title || 'Personal Stylist'}
          </h1>
          <p className="text-xl text-gray-300">{t.stylist?.subtitle || 'Your intelligent fashion consultant'}</p>
        </div>

        {!profile ? (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Create Your Style Profile</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                createProfile({
                  bodyType: formData.get('bodyType'),
                  colors: formData.get('colors'),
                  styles: formData.get('styles'),
                  budget: formData.get('budget')
                });
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-white mb-2">Body Type</label>
                <select name="bodyType" className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30">
                  <option value="athletic">Athletic</option>
                  <option value="slim">Slim</option>
                  <option value="curvy">Curvy</option>
                  <option value="plus">Plus Size</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Favorite Colors</label>
                <input
                  name="colors"
                  type="text"
                  placeholder="black, white, blue"
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Preferred Styles</label>
                <input
                  name="styles"
                  type="text"
                  placeholder="casual, elegant, sporty"
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Budget</label>
                <select name="budget" className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30">
                  <option value="LOW">Budget</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="LUXURY">Luxury</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-4 rounded-xl text-white font-bold text-lg hover:scale-105 transition-transform"
              >
                {t.stylist?.button || 'Create Profile'}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Your Style Profile</h2>
            <div className="space-y-4 text-white">
              <div className="flex justify-between">
                <span className="text-gray-300">Body Type:</span>
                <span className="font-semibold">{profile.bodyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Favorite Colors:</span>
                <span className="font-semibold">{profile.colors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Styles:</span>
                <span className="font-semibold">{profile.styles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Budget:</span>
                <span className="font-semibold">{profile.budget}</span>
              </div>
            </div>
            <button
              onClick={() => setProfile(null)}
              className="w-full mt-6 bg-white/20 py-3 rounded-xl text-white hover:bg-white/30 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
