import { useEffect, useState } from 'react';
import api from '../api';
import { useAppSelector } from '../context/hooks';


function startTournament(){
  api.startTournament("tournamentID");
}

function TournamentView() {
  const tournament = useAppSelector(state => state.tournament);


  useEffect(() => {
    api.createTournament("Tournament");
  }, []);

  useEffect(() => {
    console.log("Tournament",tournament);
    }, [tournament]);
  
  return (
    <section className="page clear-fix">
      <div>
        <article className='half'>
          <div className="center-block">
            <h1 className='tournament-name'>{tournament.tournamentName}</h1>
          </div>
        </article>
      </div>
    </section>
      
  )
}

export default TournamentView