// features/auth/authUtils.ts
import { getCurrentUser } from "./authAPI";
import { useAuthStore } from "./authStore";

export const loadUser = async () => {
  const token = localStorage.getItem("access");
  if (!token) return;

  try {
    const user = await getCurrentUser();
    useAuthStore.getState().setUser(user);
  } catch (err) {
    console.error("Auto-login failed", err);
    useAuthStore.getState().setUser(null);
  }
};
