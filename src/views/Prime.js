import MovieList from '../components/MovieList';
function Prime({prime}) {

  return (
    <div className='slider'>
      <h2 className="category_heading">Prime</h2>
      <MovieList movies={prime} />
    </div>
  )
}

export default Prime;