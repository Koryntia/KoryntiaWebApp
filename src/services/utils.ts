import { Axios } from "./axios";

type Result<T> = { data?: T; error?: string };

/**
 *
 * @param endpoint
 * @returns
 */
export const get = async <ResponseType = unknown>(
  endpoint: string
): Promise<Result<ResponseType>> => {
  try {
    const response = await Axios.get<ResponseType>(endpoint);

    if (response.status) return { data: response.data as ResponseType };
    else return { error: "Something went wrong" };
  } catch (ex) {
    return { error: "Something went wrong" };
  }
};

/**
 *
 * @param endpoint
 * @param data
 * @returns
 */
export const post = async <ResponseType = unknown, RequestType = unknown>(
  endpoint: string,
  data: RequestType
): Promise<Result<ResponseType>> => {
  try {
    const response = await Axios.post<ResponseType>(endpoint, data);

    if (response.status) return { data: response.data };
    else return { error: "Something went wrong" };
  } catch (ex) {
    return { error: "Something went wrong" };
  }
};

/**
 *
 * @param endpoint
 * @param data
 * @returns
 */
export const put = async <ResponseType = unknown, RequestType = unknown>(
  endpoint: string,
  data: RequestType
): Promise<Result<ResponseType>> => {
  try {
    const response = await Axios.put<ResponseType>(endpoint, data);

    if (response.status) return { data: response.data };
    else return { error: "Something went wrong" };
  } catch (ex) {
    return { error: "Something went wrong" };
  }
};

/**
 *
 * @param endpoint
 * @returns
 */
export const _delete = async <ResponseType = unknown>(
  endpoint: string
): Promise<Result<ResponseType>> => {
  try {
    const response = await Axios.delete<ResponseType>(endpoint);

    if (response.status) return { data: response.data };
    else return { error: "Something went wrong" };
  } catch (ex) {
    return { error: "Something went wrong" };
  }
};
