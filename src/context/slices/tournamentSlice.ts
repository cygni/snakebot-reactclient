import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import {TournamentEnums} from '../../constants/ViewEnums';
import {
  TournamentCreatedMessage,
  GameSettings,
  TournamentGamePlanMessage,
  Player,
  TournamentLevel,
  TournamentEndedMessage,
} from '../../constants/messageTypes';
import Arbitraryconstants from '../../constants/Arbitraryconstants';

export type TournamentData = {
  gameSettings: GameSettings;
  tournamentId: string;
  tournamentName: string;
  noofLevels: number;
  
  players: Player[];
  tournamentLevels: TournamentLevel[];
  activeGameId: string;
  finalGameID: string;
  finalGameResult: { name: string; playerId: string; points: number }[];
  startedGames: { [key: string]: boolean };
  viewedGames: { [key: string]: boolean };
  gameFinishedShare: number;
  isWinnerDeclared: boolean;

  isLoggedIn: boolean;
  isTournamentActive: boolean;
  isTournamentStarted: boolean;

  tournamentViewState: TournamentEnums;
};

const initialState: TournamentData = {
  gameSettings: Arbitraryconstants.placeholdGameSettings,
  tournamentId: '',
  tournamentName: 'Tournament Not Created',
  noofLevels: 0,

  players: [],
  tournamentLevels: [],
  activeGameId: '',
  finalGameID: '',
  finalGameResult: [],
  startedGames: {},
  viewedGames: {},
  gameFinishedShare: 0,
  isWinnerDeclared: false,

  isLoggedIn: localStorage.getItem('token') !== null,
  isTournamentActive: false,
  isTournamentStarted: false,

  tournamentViewState: TournamentEnums.STARTPAGE,
};

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    clearTournament: (state) => {
      Object.assign(state, initialState);
      state.isLoggedIn = localStorage.getItem('token') !== null;
    },

    tournamentCreated: (state, action: PayloadAction<TournamentCreatedMessage>) => {
      // Clear out old data
      Object.assign(state, initialState);
      state.isLoggedIn = localStorage.getItem('token') !== null;

      // Set data from message
      state.gameSettings = action.payload.gameSettings;
      state.tournamentId = action.payload.tournamentId;
      state.tournamentName = action.payload.tournamentName;

      state.isTournamentActive = true;
      state.tournamentViewState = TournamentEnums.SETTINGSPAGE;
      
    },

    tournamentJoined: (state, action) => {
      state.tournamentViewState = action.payload;
    },

    updateGameSettings: (state, action: PayloadAction<GameSettings>) => {
      state.gameSettings = action.payload;
      api.updateTournamentSettings(action.payload);
    },

    setTournamentName: (state, action) => {
      state.tournamentName = action.payload;
    },

    startTournament: (state) => {
      state.isTournamentStarted = true;
      // state.tournamentViewState = TournamentEnums.LOADINGPAGE;
      state.tournamentViewState = TournamentEnums.SCHEDULE;
    },

    settingsAreDone: (state) => {
      state.tournamentViewState = TournamentEnums.PLAYERLIST;
    },

    editSettings: (state) => {
      state.tournamentViewState = TournamentEnums.SETTINGSPAGE;
    },

    setTournamentView: (state, action: PayloadAction<TournamentEnums>) => {
      state.tournamentViewState = action.payload;
    },

    declareTournamentWinner: (state, action: PayloadAction<string>) => {
      if (!state.isWinnerDeclared) {
        let msg = new SpeechSynthesisUtterance();
        msg.volume = Arbitraryconstants.TTS_VOLUME;
        msg.voice = speechSynthesis.getVoices().find(voice => voice.name === Arbitraryconstants.TTS_VOICE)!;
        
        msg.text = 'Congratulations' + action.payload + ', on winning the tournament!';
        speechSynthesis.speak(msg);
      }
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
          // if (game.isViewed === undefined) game.isViewed = false;
          if (game.gamePlayed) totalGamesPlayed++;
        });
      });
      state.gameFinishedShare = (100 * totalGamesPlayed) / Math.pow(2, state.noofLevels);

      if (state.isTournamentStarted) {
        // Find and play games that has not been played
        for (let level of state.tournamentLevels) {
          let startNextLevel = true;
          for (let game of level.tournamentGames) {
            // If a game has not been played, don't start the next level
            if (!game.gamePlayed) startNextLevel = false;

            if (game.gameId !== null && !state.startedGames[game.gameId]) {
              state.startedGames[game.gameId] = true;
              api.startTournamentGame(game.gameId);
            }
          }

          // Start next level if all games in this level has been played
          if (!startNextLevel) break;
        }
      }
    },

    viewGame: (state, action: PayloadAction<string | null>) => {
      if (action.payload == null) return;

      state.activeGameId = action.payload;
      state.tournamentViewState = TournamentEnums.GAME;

      state.viewedGames[action.payload] = true;
    },

    tournamentEnded: (state, action: PayloadAction<TournamentEndedMessage>) => {
      state.finalGameID = action.payload.gameId;
      state.finalGameResult = action.payload.gameResult;
    },

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  clearTournament,
  tournamentCreated,
  updateGameSettings,
  startTournament,
  setGamePlan,
  viewGame,
  tournamentEnded,
  setLoggedIn,
  settingsAreDone,
  setTournamentName,
  editSettings,
  declareTournamentWinner,
  setTournamentView,
  tournamentJoined,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
