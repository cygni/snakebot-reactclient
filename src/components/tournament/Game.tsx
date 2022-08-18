import Arbitraryconstants from '../../constants/Arbitraryconstants';
import { TournamentEnums } from '../../constants/ViewEnums';
import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { setTournamentView, viewGame } from '../../context/slices/tournamentSlice';
import GameboardView from '../../views/GameboardView';

export default function Game() {
  const gameId = useAppSelector(state => state.tournament.activeGameId);
  const tournamentLevels = useAppSelector((state) => state.tournament.tournamentLevels);
  const dispatch = useAppDispatch();
  const activeGameId = useAppSelector(state => state.tournament.activeGameId);
  const finalGameId = useAppSelector(state => state.tournament.finalGameID);

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

    if (nextGame) {
      return (
        <button className='blue' onClick={() => dispatch(viewGame(nextGame!.gameId))}>
          Go to next game -{'>'}
        </button>
      );
    }
  }

  function getMusicElement() {
    if (activeGameId === finalGameId) {
      return Arbitraryconstants.AUDIO_FINAL;
    }
    return Arbitraryconstants.AUDIO_REGULAR;
  }

  return (
    <GameboardView gameID={gameId} musicElement={getMusicElement()}>
      <button className='black' onClick={() => dispatch(setTournamentView(TournamentEnums.SCHEDULE))}>
        {'<'}- Back to schedule
      </button>
      {nextGameButton()}
    </GameboardView>
  );
}
