<template>
  <!-- <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div> -->
  <v-card>
    <v-img :src="movie.Poster" height="560px" cover>
      <v-toolbar 
        color="rgba(0, 0, 0, 0.44)"
        theme="dark">
        <v-toolbar-title>
          {{ movie.Title }}
        </v-toolbar-title>

        <template v-slot:append>
          <v-btn :icon="bookmarked ? 'mdi-bookmark-outline' : 'mdi-bookmark'"></v-btn>
        </template>
      </v-toolbar>
    </v-img>
    <v-card-actions>
      <v-btn class="my-5 mx-5">Bookmark</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  },
  bookmarked: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  data: () => ({
    details: {}
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
  }
}
</script>
