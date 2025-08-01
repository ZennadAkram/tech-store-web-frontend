
import axios from "../../services/axios";
import type { LoginForm, SignupForm, AuthTokens, User } from "./authTypes";

export const signup = async (data: SignupForm): Promise<{ user: User; cart: any }> => {
  const res = await axios.post("/signup/", data);
  const cartresp = await axios.post("/cart/");
  return {
    user: res.data,
    cart: cartresp.data,
  };
};


export const login = async (data: LoginForm): Promise<AuthTokens> => {
  const res = await axios.post("/login/", data); // JWT returns access+refresh
  return res.data;
};

export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const res = await axios.post("/refresh/", { refresh });
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await axios.get("/me/");
  return res.data;
};
