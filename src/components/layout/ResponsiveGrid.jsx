import React, { forwardRef } from 'react';

const ResponsiveGrid = forwardRef(({ children, className = '', columns = '4', ...props }, ref) => {
  const getGridCols = () => {
    switch (columns) {
      case '2':
        return 'grid-cols-1 sm:grid-cols-2';
      case '3':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case '4':
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div
      ref={ref}
      {...props}
      className={`
        grid ${getGridCols()}
        gap-5 sm:gap-6 md:gap-7 lg:gap-8 3xl:gap-12
        ${className}
      `}
    >
      {children}
    </div>
  );
});

ResponsiveGrid.displayName = 'ResponsiveGrid';
export default ResponsiveGrid;
