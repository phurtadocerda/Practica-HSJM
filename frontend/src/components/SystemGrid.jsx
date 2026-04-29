import React from 'react';

const SystemGrid = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ${className}`}>
      {children}
    </div>
  );
};

export default SystemGrid;