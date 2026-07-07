import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSplitText = ({ text, delayOffset = 0.2, className = "", style = {} }) => {
  const words = text.split(" ");
  let globalCharIndex = 0;
  const totalChars = text.replace(/\s+/g, "").length;
  const mid = Math.floor(totalChars / 2);

  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split("");
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {wordChars.map((char, i) => {
              const charIndex = globalCharIndex++;
              return (
                <motion.span
                  key={charIndex}
                  variants={{
                    hidden: { opacity: 0, x: charIndex < mid ? -20 : 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3, delay: delayOffset + charIndex * 0.01 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.p>
  );
};

const SectionHeader = ({ 
  title, 
  subtitle, 
  titleTag: TitleTag = 'h2',
  className = "text-center mb-10 md:mb-16 relative z-10",
  titleClassName = "font-bold tracking-tight leading-tight mb-3 text-white text-[clamp(32px,4vw,60px)]",
  subtitleClassName = "mt-0 mb-4 mx-auto text-white tracking-wide leading-relaxed text-[clamp(14px,1.5vw,20px)] max-w-[min(95vw,1200px)]",
  titleStyle = {},
  subtitleStyle = {}
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
      }}
    >
      <TitleTag
        className={titleClassName}
        style={titleStyle}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          style={{ display: 'inline-block' }}
        >
          {title}
        </motion.span>
      </TitleTag>
      {subtitle && (
        <AnimatedSplitText
          text={subtitle}
          className={subtitleClassName}
          style={subtitleStyle}
          delayOffset={0.2}
        />
      )}
    </motion.div>
  );
};

export default SectionHeader;
