import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Catalogue from './pages/Catalogue/Catalogue';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import SeriesDetail from './pages/SeriesDetail/SeriesDetail';
import GameDetail from './pages/GameDetail/GameDetail';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Catalogue />} />
          <Route path="/film/:id" element={<MovieDetail />} />
          <Route path="/serie/:id" element={<SeriesDetail />} />
          <Route path="/jeu/:id" element={<GameDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
