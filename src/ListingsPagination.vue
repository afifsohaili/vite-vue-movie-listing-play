<template>
  <section class="pagination__container">
    <p class="pagination">
      <a role="button"
         class="pagination__button"
         :class="isFirstPage && 'pagination__button--disabled'"
         @click.prevent="previousPage">Previous</a>
      <span class="pagination__currentpage">{{currentPage}}</span>
      <a role="button"
         class="pagination__button"
         :class="isLastPage && 'pagination__button--disabled'"
         @click.prevent="nextPage">Next</a>
    </p>
  </section>
</template>
<script lang="ts">
import {SetupContext, computed} from 'vue'
export default {
  name: 'listings-pagination',
  props: {
    currentPage: Number,
    lastPage: Number
  },
  setup(props, context: SetupContext) {
    const isFirstPage = computed(() => props.currentPage === 1)
    const isLastPage = computed(() => {
      console.log('\n', 'props      ', props      );
      console.log('\n', 'props.currentPage === props.lastPage', props.currentPage === props.lastPage);
      return props.currentPage === props.lastPage;
    })
    const nextPage = () => {
      if (!isLastPage.value) {
        context.emit('nextPage')
      }
    }
    const previousPage = () => {
      if (!isFirstPage.value) {
        context.emit('previousPage')
      }
    }
    return {isFirstPage, isLastPage, nextPage, previousPage}
  }
}
</script>

<style scoped>
.pagination__container {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
  display: inline-block;
}

.pagination__button {
  background: var(--color-secondary-accent);
  border-radius: 3px;
  color: var(--color-light);
  padding: 0.25rem 0.75rem 0;
  transition: background-color 0.3s ease-in-out;

  &.pagination__button--disabled {
    background: var(--color-light);
    color: var(--color-light-accent);
    opacity: 0.7;
  }

  &:hover {
    background: var(--color-secondary-accent-light);
  }
}

.pagination__currentpage {
  display: inline-flex;
  margin: 0 2rem;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  text-align: center;
  background: var(--color-light);
  border: 2px solid var(--color-light-accent);
  align-items: center;
  justify-content: center;
}
</style>
