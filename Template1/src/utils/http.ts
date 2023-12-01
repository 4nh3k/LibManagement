import axios, { type AxiosInstance } from 'axios';

class Http {
  private static _instance: Http;
  // private accessToken: string;
  public instance: AxiosInstance;

  private constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public static get instance(): AxiosInstance {
    if (!this._instance) {
      this._instance = new Http();
    }
    return this._instance.instance;
  }
}
const http = Http.instance;

export default http;
