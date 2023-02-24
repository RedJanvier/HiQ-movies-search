
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      searchResults: [],
      foundResults: 0,
      query: "",
      year: "",
      apiKey: "4400c1e5",
      status: '',
      page: 1,
      bookmarks: [],
      apiUrl: 'https://www.omdbapi.com/',
    }
  },
  mutations: {
    storeMovies (state, data, isNextPage) {
      if (!isNextPage) {
        state.searchResults = data.Search;
        state.foundResults = data.totalResults;
      } else {
        state.searchResults = [...state.searchResults, ...data.Search];
      }
    },
    updateStatus(state, status) {
      state.status = status;
    },
    bookmarkNow(state, movie) {
      state.bookmarks.push(movie);
    },
    incrementPage(state) {
      state.page++;
    },
  },
  actions: {
    bookmarkMovie(context) {
      context.commit('boomarkNow');
    },
    async fetchMovies({commit, state}, isNextPage = false) {
      if (isNextPage) commit('incrementPage');
      commit('updateStatus', 'PENDING');
      const res = await fetch(`https://www.omdbapi.com/?s=${state.query}${state.year ? '&y=' + state.year : ''}${state.page ? '&page=' + state.page : ''}&apiKey=${state.apiKey}`);
      const data = await res.json();
      
      if (data.Response) {
        commit('storeMovies', data, isNextPage)
        commit('updateStatus', 'SUCCESS');
      } else {
        console.log('Error searching movies: ', data.Error);
        commit('updateStatus', 'ERROR');
      }
    }
  }
})

export default store;
