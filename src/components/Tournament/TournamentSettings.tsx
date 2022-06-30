import { FormEventHandler, ReactEventHandler, useState, useEffect } from 'react'
import api from '../../api';
import { GameSettings } from '../../constants/messageTypes'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { createTournament, updateGameSettings } from '../../context/slices/tournamentSlice'
import PlayerList from '../PlayerList';

function TournamentSettings() {
  const gameSettings = useAppSelector(state => state.tournament.gameSettings);
  const tournamentName = useAppSelector(state => state.tournament.tournamentName);
  const [localGameSettings, setLocalGameSettings] = useState(gameSettings);
  const dispatch = useAppDispatch();

  function initTournament(){
    dispatch(updateGameSettings);
    api.createTournament("Tournament");
  }

  useEffect(() => {
    console.log("UPDATING GAME SETTINGS FROM SOCKET:",gameSettings);
    setLocalGameSettings(gameSettings);
  }, [gameSettings]);

  return (
    <div>
        <article className='half'>
          <div className="center-block">
            <h1 className='tournament-name'>{tournamentName}</h1>
          </div>

          <form role="form" onSubmit={(e) => {
              e.preventDefault();
              console.log("STARTING TOURNAMENT");
              initTournament();
              //Dispatch action to start tournament and update game settings (which in turn sends socket message to server)
            }}>

            <div>
                <label htmlFor="maxNoofPlayers">
                  MaxPlayers
                </label>
                <input
                  name="maxPlayers"
                  id="maxNoofPlayers"
                  type="number"
                  min="5" max="100"
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


              <div>
                <div>
                  <label htmlFor="addFoodLikelihood">
                    AddFoodLikelihood: {localGameSettings.addFoodLikelihood}%
                  </label>
                </div>
                <input
                  style={{ float: 'left', width: '440px' }}
                  name="addFoodLikelihood"
                  id="addFoodLikelihood"
                  type="range"
                  min="0" max="100"
                  step="5"
                  value={localGameSettings.addFoodLikelihood}
                  onChange={(e) => {setLocalGameSettings({...localGameSettings, addFoodLikelihood: parseInt(e.target.value)})}}
                />
              </div>

              <div>
                <div>
                  <label htmlFor="removeFoodLikelihood">
                    RemoveFoodLikelihood: {localGameSettings.removeFoodLikelihood}%
                  </label>
                </div>
                <div>
                  <input
                    style={{ float: 'left', width: '440px' }}
                    name="removeFoodLikelihood"
                    id="removeFoodLikelihood"
                    type="range"
                    min="0" max="100"
                    step="5"
                    value={localGameSettings.removeFoodLikelihood}
                    onChange={(e) => {setLocalGameSettings({...localGameSettings, removeFoodLikelihood: parseInt(e.target.value)})}}
                    
                  />
                </div>
              </div>
              
              <div style={{ width: '440px' }}>
                <div>
                  <label>
                      ObstaclesEnabled: {localGameSettings.obstaclesEnabled ? "Yes" : "No"}
                  </label>
                </div>
                
                <div>
                  <input
                    type="radio"
                    checked={localGameSettings.obstaclesEnabled}
                    onChange={(e) => {setLocalGameSettings({...localGameSettings, obstaclesEnabled: true})}}
                  /> True

                  <label style={{ marginLeft: '20px' }}>
                    <input
                      type="radio"
                      checked={!localGameSettings.obstaclesEnabled}
                      onChange={(e) => {setLocalGameSettings({...localGameSettings, obstaclesEnabled: false})}}
                    /> False
                  </label>
                </div>
              </div>
              
              <div style={{ width: '440px' }}>
                <div>
                  <label>
                    FoodEnabled:
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={localGameSettings.foodEnabled === true}
                    onChange={(e) => {setLocalGameSettings({...localGameSettings, foodEnabled: true})}}
                  /> True

                  <label style={{ marginLeft: '20px' }}>
                    <input
                      type="radio"
                      checked={localGameSettings.foodEnabled === false}
                      onChange={(e) => {setLocalGameSettings({...localGameSettings, foodEnabled: false})}}
                    /> False
                  </label>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div>
                  <label style={{ marginRight: '20px' }}>
                    HeadToTailConsumes:
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={localGameSettings.headToTailConsumes === true}
                    onChange={(e) => {setLocalGameSettings({...localGameSettings, headToTailConsumes: true})}}
                  /> True
                  <label style={{ marginLeft: '20px' }}>
                    <input
                      type="radio"
                      checked={localGameSettings.headToTailConsumes === false}
                      onChange={(e) => {setLocalGameSettings({...localGameSettings, headToTailConsumes: false})}}
                    /> False
                  </label>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div>
                  <label style={{ marginRight: '20px' }}>
                    TailConsumeGrows:
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={localGameSettings.tailConsumeGrows === true}
                    onChange={(e) => {setLocalGameSettings({...localGameSettings, tailConsumeGrows: true})}}
                  /> True

                  <label style={{ marginLeft: '20px' }}>
                    <input
                      type="radio"
                      checked={localGameSettings.tailConsumeGrows === false}
                      onChange={(e) => {setLocalGameSettings({...localGameSettings, tailConsumeGrows: false})}}
                    /> False
                  </label>
                </div>
              </div>

              <div>
                <PlayerList/>
              </div>


              <button type="submit" className="btn btn-primary">Start</button>
              <button onClick={()=>setLocalGameSettings(gameSettings)} className="btn btn-primary">Reset to Default Settings</button>


          </form>
        </article>
      </div>
  )
}

export default TournamentSettings