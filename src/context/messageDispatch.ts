import { store } from './store';
import * as types from '../constants/messageTypes'
import messageTypes from '../constants/messageTypes';
import Actions from './Actions';
import { nextMessage } from './slices/gameDataSlice';
import { tournamentCreated, setGamePlan } from './slices/tournamentSlice';
import api from '../api';

export default function dataDispatch(increaseCounter: boolean = true) {
    let index = store.getState().gameData.counter;
    const message = store.getState().gameData.messages[index];
    let messageType = message.type;

    console.log("Message dispatched:", messageType, message);
    switch(messageType){
        // case messageTypes.GAME_HISTORY:
        //     console.log("GAME_HISTORY");
        //     store.dispatch(Actions.gameHistoryEvent(message));
        //     break;

        case messageTypes.GAME_CREATED_EVENT:
            console.log("GAME_CREATED_EVENT");
            store.dispatch(Actions.gameCreatedEvent(message as types.GameCreatedMessage));
            break;

        case messageTypes.GAME_STARTING_EVENT:
            console.log("GAME_STARTING_EVENT");
            store.dispatch(Actions.gameStartingEvent(message as types.GameStartingEvent));
            break;

        case messageTypes.MAP_UPDATE_EVENT:
            console.log("MAP_UPDATE_EVENT");
            store.dispatch(Actions.mapUpdateEvent(message as types.MapUpdateMessage));
            break;

        case messageTypes.SNAKE_DEAD_EVENT:
            console.log("SNAKE_DEAD_EVENT");
            store.dispatch(Actions.snakeDiedEvent(message as types.SnakeDiedMessage));
            break;
            
        case messageTypes.GAME_RESULT_EVENT:
            console.log("GAME_RESULT_EVENT");
            store.dispatch(Actions.gameResultEvent(message as types.GameResultMessage));
            break;

        case messageTypes.GAME_ENDED_EVENT:
            console.log("GAME_ENDED_EVENT");
            store.dispatch(Actions.gameEndedEvent(message as types.GameEndedMessage));
            break;

        default:
            console.error("MISSING MESSAGE TYPE", messageType);
            break;
    }

    if (increaseCounter) store.dispatch(nextMessage());
}

export function onSocketMessage(jsonData: string) {
    const message: types.SocketMessage = JSON.parse(jsonData);
    console.log("SOCKET: Message received:", message);

    switch (message.type) {
        case messageTypes.TOURNAMENT_CREATED:
            console.log("TOURNAMENT_CREATED_EVENT");
            store.dispatch(tournamentCreated(message as types.TournamentCreatedMessage));
            break;

        // case messageTypes.UPDATE_TOURNAMENT_SETTINGS:
        //     console.log("UPDATE_TOURNAMENT_SETTINGS_EVENT");
        //     break;

        case messageTypes.ACTIVE_GAMES_LIST:
            console.log("UNUSED: ACTIVE_GAMES_LIST_EVENT");
            break;

        case messageTypes.TOURNAMENT_GAME_PLAN:
            console.log("TOURNAMENT_GAME_PLAN_EVENT");
            store.dispatch(setGamePlan(message as types.TournamentGamePlanMessage));
            break;
            

        default:
            console.error("Unknown message type:", message.type);
            break;
    }
}