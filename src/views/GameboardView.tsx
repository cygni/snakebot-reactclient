import { useParams, useNavigate } from "react-router-dom"
import ControllBar from '../components/ControllBar';
import ScoreBoard from "../components/ScoreBoard";

import api from "../api";
import { useEffect } from "react";
import { setGameData } from "../context/slices/gameDataSlice";
import messageDispatch from "../context/messageDispatch";
import { clearCurrentFrame } from "../context/slices/currentFrameSlice";
import { useAppDispatch, useAppSelector } from "../context/hooks";

// For drawing the gameboard
import {MAP_HEIGHT_PX, MAP_WIDTH_PX } from "../constants/BoardUtils";
import { Layer, Stage } from "react-konva";
import Snake from "../canvasComponents/Snake";
import Obstacles from "../canvasComponents/Obstacles";
import Stars from "../canvasComponents/Stars";

function GameboardView() {
    let { gameID } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentFrameState = useAppSelector(state => state.currentFrame);
    const tournamentStarted = useAppSelector(state => state.tournament.isTournamentStarted);

    // Initialize the game
    useEffect(() => {
        // Reset the current frame state
        dispatch(clearCurrentFrame());

        // Setup the game
        api.getGame(gameID!).then(game => {
            console.log("Fetched game", game);
            dispatch(setGameData(game));

            // dispatch 3 times so we get the first map update
            messageDispatch();
            messageDispatch();
            messageDispatch();
        });
    }, [gameID]);

    // Display button to go back to the tournament bracket
    function BracketNavigation() {
        if (tournamentStarted) {
            return (
                <button className="primaryBtn" onClick={() => navigate('/tournament')}>View Bracket</button>
            )
        }
    }

  return (
    <section className="page clear-fix">
        {BracketNavigation()}
        
        <div className="thegame clear-fix">
        <ScoreBoard />
            <div className="gameboard">
                <Stage className="canvas" width={MAP_WIDTH_PX} height={MAP_HEIGHT_PX}>
                    <Layer>
                        {currentFrameState.IDs.map((snakeID, i) => {
                            const snake = currentFrameState.snakesData[snakeID];
                            return (
                                <Snake key={i} snake={snake}/>
                            );
                        })}
                        <Obstacles obstacles={currentFrameState.obstaclePositions}/>
                        <Stars stars={currentFrameState.foodPositions}/>
                    </Layer>
                </Stage>
                <ControllBar/>
            </div>
        </div>
    </section>
  )
}
export default GameboardView