import React from 'react';
import MovieSmall from './MovieSmall.js';

const MovieList = (props) => {

	return (
			<>
			<div className='slider_new'>
			{props.movies.map((movie, index) => (	
				<MovieSmall movie={movie} />
			))}
			</div>
			</>		
	);

};

export default MovieList;