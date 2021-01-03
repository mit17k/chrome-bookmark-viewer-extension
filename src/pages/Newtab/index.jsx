import React from 'react';
import { render } from 'react-dom';

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Newtab from './Newtab';
import './index.css';

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <Newtab />
    </MuiThemeProvider>
  )
};

render(<App />, window.document.querySelector('#app-container'));
