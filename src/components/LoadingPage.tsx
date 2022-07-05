import { getSnakeHead } from '../constants/Images'

function LoadingPage({}) {
  
  return (
    <>
    <div className="loading">
  <h2>preparing the snakepit</h2>
  <span><img src={getSnakeHead("#0EBDE7").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#3CC321").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#9AF48E").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#BA43FF").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#F8F8F8").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#F978AD").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#FF8FAD").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#FF4848").src} alt="snakehead" /></span>
  <span><img src={getSnakeHead("#FFDF4A").src} alt="snakehead" /></span>
</div>
  </>
  )
}

export default LoadingPage