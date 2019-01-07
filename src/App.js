import React, { Component } from 'react';
import './App.scss';
import Login from './components/auth/Login/Login';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C9283E'
    },
    secondary: {
      main: '#f44336',
    },
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
