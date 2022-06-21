import snakehead from '../../../assets/images/0EBDE7.png';

type Props = {
    snakes: string[];
}

function ScoreBoard({ snakes }: Props) {

    return (
      <div className="box activePlayers">
          <ul>
              {
              snakes.map(snake => (
              <li key={snake}>
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
