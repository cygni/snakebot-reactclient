import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { startArenaGame } from '../../context/slices/arenaSlice';
import GameboardView from '../../views/GameboardView';

export default function Game() {
  const gameId = useAppSelector(state => state.arena.gameId);
  const dispatch = useAppDispatch();

  function newGame() {
    dispatch(startArenaGame());
  }
  
  return (
    <>
      <GameboardView gameID={gameId} />
      <button onClick={newGame}>Rematch</button>
    </>
  );
}
