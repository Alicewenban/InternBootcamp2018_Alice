import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to tic tac toe</h1>
        </header>
        <p className="App-intro">
          <Game />
        </p>
      </div>
    );
  }
}

export default App;
