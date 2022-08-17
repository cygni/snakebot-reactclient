import Backwards from "../assets/icons/icon-backwards.svg";
import Play from "../assets/icons/icon-play.svg";
import Pause from "../assets/icons/icon-pause.svg";
import Replay from "../assets/icons/icon-replay.svg";
import Forwards from "../assets/icons/icon-forward.svg";

import messageDispatch from "../context/messageDispatch";
import { useEffect, useRef, useState } from "react";
import Constants from "../constants/Arbitraryconstants";
import { setMessageIndex } from "../context/slices/gameDataSlice";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import { setGameRunning } from "../context/slices/currentFrameSlice";

function ControllBar() {
  const dispatch = useAppDispatch();
  const messagesLength = useAppSelector((state) => state.gameData.messages?.length);
  const messageIndex = useAppSelector((state) => state.gameData.counter);
  const running = useAppSelector(state => state.currentFrame.isRunning);
  const [frequency, setFrequency] = useState(Constants.STARTING_FREQUENCY);
  const gameEnded = useAppSelector((state) => state.currentFrame.gameEnded);
  const intervalID = useRef<NodeJS.Timer>();

  const snakes = useAppSelector(state => state.currentFrame.snakesData);
  useEffect(() => {
    if (running) {
      intervalID.current = setInterval(() => {

        // If a human player is playing, messages are instead dispatched in real time
        const anyPlayerAlive = Object.entries(snakes).some(snake => snake[1].name.startsWith('Player') && snake[1].alive);
        if (!anyPlayerAlive && running) {
          // console.log("Dispatching from ControllBar");
          messageDispatch();
        }
      }, frequency);
    }
    return () => clearInterval(intervalID.current);
  }, [running, frequency, snakes]);

  useEffect(() => {
    if (gameEnded) {
      console.log("Game ended", gameEnded);
      dispatch(setGameRunning(false));
    }
  }, [gameEnded]);

  useEffect(() => {
    // Stop the game on unmount
    return () => {
      dispatch(setGameRunning(false));
    }
  }, []);

  function getPlayIcon() {
    if (gameEnded) {
      return Replay;
    }
    if (!running) {
      return Play;
    }
    return Pause;
  }
  
  return (
    <div className='controlpanel'>
      <input
        type='range'
        step='1'
        min='2'
        max={messagesLength - 1}
        value={messageIndex}
        className='react-native-slider'
        onChange={(e) => {
          dispatch(setGameRunning(false));
          dispatch(setMessageIndex(parseInt(e.target.value)));
          messageDispatch(false);
        }}
      />
      <div className='controlbuttons'>
        <input
          type='image'
          alt='backwardbutton'
          src={Backwards}
          name='ButtonBackwards'
          className='backwardsButton'
          onClick={() => setFrequency(frequency + Constants.FREQUENCY_STEP)}
        />
        <input
          type='image'
          src={getPlayIcon()}
          alt='playbutton'
          name='PlayButton'
          className='playButton'
          onClick={() => {
            dispatch(setGameRunning(!running));
            if (gameEnded) {
              dispatch(setMessageIndex(2))
              messageDispatch(false);
            };
          }}
        />
        <input
          type='image'
          src={Forwards}
          alt='forwardbutton'
          name='ButtonForward'
          className='forwardButton'
          onClick={() => setFrequency(Math.max(frequency - Constants.FREQUENCY_STEP, Constants.MIN_FREQUENCY))}
        />
      </div>
    </div>
  );
}

export default ControllBar;
