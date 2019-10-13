import { css } from 'styled-components';

const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  space: {
    none: 0,
    xs: '.5rem',
    sm: '1rem',
    lg: '2rem',
  },
  colours: {
    white: '#fff',
    red: '#ff473d',
    pink: '#f857a6',
    lightPink: '#fa9dc3',
    darkPink: '#b83e71',
    borderGrey: '#d4d4d4',
    grey: '#6e6b67',
    error: '#aa1f3b',
  },
};

const media = Object.keys(theme.breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.breakpoints[label]}) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export { media };

export default theme;
