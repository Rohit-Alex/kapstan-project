import {
  ApplicationStatusResponse,
  CpuUsageResponse,
  EventHistoryResponse,
  MemoryUsageResponse,
} from "types";
import { GetAllResponse } from "./apiMethods";
import { API_URL } from "./constants";

export const getApplicationList = (): Promise<ApplicationStatusResponse[]> =>
  GetAllResponse<ApplicationStatusResponse[]>(API_URL.applications);

export const getEventHistory = (): Promise<EventHistoryResponse[]> =>
  GetAllResponse<EventHistoryResponse[]>(API_URL.eventHistory);

export const getMemoryUsage = (): Promise<MemoryUsageResponse[]> =>
  GetAllResponse<MemoryUsageResponse[]>(API_URL.memoryUsage);

export const getCpuUsage = (): Promise<CpuUsageResponse[]> =>
  GetAllResponse<CpuUsageResponse[]>(API_URL.cpuUsage);
