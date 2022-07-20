import { useParams, useNavigate } from "react-router-dom"
import ControllBar from '../components/ControllBar';
import ScoreBoard from "../components/ScoreBoard";

import api from "../api";
import { useEffect, useState } from "react";
import { setGameData } from "../context/slices/gameDataSlice";
import messageDispatch from "../context/messageDispatch";
import { clearCurrentFrame } from "../context/slices/currentFrameSlice";
import { useAppDispatch, useAppSelector } from "../context/hooks";

// For drawing the gameboard
import {MAP_HEIGHT_PX, MAP_WIDTH_PX, TILE_SIZE } from "../constants/BoardUtils";
import { Layer, Stage } from "react-konva";
import Snake from "../canvasComponents/Snake";
import Obstacles from "../canvasComponents/Obstacles";
import Stars from "../canvasComponents/Stars";

import Modal from "../components/Modal"

function GameboardView() {
    let { gameID } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentFrameState = useAppSelector(state => state.currentFrame);
    const tournamentStarted = useAppSelector(state => state.tournament.isTournamentStarted);
    const gameEnded = useAppSelector(state => state.currentFrame.gameEnded);
    const [modalOpen, setModalOpen] = useState(false);

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

    useEffect(() => {
        console.log("här ska det hända något")
        if(gameEnded){
            setModalOpen(true);
        }
    }, [gameEnded])

    useEffect(() => {
        if(modalOpen){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

    },[modalOpen])


  return (
    <section className="page clear-fix">
        {BracketNavigation()}
        
        <div className="thegame">
        <ScoreBoard />
            <div className="gameboard" >
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
        {modalOpen && <Modal setIsOpen={setModalOpen} />}
    </section>
  )
}
export default GameboardView