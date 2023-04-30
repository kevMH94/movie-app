import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home'
import Cinema from './views/Cinema'
import Netflix from './views/Netflix'
import Disney from './views/Disney'
import Prime from './views/Prime'
import Apple from './views/Apple'
import Movie from './views/Movie'
import Search from './views/Search'
import Watchlist from './views/Watchlist'
import Navbar from './components/Navbar'
import ShowQuery from './components/ShowQuery'
import {db} from './db.js';

import { useLiveQuery } from "dexie-react-hooks";

const App = () => {
  const [cinemaMovies, setCinemaMovies] = useState([]);
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [disneyMovies, setDisneyMovies] = useState([]);
  const [primeMovies, setPrimeMovies] = useState([]);
  const [appleMovies, setAppleMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [showImage, setShowImage] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  function getDates( days )
  {
    var currentDate = new Date();
    
    var currentYear = currentDate.getFullYear();
    var currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    var currentDay = String(currentDate.getDate()).padStart(2, '0');
    var formattedCurrent = `${currentYear}-${currentMonth}-${currentDay}`; 
    
    var priorDate = new Date(new Date().setDate(currentDate.getDate() - days));
    var priorYear = priorDate.getFullYear();
    var priorMonth = String(priorDate.getMonth() + 1).padStart(2, '0');
    var priorDay = String(priorDate.getDate()).padStart(2, '0');
    var formattedPrior = `${priorYear}-${priorMonth}-${priorDay}`;
    return { today: formattedCurrent, prior: formattedPrior }    
  }


  const getCinema = async (dates) => {
    let tmdbDiscoveries = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&region=IE&sort_by=release_date.desc&page=1&release_date.gte=${dates.prior}&release_date.lte${dates.today}&with_release_type=2%7C3`);
    if( tmdbDiscoveries ) { /*console.log(tmdbDiscoveries);*/ /*return(tmdbDiscoveries.data.results);*/ }

    
    //Get full movies from TMDB
    if( tmdbDiscoveries ) 
    {
      //console.log(tmdbDiscoveries);
      let tmdbMovies = [];
      let omdbMovies = [];
      let moviePosters = [];
      let id = "";
      let imdbid = "";
      let posterpath = "";
      let moviesObjects = [];

      for (let x = 0; x < tmdbDiscoveries.data.results.length; x++) 
      { 
        let movieObject = {};
        //Get the TMDB movie
        id = tmdbDiscoveries.data.results[x].id;
        let tmdbresponse = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=beb7333fa1f8ebe8515528cdc7c5e454`);
        //console.log( tmdbresponse )
        tmdbMovies.push(tmdbresponse);

        movieObject.id = tmdbresponse.data.id;
        movieObject.title = tmdbresponse.data.title;
        movieObject.release_date = tmdbresponse.data.release_date;
        movieObject.overview = tmdbresponse.data.overview;
        movieObject.poster_path = tmdbresponse.data.poster_path;
        movieObject.imdb_id = tmdbresponse.data.imdb_id;
        let genres = "";
        for (let y = 0; y < tmdbresponse.data.genres.length; y++)
        {          
          genres = genres.concat(tmdbresponse.data.genres[y].name + ', ');
           
        }
        movieObject.genres = genres.slice(0, -2);
        

        //Get the OMDB movie
        imdbid = tmdbresponse.data.imdb_id;
        let omdbresponse = await axios(`http://www.omdbapi.com/?i=${imdbid}&plot=full&apikey=d59ecab9`);
        omdbMovies.push(omdbresponse);

        movieObject.runtime = omdbresponse.data.Runtime;
        movieObject.director = omdbresponse.data.Director;
        movieObject.writer = omdbresponse.data.Writer;
        movieObject.actors = omdbresponse.data.Actors;
        movieObject.language = omdbresponse.data.Language;
        movieObject.imdb_rating = omdbresponse.data.imdbRating;

        //Get the poster blobs
        posterpath = tmdbresponse.data.poster_path;
        let posterresponse = await axios(`http://image.tmdb.org/t/p/w200${posterpath}`, {responseType: 'blob'});
        moviePosters.push(posterresponse);
        //console.log(posterresponse)

        movieObject.poster = posterresponse.data;

        moviesObjects.push(movieObject);
      }
      return moviesObjects;
    
    }




   
  }




  function getPlatformID(platform)
  {
    switch (platform) 
    {
      case 'netflix':
        return 8;
        break;
      case 'disney':
        return 337;
        break;
      case 'prime':
        return 119;
        break;
      case 'apple':
        return 2;
        break;
    }
  }

  const getStreaming = async (dates, platform) => {
    let { data: streaming } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&sort_by=primary_release_date.desc&page=1&primary_release_date.gte=${dates.prior}&primary_release_date.lte=${dates.today}&with_watch_providers=${getPlatformID(platform)}&watch_region=IE`);
    
    let results = [];
    if( streaming.total_pages > 1 ) 
    { 
      let streamingMultiPages = streaming.results;
      for (let x = 2; x <= streaming.total_pages; x++) 
      {
        let { data: streamingMulti } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&sort_by=primary_release_date.desc&page=1&page=${x}&primary_release_date.gte=${dates.prior}&primary_release_date.lte=${dates.today}&with_watch_providers=${getPlatformID(platform)}&watch_region=IE`);
          streamingMultiPages = streamingMultiPages.concat(streamingMulti.results);
      }
      results = streamingMultiPages.flat();
      streaming = "";
    }
    //console.log( streaming.results);
    //if( streaming ) { console.log(streaming); return(streaming.results); }
    if( streaming ) { results = streaming.results; }
    //if(results) { console.log(results); }
    //Get full movies from TMDB
    
    
    if( results ) 
    {
      //console.log(results);
      let tmdbMovies = [];
      let omdbMovies = [];
      let moviePosters = [];
      let id = "";
      let imdbid = "";
      let posterpath = "";
      let moviesObjects = [];

      for (let x = 0; x < results.length; x++) 
      { 
        //console.log( results[x].id )
        let movieObject = {};
        //Get the TMDB movie
        //console.log(results[x].id)
        id = results[x].id;
        let tmdbresponse = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=beb7333fa1f8ebe8515528cdc7c5e454`);
        tmdbMovies.push(tmdbresponse);
        //console.log(tmdbresponse)


        movieObject.id = tmdbresponse.data.id;
        movieObject.title = tmdbresponse.data.title;
        movieObject.release_date = tmdbresponse.data.release_date;
        movieObject.overview = tmdbresponse.data.overview;
        movieObject.poster_path = tmdbresponse.data.poster_path;
        movieObject.imdb_id = tmdbresponse.data.imdb_id;
        let genres = "";
        for (let y = 0; y < tmdbresponse.data.genres.length; y++)
        {          
          genres = genres.concat(tmdbresponse.data.genres[y].name + ', ');
           
        }
        movieObject.genres = genres.slice(0, -2);
        //console.log(movieObject);

        //Get the OMDB movie
        imdbid = tmdbresponse.data.imdb_id;
        const omdbresponse = await axios(`http://www.omdbapi.com/?i=${imdbid}&plot=full&apikey=d59ecab9`);
        omdbMovies.push(omdbresponse);

        movieObject.runtime = omdbresponse.data.Runtime;
        movieObject.director = omdbresponse.data.Director;
        movieObject.writer = omdbresponse.data.Writer;
        movieObject.actors = omdbresponse.data.Actors;
        movieObject.language = omdbresponse.data.Language;
        movieObject.imdb_rating = omdbresponse.data.imdbRating;
        //console.log(movieObject);

        //Get the poster blobs
        posterpath = tmdbresponse.data.poster_path;
        let posterresponse = await axios(`http://image.tmdb.org/t/p/w200${posterpath}`, {responseType: 'blob'});
        moviePosters.push(posterresponse);
        //console.log(posterresponse)

        movieObject.poster = posterresponse.data;

        moviesObjects.push(movieObject);
      }
      return moviesObjects;
    
    }



  }



  const getMovieRequest = async () => {

    var dates = getDates(30);

    const cinemaResults = await getCinema(dates);
    setCinemaMovies(cinemaResults);

    const netflixResults = await getStreaming(dates, 'netflix');
    setNetflixMovies(netflixResults);

    const disneyResults = await getStreaming(dates, 'disney');
    setDisneyMovies(disneyResults);

    const primeResults = await getStreaming(dates, 'prime');
    setPrimeMovies(primeResults);

    const appleResults = await getStreaming(dates, 'apple');
    setAppleMovies(appleResults);

  };


  useEffect(() => {
    getMovieRequest();
  }, []);


  return (
    <Router>
      <div>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<Home cinema={cinemaMovies} netflix={netflixMovies} disney={disneyMovies} 
                                                 prime={primeMovies} apple={appleMovies} />} />
            <Route path="/cinema" element={<Cinema cinema={cinemaMovies} />} />
            <Route path="/netflix" element={<Netflix netflix={netflixMovies} />} />
            <Route path="/disney" element={<Disney disney={disneyMovies} />} />
            <Route path="/prime" element={<Prime prime={primeMovies} />} />
            <Route path="/apple" element={<Apple apple={appleMovies} />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/search" element={<Search />}/>
            <Route path="/watchlist" element={<Watchlist />}/>
          </Routes>
      </div>
    </Router>
  ); 
};

export default App;