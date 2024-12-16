// Mobile performance optimizations
import { useEffect, useCallback, useState, useRef } from 'react';

// Intersection Observer hook for lazy loading
export const useLazyLoad = (
  elementRef: React.RefObject<Element>,
  options = { threshold: 0.1, rootMargin: '50px' }
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isVisible;
};

// Debounce scroll and resize events
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle expensive operations
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

// Optimize image loading
export const useProgressiveImage = (lowQualitySrc: string, highQualitySrc: string) => {
  const [src, setSrc] = useState(lowQualitySrc);

  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [highQualitySrc]);

  return src;
};

// Virtual list for long scrollable content
export const useVirtualList = <T>(
  items: T[],
  rowHeight: number,
  visibleRows: number
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * rowHeight;
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(
    startIndex + visibleRows + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    containerRef,
    onScroll,
    totalHeight,
    visibleItems,
    startIndex,
  };
};

// Optimize touch event handling
export const useTouchOptimization = () => {
  useEffect(() => {
    // Prevent pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';

    // Use passive event listeners
    const options = {
      passive: true,
      capture: false,
    };

    window.addEventListener('touchstart', () => {}, options);
    window.addEventListener('touchmove', () => {}, options);
    window.addEventListener('wheel', () => {}, options);

    return () => {
      document.body.style.overscrollBehavior = 'auto';
      window.removeEventListener('touchstart', () => {});
      window.removeEventListener('touchmove', () => {});
      window.removeEventListener('wheel', () => {});
    };
  }, []);
};

// Optimize animations
export const useAnimationOptimization = () => {
  useEffect(() => {
    // Use transform instead of left/top for animations
    const style = document.createElement('style');
    style.innerHTML = `
      .animate {
        transform: translate3d(0, 0, 0);
        will-change: transform;
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

// Optimize font loading
export const useFontOptimization = () => {
  useEffect(() => {
    // Add font-display: swap to all @font-face rules
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    // Preload critical fonts
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.href = '/fonts/critical-font.woff2';
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(preloadLink);
    };
  }, []);
};

// Battery-aware performance mode
export const useBatteryAwareMode = () => {
  const [isBatterySaving, setIsBatterySaving] = useState(false);

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryStatus = () => {
          setIsBatterySaving(battery.level <= 0.2 && !battery.charging);
        };

        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
        updateBatteryStatus();

        return () => {
          battery.removeEventListener('levelchange', updateBatteryStatus);
          battery.removeEventListener('chargingchange', updateBatteryStatus);
        };
      });
    }
  }, []);

  return isBatterySaving;
};
