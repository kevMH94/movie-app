import React, { createContext, useReducer, useEffect } from "react";
import MovieReducer from "./MovieReducer";

// initial state
const initialState = {
  // watchlist: localStorage.getItem("watchlist")
  //   ? JSON.parse(localStorage.getItem("watchlist"))
  //   : [],
  // watched: localStorage.getItem("watched")
  //   ? JSON.parse(localStorage.getItem("watched"))
  //   : [],
  
  //Check if online, if so make api calls, if not load from database.
  cinemaMovies: [],
  netflixMovies: [],
  disneyMovies: [],
  primeMovies: [],
  appleMovies: [],
  watchlist: [],
};


// create context
export const MovieContext = createContext(initialState);

// provider components
export const MovieProvider = (props) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  useEffect(() => {
    // localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    // localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions
  const getCinemaConnected = (movies) => {
    dispatch({ type: "GET_CINEMA_CONNECTED", payload: movies });
  };

  const getNetflixConnected = (movies) => {
    dispatch({ type: "GET_NETFLIX_CONNECTED", payload: movies });
  };

  const getDisneyConnected = (movies) => {
    dispatch({ type: "GET_DISNEY_CONNECTED", payload: movies });
  };

  const getPrimeConnected = (movies) => {
    dispatch({ type: "GET_PRIME_CONNECTED", payload: movies });
  };

  const getAppleConnected = (movies) => {
    dispatch({ type: "GET_APPLE_CONNECTED", payload: movies });
  };


  const getCinemaOffline = (movies) => {
    dispatch({ type: "GET_CINEMA_OFFLINE", payload: movies });
  };

  const getNetflixOffline = (movies) => {
    dispatch({ type: "GET_NETFLIX_OFFLINE", payload: movies });
  };

  const getDisneyOffline = (movies) => {
    dispatch({ type: "GET_DISNEY_OFFLINE", payload: movies });
  };

  const getPrimeOffline = (movies) => {
    dispatch({ type: "GET_PRIME_OFFLINE", payload: movies });
  };

  const getAppleOffline = (movies) => {
    dispatch({ type: "GET_APPLE_OFFLINE", payload: movies });
  };

  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  return (
    <MovieContext.Provider
      value={{
        cinemaMovies: state.cinemaMovies,
        netflixMovies: state.netflixMovies,
        disneyMovies: state.disneyMovies,
        primeMovies: state.primeMovies,
        appleMovies: state.appleMovies,
        watchlist: state.watchlist,
        getCinemaConnected,
        getNetflixConnected,
        getDisneyConnected,

        removeMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
