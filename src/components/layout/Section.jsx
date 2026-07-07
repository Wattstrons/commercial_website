import React, { forwardRef } from 'react';

const Section = forwardRef(({ children, className = '', id, style, fullScreen = false, noPadding = false, ...props }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={`
        relative w-full z-10
        ${fullScreen ? 'min-h-screen lg:h-[100vh] lg:overflow-hidden' : ''}
        ${fullScreen || noPadding ? '!py-0' : 'py-12 sm:py-16 md:py-20 lg:py-24 3xl:py-[100px]'}
        ${className}
      `}
      style={style}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
