<template>
  <header>
    <h1 class="logo">
      <a href="#"><img src="./assets/images/logo.png" alt="Movie.list" class="logo__image"></a>
      <span class="logo__text">Movie.list</span>
    </h1>
  </header>
  <section class="starred-movies">
    <h2>Starred movies</h2>
    <listings-layout v-if="starredMovies.length > 0">
      <movie-card v-for="movie in starredMovies"
                  v-bind="movie"
                  :is-starred="isStarred(movie.imdbId)"
                  :key="movie.imdbId"
                  @star="starMovie"
                  @unstar="unstarMovie"/>
    </listings-layout>
    <p v-else>
      You have not starred any movies. Click the <i class="icon-star-full"></i> to add one.
    </p>
  </section>
  <section class="listings">
    <h2>Movies</h2>
    <search-box @search="searchMovie" @clearSearch="clearSearch"/>
    <centered-loading-indicator-wrapper v-if="isLoading">
      <loading-indicator/>
    </centered-loading-indicator-wrapper>
    <template v-else>
      <listings-layout>
        <movie-card v-for="movie in currentPageListings"
                    v-bind="movie"
                    :is-starred="isStarred(movie.imdbId)"
                    :key="movie.imdbId"
                    @star="starMovie"
                    @unstar="unstarMovie"/>
      </listings-layout>
      <p v-if="isSearching && searchResults.length === 0">
        There's no results for your keyword. Try another one.
      </p>
      <listings-pagination :current-page="currentPage"
                           :last-page="lastPage"
                           v-if="!isSearching"
                           @previousPage="currentPage--"
                           @nextPage="currentPage++"/>
    </template>
  </section>
</template>

<script lang="ts">
import MovieCard from "./components/MovieCard.vue";
import ListingsLayout from "./components/ListingsLayout.vue";
import type {Ref, UnwrapRef} from "vue";
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import api from "./api";
import {Movie} from "./movies/type";
import ListingsPagination from "./ListingsPagination.vue";
import LoadingIndicator from "./components/LoadingIndicator.vue";
import CenteredLoadingIndicatorWrapper from "./components/CenteredLoadingIndicatorWrapper.vue";
import SearchBox from "./SearchBox.vue";

const fetchMovieListingsByPage = (
    pageToLoad: number,
    isLoading: Ref<boolean>,
    pages: Ref<Array<UnwrapRef<Array<StarrableMovie>>>>,
    error: Ref<string>,
    lastPage: Ref<number>
) =>
    async () => {
      if ((pages.value[pageToLoad]?.length ?? 0) > 0) {
        return;
      }
      try {
        isLoading.value = true
        const response = await api.movies.find({page: pageToLoad});
        pages.value[response.page] = response.data.map(movie => ({...movie, isStarred: false}))
        lastPage.value = response.totalPages
      } catch (err) {
        error.value = err.message
        console.error(err.message)
      } finally {
        isLoading.value = false
      }
    };

const searchMovieListings = (
    isLoading: Ref<boolean>,
    isSearching: Ref<boolean>,
    searchResults: Ref<Array<StarrableMovie>>,
    error: Ref<string>
) =>
    async (keyword: Ref<string>) => {
      try {
        isSearching.value = true
        isLoading.value = true
        const response = await api.movies.find({page: 1, title: keyword});
        searchResults.value = response.data.map(movie => ({...movie, isStarred: false}))
      } catch (err) {
        error.value = err.message
        console.error(err.message)
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
    SearchBox,
    CenteredLoadingIndicatorWrapper,
    LoadingIndicator,
    ListingsPagination,
    ListingsLayout,
    MovieCard
  },
  setup: function () {
    const isLoading = ref<boolean>(true)
    const pages = ref<Array<Array<StarrableMovie>>>([])
    const currentPage = ref<number>(1)
    const lastPage = ref<number>(1)
    const searchResults = ref<StarrableMovie[]>([])
    const isSearching = ref<boolean>(false)
    const starredMovies = ref<StarrableMovie[]>([])
    const error = ref<string>('')

    const starMovie = (targetMovie: StarrableMovie) => {
      starredMovies.value.push({...targetMovie})
    }
    const unstarMovie = (targetMovie: StarrableMovie) => {
      const targetIndex = starredMovies.value.findIndex(starredMovie => starredMovie.imdbId === targetMovie.imdbId);
      starredMovies.value.splice(targetIndex, 1)
    }
    const isStarred = (imdbId: string) => {
      return starredMovies.value.findIndex(starredMovie => starredMovie.imdbId === imdbId) > -1
    }

    onMounted(fetchMovieListingsByPage(1, isLoading, pages, error, lastPage))
    watch(currentPage, async (currentPage) => fetchMovieListingsByPage(currentPage, isLoading, pages, error)())

    const searchMovie = (keyword: string) => searchMovieListings(isLoading, isSearching, searchResults, error)(keyword)
    const currentPageListings: Array<UnwrapRefSimple<StarrableMovie>> = computed(() => {
      if (isSearching.value) {
        return searchResults.value
      }
      return pages.value[currentPage.value]
    })
    const clearSearch = () => {
      searchResults.value = []
      isSearching.value = false
    }

    return {
      clearSearch,
      currentPage,
      currentPageListings,
      error,
      isLoading,
      isSearching,
      isStarred,
      lastPage,
      searchMovie,
      searchResults,
      starMovie,
      starredMovies,
      unstarMovie
    }
  }
})
</script>

<style scoped>
.logo__text {
  display: none;
}

.logo__image {
  max-height: 120px;
}

h1 {
  text-align: center;
}

.listings {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
}
</style>
