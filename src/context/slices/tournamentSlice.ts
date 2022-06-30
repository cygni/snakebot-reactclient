import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { TournamentCreatedMessage, GameSettings, Message, GameCreatedMessage, TournamentGamePlanMessage, Player, TournamentLevel} from "../../constants/messageTypes";

const placeholdGameSettings: GameSettings = {
    addFoodLikelihood: 0,
    foodEnabled: false,
    headToTailConsumes: false,
    maxNoofPlayers: 0,
    noofRoundsTailProtectedAfterNibble: 0,
    obstaclesEnabled: false,
    pointsPerCausedDeath: 0,
    pointsPerFood: 0,
    pointsPerLength: 0,
    pointsPerNibble: 0,
    removeFoodLikelihood: 0,
    spontaneousGrowthEveryNWorldTick: 0,
    startFood: 0,
    startObstacles: 0,
    startSnakeLength: 0,
    tailConsumeGrows: false,
    timeInMsPerTick: 0,
    trainingGame: false,
}

export type TournamentData = {
    gameSettings: GameSettings;
    tournamentId: string;
    tournamentName: string;
    noofLevels: number;

    players: Player[];
    tournamentLevels: TournamentLevel[];

    messages: Message[];
    counter: number;
}

const initialState: TournamentData = {
    // Default game settings
    gameSettings: placeholdGameSettings,
    tournamentId: "",
    tournamentName: "Tournament Not Created",
    noofLevels: 0,

    players: [],
    tournamentLevels: [],

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
        },

        startTournamentGame: (state, action: PayloadAction<GameCreatedMessage>) => {
            api.startTournamentGame(action.payload.gameId);
        },

        setGamePlan: (state, action: PayloadAction<TournamentGamePlanMessage>) => {
            state.noofLevels = action.payload.noofLevels;
            state.players = action.payload.players;
            state.tournamentId = action.payload.tournamentId;
            state.tournamentLevels = action.payload.tournamentLevels;
            state.tournamentName = action.payload.tournamentName;
        }
        

        
    },


  });
  
  export const { addMessage, createTournament, updateGameSettings, startTournamentGame, setGamePlan} = tournamentSlice.actions
  
  export default tournamentSlice.reducer