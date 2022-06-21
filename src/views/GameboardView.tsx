import { useParams } from "react-router-dom"
import ControllBar from '../components/ControllBar'

import ScoreBoard from "../components/game/components/ScoreBoard";

import BoardUtils from "../constants/BoardUtils";
import api from "../api";
import { useState, useContext } from "react";
import { GameContext } from "../context/GameProvider";

type Props = {}

function GameboardView({}: Props) {
    const size = BoardUtils.calculateSize();
    const [gameData, setGameData] = useContext(GameContext);

    let { gameID } = useParams();

    function Navigation() {
        return (
            <p>TODO: NAVIGATION</p>
        )
    }

  return (
    <section className="page clear-fix">
        {Navigation()}
        <button onClick={
            async () => {
                const data = await api.getGame(gameID!);
                console.log(data)
                setGameData(data);
            }
        } >Get game</button>

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
                />
                {/* <GameControl /> */}
                <ControllBar/>
                
                
            </div>
        </div>
    </section>
  )
}
export default GameboardView