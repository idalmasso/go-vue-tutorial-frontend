<template>
  <div class="container">
    <h1>User: {{ user.username }}</h1>
    <h3>Bio</h3>
    <p>{{ user.description }}</p>
    <form v-if="this.userid == currentUsername" @submit.prevent>
      <input type="text" v-model="description" />
      <button @click="updateDescription()">Update description</button>
    </form>

    <post-list :posts="userPosts" title="Last Posts"></post-list>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
export default {
  data() {
    return {
      description: ""
    };
  },
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
    },
    currentUsername() {
      return this.$store.getters["auth/currentUser"].username;
    }
  },
  methods: {
    updateDescription() {
      this.$store.dispatch("users/updateDescription", {
        username: this.userid,
        description: this.description
      });
    }
  },
  mounted() {
    this.$store.dispatch("users/addUser", { username: this.userid });
  }
};
</script>
