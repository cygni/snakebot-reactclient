import snakelogo from '../assets/logos/snakelogo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/hooks';
import { setLoggedIn } from '../context/slices/tournamentSlice';

function PageHeader() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.tournament.isLoggedIn);

  function handleLogout() {
    localStorage.removeItem('token');
    dispatch(setLoggedIn(false));
  }

  return (
    <header className={pathname === '/' ? 'navbar-startpage' : ''}>
      <Link to='/'>
        <img src={snakelogo} alt='Snakebot-logo' />
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'selected' : '')}>
              Start
            </NavLink>
          </li>
          <li>
            <NavLink to='/viewgame' className={({ isActive }) => (isActive ? 'selected' : '')}>
              Game
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink to='/tournament' className={({ isActive }) => (isActive ? 'selected' : '')}>
                Tournament
              </NavLink>
            </li>
          ) : null}
          {isLoggedIn ? (
            <NavLink to='/' onClick={handleLogout}>
              Logout
            </NavLink>
          ) : (
            <li>
              <NavLink to='/login' className={({ isActive }) => (isActive ? 'selected' : '')}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default PageHeader;
