<template>
  <div class="posts">
    <post-list :posts="posts" title="Posts" />
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
export default {
  name: "Posts",
  components: {
    PostList
  },
  computed: {
    posts() {
      return this.$store.getters["posts/allPosts"];
    }
  }
};
</script>
