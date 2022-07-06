import snakelogo from '../assets/logos/snakelogo.png';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/hooks';
import { setLoggedIn } from '../context/slices/tournamentSlice';

function PageHeader() {
  const isLoggedIn = useAppSelector(state => state.tournament.isLoggedIn);
  const dispatch = useAppDispatch();

  function handleLogout() {
    localStorage.removeItem('token');
    dispatch(setLoggedIn(false));
  }

  return (
    <header>
    <Link to="/">
      <img src={snakelogo} alt="Snakebot-logo" />
    </Link>
    <nav>
      <ul>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'selected' : '')}>Start</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'selected' : '')}>About</NavLink></li>
        <li><NavLink to="/viewgame" className={({ isActive }) => (isActive ? 'selected' : '')}>Game</NavLink></li>
        <li><NavLink to="/getting-started" className={({ isActive }) => (isActive ? 'selected' : '')}>Getting started</NavLink></li>
        
        {isLoggedIn ? (<li><NavLink to="/tournament" className={({ isActive }) => (isActive ? 'selected' : '')}>Tournament</NavLink></li>) 
        : null}

        {isLoggedIn ? (<NavLink to="/" onClick={handleLogout} >Logout</NavLink>)
        : (<li><NavLink to="/login" className={({ isActive }) => (isActive ? 'selected' : '')}>Login</NavLink></li>)}
      </ul>
    </nav>
  </header>
  );
}

export default PageHeader;