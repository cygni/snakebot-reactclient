import { useParams, useNavigate, useLocation } from "react-router-dom";
import ControllBar from "../components/ControllBar";
import ScoreBoard from "../components/ScoreBoard";
import { TournamentGame } from "../constants/messageTypes";

import api from "../api";
import { useEffect, useState } from "react";
import { setGameData } from "../context/slices/gameDataSlice";
import messageDispatch from "../context/messageDispatch";
import { clearCurrentFrame } from "../context/slices/currentFrameSlice";
import { useAppDispatch, useAppSelector } from "../context/hooks";

// For drawing the gameboard
import {
  MAP_HEIGHT_PX,
  MAP_WIDTH_PX,
  TILE_SIZE,
} from "../constants/BoardUtils";
import { Layer, Stage } from "react-konva";
import Snake from "../canvasComponents/Snake";
import Obstacles from "../canvasComponents/Obstacles";
import Stars from "../canvasComponents/Stars";
import { viewedGame } from "../context/slices/tournamentSlice";

function GameboardView() {
  let { gameID } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentFrameState = useAppSelector((state) => state.currentFrame);
  const tournamentStarted = useAppSelector(
    (state) => state.tournament.isTournamentStarted
  );
  const tournamentLevels = useAppSelector(
    (state) => state.tournament.tournamentLevels
  );
  const location = useLocation();

  // Initialize the game
  useEffect(() => {
    // Reset the current frame state
    dispatch(clearCurrentFrame());

    // Setup the game
    api.getGame(gameID!).then((game) => {
      console.log("Fetched game", game);
      dispatch(setGameData(game));

      // dispatch 3 times so we get the first map update
      messageDispatch();
      messageDispatch();
      messageDispatch();
    });
  }, [gameID]);

  // Display button to go back to the tournament bracket
  function BracketNavigation() {
    const locationState: any | undefined = location.state;
    if (locationState?.fromTournament) {
      return (
        <>
          <button
            className="scheduleBtn"
            onClick={() => navigate("/tournament")}
          >
            {"<"}- Back to schedule
          </button>
          <button
            className="nextBtn"
            onClick={() => _moveToNextTournamentGame(gameID!)}
          >
            Go to next game -{">"}
          </button>
        </>
      );
    }
  }

  const _moveToNextTournamentGame = (id: string) => {
    let gameIndex = 0;
    if (tournamentStarted) {
      const currentLevel = tournamentLevels.find((level) =>
        level.tournamentGames.find((game, index) => {
          if (game.gameId === id) {
            gameIndex = index;
            return true;
          }
          return false;
        })
      );

      if (currentLevel) {
        const nextGame = currentLevel.tournamentGames[gameIndex + 1];
        if (nextGame) {
          navigate(`/tournament/${nextGame.gameId}`, {
            state: { fromTournament: true },
          });
          dispatch(viewedGame(nextGame.gameId));
        } else {
          navigate("/tournament");
        }
      }
    }
  };

  return (
    <section className="page clear-fix">
      <div className="thegame">
        <ScoreBoard />
        <div className="gameboard">
          <Stage className="canvas" width={MAP_WIDTH_PX} height={MAP_HEIGHT_PX}>
            <Layer>
              {currentFrameState.IDs.map((snakeID, i) => {
                const snake = currentFrameState.snakesData[snakeID];
                return <Snake key={i} snake={snake} />;
              })}
              <Obstacles obstacles={currentFrameState.obstaclePositions} />
              <Stars stars={currentFrameState.foodPositions} />
            </Layer>
          </Stage>
          <ControllBar />
        </div>
        <div className="tourGameBtns">{BracketNavigation()}</div>
      </div>
      {/* {modalOpen && <Modal setIsOpen={setModalOpen} />} */}
    </section>
  );
}
export default GameboardView;
