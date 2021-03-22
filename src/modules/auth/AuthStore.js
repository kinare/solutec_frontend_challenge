import call from "../../http";
import { AuthConstants } from "./index";
import AuthService from "./AuthService";

export default {
  namespaced: true,
  state: {
    error: "",
    user: {}
  },
  mutations: {
    SET_ERROR: (state, payload) => {
      state.error = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    register: (context, data) => {
      context.commit("SET_ERROR", "");
      Event.$emit("loading", true);
      call("post", AuthConstants.register, data)
        .then(() => {
          Event.$emit("loading", false);
          Event.$emit("auth-success");
        })
        .catch(err => {
          context.commit("SET_ERROR", err.response.data.message);
          Event.$emit("loading", false);
        });
    },

    login: ({ commit }, data) => {
      Event.$emit("loading", true);
      commit("SET_ERROR", "");
      call("post", AuthConstants.login, data)
        .then(res => {
          AuthService.login(res.data.token, res.data.user);
          Event.$emit("loading", false);
        })
        .catch(err => {
          commit("SET_ERROR", err.response.data.message);
          Event.$emit("loading", false);
        });
    },

    getUser: context => {
      call("get", AuthConstants.user).then(res => {
        context.commit("SET_USER", res.data);
        AuthService.setUser(res.data.data);
        Event.$emit("loading", false);
      });
    }
  },
  getters: {
    error: state => state.error,
    user: state => state.user
  }
};
