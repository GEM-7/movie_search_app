// FavoritesPage Component
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import MovieCard from "./MovieCard";
import { useMovieStore } from "../stores/movieSearchStore";
import { useState } from "react";

export default function FavoritesPage() {
  const { favoriteMovies, clearFavoriteMovies } = useMovieStore();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [localFilters, setLocalFilters] = useState({
    year: "",
    genre: "",
    rating: "",
  });

  const filteredMovies = favoriteMovies.filter((movie) => {
    // Search Query (Title)
    if (
      localSearchQuery &&
      !movie.Title.toLowerCase().includes(localSearchQuery.toLowerCase())
    ) {
      return false;
    }

    // Year Filter
    if (localFilters.year) {
      // Handle "YYYY" and "YYYY-YYYY" formats
      if (!movie.Year.includes(localFilters.year)) {
        return false;
      }
    }

    // Genre Filter
    if (localFilters.genre) {
      if (
        !movie.Genre ||
        !movie.Genre.toLowerCase().includes(localFilters.genre.toLowerCase())
      ) {
        return false;
      }
    }

    // Rating Filter
    if (localFilters.rating) {
      if (
        !movie.imdbRating ||
        parseFloat(movie.imdbRating) < parseFloat(localFilters.rating)
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div>
      {/* Search Bar for Favorites */}
      <SearchBar onSearch={setLocalSearchQuery} />

      {/* Filter for Favorites */}
      <Filter onApply={setLocalFilters} initialFilters={localFilters} />

      {/* Favorites List */}
      <div className="mt-10">
        <div className="flex justify-between items-center px-8 mb-4">
          <h2 className="text-2xl font-bold">Favorite Movies</h2>
          {favoriteMovies.length > 0 && (
            <button
              onClick={clearFavoriteMovies}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {filteredMovies.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            {favoriteMovies.length === 0
              ? "No favorite movies yet."
              : "No favorites match your search."}
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 center">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.imdbID || movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
