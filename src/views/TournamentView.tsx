import SockJS from 'sockjs-client';
import api from '../api';

type Props = {}

function TournamentView({}: Props) {
    const socket = new SockJS('http://localhost:8080/');
    socket.onopen = () => {
        console.log('Connected to server');
    }
    socket.onmessage = (event: any) => {
        console.log(event.data);
    }

    const currToken = api.getToken();

    const jsonData = JSON.stringify({
      _tournamentId: 'hej',
    type: 'se.cygni.snake.eventapi.request.KillTournament',
    token: currToken});

  return (
    <section className="page clear-fix">
        <article>
          <h1>Create a new tournament</h1>
          <div className="text-content">
            <div className="box">
              <form>
                <label htmlFor="tournamentName">Tournament name</label>
                <input
                //   value={this.state.tempGameName} onChange={this.handleTextChange} type="text"
                  id="tournamentName" placeholder="tournament name..."
                />
                <input type="submit" value="Create Tournament" />
              </form>

              <button onClick={()=>{
                console.log("Sending message:", jsonData);
                socket.send(jsonData);
                }}>Send to socket</button>

            </div>
          </div>
        </article>
      </section>
  )
}

export default TournamentView