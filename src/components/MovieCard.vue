<template>
  <v-lazy transition="fade-transition">
    <v-card>
      <v-img :src="movie.Poster" :height="!detailed ? '460px' : 'auto'" cover>
        <v-toolbar
          :color="!detailed ? 'rgba(0, 0, 0, 0.44)' : 'rgba(0, 0, 0, 0.64)'"
          theme="dark"
        >
          <v-toolbar-title>
            {{ movie.Title }}
          </v-toolbar-title>

          <template v-slot:append v-if="!detailed">
            <v-btn
              disabled
              :icon="movie.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
            ></v-btn>
          </template>
        </v-toolbar>
      </v-img>
      <div v-if="detailed">
        <v-card-subtitle class="pt-4">
          <v-chip
            class="ma-2"
            color="pink"
            label
            text-color="white"
            v-if="movie.Year !== 'N/A'"
          >
            <v-icon start icon="mdi-calendar"></v-icon>
            {{ movie.Year }}
          </v-chip>
          <v-chip
            class="ma-2"
            color="blue"
            label
            text-color="white"
            v-if="movie.Runtime !== 'N/A'"
          >
            <v-icon start icon="mdi-timer"></v-icon>
            {{ movie.Runtime }}
          </v-chip>
          <v-chip
            class="ma-2"
            color="red"
            label
            text-color="white"
            v-if="movie.Genre !== 'N/A'"
          >
            <v-icon start icon="mdi-play"></v-icon>
            {{ movie.Genre }}
          </v-chip>
          <!-- <v-chip
            class="ma-2"
            color="purple"
            label
            text-color="white"
            v-if="movie.Type !== 'N/A'"
          >
            <span>Type: </span>
            <span> {{ movie.Type }}</span>
          </v-chip> -->
        </v-card-subtitle>
        <v-card-text v-if="movie.Plot" class="mx-2">
          <v-row align="center" class="mb-2 mx-0">
            <span>Rating: </span>
            <v-rating
              :model-value="movie.Ratings[0].Value.split('/')[0]"
              :length="movie.Ratings[0].Value.split('/')[1]"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>

            <div class="text-grey ms-4">
              {{ movie.Ratings[0].Value }}
              <span v-if="movie.Rated !== 'N/A'"
                >({{ movie.Rated }} Rated)</span
              >
            </div>
          </v-row>
          <div class="mt-8 mb-5">
            <h4 v-if="movie.Plot !== 'N/A'" class="mb-5">{{ movie.Plot }}</h4>
            <p v-if="movie.Actors !== 'N/A'">Actors: {{ movie.Actors }}</p>
            <p v-if="movie.Director !== 'N/A'">
              Directors: {{ movie.Director }}
            </p>
          </div>
        </v-card-text>
      </div>
      <v-card-actions v-if="!detailed">
        <v-btn
          class="my-5"
          @click="
            this.$store.dispatch(
              !movie.bookmarked ? 'bookmarkMovie' : 'removeBookmarkMovie',
              movie.imdbID
            )
          "
          ><span class="remove-label" v-if="movie.bookmarked">Remove</span
          >Bookmark</v-btn
        >
        <v-btn
          class="my-5 ml-5"
          @click="($event) => this.$router.push('/movie/' + movie.imdbID)"
          >View Details</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-lazy>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
  detailed: {
    type: Boolean,
    required: false,
  },
});
</script>

<script>
export default {
  data: () => ({
    details: {},
  }),

  created() {
    // this.$store.commit('fetchSingle');
  },

  methods: {
    bookmarkMovie() {
      // this.$store
    },
    fetchData() {
      // this.error = this.post = null
      // this.loading = true
      // // replace `getPost` with your data fetching util / API wrapper
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
    },
  },
};
</script>

<style scoped>
.remove-label {
  padding-right: 5px;
}
</style>
