<script>
import MovieCard from '../components/MovieCard.vue';

export default {
    data: () => ({
        query: "",
        apiKey: "4400c1e5",
        year: "",
        years: ["2000", "2023"],
        bookmarkedMovies: [],
        filteredMovies: []
    }),
    methods: {
      // fetchMovie() {
      // }
    },
    created() {
      this.$store.dispatch("fetchMovieSingle", this.$route.params.movieID);
    },
    components: { MovieCard }
}
</script>

<template>
  <div class="about">
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

  <v-container>
    <p style="text-align: center;" v-if="!this.$store.state.details && this.$store.state.status !== 'PENDING'">Movie was not found!</p>
    <v-row justify="space-around" class="my-10" v-if="this.$store.state.status === 'PENDING'">
      <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      ></v-progress-circular>
    </v-row>
    <v-row justify="space-around" v-if="this.$store.state.status === 'SUCCESS'">
      <v-col cols="12" sm="12" md="8">
        <MovieCard :movie="this.$store.state.details" :detailed="true" />
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<style>
</style>
