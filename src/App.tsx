import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './stylesheet.scss';
import GettingStartedView from './views/GettingStartedView';

function App() {
  return (
  <>
   <BrowserRouter>
   <PageHeader/>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/about" element={<AboutView />}></Route>
        <Route path="/getting-started" element={<GettingStartedView />}></Route>
      </Routes>
   </BrowserRouter>


    <PageFooter/>
    
    </>
  );
}

export default App;
