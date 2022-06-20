import './stylesheet.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import GettingStartedView from './views/GettingStartedView';
import GamesearchView from './views/GamesearchView';

function App() {
  return (
  <>
   <BrowserRouter>
   <PageHeader/>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/about" element={<AboutView />}></Route>
        <Route path="/getting-started" element={<GettingStartedView />}></Route>
        <Route path="/viewgame" element={<GamesearchView />}></Route>
      </Routes>
   </BrowserRouter>


    <PageFooter/>
    
    </>
  );
}

export default App;
