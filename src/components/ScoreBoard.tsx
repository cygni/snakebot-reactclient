import { getSnakeHead } from '../constants/Images'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../context/store';

function ScoreBoard() {
  const snakes = useSelector((state: RootState) => state.snakes.snakesData);

  return (
    <div className="box activePlayers">
        <ul>
            {
            Object.keys(snakes).sort((aID, bID) => snakes[bID].points - snakes[aID].points).map((snakeID, index: number) => (
            <li key={index}>
              <>
                <figure>
                <img src={getSnakeHead(snakes[snakeID].color)} alt="snakehead" />
                </figure>
                <strong>{snakes[snakeID].points}</strong>
                {snakes[snakeID].name}
              </>
            </li>
            ))
            }
        </ul>
    </div>
  )
}

export default ScoreBoard;
