import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import TournamentEnums from '../../constants/TournamentEnums';
import {
  TournamentCreatedMessage,
  GameSettings,
  Message,
  TournamentGamePlanMessage,
  Player,
  TournamentLevel,
  TournamentEndedMessage,
} from '../../constants/messageTypes';

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
};

export type TournamentData = {
  gameSettings: GameSettings;
  tournamentId: string;
  tournamentName: string;
  noofLevels: number;

  players: Player[];
  tournamentLevels: TournamentLevel[];
  finalGameID: string;
  finalGameResult: { name: string; playerId: string; points: number }[];
  startedGames: { [key: string]: boolean };
  gameFinishedShare: number;
  isWinnerDeclared: boolean;

  isLoggedIn: boolean;
  isTournamentActive: boolean;
  isTournamentStarted: boolean;
  isSettingsDone: boolean;
  allGamesPlayed: boolean;

  tournamentViewState: TournamentEnums;

  messages: Message[];
  counter: number;
};

const initialState: TournamentData = {
  // Default game settings
  gameSettings: placeholdGameSettings,
  tournamentId: '',
  tournamentName: 'Tournament Not Created',
  noofLevels: 0,

  players: [],
  tournamentLevels: [],
  finalGameID: '',
  finalGameResult: [],
  startedGames: {},
  gameFinishedShare: 0,
  isWinnerDeclared: false,

  isLoggedIn: localStorage.getItem('token') !== null,
  isTournamentActive: false,
  isTournamentStarted: false,
  isSettingsDone: false,
  allGamesPlayed: false,

  tournamentViewState: TournamentEnums.SETTINGSPAGE,

  messages: [],
  counter: 0,
};

export const tournamentSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    tournamentCreated: (state, action: PayloadAction<TournamentCreatedMessage>) => {
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

    setTournamentName: (state, action) => {
      state.tournamentName = action.payload;
    },

    startTournament: (state) => {
      state.isTournamentStarted = true;
      state.tournamentViewState = TournamentEnums.LOADINGPAGE;
    },

    settingsAreDone: (state) => {
      state.isSettingsDone = true;
      state.tournamentViewState = TournamentEnums.PLAYERLIST;
    },

    editSettings: (state) => {
      state.tournamentViewState = TournamentEnums.SETTINGSPAGE;
    },

    declareTournamentWinner: (state) => {
      state.isWinnerDeclared = true;
    },

    setGamePlan: (state, action: PayloadAction<TournamentGamePlanMessage>) => {
      state.noofLevels = action.payload.noofLevels;
      state.players = action.payload.players;
      state.tournamentId = action.payload.tournamentId;
      state.tournamentLevels = action.payload.tournamentLevels;
      state.tournamentName = action.payload.tournamentName;

      // Initialize isViewed for all games and get amount of games played
      let totalGamesPlayed = 0;
      state.tournamentLevels.forEach((level) => {
        level.tournamentGames.forEach((game) => {
          if (game.isViewed === undefined) game.isViewed = false;
          if (game.gamePlayed) totalGamesPlayed++;
        });
      });
      state.gameFinishedShare = (100 * totalGamesPlayed) / Math.pow(2, state.noofLevels);

      if (state.isTournamentStarted) {
        // Find and play first game that has not been played
        let startedGame = false;
        for (let level of state.tournamentLevels) {
          for (let game of level.tournamentGames) {
            if (game.gameId !== null && !state.startedGames[game.gameId]) {
              state.startedGames[game.gameId] = true;
              api.startTournamentGame(game.gameId);
              startedGame = true;
              // break;
            }
          }
          // If we started a game, we are done
          if (startedGame) break;
        }
      }
    },

    viewedGame: (state, action: PayloadAction<string | null>) => {
      if (action.payload == null) return;
      for (let level of state.tournamentLevels) {
        for (let game of level.tournamentGames) {
          if (game.gameId === action.payload) {
            game.isViewed = true;
          }
        }
      }
    },

    tournamentEnded: (state, action: PayloadAction<TournamentEndedMessage>) => {
      state.allGamesPlayed = true;
      state.tournamentViewState = TournamentEnums.SCHEDULE;
      state.finalGameID = action.payload.gameId;
      state.finalGameResult = action.payload.gameResult;
    },

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      // if (state.isLoggedIn === false) {
      //     // Navigate to loginView
      //     window.location.href = "/login";
      // }
    },
  },
});

export const {
  addMessage,
  tournamentCreated,
  updateGameSettings,
  startTournament,
  setGamePlan,
  viewedGame,
  tournamentEnded,
  setLoggedIn,
  settingsAreDone,
  setTournamentName,
  editSettings,
  declareTournamentWinner,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
