<template>
  <div class="app-bar">
    <div class="left-links">
      <router-link
        class="app-bar-item"
        v-for="link in links"
        :key="link.name"
        :to="link.to"
      >
        {{ link.name }}
      </router-link>
    </div>
    <div class="right-links ">
      <a class="app-bar-item" href="#">LOGIN</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "Posts",
          to: { name: "Posts" }
        },
        {
          name: "About",
          to: { name: "About" }
        }
      ]
    };
  }
};
</script>

<style scoped>
.app-bar {
  height: 5vh;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: burlywood;
  overflow: hidden;
  display: block;
  justify-content: space-between;
}
.left-links {
  padding-left: 10%;
}
.left-links a {
  float: left;
}

a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.right-links {
  float: right;
}
</style>
