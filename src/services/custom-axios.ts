import { CustomAxiosError } from '@/interfaces/error/custom-axios-error';
import errorCodeMessages from '@/utils/error-code-translator';
import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// errorComposer will compose a handleGlobally function
const errorComposer = (error: AxiosError) => {
  return () => {
    const statusCode = error.response?.status;
    if (statusCode === 404) {
      console.error(error.response?.statusText);
      // TODO: Redirect to 404 not found page
    }

    if (statusCode === 401) {
      console.error(error.response?.statusText);
      // TODO: Redirect to 401 unauthorized page
    }
  };
};

instance.interceptors.response.use(undefined, (error) => {
  const customAxiosError: CustomAxiosError = {
    axiosError: error,
    handleGlobally: errorComposer(error),
  };
  // error.handleGlobally = errorComposer(error);
  return Promise.reject(customAxiosError);
});

export default instance;
