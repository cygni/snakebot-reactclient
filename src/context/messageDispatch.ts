import { store } from './store';
import * as types from '../constants/messageTypes'
import messageTypes from '../constants/messageTypes';
import Actions from './Actions';
import { nextMessage } from './slices/gameDataSlice';

export default function dataDispatch() {
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
    store.dispatch(nextMessage())
}