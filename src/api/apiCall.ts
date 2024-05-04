import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { IError, IGetParams } from "types";

const Request = axios.create({
  baseURL: "https://retoolapi.dev/",
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

const serializeError = (error: AxiosError): IError => {
  const { response } = error;
  if (!response) throw error;
  const { status, statusText, data } = response;
  const message = data ? data.message : statusText || `API FAILED (${status})`;
  let errorMsg = "";
  try {
    errorMsg = data?.error?.debug_msg || message;
  } catch (e) {
    errorMsg = message;
  }
  const errorObj: IError = {
    name: "API ERROR",
    message: errorMsg,
    code: status ? status.toString() : "Unknown",
  };
  return errorObj;
};

const onErrorInterceptor = (error: AxiosError): Promise<IError> => {
  return Promise.reject(serializeError(error));
};

Request.interceptors.response.use(undefined, onErrorInterceptor);

interface ApiCallOptions {
  path: string;
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  params?: Partial<IGetParams>;
  timeout?: number;
  isTimeoutEnabled?: boolean;
  isCancelable?: boolean;
  setSource?: Dispatch<SetStateAction<any>>;
}

export const apiCall = async <T>({
  path,
  body = {},
  method = "GET",
  headers = {},
  params = {},
  timeout = 60000,
  isTimeoutEnabled = true,
  isCancelable = false,
  setSource,
}: ApiCallOptions): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();
  const source = axios.CancelToken.source();
  Request.defaults.timeout = timeout;

  try {
    if (isTimeoutEnabled) {
      setTimeout(() => {
        controller.abort();
      }, timeout);
    }
    if (isCancelable) {
      setSource && setSource(source);
    }

    const options: AxiosRequestConfig = {
      method: method,
      url: path,
      data: body,
      params,
      headers,
      signal: controller.signal,
    };

    const response = await Request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
