<template>
  <div class="post-card" @click="postClickHandler(post.id)">
    <div class="card">
      <div class="card-body text-start">
        <div class="details">
          <p>User Id : {{ post.userId }}</p>
          <p>Post Id : {{ post.id }}</p>
        </div>
        <h6>{{ post.title }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    post: Object,
  },
  methods: {
    ...mapActions(["setSelectedPostId", "setSelectedPost"]),
    ...mapGetters(["getPosts"]),
    postClickHandler(id) {
      this.fetchPost(id);
      this.fetchComments(id);
    },
    async fetchPost(id) {
      if (id > 100) {
        this.getPosts().forEach((post) => {
          if (post.id === id) {
            this.$store.dispatch("setSelectedPost", post);
            this.$store.dispatch("setSelectedPostId", id);
          }
        });
        return;
      }

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      this.$store.dispatch("setSelectedPost", response.data);
      this.$store.dispatch("setSelectedPostId", id);
    },
    async fetchComments(id) {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`,
        { params: { postId: id } }
      );
      this.$store.dispatch("setComments", response.data);
    },
  },
};
</script>

<style scoped>
.post-card {
  cursor: pointer;
}

.card-body p {
  margin-bottom: 4px;
  font-weight: 500;
}

.card-body .details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

.card-body h6 {
  font-size: 20px;
  font-weight: 500;
}
</style>
