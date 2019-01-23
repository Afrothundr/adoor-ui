import React, { Component } from 'react';
import './App.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './modules/auth/components/Login/Login';
import { Dashboard } from './modules/dashboard/components/Dashboard/Dashboard';
import AuthenticatedRoute from './modules/auth/protected-route';


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



class App extends Component {git 
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <div className="App-Main">
              <Route path="/login" component={Login} />
              <AuthenticatedRoute path="/dashboard" component={Dashboard} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
