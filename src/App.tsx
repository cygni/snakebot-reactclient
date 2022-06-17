import HomeView from './views/HomeView';
import PageFooter from './components/PageFooter';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './stylesheet.scss';

function App() {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomeView />}></Route>
   </Routes>
   </BrowserRouter>


    <PageFooter/>
    </>
  );
}

export default App;
