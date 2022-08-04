import { useEffect, useState } from "react";
import api from "../../api";
import { ArenaEnums } from "../../constants/ViewEnums";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { setArenaView, setGameSettings } from "../../context/slices/arenaSlice";

function Settings() {
  const gameSettings = useAppSelector(state => state.arena.gameSettings);
  const [localGameSettings, setLocalGameSettings] = useState(gameSettings);
  const dispatch = useAppDispatch();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    let newValue = parseInt(value);
    setLocalGameSettings({ ...localGameSettings, [id]: newValue ? newValue : undefined });
  }

  function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setLocalGameSettings({ ...localGameSettings, [id]: checked });
  }

  // Ask for default settings from server
  useEffect(() => {
    api.getDefaultGameSettings();
  }, []);

  // Update local settings with newly received server settings
  useEffect(() => {
    setLocalGameSettings(gameSettings);
  }, [gameSettings]);

  return (
    <div className="tournamentsettings">
      <article className="half">
        <div className="center-block">
          <h1 className="tournament-name">Settings</h1>
        </div>

        <form
          id="settings-form"
          onSubmit={(e) => {
            console.log("Form submitted");
            dispatch(setGameSettings(localGameSettings));
            dispatch(setArenaView(ArenaEnums.PLAYERLIST));
            e.preventDefault();
          }}
        >

          <div className="maxnoofplayers">
            <label htmlFor="maxNoofPlayers">MaxPlayers</label>
            <input
              name="maxPlayers"
              id="maxNoofPlayers"
              type="number"
              min="2"
              max="100"
              value={localGameSettings.maxNoofPlayers}
              onChange={handleInputChange}
              // onChange={(e) => {setLocalGameSettings({...localGameSettings, maxNoofPlayers: parseInt(e.target.value)})}}
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
              step="250"
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

export default Settings;
