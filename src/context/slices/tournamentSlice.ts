import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import {TournamentEnums} from '../../constants/ViewEnums';
import {
  TournamentCreatedMessage,
  GameSettings,
  TournamentGamePlanMessage,
  Player,
  TournamentLevel,
  TournamentGame,
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
  finalGameID: string | null;
  finalGameResult: { name: string; playerId: string; points: number }[];
  gameFinishedShare: number;
  isWinnerDeclared: boolean;

  isLoggedIn: boolean;

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
  gameFinishedShare: 0,
  isWinnerDeclared: false,

  isLoggedIn: localStorage.getItem('token') !== null,
  
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
      localStorage.removeItem('isTournamentStarted');
      localStorage.removeItem('viewedGames');

      // Set data from message
      state.gameSettings = action.payload.gameSettings;
      state.tournamentId = action.payload.tournamentId;
      state.tournamentName = action.payload.tournamentName;

      state.tournamentViewState = TournamentEnums.SETTINGSPAGE;
      
    },

    updateGameSettings: (state, action: PayloadAction<GameSettings>) => {
      state.gameSettings = action.payload;
      api.updateTournamentSettings(action.payload);
    },

    setTournamentName: (state, action) => {
      state.tournamentName = action.payload;
    },

    startTournament: (state) => {
      localStorage.setItem('isTournamentStarted', 'true');
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
      state.finalGameID = state.tournamentLevels.length===0 ? '' : state.tournamentLevels[state.noofLevels - 1].tournamentGames[0].gameId;
    },

    viewGame: (state, action: PayloadAction<string | null>) => {
      if (action.payload == null) return;

      state.activeGameId = action.payload;
      state.tournamentViewState = TournamentEnums.GAME;

      const viewedGames: { [key: string]: boolean } = localStorage.getItem('viewedGames') ? JSON.parse(localStorage.getItem('viewedGames')!) : {};
      localStorage.setItem('viewedGames', JSON.stringify({ ...viewedGames, [action.payload]: true }));

      // find active game
      let activeGame: TournamentGame | null = null;
      for (let level of state.tournamentLevels) {
        for (let game of level.tournamentGames) {
          if (game.gameId === state.activeGameId) {
            activeGame = game;
            break;
          }
        }
      }

      if (activeGame && !activeGame.gamePlayed) {
        api.setGameFilter(state.activeGameId);
        api.startTournamentGame(state.activeGameId);
      }

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
  setLoggedIn,
  settingsAreDone,
  setTournamentName,
  editSettings,
  declareTournamentWinner,
  setTournamentView,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
