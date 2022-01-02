import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StageState {
  timestamp: number;
  stageWidth: number;
  stageHeight: number;
}

function createInitialState(timestamp: number): StageState {
  return {
    timestamp,
    stageWidth: 0,
    stageHeight: 0,
  };
}

const initialState = createInitialState(new Date().getTime());

const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    tick: (state, action: PayloadAction<StageState>) => {
      state.timestamp = action.payload.timestamp;
      state.stageWidth = action.payload.stageWidth;
      state.stageHeight = action.payload.stageHeight;
    }
  },
})

export const {tick} = stageSlice.actions;

export type StageTickAction = ReturnType<typeof stageSlice.actions.tick>;
export function isStageTickAction(action: AnyAction): action is StageTickAction {
  return action.type.endsWith("/tick");
}

export default stageSlice.reducer;