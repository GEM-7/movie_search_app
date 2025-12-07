import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import MovieList from "./components/MovieList";
import PageNotFound from "./components/PageNotFound";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
