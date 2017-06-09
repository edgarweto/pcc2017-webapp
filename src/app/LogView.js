import React, { Component } from 'react';

import './LogView.css';

let _playerLogs = {};
function _addPlayerLogs(playerId, logs) {
  if (!_playerLogs[playerId]) {
    _playerLogs[playerId] = (logs && logs.slice(0)) || [];
  } else {
    _playerLogs[playerId] = _playerLogs[playerId].concat(logs);
  }
}

function _getPlayerLogs(playerId) {
  return _playerLogs[playerId] || [];
}

class LogView extends Component {
  
  constructor(props) {
    super(props);
    
    _addPlayerLogs(this.props.playerId, this.props.logs);

    this.state = {
      logs: _getPlayerLogs(this.props.playerId)
    };
  }

  _renderItem (item) {
    return (
      <li>
        <div className="item-step">{item.step}</div>
        <div className="item-data"><code>js: k(8);</code></div>
      </li>
    );
  }

  render() {
    
    let items = this.state.logs;

    let renderedItems = [];

    items.forEach((item) => {
      renderedItems.push(this._renderItem(item));
    });
      
    return (
      <div className="log-view">
        <h3>Logs</h3>
        <ul className="log-view-list">
          {renderedItems}
        </ul>
      </div>
    );
  }
}

export default LogView;
