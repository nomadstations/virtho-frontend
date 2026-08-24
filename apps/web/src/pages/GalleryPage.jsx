import React from 'react';
import { Helmet } from 'react-helmet';
import Gallery from '@/components/Gallery';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        <title>Image Gallery - Virtho Foundation</title>
        <meta name="description" content="Explore our curated image gallery showcasing our projects and community." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb paths={getBreadcrumbPaths('/gallery')} />
        
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Visual Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a collection of inspiring moments and snapshots that capture the essence of our vibrant community and ongoing projects.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <Gallery />
        </div>
      </div>
    </>
  );
};

export default GalleryPage;