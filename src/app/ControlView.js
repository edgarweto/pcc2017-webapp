import React, { Component } from 'react';
import './ControlView.css';

class ControlView extends Component {
  
  render() {
    return (
      <ul className="control-view">
        <li className="control-item">
          <div className="title">Explored</div>
          <div className="value">{this.props.gameState.explored}</div>
        </li>
        <li className="control-item">
          <div className="title">Steps</div>
          <div className="value">{this.props.gameState.steps}</div>
        </li>
      </ul>
    );
  }
}

export default ControlView;
