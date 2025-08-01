// services/axios.ts
import axios from "axios";


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem("access", newAccessToken);

        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
