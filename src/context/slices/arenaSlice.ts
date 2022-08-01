import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import type { ArenaUpdateEventMessage, GameHistory } from '../../constants/messageTypes';
import { ArenaEnums } from '../../constants/ViewEnums';

export type ArenaData = {
  arenaName: string;
  players: string[];
  gameId: null | string;
  gameHistory: GameHistory[];

  arenaViewState: ArenaEnums;
};

const initialState: ArenaData = {
  arenaName: '',
  players: [],
  gameId: null,
  gameHistory: [],

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

    startArenaGame: (state) => {
      api.startArenaGame(state.arenaName);
      state.arenaViewState = ArenaEnums.LOADINGPAGE;
    },
  },
});

export const { arenaUpdateEvent, startArenaGame } = arenaSlice.actions;

export default arenaSlice.reducer;
