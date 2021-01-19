<template>
  <div class="container">
    <h1>{{ user.username }}</h1>
    <p>{{ user.description }}</p>

    <post-list :posts="posts" title="Last Posts"></post-list>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";

export default {
  components: { PostList },
  data() {
    return {
      user: {
        username: "idalmasso",
        description:
          "This is only a little description of everything you wanted to know..."
      },
      posts: [
        {
          id: 1,
          user: "idalmasso",
          date: "2021-01-19 15:30:30",
          post:
            "Today I'm feeling sooooo well. I will GO to see a nice Vue!!! (LOL)",
          comments: [
            {
              id: 3,
              user: "Nostradamus",
              date: "2021-01-20 20:30:34",
              post: "LOL"
            },
            {
              id: 4,
              user: "FinnishMan",
              date: "2021-01-20 20:30:34",
              post: "Please..."
            }
          ]
        }
      ]
    };
  }
};
</script>
