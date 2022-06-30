import { useEffect, useState } from 'react';
import api from '../api';
import { useAppDispatch, useAppSelector } from '../context/hooks';
import { createTournament, updateGameSettings } from '../context/slices/tournamentSlice'
import type { GameSettings } from '../constants/messageTypes';
import TournamentSettings from '../components/Tournament/TournamentSettings';
import TournamentSchedule from '../components/Tournament/TournamentSchedule';


function startTournament(){
  api.startTournament("tournamentID");
}

function onInputChange(){
  //uppdatera i realtid utan knapptryck
}

function TournamentView() {
  const tournament = useAppSelector(state => state.tournament);
  const dispatch = useAppDispatch();


  useEffect(() => {
    api.createTournament("Tournament");
  }, []);

  useEffect(() => {
    console.log("Tournament",tournament);
    }, [tournament]);
  
  return (
    <section className="page clear-fix">
      {/* <TournamentSettings /> */}
      <TournamentSchedule />
    </section>
      
  )
}

export default TournamentView