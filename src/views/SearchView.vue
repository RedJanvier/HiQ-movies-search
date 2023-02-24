<script>
import MovieCard from '../components/MovieCard.vue';

export default {
    data: () => ({
        query: "",
        apiKey: "4400c1e5",
        year: "",
        years: ["2000", "2023"]
    }),
    methods: {
        async handleSearch() {
            this.$store.dispatch("fetchMovies");
        }
    },
    components: { MovieCard }
}
</script>

<template>
  <div class="about">
    <v-card class="pa-4" flat>
      <v-text-field
      hide-details="auto"
      append-inner-icon="mdi-magnify"
      label="Search for a movie here..."
      @click:append-inner="handleSearch"
      v-model="this.$store.state.query"
      ></v-text-field>
    </v-card>

    <p style="text-align: center; color: crimson;" v-if="this.$store.state.searchResults.length === 0 && this.$store.state.status !== 'PENDING' && this.$store.state.status === 'PENDING_MORE'">{{ this.$store.state.error || 'No movies found for your query!' }}</p>
    
    <v-container>
      <v-row justify="space-around" class="my-10" v-if="this.$store.state.status === 'PENDING'">
        <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        ></v-progress-circular>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="movie in this.$store.state.searchResults" :key="movie.imdbID">
          <MovieCard :movie="movie"  />
        </v-col>
      </v-row>
      <v-row justify="space-around" class="my-10">
        <v-btn v-if="(this.$store.state.searchResults.length < this.$store.state.foundResults) && (this.$store.state.foundResults > 0)" :loading="this.$store.state.status === 'PENDING_MORE'" :disabled="this.$store.state.status === 'PENDING_MORE'" @click="this.$store.dispatch('showMoreFetchMovies', true)">Show more</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<style>
</style>
