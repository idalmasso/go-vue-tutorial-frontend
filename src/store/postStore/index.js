export default {
  namespaced: true,
  state: {
    posts: [
      {
        id: 1,
        user: "idalmasso",
        date: "2021-01-19 15:30:30",
        post:
          "Today I'm feeling sooooo well. I will GO to see a nice Vue!!! (LOL)",
        comments: [
          {
            id: 3,
            user: "Nostradamus",
            date: "2021-01-20 20:30:34",
            post: "LOL"
          },
          {
            id: 4,
            user: "FinnishMan",
            date: "2021-01-20 20:30:34",
            post: "Please..."
          }
        ]
      },
      {
        id: 2,
        user: "cshannon",
        date: "2021-01-19 15:25:20",
        post: "I think that someone make some really   bad puns..."
      }
    ]
  },

  mutations: {
    ADD_POST(state, post) {
      state.posts.push(post);
    },
    DELETE_POST(state, id) {
      state.posts = state.posts.filter(post => post.id != id);
    }
  },
  actions: {
    async addPost(context, post) {
      context.commit("ADD_POST", post);
    },
    async deletePost(context, id) {
      context.commit("DELETE_POST", id);
    }
  },
  getters: {
    allPosts(state) {
      return state.posts;
    },
    userPosts: state => user => {
      return state.posts.filter(post => post.user === user);
    }
  }
};
