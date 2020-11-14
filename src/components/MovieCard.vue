<template>
  <div class="movie">
    <p class="movie__imdbid">{{imdbId}}</p>
    <h3 class="movie__title">{{ title }}</h3>
    <p class="movie__footer">
      <span class="movie__year">{{ year }}</span>
      <a role="button"
         class="movie__star"
         :class="isStarred ? 'movie__star--starred' : 'movie__star--unstarred'"
         @click.prevent="toggleStar">
        <i class="icon-star-full"></i>
      </a>
    </p>
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

<style scoped>
%movie-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 3fr auto;
}

.movie {
  background: linear-gradient(45deg, var(--color-primary), var(--color-primary-accent));
  border-radius: 2rem 0.75rem;
  color: var(--color-light);
  padding: 1.5rem;
  @extend %movie-card-grid;
}

.movie__title {
  margin-bottom: 2rem;
}

.movie__year {
  align-items: center;
  background: var(--color-light-accent);
  border-radius: 3px;
  color: var(--color-primary);
  display: inline-flex;
  font-family: var(--color-secondary);
  height: 1.5rem;
  line-height: 1;
  padding: 0.25rem 0.5rem 0;
}

.movie__footer {
  grid-row: 3 / -1;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.movie__imdbid {
  margin: 0;
  color: var(--color-primary-light);
  text-transform: uppercase;
}

.movie__star {
  font-size: 1.25rem;
  transition: transform 1s cubic-bezier(.46,.45,0,1), color 1s cubic-bezier(.17,.62,.48,.37);
  transform-origin: center center;

  &.movie__star--unstarred {
    transform: rotate(0deg);
    color: var(--color-light-accent);
  }

  &.movie__star--starred {
    transform: rotate(360deg);
    color: var(--color-secondary);
  }
}
</style>
