import { useParams } from "react-router-dom"


type Props = {}

function GameboardView({}: Props) {
    let { gameID } = useParams();

    let size = {width: 1000, height: 1000};

    function Navigation() {
        return (
            <p>TODO: NAVIGATION</p>
        )
    }

  return (
    <section className="page clear-fix">
        {Navigation()}

        <div className="thegame clear-fix">
            {/* <Sidebar /> */}
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
            </div>
        </div>
    </section>
  )
}

export default GameboardView