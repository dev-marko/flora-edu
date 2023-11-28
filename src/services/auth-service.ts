import { LoginRequest } from '@/interfaces/auth/login-request';
import axios from './custom-axios';
import { LoginResponse } from '@/interfaces/auth/login-response';
import { AxiosResponse } from 'axios';
import { RegisterRequest } from '@/interfaces/auth/register-request';

const basePath = 'authentication';

const authService = {
  login: async (creds: LoginRequest) => {
    const response: AxiosResponse<LoginResponse> = await axios.post<
      LoginRequest,
      AxiosResponse<LoginResponse>
    >(`${basePath}/login`, creds);
    return response;
  },
  register: async (data: RegisterRequest) => {
    await axios.post<RegisterRequest>(`${basePath}/register`, data);
  },
};

export default authService;
