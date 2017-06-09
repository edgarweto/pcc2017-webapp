import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import GameList from './GameList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Privalia Code Challenge 2017</h2>
        </div>
        <GameList />
      </div>
    );
  }
}

export default App;
