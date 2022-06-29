import api, {myToken} from '../api';
import {useState} from 'react';

type Props = {}

function TournamentViewOld({}: Props) {
  const [tournamentName, setTournamentName] = useState('');

  return (
    <section className="page clear-fix">
        <article>
          <h1>Create a new tournament</h1>
          <div className="text-content">
            <div className="box">
              <form onSubmit={(e)=>{api.createTournament(tournamentName); e.preventDefault()}}>
                <label htmlFor="tournamentName">Tournament name</label>
                <input
                onChange={(e)=>{setTournamentName(e.target.value)}}
                type="text"
                id="tournamentName"
                placeholder="tournament name..."
                />
                <input type="submit" value="Create Tournament" />
              </form>

              {/* <button onClick={()=>{
                console.log("OK", myToken);
                const jsonData = JSON.stringify({
                  type: 'se.cygni.snake.eventapi.request.StartTournament',
                  token: myToken,
                  tournamentId: 'dac1095f-a589-4589-b25d-703b100b80b9'
                });
                console.log("Sending message:", jsonData);
                api.socketSend(jsonData);
                }}>Test socketfunction</button> */}

            </div>
          </div>
        </article>
      </section>
  )
}

export default TournamentViewOld