import { useParams, useNavigate } from 'react-router-dom';
import ControllBar from '../components/ControllBar';
import ScoreBoard from '../components/ScoreBoard';

import api from '../api';
import { useEffect } from 'react';
import { setGameData } from '../context/slices/gameDataSlice';
import messageDispatch from '../context/messageDispatch';
import { clearCurrentFrame } from '../context/slices/currentFrameSlice';
import { useAppDispatch, useAppSelector } from '../context/hooks';

// For drawing the gameboard
import { MAP_HEIGHT_PX, MAP_WIDTH_PX } from '../constants/BoardUtils';
import { Layer, Stage } from 'react-konva';
import Snake from '../components/canvas/Snake';
import Obstacles from '../components/canvas/Obstacles';
import Stars from '../components/canvas/Food';

type Props = {
  gameID?: null | string;
  children?: React.ReactNode;
};

function GameboardView({ gameID, children }: Props) {
  let params = useParams();
  if (!gameID) {
    // If no gameID is provided, use the one in the URL
    gameID = params.gameID!;
  }
  const dispatch = useAppDispatch();
  const currentFrameState = useAppSelector((state) => state.currentFrame);

  // Initialize the game
  useEffect(() => {
    // Reset the current frame state
    dispatch(clearCurrentFrame());

    // Setup the game
    api.getGame(gameID!).then((game) => {
      console.log('Fetched game', game);
      if (JSON.stringify(game) === '{}'){
        alert('Game not found or might still be running');
      }
      dispatch(setGameData(game));

      // dispatch 3 times so we get the first map update
      messageDispatch();
      messageDispatch();
      messageDispatch(false);
    });
  }, [dispatch, gameID]);

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

      </div>
    </section>
  );
}
export default GameboardView;
