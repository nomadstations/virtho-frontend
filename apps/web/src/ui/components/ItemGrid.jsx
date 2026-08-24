import React from 'react';
import { motion } from 'framer-motion';

const ItemGrid = ({ items, renderItem, emptyMessage = "No items found." }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 w-full text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full h-full">
      {items.map((item, index) => (
        <motion.div
          key={item?.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.4 }}
          className="h-full w-full flex flex-col"
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </div>
  );
};

export default ItemGrid;