<template>
  <form>
    <label v-if="showLabel" :for="'text' + this._uid">{{ textRequest }}</label>
    <input
      :id="'text' + this._uid"
      type="text"
      :placeholder="textRequest"
      v-model="textValue"
    />
    <button @click.prevent="submitted">submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      textValue: ""
    };
  },
  props: {
    textRequest: { type: String, default: "" },
    showLabel: { type: Boolean, default: false }
  },
  methods: {
    submitted() {
      this.$emit("text-added", this.textValue);
      this.textValue = "";
    }
  },
  emits: ["text-added"]
};
</script>

<style scoped>
label {
  padding-right: 1rem;
  display: block;
}
button {
  margin-top: 1rem;
  width: 10%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: darksalmon;
  padding: 8px;
}
input {
  box-sizing: border-box;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 80%;
  padding: 8px 20px;
}
input:focus {
  outline: 0;
  background-color: wheat;
}
</style>
