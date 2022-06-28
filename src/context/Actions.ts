import { createAction } from '@reduxjs/toolkit';
import * as types from '../constants/messageTypes';

export default{
    mapUpdateEvent: createAction("MAP_UPDATE_EVENT", (message: types.MapUpdateMessage) => ({payload: message})),
    gameCreatedEvent: createAction("GAME_CREATED_EVENT", (message: types.GameCreatedMessage) => ({payload: message})),
    gameStartingEvent: createAction("GAME_STARTING_EVENT", (message: types.GameStartingEvent) => ({payload: message})),
    gameEndedEvent: createAction("GAME_ENDED_EVENT", (message: types.GameEndedMessage) => ({payload: message})),
    // gameHistoryEvent: createAction("GAME_HISTORY_EVENT", (message: Message) => ({payload: message})),
    snakeDiedEvent: createAction("SNAKE_DEAD_EVENT", (message: types.SnakeDiedMessage) => ({payload: message})),
    gameResultEvent: createAction("GAME_RESULT_EVENT", (message: types.GameResultMessage) => ({payload: message})),
}

