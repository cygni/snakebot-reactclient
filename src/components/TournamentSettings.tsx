import { FormEventHandler, ReactEventHandler } from 'react'
import { GameSettings } from '../constants/messageTypes'
import { useAppDispatch } from '../context/hooks'
import { createTournament, updateGameSettings } from '../context/slices/tournamentSlice'

type Props = {
  tournamentName: string,
  gameSettings: GameSettings
}

function TournamentSettings({tournamentName, gameSettings}: Props) {


  return (
    <div>
        <article className='half'>
          <div className="center-block">
            <h1 className='tournament-name'>{tournamentName}</h1>
          </div>

          <form role="form" onSubmit={(e) => {
              e.preventDefault();
              console.log("STARTING TOURNAMENT");
              //Dispatch action to start tournament and update game settings (which in turn sends socket message to server)
            }}>

            <div>
                <label htmlFor="maxNoofPlayers">
                  MaxPlayers: {gameSettings.maxNoofPlayers}
                </label>
                <input
                  name="maxPlayers"
                  id="maxNoofPlayers"
                  type="number"
                  min="5" max="100"
                  placeholder={gameSettings.maxNoofPlayers?.toString()}
                />
                
            </div>

            <div>
                <label htmlFor="startSnakeLength">
                  StartSnakeLength: {gameSettings.startSnakeLength}
                </label>
                <input
                  name="startSnakeLength"
                  id="startSnakeLength"
                  type="number"
                  min="1" max="10"
                  placeholder={gameSettings.startSnakeLength?.toString()}
                />
            </div>

            <div>
                <label htmlFor="timeInMsPerTick">
                  TimeInMsPerTick: {gameSettings.timeInMsPerTick}
                </label>
                <input
                  name="timeInMsPerTick"
                  type="number"
                  id="timeInMsPerTick"
                  step="250"
                  min="250" max="1500"
                  placeholder={gameSettings.timeInMsPerTick?.toString()}
                />
            </div>

            <div>
                <label htmlFor="pointsPerLength">
                  PointsPerLength: {gameSettings.pointsPerLength}
                </label>
                <input
                  name="pointsPerLength"
                  id="pointsPerLength"
                  type="number"
                  min="0" max="25"
                  placeholder={gameSettings.pointsPerLength?.toString()}
                />
            </div>

            <div>
                <label htmlFor="pointsPerFood">
                  PointsPerFood: {gameSettings.pointsPerFood}
                </label>
                <input
                  name="pointsPerFood"
                  id="pointsPerFood"
                  type="number"
                  min="0" max="25"
                  placeholder={gameSettings.pointsPerFood?.toString()}
                />
              </div>

              <div>
                <label htmlFor="pointsPerCausedDeath">
                  PointsPerCausedDeath: {gameSettings.pointsPerCausedDeath}
                </label>
                <input
                  name="pointsPerCausedDeath"
                  id="pointsPerCausedDeath"
                  type="number"
                  min="0" max="25"
                  placeholder={gameSettings.pointsPerCausedDeath?.toString()}
                />
              </div>

              <div>
                <label htmlFor="pointsPerNibble">
                  PointsPerNibble: {gameSettings.pointsPerNibble}
                </label>
                <input
                  name="pointsPerNibble"
                  id="pointsPerNibble"
                  type="number"
                  min="0" max="25"
                  placeholder={gameSettings.pointsPerNibble?.toString()}
                />
              </div>

              <div>
                <label htmlFor="noofRoundsTailProtectedAfterNibble">
                  NoofRoundsTailProtectedAfterNibble:
                  {gameSettings.noofRoundsTailProtectedAfterNibble}
                </label>
                <input
                  name="noofRoundsTailProtectedAfterNibble"
                  id="noofRoundsTailProtectedAfterNibble" type="number" min="0"
                  max="10"
                  placeholder={gameSettings.noofRoundsTailProtectedAfterNibble?.toString()}
                />
              </div>


              <div>
                <div>
                  <label htmlFor="addFoodLikelihood">
                    AddFoodLikelihood: {gameSettings.addFoodLikelihood} %
                  </label>
                </div>
                <input
                  style={{ float: 'left', width: '440px' }}
                  name="addFoodLikelihood"
                  id="addFoodLikelihood"
                  type="range"
                  min="0" max="100"
                  step="5"
                  defaultValue={gameSettings.addFoodLikelihood}
                />
              </div>

              <div>
                <div>
                  <label htmlFor="removeFoodLikelihood">
                    RemoveFoodLikelihood: {gameSettings.removeFoodLikelihood} %
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
                    defaultValue={gameSettings.removeFoodLikelihood}
                    
                  />
                </div>
              </div>
              
              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="obstaclesEnabled">
                      ObstaclesEnabled:
                  </label>
                </div>
                
                <div>
                  <input
                    name="obstaclesEnabled"
                    id="obstaclesEnabled"
                    type="radio"
                    value="True"
                    // defaultChecked={this.props.settings.obstaclesEnabled === true}
                    // onChange={ConfigureTournamentForm.onInputChange}
                  /> True

                  <label htmlFor="obstaclesEnabled" style={{ marginLeft: '20px' }}>
                    <input
                      name="obstaclesEnabled"
                      id="obstaclesEnabled"
                      type="radio"
                      value="False"
                      // defaultChecked={this.props.settings.obstaclesEnabled === false}
                      // onChange={ConfigureTournamentForm.onInputChange}
                    /> False
                  </label>
                </div>
              </div>
              
              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="foodEnabled">
                    FoodEnabled:
                  </label>
                </div>
                <div>
                  <input
                    name="foodEnabled"
                    id="foodEnabled"
                    type="radio"
                    value="True"
                    // defaultChecked={this.props.settings.foodEnabled === true}
                    // onChange={ConfigureTournamentForm.onInputChange}
                  /> True

                  <label htmlFor="foodEnabled" style={{ marginLeft: '20px' }}>
                    <input
                      name="foodEnabled"
                      id="foodEnabled"
                      type="radio"
                      value="False"
                      // defaultChecked={this.props.settings.foodEnabled === false}
                      // onChange={ConfigureTournamentForm.onInputChange}
                    /> False
                  </label>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="headToTailConsumes" style={{ marginRight: '20px' }}>
                    HeadToTailConsumes:
                  </label>
                </div>
                <div>
                  <input
                    name="headToTailConsumes"
                    id="headToTailConsumes" type="radio"
                    value="True"
                    // defaultChecked={this.props.settings.headToTailConsumes === true}
                    // onChange={ConfigureTournamentForm.onInputChange}
                  /> True
                  <label htmlFor="headToTailConsumes" style={{ marginLeft: '20px' }}>
                    <input
                      name="headToTailConsumes"
                      id="headToTailConsumes"
                      type="radio"
                      defaultChecked={gameSettings.headToTailConsumes === false}
                      // value="False"
                      // onChange={ConfigureTournamentForm.onInputChange}
                    /> False
                  </label>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="tailConsumeGrows" style={{ marginRight: '20px' }}>
                    TailConsumeGrows:
                  </label>
                </div>
                <div>
                  <input
                    name="tailConsumeGrows"
                    id="tailConsumeGrows"
                    type="radio"
                    value="True"
                    // placeholder={gameSettings.startSnakeLength?.toString()}
                  /> True

                  <label htmlFor="tailConsumeGrows" style={{ marginLeft: '20px' }}>
                    <input
                      name="tailConsumeGrows"
                      id="tailConsumeGrows"
                      type="radio"
                      value="False"
                      // placeholder={gameSettings.tailConsumeGrows?.toString()}
                    /> False
                  </label>
                </div>
              </div>


              <button type="submit" className="btn btn-primary">Start</button>

          </form>
        </article>
      </div>
  )
}

export default TournamentSettings