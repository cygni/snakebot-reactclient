import { getSnakeHead } from '../../constants/Images'
import { useAppSelector } from "../../context/hooks";

function LoadingPage() {
  const gameFinishedShare = useAppSelector(state => state.tournament.gameFinishedShare);
  
  return (
    <div className="loading">
      <h2>preparing the snakepit</h2>
      <span><img src={getSnakeHead("#0EBDE7").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#3CC321").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#9AF48E").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#BA43FF").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#F8F8F8").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#F978AD").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#9BF3F0").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#FF4848").src} alt="snakehead" /></span>
      <span><img src={getSnakeHead("#FFDF4A").src} alt="snakehead" /></span>
      <h1 className='percentloader'>{Math.round(gameFinishedShare)}%</h1>
    </div>
  )
}

export default LoadingPage