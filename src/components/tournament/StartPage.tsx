import { useState } from "react";
import api from "../../api";
import { TournamentEnums } from "../../constants/ViewEnums";
import { useAppSelector, useAppDispatch } from "../../context/hooks";
import { tournamentJoined } from "../../context/slices/tournamentSlice";

function StartPage() {

    const dispatch = useAppDispatch();
    
    function createTournament(){
        api.createTournament("My Tournament");
        localStorage.setItem("isTournamentActive", "true");
    }

    function joinTournament(){
        console.log("Joining tournament, is tournament active?:", localStorage.getItem("isTournamentActive"));
        dispatch(tournamentJoined(TournamentEnums.SCHEDULE));
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