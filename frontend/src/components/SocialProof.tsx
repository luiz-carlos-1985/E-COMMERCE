import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const SocialProof: React.FC = () => {
  const [viewers, setViewers] = useState(5);
  const t = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(Math.floor(Math.random() * 10) + 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs z-40 border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-800 dark:text-gray-100">
        🔥 <strong>{viewers} {t.social?.people || 'people'}</strong> {t.social?.viewing || 'are viewing this product'}
      </p>
    </div>
  );
};

export default SocialProof;
