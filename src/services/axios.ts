import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import nookies from "nookies";

export class AxiosProvider {
  private static instance: AxiosInstance | null = null;
  private static abortController: AbortController | null = null;

  static getInstance(): AxiosInstance {
    // Create a new instance if it doesn't exist already
    if (!AxiosProvider.instance) {
      AxiosProvider.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          common: {
            "Content-Type": "application/json",
          },
        },
      });

      AxiosProvider.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const cookies = nookies.get();
          const { aliasToken, token } = cookies;

          if (aliasToken) {
            config.headers.Authorization = `Bearer ${aliasToken}`;
          } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          if (AxiosProvider.abortController)
            config.signal = AxiosProvider.abortController?.signal;

          return config;
        }
      );
    }

    return AxiosProvider.instance;
  }

  static abortRequest() {
    if (AxiosProvider.abortController) {
      AxiosProvider.abortController.abort();
    }
  }
}

export const Axios = AxiosProvider.getInstance();

export const abortRequest = AxiosProvider.abortRequest;

//

export interface IUploadFileResponse {
  success?: boolean;
  uploadedFilePath?: string;
  message?: string;
}

const fileUploaderConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const uploadFile = async (file: File | Blob, fileName = "file") => {
  try {
    const formData = new FormData();
    formData.append(fileName, file);

    const response = await Axios.post<IUploadFileResponse>(
      "/upload/file",
      formData,
      fileUploaderConfig
    );

    return response.data;
  } catch (ex) {
    return { success: false } as IUploadFileResponse;
  }
};

//

interface IDeleteFileResponse {
  success: boolean;
  message?: string;
}

export const deleteFile = async (filePath: string) => {
  try {
    const response = await Axios.post<IDeleteFileResponse>("/delete/file", {
      filePath,
    });
    return response.data;
  } catch (ex) {
    return { success: false } as IDeleteFileResponse;
  }
};
