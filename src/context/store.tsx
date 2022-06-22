import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice';
import colorReducer from './slices/colorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    snakeColors: colorReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch