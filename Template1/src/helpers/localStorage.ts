
export type LoginResponse = {
  token: string;
  data : User;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const USER_LOCAL_STORAGE_KEY = 'USER';

export function saveUser(user: LoginResponse): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): LoginResponse | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}