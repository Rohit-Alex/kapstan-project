import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ApplicationListSlice } from "Slices/FetchProjectStatus";

const rootReducer = combineReducers({
  applicationList: ApplicationListSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
