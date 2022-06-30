import { TournamentLevel, TournamentGame } from '../../constants/messageTypes';
import { useDispatch } from 'react-redux';
import api from '../../api';
import Star from '../../assets/images/star.svg';

type Props = {
  tournamentGame: TournamentGame
}



function TournamentBracket({tournamentGame}: Props) {
  const dispatch = useDispatch();
  const star = <img src={Star} alt="Lived the longest" className="livedlongest" />

  function goToGame(tournamentGame: TournamentGame) {
     api.startTournamentGame(tournamentGame.gameId!)
  }

  let rows = [];
  for (let i = 0; i < tournamentGame.expectedNoofPlayers; i++) {
    const player = tournamentGame.players[i];
    let element = null;

    if (!player && tournamentGame.players.length > 0) {
      element = <li key={i} style={{textAlign: 'center'}}>- TBD -</li>;
    }

    else if (!tournamentGame.gamePlayed) {
      element = (
      <li key={i} className={player.isMovedUpInTournament ? 'winner' : 'looser'}>
        <span className="points">{player.points}</span>
        {player.name} {player.isWinner ? star : null}
      </li>);
    } else {
      element = <li key={i}>{player.name}</li>;
    }

    rows.push(element);
  }

  return (
    <>
      {rows}
    </>
    );

  if (!tournamentGame.gamePlayed) {
    return (
      <>
        {/* <p>Bracket</p>
        <p>{JSON.stringify(tournamentGame) }</p> */}
        {tournamentGame.players.map((player, index) => (
          <li key={index}>{player.name}</li>))
        }
        <div className="gotogame">
          <button
            type="button"
            className="button-link"
            onClick={()=>goToGame(tournamentGame)}
          >Go to game
          </button>
      </div>
      </>
    )
  } else {
    return (
      <>
        {tournamentGame.players.map((player, index) => (
          <li key={index} className={player.isMovedUpInTournament ? 'winner' : 'looser'}>
            <span className="points">{player.points}</span>
            {player.name} {player.isWinner ? star : null}
          </li>))
        }
      </>)
    }
}

export default TournamentBracket