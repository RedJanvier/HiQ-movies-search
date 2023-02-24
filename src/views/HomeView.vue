<script>
export default {
    data: () => ({
      query: '',
      apiKey: '4400c1e5',
      year: '',
      years: ['2000', '2023']
    }),
    methods: {
      async handleSearch() {
        this.$store.dispatch('fetchMovies');
        this.$router.push({path:'/search'});
      }
    }
  }
</script>

<template>
  <main class="container-center">
    <h1>Movie Search App</h1>
  <v-card
    class="pa-4"
    flat
  >
      <v-text-field
        hide-details="auto"
        append-inner-icon="mdi-magnify"
        label="Search for a movie here..."
        @click:append-inner="handleSearch"
        v-model="this.$store.state.query"
      ></v-text-field>
  </v-card>
  </main>
</template>
