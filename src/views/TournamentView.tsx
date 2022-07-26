import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { useAppSelector } from "../context/hooks";
import TournamentSettings from "../components/Tournament/TournamentSettings";
import TournamentSchedule from "../components/Tournament/TournamentSchedule";
import LoadingPage from "../components/Tournament/LoadingPage";
import PlayerList from "../components/PlayerList";
import TournamentEnums from "../constants/TournamentEnums";

function TournamentView() { 
  const isTournamentActive = useAppSelector((state) => state.tournament.isTournamentActive);
  const activeTournamentView = useAppSelector((state) => state.tournament.tournamentViewState);
  const isLoggedIn = useAppSelector((state) => state.tournament.isLoggedIn);
  const navigate = useNavigate();

  // Create tournament on mount
  useEffect(() => {
    if (!isTournamentActive) {
      api.createTournament("Tournament");
    }
  }, [isTournamentActive]);

  // If not logged in, redirect to login page
  useEffect(()=>{
    if (!isLoggedIn) navigate('/login');
  });

  function selectView(page: TournamentEnums) {
    switch (page) {
      case TournamentEnums.PLAYERLIST:
        return <PlayerList />;
      case TournamentEnums.SCHEDULE:
        return <TournamentSchedule />;
      case TournamentEnums.SETTINGSPAGE:
        return <TournamentSettings />;
      case TournamentEnums.LOADINGPAGE:
        return <LoadingPage />;
    }
  }

  return (
    <section className="page clear-fix">
      {selectView(activeTournamentView)}
    </section>
  );
}

export default TournamentView;
