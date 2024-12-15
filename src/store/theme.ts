import { atom } from 'jotai';

type Theme = 'light' | 'dark';

// Get initial theme from system preference or localStorage
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const themeAtom = atom<Theme>(getInitialTheme());