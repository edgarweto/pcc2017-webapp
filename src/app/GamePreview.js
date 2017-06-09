import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';


import './GamePreview.css';


class GamePreview extends Component {
  
  render() {
    const gameId = this.props.gameState.id,
      state = this.props.gameState.state;

    return (
      <li className="game-preview" data-state={state}>
        <Link to={"/games/" + gameId}>
          <div className="game-id">
            <div className="item-title">GAME</div>
            <div className="item-value ellipsis">{gameId}</div>
          </div>
          <div className="game-state">
            <div className="item-title">STATE</div>
            <div className="item-value">{state}</div>
          </div>
          <div className="game-explored">
            <div className="item-title">EXPLORED</div>
            <div className="item-value">{this.props.gameState.pctExplored}</div>
          </div>
        </Link>
      </li>
    );
  }
}

export default GamePreview;
