import React, { Component } from 'react';

import './GameList.css';
import GamePreview from './GamePreview';
import axios from 'axios';
import Config from '../config.json';

class GameList extends Component {

  constructor(props) {
    super(props);
    
    this._POLLING_DELAY = Config.pollingDelay;
    this.state = {
      games: []
    };
  }

  _fetchGameList() {
    if (this._viewActive) {
      const gamesApiUrl = Config.gameApi.baseUrl + Config.gameApi.list;
      axios.get(gamesApiUrl).then(this._onGameListUpdate.bind(this)).catch(this._onGameListError.bind(this));
    }
  }

  componentDidMount() {
    this._viewActive = true;
    this._fetchGameList();
  }
  componentWillUnmount() {
    this._viewActive = false;
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = 0;
    }
  }

  _onGameListUpdate (response) {
    if (this._viewActive) {
      const gameList = response && response.data && response.data.games;

      if (Array.isArray(gameList)) {
        let games = [];
        gameList.forEach(function (gameState) {
          games.push({
            id: gameState.id,
            state: gameState.state,
            pctExplored: gameState.explored + '%'
          });
        });

        this.setState({
          games: games
        });

        this._timerId = setTimeout(this._fetchGameList.bind(this), this._POLLING_DELAY);
      }
    }
  }
  _onGameListError () {
    this._timerId = setTimeout(this._fetchGameList.bind(this), this._POLLING_DELAY);
  }
  
  render() {
    const games = [];

    this.state.games.forEach(function (gameState) {
      const gamePreview = (
        <GamePreview gameState={gameState} key={gameState.id}/>
      );

      games.push(gamePreview);
    });

    return (
      <div className="game-list">
        <h3>Your game instances</h3>
        <ul>{games}</ul>
      </div>
    );
  }
}

export default GameList;
