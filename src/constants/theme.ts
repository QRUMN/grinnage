export const COLORS = {
  primary: {
    50: '#E6FAF2',
    100: '#CCF5E5',
    200: '#99EBCC',
    300: '#66E1B2',
    400: '#56E39F',
    500: '#33D789',
    600: '#2AB372',
    700: '#228F5B',
    800: '#1B6C45',
    900: '#13482E',
  },
  dark: {
    50: '#F7F7FF',
    100: '#E6E6E9',
    200: '#CDCDD3',
    300: '#B4B4BD',
    400: '#9B9BA7',
    500: '#828291',
    600: '#69697B',
    700: '#505065',
    800: '#2A2A3C',
    900: '#131112',
  },
  light: {
    50: '#FFFFFF',
    100: '#F7F7FF',
    200: '#F0F0F7',
    300: '#E6E6ED',
    400: '#DCDCE3',
    500: '#D2D2D9',
    600: '#C8C8CF',
    700: '#BEBEC5',
    800: '#B4B4BB',
    900: '#AAAAAF',
  },
};

export const THEME_VARIANTS = {
  light: {
    background: COLORS.light[100],
    text: COLORS.dark[900],
    surface: COLORS.light[50],
  },
  dark: {
    background: COLORS.dark[900],
    text: COLORS.light[100],
    surface: COLORS.dark[800],
  },
} as const;