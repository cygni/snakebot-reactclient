import { useEffect } from 'react';
import { TournamentEnums } from '../../constants/ViewEnums';
import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { setTournamentView, viewGame } from '../../context/slices/tournamentSlice';
import GameboardView from '../../views/GameboardView';

export default function Game() {
  const gameId = useAppSelector((state) => state.tournament.activeGameId);
  const tournamentLevels = useAppSelector((state) => state.tournament.tournamentLevels);
  const dispatch = useAppDispatch();

  const moveToNextTournamentGame = () => {
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

    if (currentLevel) {
      const nextGame = currentLevel.tournamentGames[gameIndex + 1];
      // console.log("Next game:", nextGame, nextGame.gameId, "currentLevel", currentLevel);
      if (nextGame) {
        dispatch(viewGame(nextGame.gameId));
      } else {
        dispatch(setTournamentView(TournamentEnums.SCHEDULE));
      }
    }
  };

  useEffect(()=>{
    console.log("Game:", gameId);
  }, [gameId]);

  return (
    <GameboardView gameID={gameId}>
      <button className='black' onClick={() => dispatch(setTournamentView(TournamentEnums.SCHEDULE))}>
        {'<'}- Back to schedule
      </button>
      <button className='blue' onClick={moveToNextTournamentGame}>
        Go to next game -{'>'}
      </button>
    </GameboardView>
  );
}
