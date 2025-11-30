import React from 'react';

const SocialShare: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">📘</button>
      <button className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600">🐦</button>
      <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">📱</button>
    </div>
  );
};

export default SocialShare;
