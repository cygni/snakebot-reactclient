import { TournamentGame } from "../../constants/messageTypes";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { viewGame } from "../../context/slices/tournamentSlice";
import { useCallback } from "react";

type Props = {
  tournamentGame: TournamentGame;
  levelIndex: number;
};

function TournamentBracket({ tournamentGame, levelIndex }: Props) {
  const dispatch = useAppDispatch();
  const priorLevel = useAppSelector(state => state.tournament.tournamentLevels[levelIndex - 1]);
  const currentLevel = useAppSelector(state => state.tournament.tournamentLevels[levelIndex]);
  const viewedGames: { [key: string]: boolean } = localStorage.getItem('viewedGames') ? JSON.parse(localStorage.getItem('viewedGames')!) : {};
  const levels = useAppSelector((state) => state.tournament.tournamentLevels);
  const finalGame = levels[levels.length - 1]?.tournamentGames[0];

  function goToGame(tournamentGame: TournamentGame) {
    if (tournamentGame.gamePlayed && priorLevelViewed()) {
      console.log("Go to tournamentGame:", tournamentGame.gameId);
      dispatch(viewGame(tournamentGame.gameId));
    } else {
      // Shouldn't happen but just in case
      alert("The game must finish and you must view the previous round before you can view this game");
    }
    if (finalGame.gameId === tournamentGame.gameId){
      localStorage.setItem('isFinalGame', 'true');
    } else {
      localStorage.setItem('isFinalGame', 'false');
    }
  }

  const priorLevelViewed = useCallback(() => {
    if (levelIndex === 0) return true;
    return priorLevel.tournamentGames.every((game) => viewedGames[game.gameId!] === true);
  }, [priorLevel, levelIndex, viewedGames]);

  const currentLevelViewed = useCallback(() => {
    return currentLevel.tournamentGames.every((game) => viewedGames[game.gameId!] === true);
  }, [currentLevel, viewedGames]);

  function RenderPlayer(index: number) {
    let player = tournamentGame.players[index];
    if (!player || !priorLevelViewed()) {
      return (
        <li key={index} style={{ textAlign: "center" }}>
          - TBD -
        </li>
      );
    }

    if (tournamentGame.gamePlayed && viewedGames[tournamentGame.gameId!]) {
      let className = "";
      if (player.isWinner) className += "winner ";
      if (currentLevelViewed() && !player.isMovedUpInTournament)
        className += "looser";
      return ( 
        <li key={index} className={className}>
          {player.name}
          <span className="points">{player.points + "p"}</span>
        </li>
      );
    }

    return <li key={index}> {player.name} </li>;
  }

  function RenderGameLink() {
    if (!priorLevelViewed()) return null;

    if (!tournamentGame.gamePlayed) {
      return (
        <div className="gotogame">
          <label>
            Running...
          </label>
        </div>
      );
    }

    return (
      <div className="gotogame">
        <button
          type="button"
          className="button-link"
          onClick={() => goToGame(tournamentGame)}
        >
          <label>
            Go to game
          </label>
        </button>
      </div>
    );
  }

  return (
    <>
      {[...Array(tournamentGame.expectedNoofPlayers)].map((_, index) =>
        RenderPlayer(index)
      )}
      {RenderGameLink()}
    </>
  );
}

export default TournamentBracket;
