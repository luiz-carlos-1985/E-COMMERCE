import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const PersonalStylist: React.FC = () => {
  const t = useTranslation();
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">👗 {t.stylist?.title || 'Personal Stylist'}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-3">{t.stylist?.subtitle || 'Get personalized fashion recommendations'}</p>
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        {t.stylist?.button || 'Start Styling'}
      </button>
    </div>
  );
};

export default PersonalStylist;
