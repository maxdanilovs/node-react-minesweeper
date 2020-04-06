import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import sadEmoji from '../images/sad.png';
import smileEmoji from '../images/smile.png';
import sunglassesEmoji from '../images/sunglasses.png';
import clock from '../images/clock.png';
import mine from '../images/minesweeper_logo.png';


function TimerCounter() {
  const { gameStatus, mines, startNewGame } = useContext(GlobalContext);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameStatus === 'gameon') {
      startTimer();
    } else if (gameStatus === 'stopped') {
      clearInterval(timer);
      setTime(0);
    } else {
      clearInterval(timer);
    }
  }, [gameStatus] )

  function startTimer() {
    setTimer(setInterval(() => {
      setTime(time => time + 1);
    }, 1000))
  }

  function setEmoji(status) {
    if (status === 'won') {
      return sunglassesEmoji;
    } else if (status === 'lost') {
      return sadEmoji;
    } else {
      return smileEmoji;
    }
  }

  return (
    <div className="timer-counter">
    <div className="tc-display">
      <img src={clock} className="clock" alt=""/>
      <p className="">{time < 10 ? `0${time}` : time}</p>
    </div>
    <div className="tc-display">
        <img src={setEmoji(gameStatus)} alt="Restart" className="emoji" onClick={() => startNewGame()}/>
    </div>
        <div className="tc-display">
        <img src={mine} alt=""/>
        <p className="">{ mines }</p>
        </div>
    </div>
  )
}

export default TimerCounter;
