import { store } from './store';
import * as types from '../constants/messageTypes';
import messageTypes from '../constants/messageTypes';
import { incrementMessageIndex } from './slices/gameDataSlice';
import { tournamentCreated, setGamePlan, tournamentEnded, setLoggedIn } from './slices/tournamentSlice';
import {
  gameCreatedEvent,
  mapUpdateEvent,
  snakeDiedEvent,
  gameResultEvent,
  gameEndedEvent,
} from './slices/currentFrameSlice';

export default function dataDispatch(increaseCounter: boolean = true) {
  let index = store.getState().gameData.counter;
  const message = store.getState().gameData.messages[index];
  let messageType = message.type;

  console.log('Message dispatched:', messageType, message);
  switch (messageType) {
    case messageTypes.GAME_CREATED_EVENT:
      store.dispatch(gameCreatedEvent(message as types.GameCreatedMessage));
      break;

    case messageTypes.MAP_UPDATE_EVENT:
      store.dispatch(mapUpdateEvent(message as types.MapUpdateMessage));
      break;

    case messageTypes.SNAKE_DEAD_EVENT:
      store.dispatch(snakeDiedEvent(message as types.SnakeDiedMessage));
      break;

    case messageTypes.GAME_RESULT_EVENT:
      store.dispatch(gameResultEvent(message as types.GameResultMessage));
      break;

    case messageTypes.GAME_ENDED_EVENT:
      store.dispatch(gameEndedEvent(message as types.GameEndedMessage));
      break;

    default:
      console.error('MISSING MESSAGE TYPE', messageType);
      break;
  }

  if (increaseCounter) store.dispatch(incrementMessageIndex());
}

export function onSocketMessage(jsonData: string) {
  const message: types.SocketMessage = JSON.parse(jsonData);
  console.log('Socket: Message received:', message.type, message);

  switch (message.type) {
    case messageTypes.UNAUTHORIZED:
      console.error('UNAUTHORIZED');
      localStorage.removeItem('token');
      store.dispatch(setLoggedIn(false));
      // Navigate to loginView
      window.location.href = '/login';
      break;

    case messageTypes.TOURNAMENT_CREATED:
      console.log('Tournament created:');
      store.dispatch(tournamentCreated(message as types.TournamentCreatedMessage));
      break;

    case messageTypes.ACTIVE_GAMES_LIST:
      break;

    case messageTypes.TOURNAMENT_GAME_PLAN:
      store.dispatch(setGamePlan(message as types.TournamentGamePlanMessage));
      break;

    case messageTypes.TOURNAMENT_ENDED_EVENT:
      store.dispatch(tournamentEnded(message as types.TournamentEndedMessage));
      break;

    default:
      console.error('Unknown message type:', message.type);
      break;
  }
}
