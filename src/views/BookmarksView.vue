<script>
import MovieCard from "../components/MovieCard.vue";

export default {
  data: () => ({
    query: "",
    apiKey: "4400c1e5",
    year: "",
    years: ["2000", "2023"],
    bookmarkedMovies: [],
    filteredMovies: [],
  }),
  methods: {
    async handleSearch() {
      this.$store.dispatch("fetchMovies");
    },
    filterMovies() {},
  },
  // computed: () => {
  //   filteredMovies = store.state.searchResults.filter(movie => movie.bookmarked);
  //   bookmarkedMovies = store.state.searchResults.filter(movie => movie.bookmarked);
  // },
  components: { MovieCard },
};
</script>

<template>
  <div class="about">
  <!-- Future improvements on filtering bookmarks -->

    <!-- <v-card
      class="pa-4"
      flat
    >
      <v-text-field
        hide-details="auto"
        label="Filter for a bookmark title..."
        v-model="query"
        @input="$event => filterMovies()"
      ></v-text-field>
  </v-card> -->

  <!-- End of Future improvements on filtering bookmarks -->

    <v-container>
      <p
        style="text-align: center"
        v-if="this.$store.state.bookmarks.length === 0"
      >
        No Bookmarks yet!
      </p>
      <v-row v-else>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="movie in this.$store.state.bookmarks"
          :key="movie.imdbID"
        >
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
