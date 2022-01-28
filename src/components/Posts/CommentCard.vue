<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-10">
          <p>{{ comment.email }}</p>
        </div>
        <div class="col-2">
          <button class="btn btn-danger btn-sm" @click="deleteHandler">
            Delete
          </button>
        </div>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    comment: Object,
  },
  methods: {
    ...mapActions(["setComments"]),
    ...mapGetters(["getComments", "getSelectedPostId"]),
    async deleteHandler() {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${this.comment.id}`,
        { params: { postId: this.getSelectedPostId() } }
      );
      if (response.status === 200) {
        let newCommentsArray = this.getComments().filter(
          (item) => item.id !== this.comment.id
        );
        this.$store.dispatch("setComments", newCommentsArray);
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
