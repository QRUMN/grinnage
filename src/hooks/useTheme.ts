import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { themeAtom } from '../store/theme';
import { setThemeClass } from '../utils/theme';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme(current => {
      const newTheme = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    setThemeClass(theme);
  }, [theme]);

  return { theme, toggleTheme };
};