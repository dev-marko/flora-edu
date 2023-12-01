import { JWT_TOKEN_KEY } from '@/constants/local-storage-keys';
import { CustomAxiosError } from '@/interfaces/error/custom-axios-error';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';

const useCustomAxios = () => {
  const navigate = useNavigate();

  const tokenObj = useReadLocalStorage<{ token: string }>(JWT_TOKEN_KEY);

  const errorComposer = (error: AxiosError) => {
    return () => {
      const statusCode = error.response?.status;

      if (statusCode === 401) {
        console.error(error.response?.statusText);
        navigate('/login');
      }

      if (statusCode === 403) {
        console.error(error.response?.statusText);
        navigate('/403-forbidden');
      }

      if (statusCode === 404) {
        console.error(error.response?.statusText);
        navigate('*');
      }
    };
  };

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  instance.defaults.headers.common.Authorization = `Bearer ${tokenObj?.token}`;

  instance.interceptors.response.use(undefined, (error) => {
    const globalErroHandler = errorComposer(error);
    globalErroHandler();

    const customAxiosError: CustomAxiosError = {
      axiosError: error,
      handleGlobally: errorComposer(error),
    };

    return Promise.reject(customAxiosError);
  });

  return instance;
};

export default useCustomAxios;
