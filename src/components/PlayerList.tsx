
import { useAppSelector } from '../context/hooks'


type Props = {}

function PlayerList({}: Props) {

const playerList = useAppSelector(state => state.tournament.players);

  return (
    <>
    <br/>
    <h3>Players</h3>
    {
        playerList.map((player, index) => (
            <p key={index}>Player {index+1}: {player.name}</p>
        )) 
    }
    </>
  )
}

export default PlayerList