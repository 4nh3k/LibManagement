import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';
import { clearLS, getAccessTokenFromLS } from './auth';
import { toast } from 'react-toastify';
import { AuthResponse } from 'src/types/auth.type';
import { request } from 'http';
import { URL_BASE, URL_LOGIN, URL_LOGOUT, URL_REGISTER } from 'src/constants/endpoint';

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
      baseURL: URL_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
      //withCredentials: true
    });

    this.instance.interceptors.request.use(
      config => {
        console.log(this.accessToken, config.headers);
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
      console.log(url);
      if (url === URL_LOGIN || url === URL_REGISTER) {
        const data = response.data as AuthResponse;
        this.accessToken = data.token;
        console.log('this.accessToken', this.accessToken);
        // this.refreshToken = response.data.data.refresh_token;
      } else if (url === URL_LOGOUT) {
        this.accessToken = '';
        clearLS();
      }
      return response;
    });
  }
}

const http = new Http().instance;

export default http;
