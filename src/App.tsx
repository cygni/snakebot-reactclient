import './stylesheet.scss';
import { store } from './context/store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import GettingStartedView from './views/GettingStartedView';
import GamesearchView from './views/GamesearchView';
import axios from 'axios';
import GameboardView from './views/GameboardView';
import { Provider } from 'react-redux';
import TournamentView from './views/TournamentView';
import LoginView from './views/LoginView'
import Constants from './constants/Arbitraryconstants';

function App() {
  axios.defaults.baseURL = Constants.SERVER_URL;

  return (
  <Provider store={store}>
    <BrowserRouter>
    <PageHeader/>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/about" element={<AboutView />}></Route>
        <Route path="/getting-started" element={<GettingStartedView />}></Route>
        <Route path="/viewgame" element={<GamesearchView />}></Route>
        <Route path="/viewgame/:gameID" element={<GameboardView />}></Route>
        <Route path="/tournament" element={<TournamentView />}></Route>
        <Route path="/tournament/:gameID" element={<GameboardView />}></Route>
        <Route path="/login" element={<LoginView/>}></Route>
      </Routes>
    </BrowserRouter>
    <PageFooter/>
  </Provider>
  );
}

export default App;
