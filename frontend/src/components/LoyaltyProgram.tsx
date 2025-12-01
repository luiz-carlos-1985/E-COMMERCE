import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LoyaltyProgram: React.FC = () => {
  const t = useTranslation();
  return (
    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
      <h3 className="font-semibold mb-2 dark:text-gray-100">🎁 {t.loyalty?.title || 'Loyalty Rewards'}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{t.loyalty?.subtitle || 'Earn points with every purchase!'}</p>
    </div>
  );
};

export default LoyaltyProgram;
