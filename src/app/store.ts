import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import snowflakesReducer from '../features/snowflakes/snowflakesSlice';
import stageSlice from '../features/stage/stageSlice';

export const store = configureStore({
  reducer: {
    snowflakes: snowflakesReducer,
    stage: stageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
