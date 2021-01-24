<template>
  <div class="container">
    <h1>User: {{ user.username }}</h1>
    <h3>Bio</h3>
    <p>{{ user.description }}</p>

    <post-list :posts="userPosts" title="Last Posts"></post-list>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
export default {
  components: { PostList },
  props: {
    userid: { type: String, default: "" }
  },
  computed: {
    userPosts() {
      return this.$store.getters["posts/userPosts"](this.userid);
    },
    user() {
      return this.$store.getters["users/getUser"](this.userid);
    }
  },
  mounted() {
    this.$store.dispatch("users/addUser", { username: this.userid });
  }
};
</script>
