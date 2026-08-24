import React from 'react';

const GalleryThumbnail = ({ image, alt, onClick }) => {
  return (
    <div 
      className="rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 aspect-square overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-full object-cover" 
        loading="lazy"
      />
    </div>
  );
};

export default GalleryThumbnail;