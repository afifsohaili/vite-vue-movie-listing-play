<template>
  <div class="loading-indicator-wrapper--centered">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CenteredLoadingIndicatorWrapper"
}
</script>

<style scoped>
.loading-indicator-wrapper--centered {
  text-align: center;
}
</style>
