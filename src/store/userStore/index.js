export default {
  namespaced: true,
  state: {
    user: {
      id: 1,
      username: "idalmasso",
      description: "Here is the description",
      //here there will be the logic for auth and so on...
      loggedIn: false
    }
  },
  mutations: {
    LOGIN(state) {
      state.user.loggedIn = true;
    },
    LOGOUT(state) {
      state.user.loggedIn = false;
    }
  },
  actions: {
    async login(context) {
      context.commit("LOGIN");
    },
    async logout(context) {
      context.commit("LOGOUT");
    }
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  }
};
