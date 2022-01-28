<template>
  <div
    class="modal fade"
    id="new-post-modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="new-post-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="new-post-modal-label">Add Post</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <input
              type="number"
              class="form-control mb-3"
              placeholder="User ID"
              v-model="userId"
            />
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Title"
              v-model="title"
            />
            <input
              type="text"
              class="form-control"
              placeholder="Body"
              v-model="body"
            />
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            data-bs-dismiss="modal"
            type="button"
            class="btn btn-primary"
            @click="submitHandler"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      userId: "",
      title: "",
      body: "",
    };
  },
  methods: {
    ...mapActions(["setPosts"]),
    ...mapGetters(["getPosts"]),
    async submitHandler() {
      const body = { userId: this.userId, title: this.title, body: this.body };
      const result = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        body
      );

      let newPostsArray = this.getPosts();
      newPostsArray.unshift(result.data);
      this.$store.dispatch("setPosts", newPostsArray);
    },
  },
};
</script>
