<template>
  <div class="single-post">
    <h3>{{ postTitle(post) }}</h3>
    <p>{{ post.post }}</p>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    postTitle(post) {
      return post.user + "@" + post.date;
    }
  }
};
</script>

<style></style>
