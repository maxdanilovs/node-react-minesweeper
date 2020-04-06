import React from 'react';
import Navbar from './components/Navbar';
import Minesweeper from './components/Minesweeper';
import TimerCounter from './components/TimerCounter';
import GameOverModal from './components/GameOverModal';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <Navbar />
        <div id="game-container" onContextMenu={(e) => e.preventDefault()}>
          <TimerCounter />
          <Minesweeper />
        </div>
        <GameOverModal />
      </div>
    </GlobalProvider>
  )
}

export default App;
