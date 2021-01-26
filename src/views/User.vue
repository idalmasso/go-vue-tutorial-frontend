<template>
  <div class="container">
    <h1>User: {{ user.username }}</h1>
    <h3>Bio</h3>
    <p>{{ user.description }}</p>
    <add-text-form
      v-if="this.userid == currentUsername"
      @text-added="updateDescription"
      textRequest="Change description"
      :showLabel="false"
    >
    </add-text-form>

    <post-list :posts="userPosts" title="Last Posts"></post-list>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import AddTextForm from "../components/AddTextForm.vue";
export default {
  components: { PostList, AddTextForm },
  props: {
    userid: { type: String, default: "" }
  },
  computed: {
    userPosts() {
      return this.$store.getters["posts/userPosts"](this.userid);
    },
    user() {
      return this.$store.getters["users/getUser"](this.userid);
    },
    currentUsername() {
      return this.$store.getters["auth/currentUser"].username;
    }
  },
  methods: {
    updateDescription(newDescription) {
      this.$store.dispatch("users/updateDescription", {
        username: this.userid,
        description: newDescription
      });
    }
  },
  mounted() {
    this.$store.dispatch("users/addUser", { username: this.userid });
  }
};
</script>
