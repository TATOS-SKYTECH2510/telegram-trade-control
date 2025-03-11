
import { cn } from "@/lib/utils";

export type AnimationProps = {
  fadeIn?: boolean;
  fadeInDelay?: 100 | 200 | 300 | 500 | 700;
  slideIn?: 'up' | 'right';
  scale?: boolean;
  float?: boolean;
  pulse?: boolean;
};

export const animationClass = ({
  fadeIn,
  fadeInDelay,
  slideIn,
  scale,
  float,
  pulse,
}: AnimationProps): string => {
  return cn(
    fadeIn && "animate-fade-in",
    fadeInDelay && `animation-delay-${fadeInDelay}`,
    slideIn === "up" && "animate-slide-in-up",
    slideIn === "right" && "animate-slide-in-right",
    scale && "animate-scale",
    float && "animate-float",
    pulse && "animate-pulse-gentle"
  );
};

// Transitions for elements entering/leaving viewport
export const getTransitionProps = (
  index: number = 0,
  delay: number = 50
): Record<string, any> => {
  return {
    style: {
      transitionDelay: `${index * delay}ms`,
    },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  };
};

// Hover animation for cards
export const cardHoverAnimation = {
  whileHover: { y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  transition: { type: "spring", stiffness: 500, damping: 30 },
};

// Button tap/press animation
export const buttonTapAnimation = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
};

// Page transition variants
export const pageTransition = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  },
};
