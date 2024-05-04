export enum TABS_OPTION {
  OVERVIEW = 1,
  ENV = 2,
  ALERTS = 3,
  HISTORY = 4,
}

export interface IError {
  name: string;
  message: string;
  code: string;
  data?: unknown;
}

export interface IGenralizedInitialState<T> {
  error: string;
  status: "loading" | "fetched" | "error" | "uninitialized";
  data?: T;
}

export const RESPONSE_INITIAL_STATE = <T>(
  dataDefaultValue = []
): IGenralizedInitialState<T> => ({
  status: "uninitialized",
  error: "",
  data: dataDefaultValue as T,
});

export type IDispatcherType = any;

export interface IACTION<T = unknown> {
  type: string | symbol;
  payload: T;
}

export interface IAPI_ACTION<T = unknown> extends IACTION<T> {
  meta: unknown;
  error: {
    name: string;
    message: string;
    stack: string;
  };
}

export interface IGetParams {
  [field: string]: string | number;
}

// API Response

export type ApplicationStatusResponse = {
  id: number;
  name: string;
  status: "deployed" | "uninstalled";
  version: string | null;
  updatedAt: string;
  desiredVersion: string;
};

export type EventHistoryResponse = {
  id: number;
  event: "Deploy" | "Uninstall";
  status: "successful" | "in_progress" | "failed";
  version: string;
  timestamp: string;
  applicationId: "1" | "2" | "3";
};

type CommonUsageResponse = {
  id: number;
  timestamp: string;
  applicationId: "1" | "2" | "3";
};

export type MemoryUsageResponse = CommonUsageResponse & {
  memoryUtilization: string;
};

export type CpuUsageResponse = CommonUsageResponse & {
  cpuUtilization: string;
};
