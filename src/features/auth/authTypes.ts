export interface LoginForm {
  username: string;
  password: string;
}

export interface SignupForm {
  username: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  image:string|null;
}
