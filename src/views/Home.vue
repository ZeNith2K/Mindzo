<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Sumit Kumar</h1>
        <div class="card-text">Contact : 9801278051</div>
        <router-link to="/posts"
          ><button class="btn btn-primary mt-3">
            Go To Posts
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  padding: 50px;
}
</style>
