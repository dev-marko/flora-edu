import { AxiosResponse } from 'axios';
import { LoginRequest } from '@interfaces/auth/login-request';
import { LoginResponse } from '@interfaces/auth/login-response';
import { RegisterRequest } from '@interfaces/auth/register-request';
import useCustomAxios from '../useCustomAxios';

interface IAuthService {
  login: (creds: LoginRequest) => Promise<AxiosResponse<LoginResponse>>;
  register: (data: RegisterRequest) => Promise<AxiosResponse>;
}

const useAuthService = (): IAuthService => {
  const basePath = 'authentication';
  const axios = useCustomAxios();

  const login = async (creds: LoginRequest) => {
    const response: AxiosResponse<LoginResponse> = await axios.post<
      LoginRequest,
      AxiosResponse<LoginResponse>
    >(`${basePath}/login`, creds);
    return response;
  };

  const register = async (data: RegisterRequest) => {
    return await axios.post<RegisterRequest>(`${basePath}/register`, data);
  };

  return { login, register };
};

export default useAuthService;
