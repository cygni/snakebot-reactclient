import { useParams } from "react-router-dom"
import ControllBar from '../components/ControllBar';

import ScoreBoard from "../components/ScoreBoard";

import {convertCoords, MAP_HEIGHT_PX, MAP_WIDTH_PX, TILE_SIZE } from "../constants/BoardUtils";
import { MAP_HEIGHT, MAP_WIDTH } from "../constants/BoardUtils";
import api from "../api";
import { useRef, useEffect, useState } from "react";
import { GameContext } from "../context/GameProvider";
import { useDispatch, useSelector } from "react-redux";
import { setGameData } from "../context/slices/gameDataSlice";
import { TournamentData } from "../context/slices/tournamentSlice";
import { TournamentGame } from '../constants/messageTypes';
import messageDispatch from "../context/messageDispatch";
import Modal from "../components/Modal";
import { RootState } from "../context/store";
import { store } from "../context/store";
import { getRotation, getCurrentSnakeHead, getCurrentSnakeTail, getStar} from '../constants/Images'
import colors from '../constants/Colors'
import { useNavigate } from 'react-router-dom';
import { clearCurrentFrame } from "../context/slices/currentFrameSlice";

import { Layer, Stage } from "react-konva";
import Snake from "../canvasComponents/Snake";
import { url } from "inspector";
import Obstacles from "../canvasComponents/Obstacles";
import Stars from "../canvasComponents/Stars";

type Props = {
    
}

function GameboardView({}: Props) {
    const navigate = useNavigate();
    
    const size = {height: MAP_HEIGHT_PX, width: MAP_WIDTH_PX};
    const dispatch = useDispatch();
    const currentFrameState = useSelector((state: RootState) => state.currentFrame);
    const tournamentState = useSelector((state: RootState) => state.tournament.isTournamentStarted);
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<{[key: string]: HTMLImageElement}>({});

    let { gameID } = useParams();

    // Initialize the game
    useEffect(() => {
        dispatch(clearCurrentFrame());
        api.getGame(gameID!).then(game => {
            console.log("fetched game", game);
            dispatch(setGameData(game));

            // dispatch until first map update
            messageDispatch();
            messageDispatch();
            messageDispatch();
        });
    }, [gameID]);


    function Navigation() {
        if(tournamentState === true){
        return (
            <button className="primaryBtn" onClick={() => navigate('/tournament')}>View Bracket</button>
            //Next Game also?
        )
        }
    }

  return (
    <section className="page clear-fix">
        {Navigation()}
        
        <div className="thegame clear-fix">
        <ScoreBoard />
            <div className="gameboard">
                <Stage className="canvas" width={size.width + 0} height={size.height + 0}>
                    <Layer>
                        {/* <SnakePart x={2} y={2}/> */}
                        {/* <SnakePart x={2} y={3}/>
                        <SnakePart x={3} y={3}/> */}

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