import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isStageTickAction } from "../stage/stageSlice";
import { calculateSnowflakePosition, createSnowflake, MAX_SNOWFLAKES_COUN } from "./snowflakesAPI";

export interface SnowflakeCore {
  id: string;
  size: number;
  startLeft: number;
  createTimestamp: number;
  hSpeed: number;
  vSpeed: number;
  rSpeed: number;
  imgDataUrl?: string;
}

export interface SnowflakePosition {
  left: number;
  top: number;
  rotation: number;
}

export type Snowflake = SnowflakeCore & SnowflakePosition

export interface SnowflakesState {
  snowflakes: Snowflake[],
}

function createInitialState(timestamp: number, stageWidth: number): SnowflakesState {
  return {
    snowflakes: new Array(MAX_SNOWFLAKES_COUN).fill(0).map(
      () => createSnowflake(timestamp, stageWidth)
    ),
  };
}

const initialState = createInitialState(new Date().getTime(), window.innerWidth);

const snowflakesSlice = createSlice({
  name: 'snowflakes',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isStageTickAction,
      (state, action) => {
        const { timestamp, stageWidth, stageHeight } = action.payload;
        state.snowflakes = state.snowflakes
          .map(
            (snowflake) => calculateSnowflakePosition(snowflake, timestamp)
          )
          .filter (
            (p) => p.top < stageHeight + p.size && p.left > -p.size && p.left < stageWidth
          );
        
        while(state.snowflakes.length < MAX_SNOWFLAKES_COUN) {
          state.snowflakes.push(createSnowflake(timestamp, stageWidth));
        }
      }
    )
  }
})

export default snowflakesSlice.reducer;