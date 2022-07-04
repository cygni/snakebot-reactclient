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
  
  return (
    <>
    <section className="page clear-fix">
      <TournamentSettings />
    </section>
    
    <section className="page clear-fix">
      <TournamentSchedule />
    </section>
    </>
  )
}

export default TournamentView