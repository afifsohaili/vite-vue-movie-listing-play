<template>
  <div class="movie">
    <h3>{{ title }}</h3>
    <span class="movie__year">{{ year }}</span>
    <a role="button"
       class="movie__star--unstarred"
       :class="isStarred && 'movie__star--starred'"
       @click.prevent="toggleStar">
      star
    </a>
  </div>
</template>

<script lang="ts">
import {defineComponent, SetupContext} from 'vue'

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
  setup(props, context: SetupContext) {
    const toggleStar = () => {
      const event = props.isStarred ? 'unstar' : 'star'
      context.emit(event, props.imdbId)
    }
    return {toggleStar}
  }
})
</script>
