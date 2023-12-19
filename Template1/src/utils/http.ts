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
      }
    });

    this.instance.interceptors.request.use(
      config => {
        console.log(this.accessToken);
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
  }
}

const http = new Http().instance;

export default http;
