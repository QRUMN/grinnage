import { act } from '@testing-library/react';

// Mock touch events
export const createTouchEvent = (
  type: 'touchstart' | 'touchmove' | 'touchend',
  x: number,
  y: number,
  target: Element
): TouchEvent => {
  const touch = new Touch({
    identifier: Date.now(),
    target: target,
    clientX: x,
    clientY: y,
    pageX: x,
    pageY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 0,
    force: 1,
  });

  return new TouchEvent(type, {
    cancelable: true,
    bubbles: true,
    touches: [touch],
    targetTouches: [touch],
    changedTouches: [touch],
  });
};

// Simulate swipe gesture
export const simulateSwipe = async (
  element: Element,
  direction: 'left' | 'right' | 'up' | 'down',
  distance = 100,
  duration = 100
) => {
  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 0 };

  switch (direction) {
    case 'left':
      start.x = distance;
      break;
    case 'right':
      end.x = distance;
      break;
    case 'up':
      start.y = distance;
      break;
    case 'down':
      end.y = distance;
      break;
  }

  await act(async () => {
    element.dispatchEvent(createTouchEvent('touchstart', start.x, start.y, element));
    await new Promise(resolve => setTimeout(resolve, duration));
    element.dispatchEvent(createTouchEvent('touchmove', end.x, end.y, element));
    element.dispatchEvent(createTouchEvent('touchend', end.x, end.y, element));
  });
};

// Mock device orientation
export const mockDeviceOrientation = (isPortrait: boolean) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: isPortrait ? 375 : 667,
  });

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: isPortrait ? 667 : 375,
  });

  window.dispatchEvent(new Event('resize'));
};

// Mock safe area insets
export const mockSafeArea = (insets: {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}) => {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --sat: ${insets.top || 0}px;
      --sar: ${insets.right || 0}px;
      --sab: ${insets.bottom || 0}px;
      --sal: ${insets.left || 0}px;
    }
  `;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
};

// Mock vibration API
export const mockVibration = () => {
  Object.defineProperty(navigator, 'vibrate', {
    value: jest.fn(),
    writable: true,
    configurable: true,
  });
};

// Test viewport meta tags
export const checkViewportMeta = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  return viewport?.getAttribute('content')?.includes('width=device-width');
};

// Test touch event handling
export const hasTouchEventListeners = (element: Element) => {
  const events = getEventListeners(element);
  return events.touchstart || events.touchmove || events.touchend;
};

// Test passive event listeners
export const hasPassiveEventListeners = (element: Element) => {
  let isPassive = false;
  const options = Object.defineProperty({}, 'passive', {
    get() { isPassive = true; return true; }
  });
  element.addEventListener('test', () => {}, options);
  element.removeEventListener('test', () => {}, options);
  return isPassive;
};
