// MovieCard Component
import { useState } from "react";
import { useMovieStore } from "../stores/movieSearchStore";

export default function MovieCard({ movie }) {
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
    useMovieStore();

  // Check if movie is already in favorites
  const isLiked = favoriteMovies.some((fav) => fav.imdbID === movie.imdbID);

  const handleToggleFavorite = async () => {
    if (isLiked) {
      removeFavoriteMovie(movie.imdbID);
    } else {
      // Fetch full details before adding to support valid filtering
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const apiUrl = import.meta.env.VITE_OMDB_API_URL;
        const response = await fetch(
          `${apiUrl}/?apikey=${apiKey}&i=${movie.imdbID}`
        );
        const fullMovieData = await response.json();

        if (fullMovieData.Response === "True") {
          addFavoriteMovie(fullMovieData);
        } else {
          // Fallback if details fetch fails
          addFavoriteMovie(movie);
        }
      } catch (error) {
        console.error("Failed to fetch movie details for favorite:", error);
        addFavoriteMovie(movie);
      }
    }
  };
  const imageUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    // Movie Card
    <div className="bg-white w-72 rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center">
      <img
        src={imageUrl}
        alt={movie.Title}
        className="w-72 h-100 object-cover rounded-md"
      />
      <h2 className="text-lg text-black text-center font-bold mt-2">
        {movie.Title}
      </h2>
      <p className="text-gray-500 text-sm font-bold text-center">
        {movie.Year}
      </p>
      <button onClick={handleToggleFavorite} className="mt-2">
        <svg
          className={`w-6 h-6 transition-colors duration-200 ${
            isLiked ? "fill-red-500 text-red-500" : "fill-none text-gray-500"
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
}
