import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Style
import './style/app.scss';
import './style/game_modal.scss';
import './style/minesweeper.scss';
import './style/navbar.scss';
import './style/timer_counter.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
