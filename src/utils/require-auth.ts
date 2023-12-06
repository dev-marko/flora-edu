import moment from 'moment';
import { redirect } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { JWT_TOKEN_KEY } from '@constants/local-storage-keys';

export async function requireAuth(request: any) {
  const pathname = new URL(request.url).pathname;
  const tokenObjStringified = localStorage.getItem(JWT_TOKEN_KEY);
  let tokenObj;

  if (tokenObjStringified) {
    tokenObj = JSON.parse(tokenObjStringified);
  } else {
    throw redirect(`/login?redirectTo=${pathname}`);
  }

  if (!tokenObj?.token) {
    throw redirect(`/login?redirectTo=${pathname}`);
  }

  const decoded = jwtDecode<JwtPayload>(tokenObj.token);

  const now = moment().unix();
  const diff = moment(decoded.exp).diff(now);

  if (diff <= 0) {
    throw redirect(`/login?redirectTo=${pathname}`);
  }
}
