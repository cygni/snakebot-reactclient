import colors from '../../constants/Colors';
import { createSlice } from '@reduxjs/toolkit';
import Actions from '../Actions';

let colorIndex = 0;

export type SnakeData = {
  name: string;
  points: number;
  color: string;
  positions: number[];
  alive: boolean;
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
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(Actions.mapUpdateEvent, (state, action) => {

            // Initialize snakes first iteration
            if (action.payload.gameTick === 0) {
                action.payload.map.snakeInfos.forEach(snake => {
                  state.IDs.push(snake.id);
                  state.snakesData = {...state.snakesData,
                    [snake.id]:
                      {name: snake.name,
                      points: snake.points,
                      color: colors.getSnakeColor(colorIndex),
                      positions: snake.positions,
                      alive: true}};

                  colorIndex++;
                });
            }

            // Update snake positions and points
            action.payload.map.snakeInfos.forEach(snake => {
              state.snakesData[snake.id].positions = snake.positions;
              state.snakesData[snake.id].points = snake.points;
            });
            
        })
        .addCase(Actions.snakeDiedEvent, (state, action) => {
          console.log("Snake has died!", action.payload);
          state.snakesData[action.payload.playerId].alive = false;
          
        })
        
    }
  })
  
  export const { } = snakesSlice.actions
  
  export default snakesSlice.reducer