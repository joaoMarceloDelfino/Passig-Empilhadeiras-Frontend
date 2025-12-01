import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const path = originalRequest.url.replace(api.defaults.baseURL, "");

    if ((error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if(path.startsWith("/user/refresh") || path.startsWith("/user/login")){
          return Promise.reject(error);
        }
        await api.post("/user/refresh", null, { withCredentials: true });
        return api(originalRequest);
      } catch (err) {
        if (path.startsWith("/user/isUserLogged") || path.startsWith("/user/refresh") || path.startsWith("/user/getLoggedUser") ) {
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