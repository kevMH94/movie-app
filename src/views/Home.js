import MovieList from '../components/MovieList';
function Home({cinema, netflix, disney, prime, apple}) {
  //console.log(cinema)
  return (
    <div className='slider'>
      <h2 className="category_heading">New Movies in the Cinema</h2>
      <MovieList movies={cinema} />
      <h2 className="category_heading">New Movies on Netflix</h2>
      <MovieList movies={netflix} />
      <h2 className="category_heading">New Movies on Disney+</h2>
      <MovieList movies={disney} />
      <h2 className="category_heading">New Movies on Amazon Prime</h2>
      <MovieList movies={prime} />
      <h2 className="category_heading">New Movies on Apple TV</h2>
      <MovieList movies={apple} />
      Home!
    </div>
  )
}

export default Home;