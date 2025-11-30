import React from 'react';

const PriceAlert: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
      <p className="text-sm">🔔 Get notified when price drops</p>
      <button className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
        Set Alert
      </button>
    </div>
  );
};

export default PriceAlert;
