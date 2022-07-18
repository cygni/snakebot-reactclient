import PlayerList from '../PlayerList';

type Props = {}

function PlayerPage({}: Props) {
  return (
    <>
        <div className="playerlist">
            <PlayerList/>
        </div>
    </>
  )
}

export default PlayerPage