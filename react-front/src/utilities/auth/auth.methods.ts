import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post(`/auth/signup`, data);
  return response.data;
};

const login = async (data: { email: string; password: string }) => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};

const logout = async () => {
  const response = await api.post(`/auth/logout`);
  return response.data;
};

const refresh = async (token: string) => {
  const response = await api.post(`/auth/refresh`, { token });
  return response.data;
};

export const authAPI = {
  signup,
  login,
  refresh,
  logout,
};
