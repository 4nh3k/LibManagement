import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';
import { clearLS, getAccessTokenFromLS } from './auth';
import { toast } from 'react-toastify';
import { AuthResponse } from 'src/types/auth.type';

class Http {
  private accessToken: string;
  // private refreshToken: string;
  // private refreshTokenRequest: Promise<string> | null;
  public instance: AxiosInstance;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    // this.refreshToken = getRefreshTokenFromLS();
    // this.refreshTokenRequest = null;

    this.instance = axios.create({
      baseURL: 'http://localhost:8000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    this.instance.interceptors.request.use(
      config => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          toast.error('Some things wrong!');
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(response => {
      const { url } = response.config;
      if (url === 'login') {
        const data = response.data as AuthResponse;
        this.accessToken = data.token;
        // this.refreshToken = response.data.data.refresh_token;
      } else if (url === 'logout') {
        this.accessToken = '';
        clearLS();
      }
      return response;
    });
  }
}

const http = new Http().instance;

export default http;
