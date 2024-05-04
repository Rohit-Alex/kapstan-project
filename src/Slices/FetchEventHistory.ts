import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IDispatcherType,
  IGenralizedInitialState,
  RESPONSE_INITIAL_STATE,
  EventHistoryResponse,
} from "types";
import { getEventHistory } from "api/services";
import { toast } from "react-toastify";
import { AppDispatch } from "store";

const getEventHistoryThunk = createAsyncThunk(
  "get/eventHistory",
  getEventHistory
);

export const EventHistorySlice = createSlice({
  name: "applicationList",
  initialState: RESPONSE_INITIAL_STATE<EventHistoryResponse[]>(),
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = "";
    },
    RESET: (state) => Object.assign(state, RESPONSE_INITIAL_STATE()),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventHistoryThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        getEventHistoryThunk.fulfilled,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "fetched";
          state.data = action.payload;
        }
      )
      .addCase(
        getEventHistoryThunk.rejected,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "error";
          state.error = action?.error?.message ?? "something went wrong!";
          toast.error(state.error);
        }
      );
  },
});

interface IStates {
  [EventHistorySlice.name]: ReturnType<typeof EventHistorySlice.reducer>;
}

export const useEventHistory = (): IGenralizedInitialState<
  EventHistoryResponse[]
> => useSelector((state: IStates) => state[EventHistorySlice.name] || {});

export const triggerEventHistoryAPI =
  () =>
  async (
    dispatch: AppDispatch,
    getState: () => IStates
  ): Promise<EventHistoryResponse[]> => {
    await dispatch(getEventHistoryThunk());
    return getState()[EventHistorySlice.name].data as EventHistoryResponse[];
  };

export const resetEventHistory =
  () =>
  async (dispatch: IDispatcherType): Promise<void> => {
    await dispatch(EventHistorySlice.actions.RESET());
  };
