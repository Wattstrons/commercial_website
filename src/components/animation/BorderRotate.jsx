import React, { useMemo } from 'react';

const defaultGradientColors = {
  primary: 'rgba(255,255,255,0.05)',
  secondary: '#00EDC2',
  accent: '#00EDC2'
};

const BorderRotate = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 10,
  gradientColors = defaultGradientColors,
  backgroundColor = 'transparent',
  borderWidth = 1.5,
  borderRadius = 16, // matches rounded-2xl
  style = {},
  ...props
}) => {
  // Calculate a negative delay so all instances with the same speed synchronize perfectly
  const syncDelay = useMemo(() => {
    const timeMs = Date.now();
    const durationMs = animationSpeed * 1000;
    const delay = -(timeMs % durationMs) / 1000;
    return `${delay}s`;
  }, [animationSpeed]);

  const getAnimationClass = () => {
    switch (animationMode) {
      case 'auto-rotate':
        return 'gradient-border-auto';
      case 'rotate-on-hover':
        return 'gradient-border-hover';
      case 'stop-rotate-on-hover':
        return 'gradient-border-stop-hover';
      default:
        return '';
    }
  };

  const combinedStyle = {
    '--bg-color': backgroundColor,
    '--border-width': `${borderWidth}px`,
    '--border-radius': `${borderRadius}px`,
    '--animation-duration': `${animationSpeed}s`,
    '--sync-delay': syncDelay,
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
    borderRadius: `${borderRadius}px`,
    ...style,
  };

  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-gradient {
          0% {
            --gradient-angle: 0deg;
          }
          100% {
            --gradient-angle: 360deg;
          }
        }

        .gradient-border-component {
          position: relative;
        }

        .gradient-border-component::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--border-radius);
          padding: var(--border-width);
          background: conic-gradient(
            from var(--gradient-angle, 0deg),
            ${gradientColors.primary} 0%,
            ${gradientColors.primary} 20%,
            ${gradientColors.secondary} 27%,
            ${gradientColors.accent} 30%,
            ${gradientColors.secondary} 33%,
            ${gradientColors.primary} 40%,
            ${gradientColors.primary} 70%,
            ${gradientColors.secondary} 77%,
            ${gradientColors.accent} 80%,
            ${gradientColors.secondary} 83%,
            ${gradientColors.primary} 90%,
            ${gradientColors.primary} 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .gradient-border-auto::before {
          animation: rotate-gradient var(--animation-duration, 4s) linear infinite;
          animation-delay: var(--sync-delay, 0s);
        }

        .gradient-border-hover:hover::before {
          animation: rotate-gradient var(--animation-duration, 4s) linear infinite;
          animation-delay: var(--sync-delay, 0s);
        }

        .gradient-border-stop-hover::before {
          animation: rotate-gradient var(--animation-duration, 4s) linear infinite;
          animation-delay: var(--sync-delay, 0s);
        }
        .gradient-border-stop-hover:hover::before {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className={`gradient-border-component ${getAnimationClass()} ${className}`}
        style={combinedStyle}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export { BorderRotate };
