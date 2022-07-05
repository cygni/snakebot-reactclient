import { TournamentGame } from '../../constants/messageTypes';
import api from '../../api';
import Star from '../../assets/images/star.svg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../context/hooks';

type Props = {
  tournamentGame: TournamentGame
}

function TournamentBracket({tournamentGame}: Props) {
  const star = <img src={Star} alt="Lived the longest" className="livedlongest" />
  const navigate = useNavigate();

  function goToGame(tournamentGame: TournamentGame) {
    if (tournamentGame.gamePlayed) {
      console.log("Go to tournamentGame:", tournamentGame.gameId);
      navigate(`/tournament/${tournamentGame.gameId}`);
    } else {
      // Safe guard against going to a game that has not been played yet
      // TODO: Implement a better solution
      alert("You have not played this game yet!");
    }
  }

  function RenderPlayer(index: number) {
    let player = tournamentGame.players[index];
    if (!player) {
      if (tournamentGame.players.length > 0) {
        return null;
      }
  
      return <li key={index} style={{textAlign: 'center'}}>- TBD -</li>;
    }
  
    if (tournamentGame.gamePlayed) {
      return (
        <li key={index} className={player.isMovedUpInTournament ? 'winner' : 'looser'}>
          <span className="points">{player.points}</span>
          {player.name} {player.isWinner ? star : null}
        </li>
      );
    }
  
    return (
      <li key={index}> {player.name} </li>
    );
  }

  return (
    <>
      {[...Array(tournamentGame.expectedNoofPlayers)].map((_, index) => RenderPlayer(index))}

      <div className="gotogame">
        <button type="button" className="button-link" onClick={()=>goToGame(tournamentGame)}
          >Go to game
        </button>
      </div>   
    </>
  )
}

export default TournamentBracket