import {useState, useEffect } from 'react'
import api from '../../api';
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { startTournament, updateGameSettings } from '../../context/slices/tournamentSlice'
import PlayerList from '../PlayerList';

function TournamentSettings() {
  const gameSettings = useAppSelector(state => state.tournament.gameSettings);
  const tournamentName = useAppSelector(state => state.tournament.tournamentName);
  const tournamentId = useAppSelector(state => state.tournament.tournamentId);
  const noofPlayerrs = useAppSelector(state => state.tournament.players);
  const [localGameSettings, setLocalGameSettings] = useState(gameSettings);
  const dispatch = useAppDispatch();

  function initTournament(){
    dispatch(updateGameSettings(localGameSettings));
    api.startTournament(tournamentId);
  }

  function getPlayersPage() {
    console.log("test")
    return <PlayerList/>
  }

  useEffect(() => {
    console.log("Got default tournament settings from socket:",gameSettings);
    setLocalGameSettings(gameSettings);
  }, [gameSettings]);

  return (
    <div className='tournamentsettings'>
        <article className='half'>
          <div className="center-block">
            <h1 className='tournament-name'>{tournamentName}</h1>
          </div>

          <form role="form" onSubmit={(e) => {
              e.preventDefault();
              if(noofPlayerrs.length >= 2 ){
              console.log("Starting tournament...");
              dispatch(startTournament());
              initTournament();
              }else{
                alert('A minimum of 2 players is required to start Tournament');
              }
            }}>

            <div className='maxnoofplayers'>
                <label htmlFor="maxNoofPlayers">
                  MaxPlayers
                </label>
                <input
                  name="maxPlayers"
                  id="maxNoofPlayers"
                  type="number"
                  min="2" max="100"
                  value={localGameSettings.maxNoofPlayers}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, maxNoofPlayers: parseInt(e.target.value)})}}
                />
                
            </div>

            <div>
                <label htmlFor="startSnakeLength">
                  StartSnakeLength
                </label>
                <input
                  name="startSnakeLength"
                  id="startSnakeLength"
                  type="number"
                  min="1" max="10"
                  value={localGameSettings.startSnakeLength}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, startSnakeLength: parseInt(e.target.value)})}}
                />
            </div>

            <div>
                <label htmlFor="timeInMsPerTick">
                  TimeInMsPerTick
                </label>
                <input
                  name="timeInMsPerTick"
                  type="number"
                  id="timeInMsPerTick"
                  step="250"
                  min="250" max="1500"
                  value={localGameSettings.timeInMsPerTick}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, timeInMsPerTick: parseInt(e.target.value)})}}
                />
            </div>

            <div>
                <label htmlFor="pointsPerLength">
                  PointsPerLength
                </label>
                <input
                  name="pointsPerLength"
                  id="pointsPerLength"
                  type="number"
                  min="0" max="25"
                  value={localGameSettings.pointsPerLength}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, pointsPerLength: parseInt(e.target.value)})}}
                />
            </div>

            <div>
                <label htmlFor="pointsPerFood">
                  PointsPerFood
                </label>
                <input
                  name="pointsPerFood"
                  id="pointsPerFood"
                  type="number"
                  min="0" max="25"
                  value={localGameSettings.pointsPerFood}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, pointsPerFood: parseInt(e.target.value)})}}
                />
              </div>

              <div>
                <label htmlFor="pointsPerCausedDeath">
                  PointsPerCausedDeath
                </label>
                <input
                  name="pointsPerCausedDeath"
                  id="pointsPerCausedDeath"
                  type="number"
                  min="0" max="25"
                  value={localGameSettings.pointsPerCausedDeath}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, pointsPerCausedDeath: parseInt(e.target.value)})}}
                />
              </div>

              <div>
                <label htmlFor="pointsPerNibble">
                  PointsPerNibble
                </label>
                <input
                  name="pointsPerNibble"
                  id="pointsPerNibble"
                  type="number"
                  min="0" max="25"
                  value={localGameSettings.pointsPerNibble}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, pointsPerNibble: parseInt(e.target.value)})}}
                />
              </div>

              <div>
                <label htmlFor="noofRoundsTailProtectedAfterNibble">
                  NoofRoundsTailProtectedAfterNibble
                </label>
                <input
                  name="noofRoundsTailProtectedAfterNibble"
                  id="noofRoundsTailProtectedAfterNibble" type="number" min="0"
                  max="10"
                  value={localGameSettings.noofRoundsTailProtectedAfterNibble}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, noofRoundsTailProtectedAfterNibble: parseInt(e.target.value)})}}
                />
              </div>


              <div className='addfood'>
                <div>
                  <label htmlFor="addFoodLikelihood">
                    AddFoodLikelihood
                  </label>
                </div>
                <input
                  name="addFoodLikelihood"
                  id="addFoodLikelihood"
                  min="0" max="100"
                  value={localGameSettings.addFoodLikelihood + "%"}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, addFoodLikelihood: parseInt(e.target.value)})}}
                />
              </div>
  
              <div className='removefood'>
                <div>
                  <label htmlFor="removeFoodLikelihood">
                    RemoveFoodLikelihood
                  </label>
                </div>
                <div>
                  <input
                    name="removeFoodLikelihood"
                    id="removeFoodLikelihood"
                    min="0" max="100"
                    value={localGameSettings.removeFoodLikelihood + "%"}
                    onChange={(e) => {setLocalGameSettings({...localGameSettings, removeFoodLikelihood: parseInt(e.target.value)})}}
                    
                  />
                </div>
              </div>
              
            <div className='checkboxes'>
                <div className='obstacles'>
                  <label className='obstacleLabel'>ObstaclesEnabled</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={(e) => {setLocalGameSettings({...localGameSettings, obstaclesEnabled: true})}}
                       />
                      <span className="slider round"></span>
                    </label>
                </div>
                <div className='food'>
                  <label className='foodLabel'>FoodEnabled</label>
                <label className="switch">
                <input
                 type="checkbox"
                 onChange={(e) => {setLocalGameSettings({...localGameSettings, foodEnabled: true})}}
                />
                <span className="slider round"></span>
              </label>
              </div>
              <div className='head'>
              <label className='headLabel'>HeadToTailConsumes</label>
                <label className="switch">
                <input
                 type="checkbox"
                 onChange={(e) => {setLocalGameSettings({...localGameSettings, headToTailConsumes: true})}}
                />
                <span className="slider round"></span>
              </label>
              </div>


              <label className='tailLabel'>TailConsumeGrows</label>
                <label className="switch">
                <input
                 type="checkbox"
                 onChange={(e) => {setLocalGameSettings({...localGameSettings, tailConsumeGrows: true})}}
                />
                <span className="slider round"></span>
              </label>
            </div>
              
              {/* <div>
                <PlayerList/>
              </div> */}


              {/* <button type="submit" className="btn btn-primary">Create Tournament</button> */}
          </form>
              <div className='tournamentButtons'>
                <button onClick={()=>setLocalGameSettings(gameSettings)} className="resetDefault">Reset to default</button>
                <button onClick={()=>getPlayersPage()} className="createTournamentBtn">Continue</button>
              </div>
        </article>
      </div>
  )
}

export default TournamentSettings