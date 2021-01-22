<template>
  <base-card :expandable="post.comments && post.comments.length > 0"
    ><template v-slot:header
      ><h3>
        <router-link :to="linkUser(post.username)">{{
          postTitle(post)
        }}</router-link>
      </h3>
      <button class="delete-button" @click.prevent="deletePost">
        Delete
      </button></template
    >
    {{ post.post }}
    <template v-slot:footer>
      <base-card
        v-for="comment in post.comments"
        :key="comment.id"
        :expandable="false"
        ><template v-slot:header
          ><h3>
            <router-link :to="linkUser(comment.username)">{{
              postTitle(comment)
            }}</router-link>
          </h3></template
        >
        {{ comment.post }}
      </base-card>
    </template>
    <template v-if="loggedIn" v-slot:actions
      ><add-text-form
        textRequest="Add comment"
        :showLabel="false"
        @text-added="text => addComment(text, post)"
      ></add-text-form>
    </template>
  </base-card>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "./UI/BaseCard.vue";
import AddTextForm from "./AddTextForm.vue";
export default {
  components: { BaseCard, AddTextForm },
  props: ["post"],
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedIn",
      currentUser: "auth/currentUser"
    })
  },
  methods: {
    postTitle(post) {
      return post.username + "@" + post.date;
    },
    linkUser(username) {
      return {
        name: "User",
        params: {
          userid: username
        }
      };
    },
    addComment(text, post) {
      this.$store.dispatch("posts/addComment", {
        postId: post.id,
        comment: {
          username: this.currentUser.username,
          post: text
        }
      });
    },
    deletePost() {
      this.$store.dispatch("posts/deletePost", { post: this.post });
    }
  }
};
</script>
<style scoped>
.delete-button {
  float: right;
  border-radius: 8px;
  background-color: darksalmon;
  padding: 8px;
}
</style>
