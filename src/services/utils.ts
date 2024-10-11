import { Axios } from "./axios";
import MessageHandler from '@/utils/message-handler';

const messageHandler = MessageHandler.get();

type Result<T> = { data?: T; error?: string };

/**
 *
 * @param endpoint
 * @returns
 */
export const get = async <ResponseType = unknown>(
  endpoint: string
): Promise<Result<ResponseType> | null> => {
  try {
    const response = await Axios.get<ResponseType>(endpoint);

    if (response.status === 200) return { data: response.data as ResponseType };
    else {
      messageHandler.handleError('Something went wrong');
      return null;
    }
  } catch (ex) {
    messageHandler.handleError('Something went wrong');
    return null;
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
): Promise<Result<ResponseType> | null> => {
  try {
    const response = await Axios.post<ResponseType>(endpoint, data);

    if (response.status) return { data: response.data };
    else {
      messageHandler.handleError("Something went wrong");
      return null;
    }
  } catch (error) {
    messageHandler.handleError("Something went wrong");
    return null;
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
): Promise<Result<ResponseType> | null> => {
  try {
    const response = await Axios.put<ResponseType>(endpoint, data);

    if (response.status) return { data: response.data };
    else {
      messageHandler.handleError("Something went wrong");
      return null;
    }
  } catch (error) {
    messageHandler.handleError("Something went wrong");
    return null;
  }
};

/**
 *
 * @param endpoint
 * @returns
 */
export const _delete = async <ResponseType = unknown>(
  endpoint: string
): Promise<Result<ResponseType> | null> => {
  try {
    const response = await Axios.delete<ResponseType>(endpoint);

    if (response.status) return { data: response.data };
    else {
      messageHandler.handleError("Something went wrong");
      return null;
    }
  } catch (error) {
    messageHandler.handleError("Something went wrong");
    return null;
  }
};
