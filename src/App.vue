<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="landing_bg" v-if="this.$route.path === '/'"></div>
  <v-container fluid v-if="this.$route.path !== '/'">
    <v-row justify="space-around" class="my-10 flex">
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li v-if="this.$store.state.searchResults.length">
            <RouterLink to="/search">Back to results</RouterLink>
          </li>
          <li><RouterLink to="/bookmarks">Bookmarks</RouterLink></li>
        </ul>
      </nav>
    </v-row>
  </v-container>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.landing_bg {
  background-image: url('/landing-page.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
  background-color: #000;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
