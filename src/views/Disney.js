import MovieList from '../components/MovieList';
function Disney({disney}) {

  return (
    <div className='slider'>
      <h2 className="category_heading">Disney</h2>
      <MovieList movies={disney} />
    </div>
  )
}

export default Disney;