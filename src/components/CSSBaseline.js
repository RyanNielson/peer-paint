import 'sanitize.css/sanitize.css';

import { createGlobalStyle } from 'styled-components';

const CssBaseline = createGlobalStyle`
  body {
    font-family: Source Sans Pro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Droid Sans,Helvetica Neue,Fira Sans,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  select:focus {
    outline: none;
  }
  select:-moz-focusring {
    outline: none;
    color: transparent;
    text-shadow: 0 0 0 ${({ theme }) => theme.colours.grey};
  }
`;

export default CssBaseline;
