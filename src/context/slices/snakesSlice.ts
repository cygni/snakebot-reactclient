import colors from '../../constants/Colors';
import { createSlice } from '@reduxjs/toolkit';
import Actions from '../Actions';

let colorIndex = 0;

export type SnakeData = {
  name: string;
  color: string;
}

interface SnakesState {
  IDs: string[];
  snakesData: {
    [key: string]: SnakeData;
  };
}

const initialState: SnakesState = {
  IDs: [],
  snakesData: {},
}

export const snakesSlice = createSlice({
    name: 'snakes',
    
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(Actions.mapUpdateEvent, (state, action) => {
            console.log('ColorSlice received!', action.payload);
            if (action.payload.gameTick === 0) {
                action.payload.map.snakeInfos.forEach(snake => {
                  state.IDs.push(snake.id);
                  state.snakesData = {...state.snakesData,
                    [snake.id]: {name: snake.name,
                      color: colors.getSnakeColor(colorIndex)}};

                  colorIndex++;
                });
            }
        })
    }
  })
  
  export const { } = snakesSlice.actions
  
  export default snakesSlice.reducer