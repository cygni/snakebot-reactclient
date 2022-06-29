import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { TournamentCreatedMessage, GameSettings, Message} from "../../constants/messageTypes";

export type TournamentData = {
    gameSettings: GameSettings;
    tournamentId: string;
    tournamentName: string;
    noofLevels: number;

    messages: Message[];
    counter: number;
}

const initialState: TournamentData = {
    // Default game settings
    gameSettings: {addFoodLikelihood: 15, removeFoodLikelihood: 5} as GameSettings,
    tournamentId: "",
    tournamentName: "Tournament Not Created",
    noofLevels: 0,

    messages: [],
    counter: 0,
}

export const tournamentSlice = createSlice({
    name: 'gameData',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },

        createTournament: (state, action: PayloadAction<TournamentCreatedMessage>) => {
            // Clear out old data
            state.messages = [];
            state.counter = 0;
            state.noofLevels = 0;

            // Set data from message
            state.gameSettings = action.payload.gameSettings;
            state.tournamentId = action.payload.tournamentId;
            state.tournamentName = action.payload.tournamentName;
        },

        updateGameSettings: (state, action: PayloadAction<GameSettings>) => {
            state.gameSettings = action.payload;

            // TODO: Exception handling, what if message gets lost?
            api.updateTournamentSettings(action.payload);
        }

        
    },


  });
  
  export const { addMessage, createTournament, updateGameSettings } = tournamentSlice.actions
  
  export default tournamentSlice.reducer