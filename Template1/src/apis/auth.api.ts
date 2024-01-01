import { URL_REGISTER, URL_LOGIN, URL_LOGOUT, URL_FORGOT_PASSWORD } from 'src/constants/endpoint';
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
  },
  forgotPassword(body: { email: string }) {
    return http.post(URL_FORGOT_PASSWORD, body);
  },
  resetPassword(body: { password: string; confirmPassword: string; token: string }) {
    return http.patch(`/api/v1/users/reset-password/${body.token}`, {
      password: body.password,
      passwordConfirm: body.confirmPassword
    });
  }
};

export default authApi;
