import React from 'react';

const LiveStream: React.FC = () => {
  return (
    <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">🔴 LIVE</span>
        <h3 className="text-lg font-semibold">Live Shopping Event</h3>
      </div>
      <p className="text-gray-700">Watch and shop exclusive deals</p>
    </div>
  );
};

export default LiveStream;
