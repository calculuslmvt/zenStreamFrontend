import { useState } from 'react';
import React from 'react'

function VideoCard({ ...props }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800/70 text-gray-100 h-50 w-50 p-2">
      <div className="relative flex justify-center items-center py-2">
        <img 
          className="w-60 h-24 object-cover" 
          src={props.videoThumbnail} 
          alt={props.videoTitle} 
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate text-gray-100">{props.videoTitle}</div>

        <div className="flex items-center justify-between">
          <button 
            onClick={toggleFavorite}
            className={`flex items-center ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;