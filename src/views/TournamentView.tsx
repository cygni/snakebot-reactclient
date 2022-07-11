import { useEffect } from 'react';
import api from '../api';
import { useAppSelector } from '../context/hooks';
import TournamentSettings from '../components/Tournament/TournamentSettings';
import TournamentSchedule from '../components/Tournament/TournamentSchedule';
import LoadingPage from '../components/LoadingPage';

function TournamentView() {
  const tournament = useAppSelector(state => state.tournament);
  const allGamesPlayed = useAppSelector(state => state.tournament.allGamesPlayed);

  // Create tournament on mount
  useEffect(() => {
    if (!tournament.isTournamentActive) {
      api.createTournament("Tournament");
    }
  }, []);

  function selectView(){
    if(!tournament.isTournamentStarted){
    return <TournamentSettings />;
    }
    else if(allGamesPlayed){
      return <TournamentSchedule />;
    }
    return <LoadingPage />;
  }
  
  return (
    <section className="page clear-fix">
      <button onClick={()=>api.createTournament("Tournament")}>Reset Tournament</button>
      {selectView()}
    </section>
  )
}

export default TournamentView