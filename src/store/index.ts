import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CpuUsageSlice } from "Slices/FetchCpuUsage";
import { EventHistorySlice } from "Slices/FetchEventHistory";
import { MemoryUsageSlice } from "Slices/FetchMemoryUsage";
import { ApplicationListSlice } from "Slices/FetchProjectStatus";

const rootReducer = combineReducers({
  applicationList: ApplicationListSlice.reducer,
  eventHistory: EventHistorySlice.reducer,
  memoryUsage: MemoryUsageSlice.reducer,
  cpuUsage: CpuUsageSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
