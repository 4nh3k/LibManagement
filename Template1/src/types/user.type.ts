type Role = 'user' | 'admin';

export interface User {
  _id: string;
  role: Role;
  username?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  readerType: string;
}

export interface UserInfo {
  _id: string;
  role: Role;
  username?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  readerType: string;
}