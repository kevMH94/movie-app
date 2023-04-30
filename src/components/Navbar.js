import {Link} from 'react-router-dom';

function Navbar(data) {
  return (
    <div className="navbar">
      <Link to="/"> Home</Link>
      <Link to="/cinema">Cinema</Link>
      <Link to="/netflix">Netflix</Link>
      <Link to="/disney">Disney</Link>
      <Link to="/prime">Prime</Link>
      <Link to="/apple">Apple</Link>
      <Link to="/search">Search</Link>
      <Link to="/watchlist">Watchlist</Link>
    </div>
  )
}

export default Navbar;