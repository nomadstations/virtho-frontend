import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductGallery = ({ images = [], productName = "Product", ribbonText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex]?.url || placeholderImage;
  const hasMultipleImages = images.length > 1;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };
  
  const resetZoom = () => {
      setZoomLevel(1);
  }

  // Adjust columns based on zoom level to maintain balance (simulated)
  const getGridColsClass = () => {
      if (zoomLevel > 1.5) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
      if (zoomLevel > 1) return 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5';
      return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6';
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-50/50">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-4 mb-4 group">
        
        {/* Loading State Overlay (Simple example, can be improved) */}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 z-10">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center overflow-hidden"
            onHoverStart={() => {}}
          >
            <motion.img
              src={currentImage}
              alt={`${productName} view ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain mix-blend-multiply cursor-crosshair origin-center"
              animate={{ scale: zoomLevel }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onLoad={() => setIsLoading(false)}
              onError={(e) => { e.target.src = placeholderImage; setIsLoading(false); }}
            />
          </motion.div>
        </AnimatePresence>

        {ribbonText && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-sm z-20">
            {ribbonText}
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Button variant="secondary" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 1} className="bg-white/90 shadow-sm hover:bg-white text-gray-700">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={resetZoom} className="bg-white/90 shadow-sm hover:bg-white text-gray-700">
             <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 2} className="bg-white/90 shadow-sm hover:bg-white text-gray-700">
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {hasMultipleImages && (
        <motion.div layout className={`grid gap-3 ${getGridColsClass()} mt-auto`}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                  if (currentIndex !== idx) {
                      setIsLoading(true);
                      setCurrentIndex(idx);
                      setZoomLevel(1);
                  }
              }}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 bg-white thumbnail-hover ${
                idx === currentIndex ? 'border-purple-600 shadow-md ring-2 ring-purple-100' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url || placeholderImage}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = placeholderImage; }}
              />
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductGallery;