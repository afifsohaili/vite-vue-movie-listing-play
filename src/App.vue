<template>
  <h1>
    App
  </h1>
  <v-button @click="count++">Count: {{count}}</v-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VButton from './components/VButton.vue'

export default defineComponent({
  components: {
    VButton,
  },

  setup() {
    const count = ref(0)

    return {
      count,
    }
  },
})
</script>
