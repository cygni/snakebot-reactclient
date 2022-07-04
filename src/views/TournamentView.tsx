import { useEffect } from 'react';
import api from '../api';
import { useAppSelector } from '../context/hooks';
import TournamentSettings from '../components/Tournament/TournamentSettings';
import TournamentSchedule from '../components/Tournament/TournamentSchedule';

function TournamentView() {
  const tournament = useAppSelector(state => state.tournament);

  // Create tournament on mount
  useEffect(() => {
    if (!tournament.isTournamentActive){
    api.createTournament("Tournament");
  }}, []);

  useEffect(() => {
    console.log("TournamentData changed:",tournament);
  }, [tournament]);

  function selectView(){
    return tournament.isTournamentStarted ? (<TournamentSchedule />) : (<TournamentSettings />);
  }
  
  return (
    <section className="page clear-fix">
      <button onClick={()=>api.createTournament("Tournament")}>Reset Tournament</button>
      {selectView()}
    </section>
  )
}

export default TournamentView