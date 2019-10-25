import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import CssBaseline from './CSSBaseline';
import DrawingCanvas from './DrawingCanvas';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrawingCanvas />
    </ThemeProvider>
  );
};

export default App;
