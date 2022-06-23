import Images from '../constants/Images'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../context/store';

function ScoreBoard() {
  const snakes = useSelector((state: RootState) => state.snakes.snakesData);

  function snakeHead(snakeID: string) {
    return Images.getSnakeHead(snakes[snakeID].color, true).src;
  }

  return (
    <div className="box activePlayers">
        <ul>
            {
            Object.keys(snakes).map((snakeID, index: number) => (
            <li key={index}>
              <>
              <figure>
              <img src={snakeHead(snakeID)} alt="snakehead" />
              </figure>
              <strong>10</strong> {snakes[snakeID].name}
              </>
            </li>
            ))
            }
        </ul>
    </div>
  )
}

export default ScoreBoard;
