<template>
  <div class="movie-grid">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "ListingsLayout"
}
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;
}
</style>
