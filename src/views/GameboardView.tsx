import { useParams } from "react-router-dom"
import ControllBar from '../components/ControllBar';

import ScoreBoard from "../components/ScoreBoard";

import {convertCoords, MAP_HEIGHT_PX, MAP_WIDTH_PX, TILE_SIZE } from "../constants/BoardUtils";
import { MAP_HEIGHT, MAP_WIDTH } from "../constants/BoardUtils";
import api from "../api";
import { useRef, useEffect } from "react";
import { GameContext } from "../context/GameProvider";
import { useDispatch, useSelector } from "react-redux";
import { setGameData } from "../context/slices/gameDataSlice";
import messageDispatch from "../context/messageDispatch";
import { RootState } from "../context/store";
import { store } from "../context/store";
import { getRotation, getSnakeHead, getSnakeTail} from '../constants/Images'



type Props = {}

function GameboardView({}: Props) {
    const size = {height: MAP_HEIGHT_PX, width: MAP_WIDTH_PX};
    const dispatch = useDispatch();
    const snakesState = useSelector((state: RootState) => state.snakes);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    let { gameID } = useParams();

    // Initialize the game
    useEffect(() => {
        api.getGame(gameID!).then(game => {
            console.log("fetched game", game);
            dispatch(setGameData(game));

            // Dispatch until the first snake positions are fetched
            messageDispatch();
            messageDispatch();
            messageDispatch();
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
        snakes.IDs.forEach(snakeID => {
            const snake = snakes.snakesData[snakeID];
            snake.positions.forEach((position, index) => {
                const { x, y } = position;
                
                if (index === 0) {
                    let img = new Image;
                    img.onload = () => {
                        // Move to the the given tile
                        ctx?.translate(x * TILE_SIZE, y * TILE_SIZE);

                        // Rotate around the center of the image
                        ctx?.translate(TILE_SIZE / 2, TILE_SIZE / 2);
                        ctx?.rotate(getRotation(snake.positions[0], snake.positions[1]));
                        ctx?.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);

                        ctx?.drawImage(img, 0, 0, TILE_SIZE, TILE_SIZE);

                        // Reset the translation and rotation for next draw
                        ctx?.resetTransform();
                    }
                    img.src = getSnakeHead(snake.color);
                } else if (index === snake.positions.length - 1) {
                    let img = new Image;
                    img.onload = () => {
                        // Move to the the given tile
                        ctx?.translate(x * TILE_SIZE, y * TILE_SIZE);

                        // Rotate around the center of the image
                        ctx?.translate(TILE_SIZE / 2, TILE_SIZE / 2);
                        ctx?.rotate(getRotation(snake.positions[index - 1], snake.positions[index]));
                        ctx?.translate(-TILE_SIZE / 2, -TILE_SIZE / 2);

                        ctx?.drawImage(img, 0, 0, TILE_SIZE, TILE_SIZE);

                        // Reset the translation and rotation for next draw
                        ctx?.resetTransform();
                    }
                    img.src = getSnakeTail(snake.color);
                }
                else {
                    ctx!.fillStyle = snake.color;
                    ctx!.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
                
            });
        });
    }


    function Navigation() {
        return (
            <p>TODO: NAVIGATION</p>
        )
    }

  return (
    <section className="page clear-fix">
        {Navigation()}
        <button onClick={()=>{
            messageDispatch();
            // drawSnakes();
            }}>Dispatch next message</button>

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