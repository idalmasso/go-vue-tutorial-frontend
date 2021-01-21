function getFormattedDate() {
  var d = new Date();

  d =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2);

  return d;
}
export default {
  namespaced: true,
  state: {
    posts: []
  },

  mutations: {
    ADD_POST(state, post) {
      if (state.posts.length < 1) {
        post.id = 1;
      } else {
        const max = state.posts.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );
        post.id = max.id + 1;
      }
      post.comments = [];
      state.posts.push(post);
    },
    DELETE_POST(state, id) {
      state.posts = state.posts.filter(post => post.id != id);
    },
    ADD_COMMENT(state, { postId, comment }) {
      const post = state.posts.find(post => post.id === postId);
      if (post.comments.length < 1) {
        comment.id = 1;
      } else {
        const max = post.comments.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );
        comment.id = max.id + 1;
      }
      post.comments.push(comment);
    }
  },
  actions: {
    async addPost(context, post) {
      post.date = getFormattedDate();
      context.commit("ADD_POST", post);
    },
    async deletePost(context, id) {
      context.commit("DELETE_POST", id);
    },
    async addComment(context, { postId, comment }) {
      comment.date = getFormattedDate();
      context.commit("ADD_COMMENT", { postId, comment });
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
