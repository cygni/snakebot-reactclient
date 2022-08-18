import { useParams } from 'react-router-dom';
import ControllBar from '../components/ControllBar';
import ScoreBoard from '../components/ScoreBoard';

import api from '../api';
import { useEffect, useRef } from 'react';
import { clearGameData, setGameData } from '../context/slices/gameDataSlice';
import messageDispatch from '../context/messageDispatch';
import { clearCurrentFrame } from '../context/slices/currentFrameSlice';
import { useAppDispatch, useAppSelector } from '../context/hooks';
import volumeOn from '../assets/icons/volume-icon.svg';
import volumeOff from '../assets/icons/volume-mute-icon.svg';
import { useState } from 'react';

// For drawing the gameboard
import { MAP_HEIGHT_PX, MAP_WIDTH_PX } from '../constants/BoardUtils';
import { Layer, Stage } from 'react-konva';
import Snake from '../components/canvas/Snake';
import Obstacles from '../components/canvas/Obstacles';
import Stars from '../components/canvas/Food';
import Arbitraryconstants from '../constants/Arbitraryconstants';

type Props = {
  gameID?: null | string;
  musicElement?: HTMLAudioElement;
  children?: React.ReactNode;
};

function GameboardView({ gameID, musicElement = Arbitraryconstants.AUDIO_REGULAR, children }: Props) {

  const [volumeIcon, setVolumeIcon] = useState(Arbitraryconstants.TTS_VOLUME === 0 ? volumeOff : volumeOn);
  const gameEnded = useAppSelector(state => state.currentFrame.gameEnded);

  let params = useParams();
  if (!gameID) {
    // If no gameID is provided, use the one in the URL
    gameID = params.gameID!;
  }
  const dispatch = useAppDispatch();
  const currentFrameState = useAppSelector((state) => state.currentFrame);

  const isRunning = useAppSelector(state => state.currentFrame.isRunning);
  useEffect(() => {
    if (isRunning) {
      musicElement.play();
    }
    return () => {
      musicElement.pause();
    }
  } , [isRunning, musicElement]);

  // Reset the music timer when the game ends or when this component is unmounted
  useEffect(() => {
    return ()=>{musicElement.currentTime = 0;}
  }, [musicElement, gameEnded]);

  async function tryToFetchHistory() {
    let game = await api.getGame(gameID!);
    console.log('Fetched game', game);
    if (JSON.stringify(game) === '{}'){
      return;
    }
    dispatch(setGameData(game));
  }

  // Initialize the game
  useEffect(() => {
    // Reset the game data and the current frame state
    dispatch(clearGameData());
    dispatch(clearCurrentFrame());

    // Setup the game
    tryToFetchHistory().then(() => {
      // Dispatch until first map update
      messageDispatch();
      messageDispatch();
      messageDispatch(false);
    })
  }, []);

  function handleVolume(){
    if (Arbitraryconstants.TTS_VOLUME === 0){
      Arbitraryconstants.TTS_VOLUME = 0.5;
      Arbitraryconstants.AUDIO_REGULAR.volume = 0.5;
      Arbitraryconstants.AUDIO_FINAL.volume = 0.5;
      setVolumeIcon(volumeOn);
    }else {
      Arbitraryconstants.TTS_VOLUME = 0;
      Arbitraryconstants.AUDIO_REGULAR.volume = 0;
      Arbitraryconstants.AUDIO_FINAL.volume = 0;
      setVolumeIcon(volumeOff);
    }
    console.log(Arbitraryconstants.TTS_VOLUME);
  }

  return (
    <section className='page clear-fix'>
      <div className='thegame'>
        
        <ScoreBoard />
        <div className='gameboard'>
          <Stage className='canvas' width={MAP_WIDTH_PX} height={MAP_HEIGHT_PX}>
            <Layer>
              {currentFrameState.IDs.map((snakeID, i) => {
                const snake = currentFrameState.snakesData[snakeID];
                return <Snake key={i} snake={snake} />;
              })}
              <Obstacles obstacles={currentFrameState.obstaclePositions} />
              <Stars stars={currentFrameState.foodPositions} />
            </Layer>
          </Stage>
          <ControllBar />
        </div>
        
        <div className='additionalControls'>
          {children}
        </div>
        <div className='voiceControls'>
          <img src={volumeIcon} onClick={handleVolume} alt='volume on' />
        </div>
      </div>
    </section>
  );
}
export default GameboardView;
