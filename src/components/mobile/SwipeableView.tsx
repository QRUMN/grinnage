import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTouchGesture } from '@/lib/utils/mobile';
import { cn } from '@/lib/utils';

interface SwipeableViewProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  threshold?: number;
  preventScroll?: boolean;
}

export const SwipeableView: React.FC<SwipeableViewProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  className,
  threshold = 50,
  preventScroll = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gesture = useTouchGesture(containerRef, { threshold, preventScroll });

  React.useEffect(() => {
    if (gesture.direction === 'left' && onSwipeLeft) {
      onSwipeLeft();
    } else if (gesture.direction === 'right' && onSwipeRight) {
      onSwipeRight();
    }
  }, [gesture, onSwipeLeft, onSwipeRight]);

  return (
    <motion.div
      ref={containerRef}
      className={cn('touch-manipulation', className)}
      animate={{
        x: gesture.direction ? (gesture.direction === 'left' ? -gesture.distance : gesture.distance) : 0,
      }}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400,
      }}
    >
      {children}
    </motion.div>
  );
};
