import axios from "axios";

const api = axios.create({
  baseURL: "https://passig-empilhadeiras-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const path = originalRequest.url.replace(api.defaults.baseURL, "");

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (path.startsWith("/user/refresh") || path.startsWith("/user/login")) {
          return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem("refreshToken");
        const res = await api.post("/user/refresh", { refreshToken });

        localStorage.setItem("accessToken", res.data);

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        if (
          path.startsWith("/user/isUserLogged") ||
          path.startsWith("/user/refresh") ||
          path.startsWith("/user/getLoggedUser")
        ) {
          return Promise.reject(error);
        }
        window.location.assign("/");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;