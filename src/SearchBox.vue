<template>
  <form @submit.prevent="search" class="search-box">
    <a role="button" @click.prevent="clearSearch" v-if="keyword.length">Clear</a>
    <label for="search-input" class="search-box__inputlabel">
      <i class="icon-search" @click="search"></i>
      <input type="text" v-model="keyword" id="search-input" class="search-box__input" placeholder="Search for a movie...">
    </label>
  </form>
</template>

<script lang="ts">
import {ref, watch, SetupContext} from 'vue'

export default {
  name: 'SearchBox',
  setup(props, context: SetupContext) {
    const keyword = ref<string>('')
    const search = () => {
      if (keyword.value.length > 0) {
        context.emit('search', keyword.value)
      }
    }
    const clearSearch = () => {
      keyword.value = ''
      context.emit('clearSearch')
    }
    watch(keyword, (newValue) => {
      if (newValue.length === 0) {
        clearSearch();
      }
    })
    return {
      search,
      keyword,
      clearSearch
    }
  }
}
</script>

<style scoped>
.search-box {
  margin-bottom: 2rem;
  align-self: flex-end;
}

.search-box__input {
  border: 1px solid var(--color-primary-light);
  border-radius: 3px;
  padding: 0.5rem 0.75rem 0.25rem;
}

.search-box__inputlabel {
  align-self: flex-end;
  & > i {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
  }
}
</style>
