import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {db} from '../db.js';
import { useLiveQuery } from "dexie-react-hooks";
import MovieSmallWatchlist from '../components/MovieSmallWatchlist'


const Watchlist = ({movie}) => {



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
    await db.watchlist.delete(movie.id)
  } 


	// return (
		
	// 	<div className='movie'>
	// 	  <button onClick={() => addItemToDb(movie)}>Add Item To DB</button> 
    //       <button onClick={() => removeItemFromDb(movie)}>Remove Item From DB</button>		
    //   	<Link to={`/movie/${movie.id}`} state={{ movie: {movie} }} >
    //   	<img src={"http://image.tmdb.org/t/p/w200" + movie.poster_path} alt={`Poster of ${movie.title}`}></img>
    //   </Link>
    // 	<button className="add_button">Add to Watchlist</button>  
	// 	</div>
	// );

  const items = useLiveQuery( () => db.watchlist.toArray(), [] );
  //console.log( items);
  if( items && items.length > 0 ) 
  {
		return (
				<ul className="slider_new">
				  {items.map((movie) => (
				<MovieSmallWatchlist movie={movie} />
	      ))}
		 		</ul>
		);
	} else {
		return (
			<div>
				<h1>No Items to Show!</h1>
			</div>
		);
	}
};


export default Watchlist;