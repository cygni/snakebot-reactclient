import { TournamentLevel } from '../../constants/messageTypes';
import { useAppSelector } from '../../context/hooks'
import TournamentBracket from './TournamentBracket';

type Props = {}

function roundClassName(round: TournamentLevel) {
  switch (round.level) {
    case 0:
      return 'first-round';
    case 1:
      return 'second-round';
    case 2:
      return 'third-round';
    default:
      return 'final-round';
    // default to keeping it at the largest size
  }
}


function TournamentSchedule({}: Props) {

    const levels = useAppSelector(state => state.tournament.tournamentLevels);


const tournamentName = useAppSelector(state => state.tournament.tournamentName);
  return (
    <section className="page clear-fix">
        <article style={{ textAlign: 'center' }}>
          <h1>{tournamentName}</h1>
        </article>
        <div className="tournament">
          {levels.map((level, index) => (
              <div key={index}>
                <div className={roundClassName(level) + ' round-box'}>
                  <h2>Round {level.level}</h2>
                  <div className="flex">
                    {
                      level.tournamentGames.map((game, gameIndex) => (
                        <ul className="game" key={gameIndex}>
                          <TournamentBracket tournamentGame={game}/>
                        </ul>
                      ))
                    }
                  </div>
                </div>
                { level.level > 0 ? <div className="spacer" /> : <div /> }
              </div>
          ))}
        </div>
    </section>
  )
}

export default TournamentSchedule