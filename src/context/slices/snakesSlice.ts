import colors from '../../constants/Colors';
import { createSlice } from '@reduxjs/toolkit';
import Actions from '../Actions';
import {convertCoords} from '../../constants/BoardUtils'

export type TilePosition = { x: number, y: number };

export type SnakeData = {
  name: string;
  points: number;
  color: string;
  positions: TilePosition[];
  alive: boolean;
}

interface SnakesState {
  IDs: string[];
  colorIndex: number;
  snakesData: {
    [key: string]: SnakeData;
  };
}

const initialState: SnakesState = {
  IDs: [],
  colorIndex: 0,
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
                      color: colors.getSnakeColor(state.colorIndex),
                      positions: [],
                      alive: true}};

                  state.colorIndex++;
                });
            }

            // Update snake positions and points
            action.payload.map.snakeInfos.forEach(snake => {
              state.snakesData[snake.id].positions = snake.positions.map(position => convertCoords(position));
              state.snakesData[snake.id].points = snake.points;
              // state.snakesData[snake.id].points = Math.floor(Math.random() * 100);
            });
        })
        .addCase(Actions.snakeDiedEvent, (state, action) => {
          console.log("Snake has died!", action.payload);
          state.snakesData[action.payload.playerId].color = '#999999'; // This as global ???
          state.snakesData[action.payload.playerId].alive = false;
          
        })
        
    }
  })
  
  export const { } = snakesSlice.actions
  
  export default snakesSlice.reducer


