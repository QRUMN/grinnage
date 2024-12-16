import { useEffect, useState } from 'react';

// Device detection
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

// Screen orientation utilities
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined'
      ? window.innerHeight > window.innerWidth
        ? 'portrait'
        : 'landscape'
      : 'portrait'
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return orientation;
};

// Touch gesture utilities
export const useTouchGesture = (
  element: React.RefObject<HTMLElement>,
  options = {
    threshold: 50,
    preventScroll: false,
  }
) => {
  const [gesture, setGesture] = useState<{
    direction: 'left' | 'right' | 'up' | 'down' | null;
    distance: number;
    velocity: number;
  }>({
    direction: null,
    distance: 0,
    velocity: 0,
  });

  useEffect(() => {
    if (!element.current) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      if (options.preventScroll) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      const deltaTime = Date.now() - startTime;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > options.threshold) {
          setGesture({
            direction: deltaX > 0 ? 'right' : 'left',
            distance: Math.abs(deltaX),
            velocity,
          });
        }
      } else {
        if (Math.abs(deltaY) > options.threshold) {
          setGesture({
            direction: deltaY > 0 ? 'down' : 'up',
            distance: Math.abs(deltaY),
            velocity,
          });
        }
      }

      if (options.preventScroll) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      startX = 0;
      startY = 0;
      startTime = 0;
    };

    const el = element.current;
    el.addEventListener('touchstart', handleTouchStart, { passive: !options.preventScroll });
    el.addEventListener('touchmove', handleTouchMove, { passive: !options.preventScroll });
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, options.threshold, options.preventScroll]);

  return gesture;
};

// Viewport utilities
export const useViewportSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// Safe area utilities
export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      setSafeArea({
        top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'),
        right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0'),
        bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0'),
        left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0'),
      });
    };

    // Set CSS variables for safe areas
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --sat: env(safe-area-inset-top);
        --sar: env(safe-area-inset-right);
        --sab: env(safe-area-inset-bottom);
        --sal: env(safe-area-inset-left);
      }
    `;
    document.head.appendChild(style);

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => {
      window.removeEventListener('resize', updateSafeArea);
      document.head.removeChild(style);
    };
  }, []);

  return safeArea;
};

// Mobile navigation utilities
export const useBottomNavigation = () => {
  const safeArea = useSafeArea();
  const viewportSize = useViewportSize();

  return {
    height: 56 + safeArea.bottom, // Standard bottom nav height plus safe area
    visible: viewportSize.width < 768, // Show on mobile only
    safeArea,
  };
};

// Mobile haptic feedback
export const vibrate = (pattern: number | number[]) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

// Mobile pull-to-refresh
export const usePullToRefresh = (
  onRefresh: () => Promise<void>,
  options = { threshold: 80, resistance: 2.5 }
) => {
  useEffect(() => {
    let startY = 0;
    let refreshing = false;
    const indicator = document.createElement('div');
    indicator.className = 'pull-to-refresh-indicator';

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = async (e: TouchEvent) => {
      if (startY === 0 || refreshing) return;

      const deltaY = (e.touches[0].clientY - startY) / options.resistance;
      if (deltaY > 0) {
        indicator.style.transform = `translateY(${deltaY}px)`;
        if (deltaY > options.threshold) {
          indicator.classList.add('ready');
        } else {
          indicator.classList.remove('ready');
        }
      }
    };

    const handleTouchEnd = async () => {
      if (startY === 0 || refreshing) return;

      const deltaY = parseInt(indicator.style.transform.replace('translateY(', ''));
      if (deltaY > options.threshold) {
        refreshing = true;
        indicator.classList.add('refreshing');
        await onRefresh();
        refreshing = false;
      }

      startY = 0;
      indicator.style.transform = '';
      indicator.classList.remove('ready', 'refreshing');
    };

    document.body.insertBefore(indicator, document.body.firstChild);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.body.removeChild(indicator);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, options.threshold, options.resistance]);
};
