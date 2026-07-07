import React from 'react';

const Container = ({ children, className = '', style, ...props }) => {
  return (
    <div
      className={`
        w-full max-w-[1600px] xl:max-w-[1900px] 3xl:max-w-[2100px] mx-auto
        px-4 sm:px-6 md:px-8 lg:px-[80px] 3xl:px-[100px]
        ${className}
      `}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
