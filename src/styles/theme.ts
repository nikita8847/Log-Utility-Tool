import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#19486d',
    secondary: '#3973b6',
    light: '#606161',
    background: '#f8f9fa',
    text: '#333333',
    gray: '#797979',
    white: '#ffffff',
    black: '#000000',
  },
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${theme.colors.primary};
    --color-secondary: ${theme.colors.secondary};
    --color-light: ${theme.colors.light};
    --color-background: ${theme.colors.background};
    --color-text: ${theme.colors.text};
    --color-gray: ${theme.colors.gray};
    --color-white: ${theme.colors.white};
    --color-black: ${theme.colors.black};
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--color-background);
    color: var(--color-text);
  }
`;
