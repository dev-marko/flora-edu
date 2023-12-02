import moment from 'moment';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { JWT_TOKEN_KEY } from '@constants/local-storage-keys';
import { useReadLocalStorage } from 'usehooks-ts';

export function useIsAuthenticated() {
  const tokenObj = useReadLocalStorage<{ token: string }>(JWT_TOKEN_KEY);

  const check = () => {
    if (!tokenObj?.token) return false;

    const decoded = jwtDecode<JwtPayload>(tokenObj.token);

    const now = moment().unix();
    const diff = moment(decoded.exp).diff(now);

    return diff >= 0;
  };

  return check;
}
