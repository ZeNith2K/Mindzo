<template>
  <div class="comment-list">
    <div v-if="getSelectedPost()" class="post-details row align-items-start">
      <EditPostModal />
      <div class="col-9">
        <h4>{{ getSelectedPost().title }}</h4>
      </div>
      <div class="col-1">
        <button
          class="btn btn-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#edit-post-modal"
        >
          Edit
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-danger btn-sm" @click="deletePostHandler">
          Delete
        </button>
      </div>
      <div class="col-12">
        <p>{{ getSelectedPost().body }}</p>
      </div>
    </div>
    <h5>Comments</h5>
    <hr />
    <CommentCard
      :key="comment.id"
      v-for="comment in getComments()"
      :comment="comment"
    />
    <hr />
    <div class="new-comment">
      <textarea
        type="text"
        placeholder="Enter your comment"
        v-model="message"
      />
      <button class="btn btn-primary" @click="addComment">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

import CommentCard from "./CommentCard.vue";
import EditPostModal from "./EditPostModal.vue";

export default {
  data() {
    return {
      message: "",
    };
  },

  components: {
    CommentCard,
    EditPostModal,
  },

  methods: {
    ...mapActions(["setSelectedPost", "setComments"]),

    ...mapGetters([
      "getSelectedPostId",
      "getSelectedPost",
      "getPosts",
      "getComments",
    ]),

    async deletePostHandler() {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${this.getSelectedPostId()}`
      );
      if (response.status === 200) {
        let newPostsArray = this.getPosts().filter(
          (post) => post.id !== this.getSelectedPostId()
        );
        this.$store.dispatch("setPosts", newPostsArray);
        if (this.getSelectedPostId() > 100) {
          this.$store.dispatch("setSelectedPostId", 1);
        } else {
          this.$store.dispatch(
            "setSelectedPostId",
            this.getSelectedPostId() + 1
          );
        }
        this.fetchPost();
        this.fetchComments();
      }
    },

    async fetchPost() {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${this.getSelectedPostId()}`
      );
      this.$store.dispatch("setSelectedPost", result.data);
    },

    async fetchComments() {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`,
        { params: { postId: this.getSelectedPostId() } }
      );
      this.$store.dispatch("setComments", result.data);
    },

    async addComment() {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/comments`,
        {
          userId: "",
          postId: "",
          title: "",
          body: this.message,
          email: "test@test.com",
        }
      );

      if (response.status === 201) {
        let newCommentsArray = this.getComments();
        newCommentsArray.unshift(response.data);
        this.$store.dispatch("setComments", newCommentsArray);
      }

      this.message = "";
    },
  },

  created() {
    this.fetchPost();
    this.fetchComments();
  },
};
</script>

<style scoped>
.comment-list {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
  margin-bottom: 20px;
}

.dropdown-item {
  cursor: pointer;
}

.new-comment textarea {
  width: 100%;
  padding: 10px;
}
</style>
