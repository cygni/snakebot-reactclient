import { useAppSelector } from '../context/hooks'

function PlayerList() {
const playerList = useAppSelector(state => state.tournament.players);
  return (
    <>
      <h1 className='playerListH1'>Players</h1>
      <div className='playersList'>
      {playerList.map((player, index) => (
        <p key={index}>Player {index+1}: {player.name}</p>
        )) 
      }
    </div>
    <button type="submit" className="createTournamentButton">Start Tournament</button>
    </>
  )
}

export default PlayerList