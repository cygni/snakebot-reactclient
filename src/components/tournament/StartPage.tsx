import { useState } from "react";
import api from "../../api";
import { TournamentEnums } from "../../constants/ViewEnums";
import { useAppSelector, useAppDispatch } from "../../context/hooks";
import { setTournamentView } from "../../context/slices/tournamentSlice";

function StartPage() {

    const dispatch = useAppDispatch();
    
    function createTournament(){
        api.createTournament("My Tournament");
    }

    function joinTournament(){
        dispatch(setTournamentView(TournamentEnums.SCHEDULE));
        api.getActiveTournament();
    }
    
    return (
    <>
    <h1 className="tournamentnameLbl">Tournament</h1>
    
    <div className="tournamentButtons">
    <button onClick={createTournament} className="createTButton"> Create New</button>
    <button onClick={joinTournament} className="joinTButton">Join</button>
    </div>
  
  </>
  )
  
}

export default StartPage