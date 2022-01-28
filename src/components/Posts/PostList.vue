<template>
  <div class="post-list">
    <PostCard v-for="post in getPosts()" :key="post.id" :post="post" />
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

import PostCard from "./PostCard.vue";

export default {
  components: {
    PostCard,
  },
  methods: {
    ...mapActions(["setPosts"]),
    ...mapGetters(["getPosts"]),
  },
  async created() {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/"
    );
    this.$store.dispatch("setPosts", result.data);
  },
};
</script>

<style scoped>
.post-list {
  max-height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
