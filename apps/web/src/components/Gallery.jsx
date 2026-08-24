import React from 'react';
import GalleryThumbnail from './GalleryThumbnail';

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1541666163273-65600d23bfb3",
    "https://images.unsplash.com/photo-1599140427277-7cbcb58180a0",
    "https://images.unsplash.com/photo-1641509080027-bf0b55261cc4",
    "https://images.unsplash.com/photo-1578855019520-af8101c056e2",
    "https://images.unsplash.com/photo-1669350211174-cc1b45e5f3e6",
    "https://images.unsplash.com/photo-1693412383726-cb73b6af9206",
    "https://images.unsplash.com/photo-1622720747377-3f9b73a493ed",
    "https://images.unsplash.com/photo-1605688971690-a33e21a956d1"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {images.map((img, index) => (
        <GalleryThumbnail 
          key={index} 
          image={img} 
          alt={`Gallery image ${index + 1}`} 
        />
      ))}
    </div>
  );
};

export default Gallery;