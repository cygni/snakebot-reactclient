import { configureStore } from '@reduxjs/toolkit'
import snakesReducer from './slices/snakesSlice';
import gameDataReducer from './slices/gameDataSlice';
import tournamentReducer from './slices/tournamentSlice';

export const store = configureStore({
  reducer: {
    snakes: snakesReducer,
    gameData: gameDataReducer,
    tournament: tournamentReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch