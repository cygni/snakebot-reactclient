import { getSnakeHead } from '../constants/Images'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../context/store';

function ScoreBoard() {
  const snakes = useSelector((state: RootState) => state.currentFrame.snakesData);

  //SORT BY 1. ALIVE, 2. POINTS, 3.NAME IN THAT ORDER
  function sortSnakes(snakeID_one: string, snakeID_two: string){
    const snakeOne = snakes[snakeID_one];
    const snakeTwo = snakes[snakeID_two];

    
    if (!snakeOne.alive && snakeTwo.alive) {
      return 1;
    } else if (!snakeTwo.alive && snakeOne.alive) {
      return -1;
    }
  
    const pointDiff = snakeTwo.points - snakeOne.points;
    if (pointDiff !== 0) {
      return pointDiff;
    }
  
    if (snakeOne.name > snakeTwo.name) {
      return 1;
    } else if (snakeTwo.name < snakeTwo.name) {
      return -1;
    }
  
    return 0;

  }

  return (
    <div className="box activePlayers">
        <ul>
            {
            Object.keys(snakes).sort(sortSnakes).map((snakeID, index: number) => (
            <li key={index}>
              <>
                <figure>
                <img src={getSnakeHead(snakes[snakeID].color).src} alt="snakehead" />
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
