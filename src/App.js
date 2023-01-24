import React, { Component } from 'react';
import Board from './Board.js';
import './App.css';

/* Simple App that shows the LightsOut Game */

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;