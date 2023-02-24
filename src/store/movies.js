import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      searchResults: [],
      bookmarks: [],
      foundResults: 0,
      query: "",
      year: "",
      apiKey: "4400c1e5",
      status: "",
      page: 1,
      apiUrl: "https://www.omdbapi.com/",
      details: null,
      Error: "",
    };
  },
  mutations: {
    storeMovies(state, data, isNextPage) {
      const movies = data.Search.map((movie) => ({
        ...movie,
        bookmarked: false,
      }));
      if (!isNextPage) {
        state.searchResults = movies;
        state.foundResults = data.totalResults;
      } else {
        state.searchResults = [...state.searchResults, ...movies];
      }
    },
    addMovies(state, data) {
      const movies = data.Search.map((movie) => ({
        ...movie,
        bookmarked: false,
      }));
      state.searchResults = [...state.searchResults, ...movies];
    },
    updateStatus(state, status) {
      state.status = status;
    },
    removeBookmark(state, movieID) {
      state.searchResults = state.searchResults.map((movie) =>
        movie.imdbID === movieID ? { ...movie, bookmarked: false } : movie
      );
      state.bookmarks = state.bookmarks.filter(
        (movie) => movie.imdbID !== movieID
      );
    },
    addBookmark(state, movieID) {
      state.searchResults = state.searchResults.map((movie) =>
        movie.imdbID === movieID ? { ...movie, bookmarked: true } : movie
      );
      state.bookmarks.push(
        state.searchResults.filter((movie) => movie.imdbID === movieID)[0]
      );
    },
    incrementPage(state) {
      state.page++;
    },
    movieDetails(state, data) {
      state.details = data;
    },
  },
  actions: {
    bookmarkMovie(context, movieID) {
      context.commit("addBookmark", movieID);
    },

    removeBookmarkMovie(context, movieID) {
      context.commit("removeBookmark", movieID);
    },

    async fetchMovies({ commit, state }, isNextPage) {
      if (isNextPage) commit("incrementPage");
      else commit("storeMovies", { Search: [] });

      commit("storeMovies", { Search: [] });
      commit("updateStatus", "PENDING");
      const res = await fetch(
        `${state.apiUrl}?s=${state.query}${
          state.year ? "&y=" + state.year : ""
        }${state.page ? "&page=" + state.page : ""}&apiKey=${state.apiKey}`
      );
      const data = await res.json();

      if (data.Response) {
        commit("storeMovies", data, isNextPage);
        commit("updateStatus", "SUCCESS");
      } else {
        console.log("Error searching movies: ", data.Error);
        commit("updateStatus", "ERROR");
        commit("saveError", data.Error);
      }
    },

    async showMoreFetchMovies({ commit, state }) {
      commit("incrementPage");
      commit("updateStatus", "PENDING_MORE");
      const res = await fetch(
        `${state.apiUrl}?s=${state.query}${
          state.year ? "&y=" + state.year : ""
        }${state.page ? "&page=" + state.page : ""}&apiKey=${state.apiKey}`
      );
      const data = await res.json();

      if (data.Response) {
        commit("addMovies", data);
        commit("updateStatus", "SUCCESS");
      } else {
        console.log("Error searching movies: ", data.Error);
        commit("saveError", data.Error);
        commit("updateStatus", "ERROR");
      }
    },

    async fetchMovieSingle({ commit, state }, movieID) {
      commit("updateStatus", "PENDING");
      const res = await fetch(
        `${state.apiUrl}?i=${movieID}&apiKey=${state.apiKey}`
      );
      const data = await res.json();

      if (data.Response) {
        commit("movieDetails", data);
        commit("updateStatus", "SUCCESS");
      } else {
        console.log("Error searching movies: ", data.Error);
        commit("updateStatus", "ERROR");
      }
    },
  },
});

export default store;
