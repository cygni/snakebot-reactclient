import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../../constants/messageTypes';

const testAction = createAction('testAction');

export type GameData = {
    gameDate: string;
    gameID: string;
    messages: Message[];
    playerNames: string[];
    type: string;
    counter: number;
}

const initialState: GameData = {
    gameDate: "",
    gameID: "",
    messages: [],
    playerNames: [],
    type: "",
    counter: 0
}

export const gameDataSlice = createSlice({
    name: 'gameData',
    initialState,
    reducers: {
        // Set entire data received from 
        setGameData: (state, action: PayloadAction<GameData>) => {
            state.gameDate = action.payload.gameDate;
            state.gameID = action.payload.gameID;
            state.messages = action.payload.messages;
            state.playerNames = action.payload.playerNames;
            state.type = action.payload.type;
            state.counter = 0;
        },

        nextMessage: (state) => {
            state.counter += 1;
          },

        setCounter: (state, action: PayloadAction<number>) => {
            state.counter = action.payload;
        }
    },
  });
  
  export const { setGameData, nextMessage, setCounter } = gameDataSlice.actions
  
  export default gameDataSlice.reducer