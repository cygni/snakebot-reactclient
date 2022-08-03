import './stylesheet.scss';
import { store } from './context/store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import StartView from './views/StartView';
import GamesearchView from './views/GamesearchView';
import GameboardView from './views/GameboardView';
import TournamentView from './views/TournamentView';
import LoginView from './views/LoginView'
import Constants from './constants/Arbitraryconstants';
import ArenaView from './views/ArenaView';

function App() {
  console.log("%cUsing server url: " + Constants.SERVER_URL, 'background: #222; color: #bada55');
  axios.defaults.baseURL = Constants.SERVER_URL;

  // Ugly hack to initialize voices array (API limitation)
  speechSynthesis.getVoices();

  return (
  <Provider store={store}>
    <BrowserRouter>
    <PageHeader/>
      <Routes>
        <Route path="/" element={<StartView />}></Route>
        <Route path="/viewgame" element={<GamesearchView />}></Route>
        <Route path="/viewgame/:gameID" element={<GameboardView />}></Route>
        <Route path="/arena" element={<ArenaView/>}></Route>
        <Route path="/tournament" element={<TournamentView />}></Route>
        <Route path="/login" element={<LoginView/>}></Route>
      </Routes>
      <PageFooter/>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
