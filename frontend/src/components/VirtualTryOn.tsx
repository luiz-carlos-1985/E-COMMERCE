import React from 'react';

const VirtualTryOn: React.FC = () => {
  return (
    <div className="bg-indigo-50 p-4 rounded text-center">
      <p className="mb-2">👤 Virtual Try-On</p>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Try Now
      </button>
    </div>
  );
};

export default VirtualTryOn;
