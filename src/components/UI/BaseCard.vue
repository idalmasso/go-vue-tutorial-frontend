<template>
  <div class="box-div">
    <header v-if="$slots.header">
      <slot name="header"> </slot>
    </header>
    <slot></slot>
    <footer v-if="$slots.footer && expandable">
      <a href="#" @click.prevent="toggleDetails" class="footer-elements">{{
        messageValue
      }}</a>
      <slot name="footer" v-if="expanded"></slot>
    </footer>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    expandable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    messageValue() {
      if (!this.expanded) return "Show";
      return "Hide";
    }
  },
  methods: {
    toggleDetails() {
      this.expanded = !this.expanded;
    }
  }
};
</script>
<style scoped>
.right-icon {
  float: right;
  margin: 2rem auto;
  border-radius: 12px;
}
.footer-elements {
  display: flex;
  float: left;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: brown;
}
div .box-div {
  margin: 2rem auto;
  max-width: 50rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
footer {
  padding: 1rem;
}
.actions {
  margin: 2rem auto;
}
</style>
