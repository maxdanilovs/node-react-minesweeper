import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Axios from 'axios';

function GameOverModal() {
  const { gameStatus, time, startNewGame } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (gameStatus === 'won') {
      setActive(true);
      document.getElementById('modal-input').focus();
    }
  }, [gameStatus])

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post('/records/create', {
      name
    }).then(res => {
      console.log(res);
      startNewGame();
    });
      setActive(false);
      setName('');
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleClose(e) {
    e.preventDefault();
    setActive(false);
  }

  return (
    <div id="modal-background" className={active ? 'active' : ''}>
      <div id="modal-container" className={active ? 'active' : ''}>
      <span onClick={handleClose} className="close"></span>
        <div className="modal-content">
          <h1>You Win!</h1>
          <h2>Your time: {time} seconds</h2>
          <form>
            <input type="text" id="modal-input" onChange={handleChange} value={name} placeholder="enter your name"/>
            <input type="submit" onClick={handleSubmit} value="Save Record"/>
          </form>
          <br/>
          <button onClick={handleClose} className="restart-button">Restart Game</button>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal;
