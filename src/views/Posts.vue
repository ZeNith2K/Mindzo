<template>
  <div class="container">
    <div class="row">
      <div class="col-12 title">
        <h4>Posts</h4>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#new-post-modal"
        >
          Create New Post
        </button>
        <NewPostModal />
      </div>
      <div class="col-5">
        <PostList />
      </div>
      <div class="col-7">
        <CommentList />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "../components/Posts/PostList.vue";
import CommentList from "../components/Posts/CommentList.vue";
import NewPostModal from "../components/Posts/NewPostModal.vue";

export default {
  components: {
    PostList,
    CommentList,
    NewPostModal,
  },
};
</script>

<style scoped>
.container {
  height: 85vh;
}

.title {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
