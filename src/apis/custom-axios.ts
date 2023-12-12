import axios, { AxiosError } from 'axios';
import { JWT_TOKEN_KEY } from '@/data/constants/local-storage-keys';
import { CustomAxiosError } from '@/data/interfaces/error/custom-axios-error';

const tokenObjJson = localStorage.getItem(JWT_TOKEN_KEY);

let tokenObj;

if (tokenObjJson !== null) {
  tokenObj = JSON.parse(tokenObjJson);
}

const errorComposer = (error: AxiosError) => {
  return () => {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      console.error(error.response?.statusText);
      location.href = '/login';
    }

    if (statusCode === 403) {
      console.error(error.response?.statusText);
      location.href = '/403-forbidden';
    }

    if (statusCode === 404) {
      console.error(error.response?.statusText);
      location.href = '/404-not-found';
    }
  };
};

axios.interceptors.request.use(
  async (config) => {
    const tokenObjJson = localStorage.getItem(JWT_TOKEN_KEY);

    let tokenObj;

    if (tokenObjJson !== null) {
      tokenObj = JSON.parse(tokenObjJson);
    }

    if (tokenObj?.token) {
      config.headers.Authorization = `Bearer ${tokenObj?.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

instance.defaults.headers.common.Authorization = `Bearer ${tokenObj?.token}`;

instance.interceptors.request.use(
  async (config) => {
    const tokenObjJson = localStorage.getItem(JWT_TOKEN_KEY);

    let tokenObj;

    if (tokenObjJson !== null) {
      tokenObj = JSON.parse(tokenObjJson);
    }

    if (tokenObj?.token) {
      config.headers.Authorization = `Bearer ${tokenObj?.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(undefined, (error) => {
  const globalErrorHandler = errorComposer(error);
  globalErrorHandler();

  const customAxiosError: CustomAxiosError = {
    axiosError: error,
    handleGlobally: errorComposer(error),
  };

  return Promise.reject(customAxiosError);
});

export default instance;
