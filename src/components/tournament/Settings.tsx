import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  updateGameSettings,
  settingsAreDone,
} from "../../context/slices/tournamentSlice";

function TournamentSettings() {
  const gameSettings = useAppSelector((state) => state.tournament.gameSettings);
  const [localGameSettings, setLocalGameSettings] = useState(gameSettings);
  const [tourName, setTourName] = useState("My Tournament");
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Got default tournament settings from socket:", gameSettings);
    setLocalGameSettings(gameSettings);
  }, [gameSettings]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setLocalGameSettings({ ...localGameSettings, [id]: parseInt(value) });
  }

  function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setLocalGameSettings({ ...localGameSettings, [id]: checked });
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTourName(e.target.value);
  }

  return (
    <div className="tournamentsettings">
      <article className="half">
        <div className="center-block">
          <h1 className="tournament-name">Tournament Settings</h1>
        </div>

        <form
          id="settings-form"
          onSubmit={(e) => {
            console.log("Form submitted");
            localStorage.setItem("tourName", tourName);
            dispatch(updateGameSettings(localGameSettings));
            dispatch(settingsAreDone());
            e.preventDefault();
          }}
        >
          <div className="tournamentname">
            <label htmlFor="tournamentnameLbl">TournamentName</label>
            <input
              name="MyTournament"
              type="String"
              value={tourName}
              onChange={handleNameChange}
            />
          </div>

          <div className="maxnoofplayers">
            <label htmlFor="maxNoofPlayers">MaxPlayers</label>
            <div className="tooltip">?
            <span className="tooltiptext">This setting will determine the amount of players in each game. 
            The tournament bracket will determine the amount of rounds as a geometric number sequence where 
            each advancing round will have half the amount of games as the previous one. To avoid cases where some 
            players automatically advance from the first round, this setting should be set accordingly for the amount 
            of players in the tournament. </span>
            </div>
            <input
              name="maxPlayers"
              id="maxNoofPlayers"
              type="number"
              min="4"
              max="100"
              value={localGameSettings.maxNoofPlayers}
              onChange={handleInputChange}
            />
            
          </div>

          <div>
            <label htmlFor="startSnakeLength">StartSnakeLength</label>
            <input
              name="startSnakeLength"
              id="startSnakeLength"
              type="number"
              min="1"
              max="10"
              value={localGameSettings.startSnakeLength}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="timeInMsPerTick">TimeInMsPerTick</label>
            <input
              name="timeInMsPerTick"
              type="number"
              id="timeInMsPerTick"
              step="50"
              min="250"
              max="1500"
              value={localGameSettings.timeInMsPerTick}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="pointsPerLength">PointsPerLength</label>
            <input
              name="pointsPerLength"
              id="pointsPerLength"
              type="number"
              min="0"
              max="25"
              value={localGameSettings.pointsPerLength}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="pointsPerFood">PointsPerFood</label>
            <input
              name="pointsPerFood"
              id="pointsPerFood"
              type="number"
              min="0"
              max="25"
              value={localGameSettings.pointsPerFood}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="pointsPerCausedDeath">PointsPerCausedDeath</label>
            <input
              name="pointsPerCausedDeath"
              id="pointsPerCausedDeath"
              type="number"
              min="0"
              max="25"
              value={localGameSettings.pointsPerCausedDeath}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="pointsPerNibble">PointsPerNibble</label>
            <input
              name="pointsPerNibble"
              id="pointsPerNibble"
              type="number"
              min="0"
              max="25"
              value={localGameSettings.pointsPerNibble}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="noofRoundsTailProtectedAfterNibble">
              NoofRoundsTailProtectedAfterNibble
            </label>
            <input
              name="noofRoundsTailProtectedAfterNibble"
              id="noofRoundsTailProtectedAfterNibble"
              type="number"
              min="0"
              max="10"
              value={localGameSettings.noofRoundsTailProtectedAfterNibble}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="addFoodLikelihood">AddFoodLikelihood %</label>
            <input
              name="addFoodLikelihood"
              id="addFoodLikelihood"
              type="number"
              min="0"
              max="100"
              value={localGameSettings.addFoodLikelihood}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="removeFoodLikelihood">RemoveFoodLikelihood %</label>
            <input
              name="removeFoodLikelihood"
              id="removeFoodLikelihood"
              type="number"
              min="0"
              max="100"
              value={localGameSettings.removeFoodLikelihood}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkboxes">
            <div className="obstacles">
              <label className="obstacleLabel">ObstaclesEnabled</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="obstaclesEnabled"
                  checked={localGameSettings.obstaclesEnabled}
                  onChange={handleSwitchChange}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="food">
              <label className="foodLabel">FoodEnabled</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="foodEnabled"
                  checked={localGameSettings.foodEnabled}
                  onChange={handleSwitchChange}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="head">
              <label className="headLabel">HeadToTailConsumes</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="headToTailConsumes"
                  checked={localGameSettings.headToTailConsumes}
                  onChange={handleSwitchChange}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <label className="tailLabel">TailConsumeGrows</label>
            <label className="switch">
              <input
                type="checkbox"
                id="tailConsumeGrows"
                checked={localGameSettings.tailConsumeGrows}
                onChange={handleSwitchChange}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="tournamentButtons">
            <button
              type="button"
              onClick={() => setLocalGameSettings(gameSettings)}
              className="resetDefault"
            >
              Reset to default
            </button>
            <button type="submit" className="createTournamentBtn button">
              Continue
            </button>
          </div>
        </form>
      </article>
    </div>
  );
}

export default TournamentSettings;
