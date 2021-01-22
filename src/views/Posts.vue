<template>
  <div class="posts">
    <h1>All Posts</h1>
    <add-text-form
      textRequest="Add Post"
      v-if="loggedIn"
      :showLabel="true"
      @text-added="addPost"
    ></add-text-form>
    <post-list :posts="posts" title="" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PostList from "../components/PostList.vue";
import AddTextForm from "../components/AddTextForm.vue";
export default {
  name: "Posts",
  components: {
    PostList,
    AddTextForm
  },
  computed: {
    ...mapGetters({ loggedIn: "auth/isLoggedIn" }),
    posts() {
      return this.$store.getters["posts/allPosts"];
    }
  },
  methods: {
    addPost(text) {
      this.$store.dispatch("posts/addPost", {
        username: this.$store.getters["auth/currentUser"].username,
        post: text
      });
    }
  },
  mounted() {
    this.$store.dispatch("posts/getAllPosts");
  }
};
</script>
