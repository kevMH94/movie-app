import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {db} from '../db.js';


const MovieSmallWatchlist = ({movie}) => {



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


  //console.log(movie.movieObject)
  
  let movieToPass = movie.movieObject;
  return (
    
    <div className='movie'>   
        <Link to={`/movie/${movie.movieObject.id}`} state={{ movie: {movieToPass} }} >
        <img src={URL.createObjectURL(movie.movieObject.poster)} />
        </Link>
      <button onClick={() => removeItemFromDb(movie)}>Remove Item From DB</button>  
    </div>
  );
};

export default MovieSmallWatchlist;