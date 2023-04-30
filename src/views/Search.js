import React, { useState } from "react";
import MovieSmall from "../components/MovieSmall";
import axios from 'axios';

export const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const onChange = async (e) => {
    e.preventDefault();

    setQuery(e.target.value);

    let { data: cinema } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`);
    if( cinema ) { setMovies(cinema.results); }
  };

  return (
    <div>  
      <input
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={onChange}
      />


    {movies.length > 0 && (
      <ul className="movies">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieSmall movie={movie} />
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default Search;
