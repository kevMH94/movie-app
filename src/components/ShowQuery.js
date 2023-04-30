import React from 'react';
import Dexie from "dexie";
import {db} from '../db.js';
import { useLiveQuery } from "dexie-react-hooks";

const ShowQuery = () => {
	
  // const items = useLiveQuery( () => db.items.toArray(), [] );
  // if( items && items.length > 0 ) 
  // {
	// 	return (
	// 		<ul className="slider_new">
	// 		  {items.map((movie) => (
  //       <div>
  //       <h1>Title: {movie.title}</h1>
  //       <h2>ID: {movie.id}</h2>
  //       <img src={URL.createObjectURL(movie.image)} />
  //       </div>
  //     ))}
	//  		</ul>
	// 	);
	// } else {
	// 	return (
	// 		<div>
	// 			<h1>No Items to Show!</h1>
	// 		</div>
	// 	);
	// }

  const items = useLiveQuery( () => db.watchlist.toArray(), [] );
  //console.log( items );
  if( items && items.length > 0 ) 
  {
		return (
			<ul className="slider_new">
			  {items.map((movie) => (
        <div>
        <h1>Title: {movie.movieObject.title}</h1>
        <h2>ID: {movie.id}</h2>
        <img src={URL.createObjectURL(movie.movieObject.poster)} />
        </div>
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

export default ShowQuery;