import snakehead from '../../../assets/images/0EBDE7.png';
import { useContext } from 'react';
import { GameContext } from '../../../context/GameProvider';

function ScoreBoard() {
  // const [gameData, setGameData] = useContext(GameContext);
  // const snakes = gameData.playerNames;

  const snakes = ["temp1", "temp2"];

  return (
    <div className="box activePlayers">
        <ul>
            {
            snakes.map((snake, index) => (
            <li key={index}>
            <figure>
            <img src={snakehead} alt="snakehead" />
            </figure>
            <strong>10</strong> {snake}
            </li>
            ))}
        </ul>
    </div>
  )
}

export default ScoreBoard;
