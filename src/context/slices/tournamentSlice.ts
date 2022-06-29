import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { TournamentCreatedMessage, GameSettings, Message} from "../../constants/messageTypes";

export type TournamentData = {
    gameSettings: GameSettings;
    tournamentId: string;
    tournamentName: string;

    messages: Message[];
    counter: number;
}

const initialState: TournamentData = {
    // Default game settings
    gameSettings: {
        addFoodLikelihood: 15,
        foodEnabled: true,
        headToTailConsumes: true,
        maxNoofPlayers: 10,
        noofRoundsTailProtectedAfterNibble: 3,
        obstaclesEnabled: true,
        pointsPerCausedDeath: 5,
        pointsPerFood: 2,
        pointsPerLength: 1,
        pointsPerNibble: 10,
        removeFoodLikelihood: 5,
        spontaneousGrowthEveryNWorldTick: 3,
        startFood: 0,
        startObstacles: 5,
        startSnakeLength: 1,
        tailConsumeGrows: false,
        timeInMsPerTick: 250,
        trainingGame: true

    },
    tournamentId: "",
    tournamentName: "Tournament Not Created",

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

        setGameSettings: (state, action: PayloadAction<TournamentCreatedMessage>) => {
            console.log("setGameSettings action.payload: ", action.payload);
            state.tournamentName = action.payload.tournamentName;
        },

        
    },


  });
  
  export const { addMessage, setGameSettings } = tournamentSlice.actions
  
  export default tournamentSlice.reducer