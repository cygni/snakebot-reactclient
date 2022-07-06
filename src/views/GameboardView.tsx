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

type Props = {
    
}

function GameboardView({}: Props) {
    const navigate = useNavigate();
    
    const [isOpen, setIsOpen] = useState(false);
    const size = {height: MAP_HEIGHT_PX, width: MAP_WIDTH_PX};
    const dispatch = useDispatch();
    const currentFrameState = useSelector((state: RootState) => state.currentFrame);
    const tournamentState = useSelector((state: RootState) => state.tournament.isTournamentStarted);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<{[key: string]: HTMLImageElement}>({});

    let { gameID } = useParams();

    // Initialize the game
    useEffect(() => {
        dispatch(clearCurrentFrame());
        api.getGame(gameID!).then(game => {
            console.log("fetched game", game);
            dispatch(setGameData(game));
        });
    }, [gameID]);

    // Redraw on snakeState change
    useEffect(() => {
        draw();
    }, [currentFrameState]);

    function draw() {
        const ctx = canvasRef.current!.getContext("2d");

        // Clear canvas
        ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        drawFood(ctx!);
        drawSnakes(ctx!);
        drawObstacles(ctx!);
    }


    function drawFood(ctx: CanvasRenderingContext2D) {
        currentFrameState.foodPositions.forEach(food => {
            ctx.drawImage(getStar(), food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });

    }

    function drawObstacles(ctx: CanvasRenderingContext2D) {
        currentFrameState.obstaclePositions.forEach(obstacle => {
            ctx.fillStyle = "black";
            ctx.fillRect(obstacle.x * TILE_SIZE, obstacle.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    }

    function drawSnakes(ctx: CanvasRenderingContext2D) {
        currentFrameState.IDs.forEach(snakeID => {
            const snake = currentFrameState.snakesData[snakeID];
            snake.positions.forEach((position, index) => {
                const { x, y } = position;
                
                if (index === 0) {
                    // Move to the the given tile
                    ctx.translate(x * TILE_SIZE, y * TILE_SIZE);

                    // Rotate around the center of the image
                    ctx.translate(TILE_SIZE / 2, TILE_SIZE / 2);
                    ctx.rotate(getRotation(snake.positions[0], snake.positions[1]));
                    ctx.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);

                    ctx.drawImage(getCurrentSnakeHead(snake), 0, 0, TILE_SIZE, TILE_SIZE);

                    // Reset the translation and rotation for next draw
                    ctx.resetTransform();
                } else if (index === snake.positions.length - 1) {
                    // Move to the the given tile
                    ctx.translate(x * TILE_SIZE, y * TILE_SIZE);

                    // Rotate around the center of the image
                    ctx.translate(TILE_SIZE / 2, TILE_SIZE / 2);
                    ctx.rotate(getRotation(snake.positions[index - 1], snake.positions[index]));
                    ctx.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);

                    ctx.drawImage(getCurrentSnakeTail(snake), 0, 0, TILE_SIZE, TILE_SIZE);

                    // Reset the translation and rotation for next draw
                    ctx.resetTransform();
                }
                else {
                    ctx.fillStyle = snake.alive ? snake.color : colors.DEAD_SNAKE;
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
                
            });
        });
    }


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