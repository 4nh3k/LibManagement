import { AuthResponse } from 'src/types/auth.type';
import http from 'src/utils/http';

export const URL_REGISTER = 'register';
export const URL_LOGIN = '/api/v1/users/login';
export const URL_LOGOUT = '/api/v1/users/logout';

const authApi = {
  register(body: { email: string; password: string }) {
    return http.post(URL_REGISTER, body);
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post<{
      status: string;
    }>(URL_LOGOUT);
  }
};

export default authApi;
