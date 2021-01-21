<template>
  <base-card :expandable="post.comments && post.comments.length > 0"
    ><template v-slot:header
      ><h3>
        <router-link :to="linkUser(post.user)">{{
          postTitle(post)
        }}</router-link>
      </h3></template
    >
    {{ post.post }}
    <template v-slot:footer>
      <base-card
        v-for="comment in post.comments"
        :key="comment.id"
        :expandable="false"
        ><template v-slot:header
          ><h3>
            <router-link :to="linkUser(comment.user)">{{
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
      return post.user + "@" + post.date;
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
          user: this.currentUser.username,
          post: text
        }
      });
    }
  }
};
</script>
