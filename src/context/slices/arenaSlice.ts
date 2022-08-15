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

      if (state.gameId) {
        api.setGameFilter(state.gameId);
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

    disconnectFromArena: (state) => {
      Object.assign(state, initialState);
      api.disconnectFromArena();
    }
  },
});

export const { arenaUpdateEvent, startArenaGame, setArenaView, setGameSettings, disconnectFromArena, createArena } = arenaSlice.actions;

export default arenaSlice.reducer;
