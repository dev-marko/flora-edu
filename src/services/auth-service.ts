import { LoginRequest } from '@/interfaces/auth/login-request';
import axios from './custom-axios';
import { LoginResponse } from '@/interfaces/auth/login-response';

const basePath = 'authentication';

const authService = {
  login: async (creds: LoginRequest) => {
    const response: LoginResponse = await axios.post(
      `${basePath}/login`,
      creds
    );
    return response;
  },
};

export default authService;
