import { createAction } from '@reduxjs/toolkit';
import type { Message, MapUpdateMessage, SnakeDiedMessage } from '../constants/messageTypes';

export default{
    mapUpdateEvent: createAction("MAP_UPDATE_EVENT", (message: MapUpdateMessage) => ({payload: message})),
    gameCreatedEvent: createAction("GAME_CREATED_EVENT", (message: Message) => ({payload: message})),
    gameStartingEvent: createAction("GAME_STARTING_EVENT", (message: Message) => ({payload: message})),
    gameEndedEvent: createAction("GAME_ENDED_EVENT", (message: Message) => ({payload: message})),
    gameHistoryEvent: createAction("GAME_HISTORY_EVENT", (message: Message) => ({payload: message})),
    snakeDiedEvent: createAction("SNAKE_DEAD_EVENT", (message: SnakeDiedMessage) => ({payload: message}))
}

