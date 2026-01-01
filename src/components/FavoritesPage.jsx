// FavoritesPage Component
import MovieList from "./MovieList";
import { useMovieStore } from "../stores/movieSearchStore";

export default function FavoritesPage() {
  const { favoriteMovies, clearFavoriteMovies } = useMovieStore();
  return (
    <div>
      <MovieList movies={favoriteMovies} />
      <button
        onClick={() => {
          clearFavoriteMovies();
        }}
      >
        Clear Favorites
      </button>
    </div>
  );
}
