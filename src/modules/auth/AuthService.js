class AuthService {
  constructor() {
    this.token = window.localStorage.getItem("_token");
    this.user = JSON.parse(window.localStorage.getItem("_user"));
  }

  check() {
    return !!this.token;
  }

  setUser(user) {
    window.localStorage.setItem("_user", JSON.stringify(user));
    this.user = user;
  }

  login(token, user) {
    window.localStorage.setItem("_token", token);
    window.localStorage.setItem("_user", JSON.stringify(user));
    this.token = token;
    this.user = user;
    Event.$emit("login");
  }

  logout() {
    window.localStorage.removeItem("_token");
    window.localStorage.removeItem("_user");
    Event.$emit("logout");
  }
}

export default new AuthService();
