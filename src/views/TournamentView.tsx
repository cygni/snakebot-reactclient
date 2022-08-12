import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { useAppSelector } from "../context/hooks";
import TournamentSettings from "../components/tournament/Settings";
import TournamentSchedule from "../components/tournament/Schedule";
import LoadingPage from "../components/tournament/LoadingPage";
import PlayerList from "../components/tournament/PlayerList";
import {TournamentEnums} from "../constants/ViewEnums";
import Game from "../components/tournament/Game";
import StartPage from "../components/tournament/StartPage";

function TournamentView() { 
  const isTournamentActive = useAppSelector((state) => state.tournament.isTournamentActive);
  const activeTournamentView = useAppSelector((state) => state.tournament.tournamentViewState);
  const isLoggedIn = useAppSelector((state) => state.tournament.isLoggedIn);
  const navigate = useNavigate();

  // Create tournament on mount
  // useEffect(() => {
  //   if (!isTournamentActive) {
  //     api.createTournament("Tournament");
  //   }
  // }, [isTournamentActive]);

  // If not logged in, redirect to login page
  useEffect(()=>{
    if (!isLoggedIn) navigate('/login');
  });

  function selectView(page: TournamentEnums) {
    switch (page) {
      case TournamentEnums.STARTPAGE:
        return <StartPage />;
      case TournamentEnums.GAME:
        return <Game />;
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
