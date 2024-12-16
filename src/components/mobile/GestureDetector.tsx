import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { vibrate } from '@/lib/utils/mobile';

interface GestureDetectorProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (angle: number) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  threshold?: number;
  longPressDelay?: number;
  className?: string;
}

export const GestureDetector: React.FC<GestureDetectorProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onRotate,
  onDoubleTap,
  onLongPress,
  threshold = 50,
  longPressDelay = 500,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const touchStartTime = useRef<number>(0);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTapTime = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const initialTouchDistance = useRef<number>(0);
  const initialTouchAngle = useRef<number>(0);

  const [isLongPressing, setIsLongPressing] = useState(false);

  const getDistance = (touches: TouchList): number => {
    if (touches.length < 2) return 0;
    const dx = touches[1].clientX - touches[0].clientX;
    const dy = touches[1].clientY - touches[0].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAngle = (touches: TouchList): number => {
    if (touches.length < 2) return 0;
    return Math.atan2(
      touches[1].clientY - touches[0].clientY,
      touches[1].clientX - touches[0].clientX
    ) * 180 / Math.PI;
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      touchStartTime.current = Date.now();
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      // Double tap detection
      const timeSinceLastTap = touchStartTime.current - lastTapTime.current;
      if (timeSinceLastTap < 300 && onDoubleTap) {
        onDoubleTap();
        vibrate(20);
      }
      lastTapTime.current = touchStartTime.current;

      // Long press detection
      if (onLongPress) {
        longPressTimer.current = setTimeout(() => {
          setIsLongPressing(true);
          onLongPress();
          vibrate([50, 50, 50]);
        }, longPressDelay);
      }

      // Multi-touch gesture initialization
      if (e.touches.length === 2) {
        initialTouchDistance.current = getDistance(e.touches);
        initialTouchAngle.current = getAngle(e.touches);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        setIsLongPressing(false);
      }

      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartPos.current.x;
        const deltaY = e.touches[0].clientY - touchStartPos.current.y;

        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
            vibrate(10);
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
            vibrate(10);
          }
        }

        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
            vibrate(10);
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
            vibrate(10);
          }
        }

        controls.set({ x: deltaX, y: deltaY });
      } else if (e.touches.length === 2) {
        // Pinch gesture
        if (onPinch) {
          const currentDistance = getDistance(e.touches);
          const scale = currentDistance / initialTouchDistance.current;
          onPinch(scale);
        }

        // Rotation gesture
        if (onRotate) {
          const currentAngle = getAngle(e.touches);
          const rotation = currentAngle - initialTouchAngle.current;
          onRotate(rotation);
        }
      }
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        setIsLongPressing(false);
      }

      controls.start({ x: 0, y: 0, transition: { type: 'spring', bounce: 0.2 } });
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, [
    controls,
    onDoubleTap,
    onLongPress,
    onPinch,
    onRotate,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    threshold,
    longPressDelay,
  ]);

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      className={className}
      style={{ touchAction: 'none' }}
    >
      {children}
    </motion.div>
  );
};
