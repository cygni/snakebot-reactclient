import snakelogo from '../assets/logos/snakelogo.png';
import { Link, NavLink } from 'react-router-dom';

function PageFooter() {
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
        <li><NavLink to="/tournament" className={({ isActive }) => (isActive ? 'selected' : '')}>Tournament</NavLink></li>
        {/*
          <li><NavLink to="arena" activeClassName="selected">Arena</NavLink></li>
        */}
        {/* <li><NavLink to="viewgame" activeClassName="selected">Games</NavLink></li>
        {loggedIn ?
          <li><NavLink to="tournament" activeClassName="selected">Tournament</NavLink></li>
          : null
        }
        {loggedIn ?
          <li><a href="" onClick={tryLogout}>Log out</a></li> :
          <li><NavLink to="auth" activeClassName="selected">Log in</NavLink></li>
        } */}
      </ul>
    </nav>
  </header>
  );
}

export default PageFooter;