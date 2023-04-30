import MovieList from '../components/MovieList';
function Cinema({cinema}) {

  return (
    <div className='slider'>
      <h2 className="category_heading">Cinema</h2>
      <MovieList movies={cinema} />
    </div>
  )
}

export default Cinema;