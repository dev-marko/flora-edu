import { UserInfo } from './user-info';

export interface LoginResponse {
  accessToken: string;
  userInfo: UserInfo;
}
