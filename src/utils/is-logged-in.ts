import moment from 'moment';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { JWT_TOKEN_KEY } from '@/constants/local-storage-keys';

export function isLoggedIn() {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (!token) return false;

  const decoded = jwtDecode<JwtPayload>(token);

  const now = moment().unix();
  const diff = moment(decoded.exp).diff(now);

  return diff >= 0;
}
