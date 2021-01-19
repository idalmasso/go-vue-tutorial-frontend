<template>
  <div class="post-list">
    <single-post v-for="post in posts" :key="post.id" :post="post">
    </single-post>
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue";
export default {
  components: {
    SinglePost
  },
  props: ["posts"]
};
</script>

<style></style>
