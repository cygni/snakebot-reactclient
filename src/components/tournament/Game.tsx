import { TournamentEnums } from '../../constants/ViewEnums';
import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { setTournamentView, viewGame } from '../../context/slices/tournamentSlice';
import GameboardView from '../../views/GameboardView';

export default function Game() {
  const gameId = useAppSelector((state) => state.tournament.activeGameId);
  const tournamentLevels = useAppSelector((state) => state.tournament.tournamentLevels);
  const dispatch = useAppDispatch();

  function nextGameButton() {
    let gameIndex = 0;
    const currentLevel = tournamentLevels.find((level) =>
      level.tournamentGames.find((game, index) => {
        if (game.gameId === gameId) {
          gameIndex = index;
          return true;
        }
        return false;
      })
    );
    const nextGame = currentLevel?.tournamentGames[gameIndex + 1];

    if (nextGame?.gamePlayed) {
      return (
        <button className='blue' onClick={() => dispatch(viewGame(nextGame!.gameId))}>
          Go to next game -{'>'}
        </button>
      );
    }
  }

  return (
    <GameboardView gameID={gameId}>
      <button className='black' onClick={() => dispatch(setTournamentView(TournamentEnums.SCHEDULE))}>
        {'<'}- Back to schedule
      </button>
      {nextGameButton()}
    </GameboardView>
  );
}
