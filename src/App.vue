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
      <movie-card/>
    </listings-layout>
  </section>
</template>

<script>
import MovieCard from "./components/MovieCard.vue";
import ListingsLayout from "./components/ListingsLayout.vue";
import FavouritesLayout from "./components/FavouritesLayout.vue";

export default {
  name: 'App',
  components: {
    FavouritesLayout,
    ListingsLayout,
    MovieCard
  }
}
</script>
