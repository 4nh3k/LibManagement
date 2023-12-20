import { User } from 'src/types/user.type';

export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
};
