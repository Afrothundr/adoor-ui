import React, { Component } from 'react';
import './App.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './modules/auth/components/Login/Login';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C9283E'
    },
    secondary: {
      main: '#f44336',
    },
  },
    typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <Login />
      </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
