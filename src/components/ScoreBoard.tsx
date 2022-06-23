import Images from '../constants/Images'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../context/store';

function ScoreBoard() {
  const snakes = useSelector((state: RootState) => state.snakes.snakesData);

  function snakeHead(snakeID: string) {
    if (!snakes[snakeID].alive) {
      return Images.getSnakeHead("#dead", true).src;
    }

    return Images.getSnakeHead(snakes[snakeID].color, true).src;
  }

  return (
    <div className="box activePlayers">
        <ul>
            {
            Object.keys(snakes).sort((aID, bID) => snakes[bID].points - snakes[aID].points).map((snakeID, index: number) => (
            <li key={index}>
              <>
                <figure>
                <img src={snakeHead(snakeID)} alt="snakehead" />
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
