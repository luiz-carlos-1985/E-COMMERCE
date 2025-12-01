import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const GamificationBadges: React.FC = () => {
  const t = useTranslation();
  return (
    <div className="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">🏆 {t.badges?.vip || 'VIP'}</span>
      <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">⭐ {t.badges?.topBuyer || 'Top Buyer'}</span>
    </div>
  );
};

export default GamificationBadges;
