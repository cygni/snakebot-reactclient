import { TournamentGame } from '../../constants/messageTypes';
import Star from '../../assets/images/star.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { viewedGame } from '../../context/slices/tournamentSlice';
import { useCallback } from 'react';

type Props = {
  tournamentGame: TournamentGame;
  levelIndex: number;
}

function TournamentBracket({tournamentGame, levelIndex}: Props) {
  const star = <img src={Star} alt="Lived the longest" className="livedlongest" />
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const priorLevel = useAppSelector(state => state.tournament.tournamentLevels[levelIndex-1]);
  const currentLevel = useAppSelector(state => state.tournament.tournamentLevels[levelIndex])

  function goToGame(tournamentGame: TournamentGame) {
    if (tournamentGame.gamePlayed && priorLevelViewed()) {
      console.log("Go to tournamentGame:", tournamentGame.gameId);
      dispatch(viewedGame(tournamentGame.gameId));
      navigate(`/tournament/${tournamentGame.gameId}`);
    } else {
      alert("You must view the previous round before you can view this game");
    }
  }

  const priorLevelViewed = useCallback(
    () => {
      if (levelIndex===0) return true;
      return priorLevel.tournamentGames.every(game => game.isViewed);
    }, [priorLevel, levelIndex]);

    const currentLevelViewed = useCallback(
      () => {
        return currentLevel.tournamentGames.every(game => game.isViewed);
      }, [currentLevel]);
  
  function RenderPlayer(index: number) {
    let player = tournamentGame.players[index];
    if (!player || !priorLevelViewed()) {
  
      return <li key={index} style={{textAlign: 'center'}}>- TBD -</li>;
    }
  
    if (tournamentGame.gamePlayed && tournamentGame.isViewed) {
      let className = '';
      if (player.isWinner) className += 'winner ';
      if (currentLevelViewed() && !player.isMovedUpInTournament) className += 'looser';
      return (
        <li key={index} className={className}>
          {player.name} {player.isWinner ? null : null}
          <span className="points">{player.points+'p'}</span>
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