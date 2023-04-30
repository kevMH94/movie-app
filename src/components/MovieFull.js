import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {db} from '../db.js';

const MovieFull = ({movie}) => {
	
	// const [imdbId, setImdbId] = useState("");
	// const [omdbMovie, setOmdbMovie] = useState({});
	// useEffect(() => {
	// 	const getImdbId = async () => {
	// 	  const id = await axios.get("https://api.themoviedb.org/3/movie/" + movie.id + "/external_ids?api_key=beb7333fa1f8ebe8515528cdc7c5e454");
	// 	  const omdb = await axios.get("http://www.omdbapi.com/?i=" + id.data.imdb_id + "&plot=full&apikey=d59ecab9");
	// 	  setImdbId(id.data.imdb_id);
	// 	  setOmdbMovie(omdb.data);
	// 	  // console.log(id.data.imdb_id);
	// 	  // console.log(omdb.data);
	// 	  // console.log(movie);
	// 	}
	// 	getImdbId();		
	// }, []);
	console.log(movie);
  const addItemToDb = async movie => {
    
    //let image = movie.poster
    let id = movie.id
    let movieObject = movie 
	  await db.watchlist.add({ 
	    id,
	    movieObject
	  })
    
  }

  const removeItemFromDb = async movie => {
    //console.log(movie)
    await db.watchlist.delete(movie.id)
  } 

	return (
			<div className='movie'>		
		        <h1>Title: {movie.title}</h1>
		        <h2>Release Date: {movie.release_date}</h2>
		        <h3>Overview: {movie.overview}</h3>
		        <h3>Genres: {movie.genres}</h3>
		        <h3>Running Time: {movie.runtime}</h3>
		        <h3>Director: {movie.director}</h3>
		        <h3>Written By: {movie.writer}</h3>
		        <h3>Cast: {movie.actors}</h3>
		        <h3>Language: {movie.language}</h3>
		        <h3>IMDB Rating: {movie.imdb_rating}</h3>
		        <img src={URL.createObjectURL(movie.poster)} />
				<button onClick={() => addItemToDb(movie)}>Add Item To DB</button>
    			<button onClick={() => removeItemFromDb(movie)}>Remove Item From DB</button>  
			</div>
	);
};

export default MovieFull;


//tt16252698