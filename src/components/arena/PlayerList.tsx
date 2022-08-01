import { useAppDispatch, useAppSelector } from '../../context/hooks';
import api from '../../api';
import { startArenaGame } from '../../context/slices/arenaSlice';

function PlayerList() {
  const arenaPlayers = useAppSelector((state) => state.arena.players);
  const arenaId = useAppSelector((state) => state.arena.arenaName);
  const dispatch = useAppDispatch();

  function startGame() {
    if (arenaPlayers.length >= 2) {
      console.log('Starting arena...');
      dispatch(startArenaGame());
    } else {
      alert('A minimum of 2 players is required to start Arena');
    }
  }

  function createArena() {
    //Skapa ny arena här istället för i client
    api.createArenaGame(makeid());
  }

  function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <>
      <h1 className='playerListH1'>Arena</h1>
      <p className='playerInfo'>{arenaId}</p>
      <div className='playersList'>
        {arenaPlayers.map((playerName, index) => (
          <p className='playerString' key={index}>
            {playerName}
          </p>
        ))}
      </div>
      <div className='playerlistBtns'>
        <button onClick={createArena} className=' createArenaButton'>
          {' '}
          Create New
        </button>
        <button onClick={startGame} className='startArenaButton'>
          Start
        </button>
      </div>
    </>
  );
}

export default PlayerList;
