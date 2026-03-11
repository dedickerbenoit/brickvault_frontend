export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  SETS: "/sets",
  COLLECTIONS: "/collections",
  WISHLIST: "/wishlist",
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    USER: "/auth/user",
    RESET_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;
