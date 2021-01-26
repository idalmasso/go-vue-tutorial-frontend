export default {
  namespaced: true,
  state: {
    loadedUsers: []
  },
  mutations: {
    ADD_USER(state, user) {
      if (state.loadedUsers.some(u => u.username == user.username)) {
        state.loadedUsers.splice(
          state.loadedUsers.indexOf(u => u.username == user.username),
          1
        );
      }
      state.loadedUsers.push(user);
    }
  },
  actions: {
    async addUser(context, { username }) {
      return fetch(
        process.env.VUE_APP_SERVER_ADDRESS + "/api/users/" + username,
        {
          headers: {
            Authorization: context.rootGetters["auth/getTokenHeader"]
          }
        }
      )
        .then(response => {
          if (!response.ok) {
            if (response.status == 401) {
              context.dispatch("auth/logout", {}, { root: true });
            }
            throw new Error("Cannot get user");
          }
          return response.json();
        })
        .then(data => {
          context.commit("ADD_USER", data);
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    },
    async updateDescription(context, { username, description }) {
      return fetch(
        process.env.VUE_APP_SERVER_ADDRESS + "/api/users/" + username,
        {
          method: "PATCH",
          headers: {
            Authorization: context.rootGetters["auth/getTokenHeader"],
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: username, description: description })
        }
      )
        .then(response => {
          if (!response.ok) {
            if (response.status == 401) {
              context.dispatch("auth/logout", {}, { root: true });
            }
            throw new Error("Cannot update");
          }
          return response.json();
        })
        .then(data => {
          context.commit("ADD_USER", data);
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    }
  },

  getters: {
    getUser: state => userid => {
      if (state.loadedUsers.some(user => user.username == userid)) {
        return state.loadedUsers.find(user => user.username == userid);
      } else {
        //Here I'll have to request from the server!!
        return {};
      }
    }
  }
};
