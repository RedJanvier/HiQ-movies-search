<script>
export default {
  methods: {
    async handleSearch() {
      this.$store.dispatch("fetchMovies");
      this.$router.push({ path: "/search" });
    },
  },
};
</script>

<template>
  <main class="container-center" >
    <v-card class="pa-4" flat>
      <h1>Movie Search App</h1>
      <v-text-field
        hide-details="auto"
        append-inner-icon="mdi-magnify"
        label="Search for a movie here..."
        @click:append-inner="handleSearch"
        @keydown.enter.prevent="handleSearch"
        class="mb-2"
        v-model="this.$store.state.query"
      ></v-text-field>
      <RouterLink class="link" to="/bookmarks">View bookmarks</RouterLink>
    </v-card>
  </main>
</template>

<style scoped>
  .link {
    color: black;
    margin-top: 1rem;
  }
</style>
