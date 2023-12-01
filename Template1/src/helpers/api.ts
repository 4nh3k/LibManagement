import axios from 'axios';

const baseURL = 'http://localhost:3001/';

const api = axios.create({
  baseURL
});

export const getMe = async () => {
  try {
    const response = await api.get('api/v1/users/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('api/v1/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  passwordConfirm: string
) => {
  try {
    const response = await api.post('api/v1/users/signup', {
      email,
      password,
      firstName,
      lastName,
      passwordConfirm
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const response = await api.post('api/v1/users/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
