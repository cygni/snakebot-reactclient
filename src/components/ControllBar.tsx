import Backwards from '../assets/icons/icon-backwards.svg';
import Play from '../assets/icons/icon-play.svg';
import Pause from '../assets/icons/icon-pause.svg';
import Replay from '../assets/icons/icon-replay.svg';
import Forwards from '../assets/icons/icon-forward.svg';

import messageDispatch from '../context/messageDispatch';
import { useEffect, useState } from 'react';
import Constants from '../constants/Arbitraryconstants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../context/store';
import { setCounter } from '../context/slices/gameDataSlice';

function ControllBar(){

  const frameCount = useSelector((state: RootState) => state.gameData.messages.length);
  const currentFrame = useSelector((state: RootState) => state.gameData.counter);
  const dispatch = useDispatch();

  const [running, setRunning] = useState(false);
  const [frequency, setFrequency] = useState(Constants.STARTING_FREQUENCY);
  let intervalID: NodeJS.Timer;
  const gameEnded = () => currentFrame >= frameCount-1;

  useEffect(() => {
    if (running) {
      intervalID = setInterval(() => {
        if (running) {
          messageDispatch();
        }
      }, frequency);
    }
    return () => clearInterval(intervalID);
  }, [running, frequency]);

  useEffect(() => {
    if (gameEnded()) {
      setRunning(false);
    }
  }, [gameEnded]);

  function getPlayIcon() {
    if (gameEnded()) {
      return Replay;
    }
    if (!running) {
      return Play;
    }
    return Pause;
  }

  return (
      <div className="controlpanel">
      <input
        type="range"
        step="1"
        min="3"
        max={frameCount - 1}
        value={currentFrame}
        className="react-native-slider"
        onChange={(e) => {
          console.log("event value:", e.target.value);
          dispatch(setCounter(parseInt(e.target.value)));
          messageDispatch(false);
        }}
      />
      <div className="controlbuttons">
        <input
          type="image"
          src={Backwards}
          name="ButtonBackwards"
          className="backwardsButton"
          onClick={() => setFrequency(frequency + Constants.FREQUENCY_STEP)}
        />
        <input
          type="image"
          src={getPlayIcon()} 
          name="PlayButton"
          className="playButton"
          onClick={()=>{
            setRunning(!running);
            if (gameEnded()) dispatch(setCounter(0));
          }}
        />
        <input
          type="image"
          src={Forwards}
          name="ButtonForward"
          className="forwardButton"
          onClick={()=> setFrequency(Math.max(frequency - Constants.FREQUENCY_STEP, Constants.MIN_FREQUENCY))}
        />
      </div>
    </div>
  );
}

export default ControllBar;