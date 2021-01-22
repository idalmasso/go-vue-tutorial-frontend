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
    SET_ALL_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.push(post);
    },
    DELETE_POST(state, id) {
      state.posts = state.posts.filter(post => post.id != id);
    },
    SET_POST_COMMENTS(state, { postId, post }) {
      const oldPost = state.posts.find(post => post.id == postId);
      oldPost.comments = post.comments;
    }
  },
  actions: {
    async addPost(context, post) {
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.body);
          }
          return response.json();
        })
        .then(data => {
          context.commit("ADD_POST", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async deletePost(context, { post }) {
      fetch("http://localhost:3000/api/posts/" + post.id, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            console.log(response);
            context.commit("DELETE_POST", post.id);
            return;
          }
          throw Error(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async addComment(context, { postId, comment }) {
      fetch("http://localhost:3000/api/posts/" + postId + "/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else throw Error(response.body);
        })
        .then(data => {
          context.commit("SET_POST_COMMENTS", { postId: postId, post: data });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getAllPosts(context) {
      fetch("http://localhost:3000/api/posts")
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.body);
          }
        })
        .then(data => {
          console.log(data);
          context.commit("SET_ALL_POSTS", data);
        })
        .catch(error => {
          console.log(error);
        });
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
