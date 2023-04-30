import Dexie from 'dexie';
//Dexie.delete('MovieApp');



// export const db = new Dexie('ImageTest');
// db.version(1).stores({ 
//   items: "id, title"
// });

export const db = new Dexie('MovieApp');
db.version(1).stores({ 
  watchlist: "id, movie"
});