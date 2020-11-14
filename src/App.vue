<template>
  <header>
    <h1><a href="#">Movie</a></h1>
  </header>
  <section class="starred-movies">
    <h2>Starred movies</h2>
    <listings-layout>
      <movie-card v-for="movie in starredMovies"
                  v-bind="movie"
                  :key="movie.imdbId"
                  @star="starMovie"
                  @unstar="unstarMovie"/>
    </listings-layout>
  </section>
  <section class="listings">
    <h2>Movies</h2>
    <listings-layout>
      <movie-card v-for="movie in currentPageListings"
                  v-bind="movie"
                  :key="movie.imdbId"
                  @star="starMovie"
                  @unstar="unstarMovie"/>
    </listings-layout>
    <a role="button" @click.prevent="currentPage--">Previous</a>
    <a role="button" @click.prevent="currentPage++">Next</a>
  </section>
</template>

<script lang="ts">
import MovieCard from "./components/MovieCard.vue";
import ListingsLayout from "./components/ListingsLayout.vue";
import StarredMoviesLayout from "./components/StarredMoviesLayout.vue";
import type {Ref, UnwrapRef} from "vue";
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import api from "./api";
import {Movie} from "./movies/type";

const fetchMovieListingsByPage = (pageToLoad: number, isLoading: Ref<boolean>, pages: Ref<Array<UnwrapRef<Array<StarrableMovie>>>>, error: Ref<string>) =>
    async () => {
      if ((pages.value[pageToLoad]?.length ?? 0) > 0) {
        return;
      }
      try {
        isLoading.value = true
        const response = await api.movies.find({page: pageToLoad});
        pages.value[response.page] = response.data.map(movie => ({...movie, isStarred: false}))
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    };

interface StarrableMovie extends Movie {
  isStarred: boolean;
}

export default defineComponent({
  name: 'App',
  components: {
    ListingsLayout,
    MovieCard,
    StarredMoviesLayout
  },
  setup() {
    const isLoading = ref<boolean>(true)
    const pages = ref<Array<Array<StarrableMovie>>>([])
    const currentPage = ref<number>(1)
    const error = ref<string>('')
    const currentPageListings = computed(() => pages.value[currentPage.value])
    const starredMovies = computed(() => pages.value.flatMap(page => page.filter(movie => movie.isStarred)))

    const starMovie = (imdbId: string) => {
      const targetMovie = pages.value[currentPage.value].find(movie => movie.imdbId === imdbId);
      if (targetMovie) {
        targetMovie.isStarred = true;
      }
    }
    const unstarMovie = (imdbId: string) => {
      const targetMovie = pages.value[currentPage.value].find(movie => movie.imdbId === imdbId);
      if (targetMovie) {
        targetMovie.isStarred = false;
      }
    }

    onMounted(fetchMovieListingsByPage(1, isLoading, pages, error))
    watch(currentPage, async (currentPage) => fetchMovieListingsByPage(currentPage, isLoading, pages, error)())

    return {isLoading, error, currentPageListings, currentPage, starredMovies, starMovie, unstarMovie}
  }
})
</script>
