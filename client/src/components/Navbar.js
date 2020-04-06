import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

function Navbar() {
  const { startNewGame, recordList, gameMode } = useContext(GlobalContext);

  const [showRecord, setShowRecord] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    startNewGame(e.target.value)
  }

  function handleRecord(e) {
    e.preventDefault();
    setShowRecord(!showRecord);
  }

  return (
    <>
      <div className={`${showRecord ? "show" : ""} ${gameMode}`} id="records">
        <ol>
        { recordList.map(record => (
          <li key={record._id}><div><p>{record.name}</p><p>{record.recordTime}</p></div></li>
          )) }
        </ol>
      </div>
      <div className="navbar">
        <button
          className={`records-btn ${gameMode} ${showRecord ? 'active' : ''}`}
          onClick={handleRecord}>
          {showRecord ? "Hide Records" : "Show Records"}
        </button>
        <h1 className="navbar-brand">Minesweeper</h1>
        <div className="navbar-game-mode">
          <button
            className={`easy ${gameMode === 'easy' ? 'active' : ''}`}
            onClick={handleClick}
            value="easy">Easy</button>
          <button
            className={`pro ${gameMode === 'pro' ? 'active' : ''}`}
            onClick={handleClick}
            value="pro">Pro</button>
          <button
            className={`expert ${gameMode === 'expert' ? 'active' : ''}`}
            onClick={handleClick}
            value="expert">Expert</button>
        </div>
      </div>
    </>
  )
}

export default Navbar;
