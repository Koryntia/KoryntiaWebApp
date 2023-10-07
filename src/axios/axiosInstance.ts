import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'baseurlhere/',
  headers: {
    Authorization: '',
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.log('error.response', error);
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      // localStorage.removeItem('token');
      // localStorage.removeItem('userDetail');
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 500) {
      console.log('error.response', error.response);
      return Promise.reject(error.response);
    }
    if (error?.response?.status === 404) {
      console.log('error.response', error.response);
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  async (config: AdaptAxiosRequestConfig) => {
    // const sessionToken = await JSON.parse(localStorage.getItem('token'));
    let sessionToken= ''
    if (sessionToken) {
      config.headers.Authorization = 'Bearer ' + sessionToken;
      return config;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
