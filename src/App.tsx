import './stylesheet.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import GettingStartedView from './views/GettingStartedView';
import GamesearchView from './views/GamesearchView';
import axios from 'axios';
import Constants from './constants/constants';
import GameboardView from './views/GameboardView';
import { GameProvider } from './context/GameProvider';


function App() {
  axios.defaults.baseURL = Constants.SERVER_URL;

  return (
  <GameProvider>
   <BrowserRouter>
   <PageHeader/>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/about" element={<AboutView />}></Route>
        <Route path="/getting-started" element={<GettingStartedView />}></Route>
        <Route path="/viewgame" element={<GamesearchView />}></Route>
        <Route path="/viewgame/:gameID" element={<GameboardView />}></Route>
      </Routes>
   </BrowserRouter>


    <PageFooter/>
    
    </GameProvider>
  );
}

export default App;
