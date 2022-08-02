import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { startArenaGame } from '../../context/slices/arenaSlice';
import GameboardView from '../../views/GameboardView';

export default function Game() {
  const gameId = useAppSelector(state => state.arena.gameId);
  const connectedPlayers = useAppSelector(state => state.arena.players);
  const dispatch = useAppDispatch();

  function newGame() {
    if (connectedPlayers.length >= 2) {
      dispatch(startArenaGame());
    } else {
      alert('A minimum of 2 players is required to start a new game');
    }
  }
  
  return (
    <>
      <GameboardView gameID={gameId} />
      <button className='rematch-btn' onClick={newGame}>Rematch</button>
    </>
  );
}
