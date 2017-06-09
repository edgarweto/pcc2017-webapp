import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import GameView from './app/GameView';

const gameView = ({match}) => {
  return (
    <GameView playerId={match.params.id} />
  );
};

const myRouter = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/games/:id" component={gameView} />
    </div>
  </Router>
);

ReactDOM.render(myRouter, document.getElementById('root'));
registerServiceWorker();
