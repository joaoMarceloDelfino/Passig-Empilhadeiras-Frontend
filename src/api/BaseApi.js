import api from "../apiInterceptor";

class BaseApi {
  findAllEmpilhadeiras() {
    return api.get("/forklifts/findAll");
  }

  login(body) {
    return api.post("/user/login", body);
  }

  register(body) {
    return api.post("/user/register", body);
  }

  saveScheduledVisit(formData) {
    return api.post("/scheduledVisit/save", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  findDisponibleScheduledTimestamps(date) {
    return api.get("/scheduledVisit/findDisponibleScheduledTimestamps", {
      params: { date },
    });
  }

  isUserLogged() {
    return api.get("/user/isUserLogged");
  }

  existsByEmail(email) {
    return api.get("/user/existsByEmail", { params: { email } });
  }

  logout() {
    return api.post("/user/logout", null);
  }

  saveForkliftRentVisit(body) {
    return api.post("/scheduledVisit/saveForkliftRentVisit", body);
  }

  refresh() {
    return api.post("/user/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
  }

  getLoggedUser() {
    return api.get("/user/getLoggedUser");
  }

  findScheduledVisitByType(type) {
    return api.get("/scheduledVisit/findScheduledVisitByType", {
      params: { type },
    });
  }

  saveForklift(formData) {
    return api.post("/forklifts/save", formData);
  }

  findAllScheduledVisit() {
    return api.get("/scheduledVisit/findAllScheduledVisit");
  }

  findAllUsers() {
    return api.get("/user/findAllUsers");
  }
}

export default new BaseApi();