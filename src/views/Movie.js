import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieFull from '../components/MovieFull';
import { useLocation } from "react-router-dom";

function Movie() {

const location = useLocation();
const { movie } = location.state;

  return (
    <div>
      <MovieFull movie={movie.movie} /> 
    </div>
  )

}



export default Movie;