import React from 'react';
import { motion } from 'framer-motion';


const Paragraph = ({
  children,
  className = "",
  style = {},
  useMotion = false,
  variants,
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  ...props
}) => {
  const baseClassName = "text-white text-[14px] sm:text-[15px] lg:text-[16px] min-[1600px]:!text-[18px] leading-relaxed";
  const combinedClassName = `${baseClassName} ${className}`.trim();
  
  const mergedStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    ...style
  };

  if (useMotion) {
    return (
      <motion.p
        className={combinedClassName}
        style={mergedStyle}
        variants={variants}
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        {...props}
      >
        {children}
      </motion.p>
    );
  }

  return (
    <p className={combinedClassName} style={mergedStyle} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
