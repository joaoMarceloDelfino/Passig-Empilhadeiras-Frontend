import api from "../apiInterceptor";

class BaseApi {
  findAllEmpilhadeiras() {
    return api.get("/forklifts/findAll");
  }

  login(body) {
    return api.post("/user/login", body, { withCredentials: true });
  }

  register(body) {
    return api.post("/user/register", body);
  }

  saveScheduledVisit(formData) {
    return api.post("/scheduledVisit/save", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  }

  findDisponibleScheduledTimestamps(date) {
    return api.get("/scheduledVisit/findDisponibleScheduledTimestamps", {
      params: { date },
      withCredentials: true,
    });
  }

  isUserLogged() {
    return api.get("/user/isUserLogged", { withCredentials: true });
  }

  existsByEmail(email) {
    return api.get("/user/existsByEmail", { params: { email } });
  }

  logout() {
    return api.post("/user/logout", null, { withCredentials: true });
  }

  saveForkliftRentVisit(body) {
    return api.post("/scheduledVisit/saveForkliftRentVisit", body, {
      withCredentials: true,
    });
  }

  refresh() {
    return api.post("/user/refresh", null, { withCredentials: true });
  }
}

export default new BaseApi();