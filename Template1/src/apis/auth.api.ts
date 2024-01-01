import { URL_REGISTER, URL_LOGIN, URL_LOGOUT } from 'src/constants/endpoint';
import { AuthResponse } from 'src/types/auth.type';
import http from 'src/utils/http';

const authApi = {
  register(body: { email: string; password: string; confirmPassword: string; username: string }) {
    return http.post(URL_REGISTER, { ...body, passwordConfirm: body.confirmPassword });
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
