import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../../constants/messageTypes";

export type GameData = {
  gameDate: string;
  gameID: string;
  messages: Message[];
  playerNames: string[];
  counter: number;
};

const initialState: GameData = {
  gameDate: "",
  gameID: "",
  messages: [],
  playerNames: [],
  counter: 0,
};

export const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    clearGameData: (state) => {
      // Reset state
      Object.assign(state, initialState);
    },

    // Set entire data received from
    setGameData: (state, action: PayloadAction<GameData>) => {
      // Reset state
      Object.assign(state, initialState);

      state.gameDate = action.payload.gameDate;
      state.gameID = action.payload.gameID;
      state.messages = action.payload.messages;
      state.playerNames = action.payload.playerNames;
      state.counter = 0;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    incrementMessageIndex: (state) => {
      state.counter += 1;
    },

    setMessageIndex: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
  },
});

export const { clearGameData, setGameData, addMessage, incrementMessageIndex, setMessageIndex } = gameDataSlice.actions;

export default gameDataSlice.reducer;
