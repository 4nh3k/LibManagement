export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
};
