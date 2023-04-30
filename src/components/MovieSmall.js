import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {db} from '../db.js';


const MovieSmall = ({movie}) => {


	console.log(movie)
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


	return (
		
		<div className='movie'>		
      	<Link to={`/movie/${movie.id}`} state={{ movie: {movie} }} >
      	<img src={URL.createObjectURL(movie.poster)} />
      	</Link>
    	<button onClick={() => addItemToDb(movie)}>Add Item To DB</button>
    	<button onClick={() => removeItemFromDb(movie)}>Remove Item From DB</button>  
		</div>
	);
};

export default MovieSmall;