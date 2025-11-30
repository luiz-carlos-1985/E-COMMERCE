import React from 'react';

const GamificationBadges: React.FC = () => {
  return (
    <div className="flex gap-2 p-4">
      <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">🏆 VIP</span>
      <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">⭐ Top Buyer</span>
    </div>
  );
};

export default GamificationBadges;
