import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IDispatcherType,
  IGenralizedInitialState,
  RESPONSE_INITIAL_STATE,
  CpuUsageResponse,
} from "types";
import { getCpuUsage } from "api/services";
import { toast } from "react-toastify";

const getCpuUsageThunk = createAsyncThunk("get/cpuUsage", getCpuUsage);

export const CpuUsageSlice = createSlice({
  name: "cpuUsage",
  initialState: RESPONSE_INITIAL_STATE<CpuUsageResponse[]>(),
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = "";
    },
    RESET: (state) => Object.assign(state, RESPONSE_INITIAL_STATE()),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCpuUsageThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        getCpuUsageThunk.fulfilled,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "fetched";
          state.data = action.payload;
        }
      )
      .addCase(
        getCpuUsageThunk.rejected,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "error";
          state.error = action?.error?.message ?? "something went wrong!";
          toast.error(state.error);
        }
      );
  },
});

interface IStates {
  [CpuUsageSlice.name]: ReturnType<typeof CpuUsageSlice.reducer>;
}

export const useCpuUsage = (): IGenralizedInitialState<CpuUsageResponse[]> =>
  useSelector((state: IStates) => state[CpuUsageSlice.name] || {});

export const triggerCpuUsageAPI =
  () =>
  async (
    dispatch: IDispatcherType,
    getState: () => IStates
  ): Promise<CpuUsageResponse[]> => {
    await dispatch(getCpuUsageThunk());
    return getState()[CpuUsageSlice.name].data as CpuUsageResponse[];
  };

export const resetCpuUsage =
  () =>
  async (dispatch: IDispatcherType): Promise<void> => {
    await dispatch(CpuUsageSlice.actions.RESET());
  };
