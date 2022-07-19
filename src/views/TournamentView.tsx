import { useEffect } from 'react';
import api from '../api';
import { useAppSelector } from '../context/hooks';
import TournamentSettings from '../components/Tournament/TournamentSettings';
import TournamentSchedule from '../components/Tournament/TournamentSchedule';
import LoadingPage from '../components/LoadingPage';
import PlayerList from '../components/PlayerList';

function TournamentView() {
  const tournament = useAppSelector(state => state.tournament);
  const allGamesPlayed = useAppSelector(state => state.tournament.allGamesPlayed);
  const isSettingsDone = useAppSelector(state => state.tournament.isSettingsDone);

  // Create tournament on mount
  useEffect(() => {
    if (!tournament.isTournamentActive) {
      api.createTournament("Tournament");
    }
  }, []);

  function selectView(){
    if(isSettingsDone){
      return <PlayerList />;
    }
    else if(!tournament.isTournamentStarted){
    return <TournamentSettings />;
    }
    else if(allGamesPlayed){
      return <TournamentSchedule />;
    }
    return <LoadingPage />;
  }
  
  return (
    <section className="page clear-fix">
      {/* <button onClick={()=>api.createTournament("Tournament")}>Reset Tournament</button> */}
      {selectView()}
    </section>
  )
}

export default TournamentView