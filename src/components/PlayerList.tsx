import { useAppDispatch, useAppSelector } from '../context/hooks';
import { startTournament } from '../context/slices/tournamentSlice'
import api from '../api';

function PlayerList() {
const playerList = useAppSelector(state => state.tournament.players);
const noofPlayerrs = useAppSelector(state => state.tournament.players);
const tournamentId = useAppSelector(state => state.tournament.tournamentId);
const dispatch = useAppDispatch();

function initTournament() {
  if(noofPlayerrs.length >= 2 ){
    console.log("Starting tournament...");
    dispatch(startTournament());
    api.startTournament(tournamentId);
    }else{
      alert('A minimum of 2 players is required to start Tournament');
    }
}
  return (
    <>
      <h1 className='playerListH1'>Connect to game</h1>
      <p className='playerInfo'>Connect to the tournament by following the instructions found in the README-file</p>
      <div className='playersList'>
      {playerList.map((player, index) => (
        <p className='playerString' key={index}>{player.name}</p>
        )) 
      }
    </div>
    <button onClick={initTournament} className="createTournamentButton">Start Tournament</button>
    </>
  )
}

export default PlayerList