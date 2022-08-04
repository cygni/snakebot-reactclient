import { configureStore } from '@reduxjs/toolkit'
import currentFrameReducer from './slices/currentFrameSlice';
import gameDataReducer from './slices/gameDataSlice';
import tournamentReducer from './slices/tournamentSlice';
import arenaReducer from './slices/arenaSlice';

export const store = configureStore({
  reducer: {
    currentFrame: currentFrameReducer,
    gameData: gameDataReducer,
    tournament: tournamentReducer,
    arena: arenaReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch