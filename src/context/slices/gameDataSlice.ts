import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import messageTypes from '../../constants/messageTypes';

const testAction = createAction('testAction');

export type GameData = {
    gameDate: string;
    gameID: string;
    messages: Message[];
    playerNames: string[];
    type: string;
}

export type Message = {
    gameId: string;
    receivingPlayerId: any;
    timestamp: number;
    type: string;
}

const initialState: GameData = {
    gameDate: "",
    gameID: "",
    messages: [],
    playerNames: [],
    type: ""
}

export const gameDataSlice = createSlice({
    name: 'gameData',
    initialState,
    reducers: {
        // Set entire data received from 
        setGameData: (state, action: PayloadAction<GameData>) => {
            state.gameDate = action.payload.gameDate;
            state.gameID = action.payload.gameID;
            state.messages = action.payload.messages;
            state.playerNames = action.payload.playerNames;
            state.type = action.payload.type;
        },
        dataDispatch: (state, action: PayloadAction<Message>) => {
            let message = action.payload;
            let messageType = message.type;

            console.log("MESSAGETYPE:", messageType);
            switch(messageType){
                case messageTypes.GAME_HISTORY:
                    console.log("GAME_HISTORY");
                    // Vad ska hända här?
                    //dispatch(gameHistoryEvent(message))
                    break;

                case messageTypes.GAME_CREATED_EVENT:
                    console.log("GAME_CREATED_EVENT");
                    // Vad ska hända här?
                    //dispatch(gameCreatedEvent(message))
                    break;

                case messageTypes.GAME_STARTING_EVENT:
                    console.log("GAME_STARTING_EVENT");
                    // Vad ska hända här?
                    break;

                case messageTypes.MAP_UPDATE_EVENT:
                    console.log("MAP_UPDATE_EVENT");
                    //assign snake color
                    //render obstacles
                    //start updating frames
                    break;

                default:
                    console.log("DEFAULT EVENT");
                    // Någonting här...?
                    break;
            }    
        },
    
    },
  })
  
  export const { setGameData, dataDispatch } = gameDataSlice.actions
  
  export default gameDataSlice.reducer