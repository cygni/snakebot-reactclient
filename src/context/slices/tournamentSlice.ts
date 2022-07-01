import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { TournamentCreatedMessage, GameSettings, Message, GameCreatedMessage, TournamentGamePlanMessage, Player, TournamentLevel, ActiveGamesListMessage} from "../../constants/messageTypes";
import { store } from '../store';

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
    isTournamentActive: boolean;

    playedGameIds: string[];

    messages: Message[];
    counter: number;
}

const dummyPlayers: Player[] = [
    {id: "test-id1", isMovedUpInTournament: true, name: "olli", points: 10, isWinner: true},
    {id: "test-id2", isMovedUpInTournament: false, name: "danne", points: 30, isWinner: false},
    {id: "test-id3", isMovedUpInTournament: false, name: "sebbe", points: 3, isWinner: false},
    {id: "test-id4", isMovedUpInTournament: false, name: "slimey", points: 4, isWinner: false}]

const testState: TournamentData = {
    // Default game settings
    gameSettings: placeholdGameSettings,
    tournamentId: "",
    tournamentName: "Tournament Not Created",
    noofLevels: 0,
    playedGameIds: [],

    players: dummyPlayers,
    tournamentLevels: [ // level same as round
        {expectedNoofPlayers: 3, level: 2, players: [], tournamentGames: [
            {expectedNoofPlayers: 3, gameId: "game-id3", gamePlayed: false, players: [dummyPlayers[0], dummyPlayers[2]]}],
            tournamentName: "den stora turneringen"},

        {expectedNoofPlayers: 3, level: 1, players: [], tournamentGames: [
            {expectedNoofPlayers:2, gameId: "game-id1", gamePlayed: false, players: [dummyPlayers[0], dummyPlayers[1]]},
            {expectedNoofPlayers:2, gameId: "game-id2", gamePlayed: false, players: [dummyPlayers[2], dummyPlayers[3]]}],
            tournamentName: "den stora turneringen"},

    ],

    isTournamentActive: false,
    messages: [],
    counter: 0,
}

function isGamePlayed(tournamentData: TournamentData, gameId: string) {
    tournamentData.tournamentLevels.forEach(level => {
        level.tournamentGames.forEach(game => {
            if (game.gameId === gameId) {
                return true;
            }
        });
    });
    return false;
}

const initialState: TournamentData = {
    // Default game settings
    gameSettings: placeholdGameSettings,
    tournamentId: "",
    tournamentName: "Tournament Not Created",
    noofLevels: 0,

    players: [],
    tournamentLevels: [],

    playedGameIds: [],
    isTournamentActive: false,

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
            Object.assign(state, initialState);

            // Set data from message
            state.gameSettings = action.payload.gameSettings;
            state.tournamentId = action.payload.tournamentId;
            state.tournamentName = action.payload.tournamentName;

            state.isTournamentActive = true;
        },

        updateGameSettings: (state, action: PayloadAction<GameSettings>) => {
            state.gameSettings = action.payload;

            // TODO: Exception handling, what if message gets lost?
            api.updateTournamentSettings(action.payload);
        },

        setGamePlan: (state, action: PayloadAction<TournamentGamePlanMessage>) => {
            state.noofLevels = action.payload.noofLevels;
            state.players = action.payload.players;
            state.tournamentId = action.payload.tournamentId;
            state.tournamentLevels = action.payload.tournamentLevels;
            state.tournamentName = action.payload.tournamentName;
        },

        runActiveGames: (state, action: PayloadAction<ActiveGamesListMessage>) => {
            if (state.isTournamentActive === false) return;

            const games = action.payload.games;
            games.forEach(game => {
                if (!state.playedGameIds.includes(game.gameId)) {
                    const gameId = game.gameId;
                    api.startTournamentGame(gameId);
                    state.playedGameIds.push(gameId);
                }
            });
        },
    },


  });
  
  export const { addMessage, createTournament, updateGameSettings, setGamePlan, runActiveGames} = tournamentSlice.actions
  
  export default tournamentSlice.reducer