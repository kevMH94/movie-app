import MovieList from '../components/MovieList';
function Netflix({netflix}) {

  return (
    <div className='slider'>
      <h2 className="category_heading">Netflix</h2>
      <MovieList movies={netflix} />
    </div>
  )
}

export default Netflix;