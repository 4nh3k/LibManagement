import http from 'src/utils/http';

export const URL_REGISTER = 'register';
export const URL_LOGIN = 'login';
export const URL_LOGOUT = 'logout';

const authApi = {
  register(body: { email: string; password: string }) {
    return http.post(URL_REGISTER, body);
  },
  login(body: { email: string; password: string }) {
    return http.post(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  }
};

export default authApi;
