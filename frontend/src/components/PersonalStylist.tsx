import React from 'react';

const PersonalStylist: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">👗 Personal Stylist</h3>
      <p className="text-gray-700 mb-3">Get personalized fashion recommendations</p>
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Start Styling
      </button>
    </div>
  );
};

export default PersonalStylist;
