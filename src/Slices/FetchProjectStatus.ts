import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IDispatcherType,
  IGenralizedInitialState,
  RESPONSE_INITIAL_STATE,
  ApplicationStatusResponse,
} from "types";
import { getApplicationList } from "api/services";
import { toast } from "react-toastify";

const getApplicationListThunk = createAsyncThunk(
  "get/applicationList",
  getApplicationList
);

export const ApplicationListSlice = createSlice({
  name: "applicationList",
  initialState: RESPONSE_INITIAL_STATE<ApplicationStatusResponse[]>(),
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = "";
    },
    RESET: (state) => Object.assign(state, RESPONSE_INITIAL_STATE()),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationListThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        getApplicationListThunk.fulfilled,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "fetched";
          state.data = action.payload;
        }
      )
      .addCase(
        getApplicationListThunk.rejected,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "error";
          state.error = action?.error?.message ?? "something went wrong!";
          toast.error(state.error);
        }
      );
  },
});

interface IStates {
  [ApplicationListSlice.name]: ReturnType<typeof ApplicationListSlice.reducer>;
}

export const useApplicationList = (): IGenralizedInitialState<
  ApplicationStatusResponse[]
> => useSelector((state: IStates) => state[ApplicationListSlice.name] || {});

export const triggerApplicationListAPI =
  () =>
  async (
    dispatch: IDispatcherType,
    getState: () => IStates
  ): Promise<ApplicationStatusResponse[]> => {
    await dispatch(getApplicationListThunk());
    return getState()[ApplicationListSlice.name]
      .data as ApplicationStatusResponse[];
  };

export const resetApplicationList =
  () =>
  async (dispatch: IDispatcherType): Promise<void> => {
    await dispatch(ApplicationListSlice.actions.RESET());
  };
