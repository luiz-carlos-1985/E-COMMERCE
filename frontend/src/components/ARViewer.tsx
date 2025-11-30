import React from 'react';

interface ARViewerProps {
  productId: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ productId }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg text-center">
      <p className="text-gray-600 mb-2">📱 AR View</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View in AR
      </button>
    </div>
  );
};

export default ARViewer;
