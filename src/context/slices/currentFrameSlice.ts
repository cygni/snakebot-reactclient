import colors from '../../constants/Colors';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { convertCoords } from '../../constants/BoardUtils';
import {
  GameCreatedMessage,
  GameEndedMessage,
  GameMap,
  GameResultMessage,
  MapUpdateMessage,
  SnakeDiedMessage,
} from '../../constants/messageTypes';
import Arbitraryconstants from '../../constants/Arbitraryconstants';

export type TilePosition = { x: number; y: number };

export type SnakeData = {
  name: string;
  points: number;
  color: string;
  positions: TilePosition[];
  alive: boolean;
};

export type playerRanks = {
  name: string;
};

export type playerPoints = {
  points: number;
};

interface FrameState {
  IDs: string[];
  colorIndex: number;
  snakesData: {
    [key: string]: SnakeData;
  };
  playerRanks: string[];
  playerPoints: number[];

  obstaclePositions: TilePosition[];
  foodPositions: TilePosition[];
  gameEnded: boolean;
  isRunning: boolean;
  isFinalGame: boolean;
}

const initialState: FrameState = {
  IDs: [],
  colorIndex: 0,
  snakesData: {},
  playerRanks: [],
  playerPoints: [],
  obstaclePositions: [],
  foodPositions: [],
  gameEnded: false,
  isRunning: true,
  isFinalGame: false,
};

export const snakesSlice = createSlice({
  name: 'snakes',
  initialState,
  reducers: {
    clearCurrentFrame: (state) => {
      // Reset state
      Object.assign(state, initialState);
    },

    setGameRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },

    gameCreatedEvent: (state, action: PayloadAction<GameCreatedMessage>) => {
      // Reset state
      Object.assign(state, initialState);
    },

    mapUpdateEvent: (state, action: PayloadAction<MapUpdateMessage>) => {
      updateMap(state, action.payload.map);
      state.gameEnded = false;
    },

    snakeDiedEvent: (state, action: PayloadAction<SnakeDiedMessage>) => {
      console.log('Snake has died!', action.payload);
      state.snakesData[action.payload.playerId].alive = false;

      let msg = new SpeechSynthesisUtterance();
      
      msg.volume = Arbitraryconstants.TTS_VOLUME;
      msg.voice = speechSynthesis.getVoices().find(voice => voice.name === Arbitraryconstants.TTS_VOICE)!;

      msg.text = `${state.snakesData[action.payload.playerId].name} died from ${action.payload.deathReason}`;
      speechSynthesis.speak(msg);
      state.gameEnded = false;
    },

    gameResultEvent: (state, action: PayloadAction<GameResultMessage>) => {
      action.payload.playerRanks.forEach((player) => {
        state.playerRanks.push(player.playerName);
        state.playerPoints.push(player.points);
      });
      state.gameEnded = true;
    },

    gameEndedEvent: (state, action: PayloadAction<GameEndedMessage>) => {
      console.log('Game has ended!');
      updateMap(state, action.payload.map);
      state.gameEnded = true;
    },
  },
});

function updateMap(state: Draft<FrameState>, map: GameMap) {
  // Update snake positions, points and alive status
  state.colorIndex = 0;
  state.IDs = map.snakeInfos.map((snake) => snake.id);
  map.snakeInfos.forEach(snake => {
    state.snakesData[snake.id] = {
      name: snake.name,
      points: snake.points,
      color: colors.getSnakeColor(state.colorIndex++),
      positions: snake.positions.map((position) => convertCoords(position)),
      alive: snake.positions.length > 0,
    };
  });

  // Update food positions
  state.foodPositions = map.foodPositions.map((position) => convertCoords(position));

  // Update obstacle positions
  state.obstaclePositions = map.obstaclePositions.map((position) => convertCoords(position));
}

export const { clearCurrentFrame, gameCreatedEvent, mapUpdateEvent, snakeDiedEvent, gameResultEvent, gameEndedEvent, setGameRunning } =
  snakesSlice.actions;

export default snakesSlice.reducer;
