import React from 'react';

const SizeGuide: React.FC = () => {
  return (
    <div className="p-3 border rounded">
      <p className="text-sm font-semibold mb-2">📏 Size Guide</p>
      <button className="text-blue-600 text-xs hover:underline">View Chart</button>
    </div>
  );
};

export default SizeGuide;
