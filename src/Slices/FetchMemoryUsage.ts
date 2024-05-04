import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IDispatcherType,
  IGenralizedInitialState,
  RESPONSE_INITIAL_STATE,
  MemoryUsageResponse,
} from "types";
import { getMemoryUsage } from "api/services";
import { toast } from "react-toastify";

const getMemoryUsageThunk = createAsyncThunk("get/memoryUsage", getMemoryUsage);

export const MemoryUsageSlice = createSlice({
  name: "memoryUsage",
  initialState: RESPONSE_INITIAL_STATE<MemoryUsageResponse[]>(),
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = "";
    },
    RESET: (state) => Object.assign(state, RESPONSE_INITIAL_STATE()),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemoryUsageThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        getMemoryUsageThunk.fulfilled,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "fetched";
          state.data = action.payload;
        }
      )
      .addCase(
        getMemoryUsageThunk.rejected,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "error";
          state.error = action?.error?.message ?? "something went wrong!";
          toast.error(state.error);
        }
      );
  },
});

interface IStates {
  [MemoryUsageSlice.name]: ReturnType<typeof MemoryUsageSlice.reducer>;
}

export const useMemoryUsage = (): IGenralizedInitialState<
  MemoryUsageResponse[]
> => useSelector((state: IStates) => state[MemoryUsageSlice.name] || {});

export const triggerMemoryUsageAPI =
  () =>
  async (
    dispatch: IDispatcherType,
    getState: () => IStates
  ): Promise<MemoryUsageResponse[]> => {
    await dispatch(getMemoryUsageThunk());
    return getState()[MemoryUsageSlice.name].data as MemoryUsageResponse[];
  };

export const resetMemoryUsage =
  () =>
  async (dispatch: IDispatcherType): Promise<void> => {
    await dispatch(MemoryUsageSlice.actions.RESET());
  };
