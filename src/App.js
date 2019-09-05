import React, { Component } from 'react';
import './App.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './modules/auth/components/Login/Login';
import Dashboard from './modules/dashboard/pages/Dashboard/Dashboard';

import { connect } from 'react-redux';
import { AuthenticatedRoute } from './modules/auth/protected-route';



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
              <AuthenticatedRoute exact path="/" authed={this.props.token && true} component={Dashboard} />
              <Route path="/login" component={Login} />
              <AuthenticatedRoute path="/dashboard" authed={this.props.token && true} component={Dashboard} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    token: state.authReducer.token
  }
}



export default connect(mapStateToProps)(App);
