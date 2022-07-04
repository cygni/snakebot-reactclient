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
import { getRotation, getSnakeHead, getSnakeTail} from '../constants/Images'
import colors from '../constants/Colors'
import { useNavigate } from 'react-router-dom';

type Props = {
    
}

function GameboardView({}: Props) {
    const navigate = useNavigate();
    
    const [isOpen, setIsOpen] = useState(false);
    const size = {height: MAP_HEIGHT_PX, width: MAP_WIDTH_PX};
    const dispatch = useDispatch();
    const snakesState = useSelector((state: RootState) => state.snakes);
    const tournamentState = useSelector((state: RootState) => state.tournament.isTournamentActive);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<{[key: string]: HTMLImageElement}>({});

    let { gameID } = useParams();

    // Initialize the game
    useEffect(() => {
        api.getGame(gameID!).then(game => {
            console.log("fetched game", game);
            dispatch(setGameData(game));
        });
    }, [gameID]);

    // Redraw on snakeState change
    useEffect(() => {
        drawSnakes();
    }, [snakesState]);

    function drawSnakes() {
        const ctx = canvasRef.current!.getContext("2d");

        // Clear canvas
        ctx?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

        const snakes = store.getState().snakes;
        snakes.IDs.forEach((snakeID, snakeIndex) => {
            const snake = snakes.snakesData[snakeID];
            snake.positions.forEach((position, index) => {
                const { x, y } = position;
                
                if (index === 0) {
                    // Move to the the given tile
                    ctx?.translate(x * TILE_SIZE, y * TILE_SIZE);

                    // Rotate around the center of the image
                    ctx?.translate(TILE_SIZE / 2, TILE_SIZE / 2);
                    ctx?.rotate(getRotation(snake.positions[0], snake.positions[1]));
                    ctx?.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);

                    // ctx?.drawImage(testImg, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    ctx?.drawImage(getSnakeHead(snake.color), 0, 0, TILE_SIZE, TILE_SIZE);

                    // Reset the translation and rotation for next draw
                    ctx?.resetTransform();
                } else if (index === snake.positions.length - 1) {
                    // Move to the the given tile
                    ctx?.translate(x * TILE_SIZE, y * TILE_SIZE);

                    // Rotate around the center of the image
                    ctx?.translate(TILE_SIZE / 2, TILE_SIZE / 2);
                    ctx?.rotate(getRotation(snake.positions[index - 1], snake.positions[index]));
                    ctx?.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);

                    ctx?.drawImage(getSnakeTail(snake.color), 0, 0, TILE_SIZE, TILE_SIZE);

                    // Reset the translation and rotation for next draw
                    ctx?.resetTransform();
                }
                else {
                    ctx!.fillStyle = snake.color;
                    ctx!.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
                
            });
        });
    }


    function Navigation() {
        if(tournamentState === true)
        return (
            <button className="primaryBtn" onClick={() => navigate('/tournament')}>View Bracket</button>
            //Next Game also?
        )
    }

  return (
    <section className="page clear-fix">
        {Navigation()}
        <button onClick={()=>{
            messageDispatch();
            // drawSnakes();
            }}>Dispatch next message</button>

            <button className="primaryBtn" onClick={() => setIsOpen(true)}>Open Modal</button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
            

        <div className="thegame clear-fix">
        <ScoreBoard />
            <div className="gameboard">
                <canvas
                id="canvas"
                width={size.width + 0}
                height={size.height + 0}
                // ref={(c) => {
                //     this.canvas = c;
                //   }}
                ref={canvasRef}
                />
                {/* <GameControl /> */}
                <ControllBar/>
                
                
            </div>
        </div>
    </section>
  )
}
export default GameboardView