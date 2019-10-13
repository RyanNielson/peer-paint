import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import CssBaseline from './CSSBaseline';
import DrawingCanvas from './DrawingCanvas';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/">
            <DrawingCanvas />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
