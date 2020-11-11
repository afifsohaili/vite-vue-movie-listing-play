<template>
  <header>
    <h1><a href="#">Movie</a></h1>
  </header>
  <section class="favourites">
    <h2>Favourites</h2>
    <favourites-layout>
      <movie-card/>
      <movie-card/>
      <movie-card/>
      <movie-card/>
      <movie-card/>
    </favourites-layout>
  </section>
  <section class="listings">
    <h2>Movies</h2>
    <listings-layout>
      <movie-card v-for="movie in movies" :year="movie.year" :imdb-id="movie.imdbId" :title="movie.title" :is-starred="movie.isStarred" />
    </listings-layout>
  </section>
</template>

<script lang="ts">
import MovieCard from "./components/MovieCard.vue";
import ListingsLayout from "./components/ListingsLayout.vue";
import FavouritesLayout from "./components/FavouritesLayout.vue";
import {defineComponent, onMounted, ref} from "vue";
import api from "./api";
import {Movie} from "./movies/type";

export default defineComponent({
  name: 'App',
  components: {
    FavouritesLayout,
    ListingsLayout,
    MovieCard
  },
  setup() {
    const isLoading = ref(true)
    const movies = ref<Movie[]>([])
    const error = ref('')
    onMounted(async () => {
      try {
        const response = await api.movies.find({page: 1});
        movies.value = response.data.map(movie => ({...movie, isStarred: false}))
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    })
    return {movies, isLoading, error}
  }
})
</script>
