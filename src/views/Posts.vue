<template>
  <div class="posts">
    <h1>Posts</h1>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
export default {
  name: "Posts",
  components: {
    PostList
  },
  data: function() {
    return {
      posts: [
        {
          id: 1,
          user: "idalmasso",
          date: "2021-01-19 15:30:30",
          post:
            "Today I'm feeling sooooo well. I will GO to see a nice Vue!!! (LOL)"
        },
        {
          id: 2,
          user: "cshannon",
          date: "2021-01-19 15:25:20",
          post: "I think that someone make some really   bad puns..."
        }
      ]
    };
  }
};
</script>
