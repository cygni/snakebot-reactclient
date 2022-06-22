import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice';
import colorReducer from './slices/colorSlice';
import gameDataReducer from './slices/gameDataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    snakeColors: colorReducer,
    gameData: gameDataReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch