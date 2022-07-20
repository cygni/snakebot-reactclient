import { getCurrentSnakeHead } from '../constants/Images'
import { useAppSelector } from '../context/hooks';

function ScoreBoard() {
  const snakes = useAppSelector(state => state.currentFrame.snakesData);

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
    <div className="activePlayers">
      <h2>Leaderboard</h2>
      <div className="leaderboard">
        <ul>
            {
            Object.keys(snakes).sort(sortSnakes).map((snakeID, index) => (
              <li key={index}>
                <img src={getCurrentSnakeHead(snakes[snakeID]).src} alt="snakehead" />
                <div className="list-content">
                  <p className='name'>{snakes[snakeID].name}</p>
                  <p className='points'>{snakes[snakeID].points} points</p>
                </div>
              </li>
            ))
            }
        </ul>
      </div>
    </div>
  )
}

export default ScoreBoard;
