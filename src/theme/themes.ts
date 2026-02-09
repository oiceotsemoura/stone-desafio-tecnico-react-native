export const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#0fb14c',
    secondary: '#6c757d',
    danger: '#dc3545',
    surface: '#f8f9fa',
    border: '#e0e0e0',
  },
};

export const darkTheme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#0fb14c',
    secondary: '#6c757d',
    danger: '#dc3545',
    surface: '#1e1e1e',
    border: '#333333',
  },
};

export type Theme = typeof lightTheme;