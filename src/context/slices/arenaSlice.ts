import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import Arbitraryconstants from '../../constants/Arbitraryconstants';
import type { ArenaUpdateEventMessage, GameHistory, GameSettings } from '../../constants/messageTypes';
import { ArenaEnums } from '../../constants/ViewEnums';

export type ArenaData = {
  arenaName: string;
  players: string[];
  gameId: null | string;
  gameHistory: GameHistory[];

  gameSettings: GameSettings;
  arenaViewState: ArenaEnums;
};

const initialState: ArenaData = {
  arenaName: '',
  players: [],
  gameId: null,
  gameHistory: [],

  gameSettings: Arbitraryconstants.placeholdGameSettings,
  arenaViewState: ArenaEnums.PLAYERLIST,
};

export const arenaSlice = createSlice({
  name: 'arena',
  initialState,
  reducers: {
    arenaUpdateEvent: (state, action: PayloadAction<ArenaUpdateEventMessage>) => {
      state.arenaName = action.payload.arenaName;
      state.gameId = action.payload.gameId;
      state.players = action.payload.onlinePlayers;
      state.gameHistory = action.payload.gameHistory;

      // Navigate to game when it is finished
      if (
        state.arenaViewState === ArenaEnums.LOADINGPAGE &&
        state.gameHistory.some((game) => game.gameId === state.gameId)
      ) {
        state.arenaViewState = ArenaEnums.GAME;
      }
    },

    createArena: (state) => {
      // If placehold settings, don't send them
      if (JSON.stringify(state.gameSettings) === JSON.stringify(Arbitraryconstants.placeholdGameSettings)) {
        api.createArenaGame();
      } else {
        api.createArenaGame(state.gameSettings);
      }
    },

    startArenaGame: (state) => {
      api.startArenaGame(state.arenaName);
      state.arenaViewState = ArenaEnums.LOADINGPAGE;
    },

    setArenaView: (state, action: PayloadAction<ArenaEnums>) => {
      state.arenaViewState = action.payload;
    },

    setGameSettings: (state, action: PayloadAction<GameSettings>) => {
      state.gameSettings = action.payload;
    },

    resetArena: (state) => {
      Object.assign(state, initialState);
    }
  },
});

export const { arenaUpdateEvent, startArenaGame, setArenaView, setGameSettings, resetArena, createArena } = arenaSlice.actions;

export default arenaSlice.reducer;
