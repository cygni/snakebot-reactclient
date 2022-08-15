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

function ControllBar() {
  const dispatch = useAppDispatch();
  const messagesLength = useAppSelector((state) => state.gameData.messages?.length);
  const messageIndex = useAppSelector((state) => state.gameData.counter);
  const [running, setRunning] = useState(false);
  const [frequency, setFrequency] = useState(Constants.STARTING_FREQUENCY);
  const gameEnded = useAppSelector((state) => state.currentFrame.gameEnded);
  const intervalID = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (running) {
      intervalID.current = setInterval(() => {
        if (running) {
          messageDispatch();
        }
      }, frequency);
    }
    return () => clearInterval(intervalID.current);
  }, [running, frequency]);

  useEffect(() => {
    if (gameEnded) {
      setRunning(false);
    }
  }, [gameEnded]);

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
          setRunning(false);
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
            setRunning(!running);
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
