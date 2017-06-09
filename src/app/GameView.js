import React, { Component } from 'react';

import MazeView from './MazeView';
import ControlView from './ControlView';
import LogView from './LogView';
import axios from 'axios';
import Config from '../config.json';

import './GameView.css';

class GameView extends Component {
  
  constructor(props) {
    super(props);

    this.playerId = this.props.playerId;
    this._POLLING_DELAY = Config.pollingDelay;
    this.state = {
      game: {},
      context: {
        logs: []
      }
    };
  }

  _fetchGame() {
    if (this._viewActive) {
      const gameApiUrl = Config.gameApi.baseUrl + Config.gameApi.game + "/" + this.playerId;
      axios.get(gameApiUrl).then(this._onGameUpdate.bind(this)).catch(this._onGameError.bind(this));
    }
  }

  componentDidMount() {
    this._viewActive = true;
    this._fetchGame();
  }
  componentWillUnmount() {
    this._viewActive = false;
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = 0;
    }
  }

  _onGameUpdate (response) {
    const game = response && response.data && response.data.game,
      context = response && response.data && response.data.context;

    this.setState({
      game: {
        id: game.id,
        explored: game.explored,
        index: game.index,
        date: game.date,
        maze: game.maze,
        state: game.state,
        position: game.position,
        steps: game.steps
      },
      context: context
    });

    this._timerId = setTimeout(this._fetchGame.bind(this), this._POLLING_DELAY);
  }
  _onGameError () {
    this._timerId = setTimeout(this._fetchGame.bind(this), this._POLLING_DELAY);
  }


  render() {
    const id = this.state.game.id,
      gameState = {
        id: this.state.game,
        explored: this.state.game.explored + '%',
        steps: this.state.game.steps
      };

    return (
      <div className="game-view">
        <div className="game-view-header">
          <div className="title ellipsis">Game:</div>
          <div className="game-id ellipsis" title={id}>{id}</div>
        </div>
        <MazeView maze={this.state.game.maze} context={this.state.context} />
        <ControlView gameState={gameState} />
        <LogView logs={this.state.context.logs} playerId={id} />
      </div>
    );
  }
}

export default GameView;
