<template>
  <div class="movie">
    <h3>{{title}}</h3>
    <span class="movie__year">{{year}}</span>
    <a role="button" class="movie__favourite" :class="isStarred && 'starred'">star</a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'MovieCard',
  props: {
    title: String,
    year: Number,
    imdbId: String,
    isStarred: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
  }
})
</script>
