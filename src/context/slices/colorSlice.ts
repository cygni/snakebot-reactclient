import colors from '../../constants/Colors';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

const testAction = createAction('testAction');

interface ColorState {
    color: string[]
}
let colorIndex = 0;

const initialState: ColorState = {
    color: []
}

export const colorSlice = createSlice({
    name: 'snakeColors',
    
    initialState,
    reducers: {
      
      assignColor: (state, action: PayloadAction<string[]>) => {
          action.payload.forEach(snake => {
          state.color[colorIndex] = colors.getSnakeColor(colorIndex)
          colorIndex++;
        });
      },
      deadSnake: (state, action) => {
        // state.value += action.payload
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(testAction, (state, action) => {
            console.log("testAction from colorSlice!");
        })
    }
  })
  
  export const { assignColor, deadSnake } = colorSlice.actions
  
  export default colorSlice.reducer