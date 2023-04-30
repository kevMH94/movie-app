import MovieList from '../components/MovieList';
function Apple({apple}) {

  return (
    <div className='slider'>
      <h2 className="category_heading">Apple</h2>
      <MovieList movies={apple} />
    </div>
  )
}

export default Apple;