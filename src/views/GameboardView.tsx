import { useParams } from "react-router-dom"
import ControllBar from '../components/ControllBar'

import Sidebar from "../components/game/components/ScoreBoard";

import BoardUtils from "../constants/BoardUtils";
import api from "../api";


type Props = {}

function GameboardView({}: Props) {
    const size = BoardUtils.calculateSize();
    let { gameID } = useParams();

    function Navigation() {
        return (
            <p>TODO: NAVIGATION</p>
        )
    }

  return (
    <section className="page clear-fix">
        {Navigation()}

       
        <button onClick={async () => {console.log(await api.getGame(gameID!))}}>Get game</button>

        <div className="thegame clear-fix">
        <Sidebar />
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