import React, { Component } from 'react';
import './App.scss';
import Login from './components/auth/Login/Login';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}


export default App;