<template>
  <div
    class="modal fade"
    id="edit-post-modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="edit-post-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit-post-modal-label">Edit Post</h5>
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
              :value="post.userId"
            />
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Title"
              :value="post.title"
            />
            <input
              type="text"
              class="form-control"
              placeholder="Body"
              :value="post.body"
            />
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" @click="submitHandler">
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
  computed: {
    post() {
      return this.getSelectedPost();
    },
  },
  methods: {
    ...mapActions(["setSelectedPost", "setPosts"]),
    ...mapGetters(["getSelectedPostId", "getSelectedPost", "getPosts"]),
    async submitHandler() {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${this.getSelectedPostId()}`,
        { userId: this.userId, title: this.title, body: this.body }
      );
      const editedPost = response.data;
      let newPostsArray = this.getPosts();

      newPostsArray.forEach((post) => {
        if (post.id === this.getSelectedPostId()) {
          post.userId = editedPost.userId;
          post.title = editedPost.title;
          post.body = editedPost.body;
        }
      });

      this.$store.dispatch("setPosts", newPostsArray);
    },
  },
};
</script>
