export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  SETS: "/sets",
  COLLECTIONS: "/collections",
  COLLECTION_DETAIL: "/collections/:id",
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
  USER_SETS: {
    LIST: "/user-sets",
    SEARCH: "/user-sets/search",
  },
  COLLECTIONS: {
    LIST: "/user-collections",
  },
} as const;
