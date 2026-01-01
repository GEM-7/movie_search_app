// MovieList Component
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import { useMovieStore } from "../stores/movieSearchStore";
import Filter from "./Filter";

export default function MovieList() {
  const { movies, isLoading, error } = useMovieStore();
  return (
    <div>
      {/* Search Bar */}
      <SearchBar className="mt-14" />
      {/* Filter */}
      <Filter />
      {/* Movie List */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold ml-8 mb-4">Movie List</h2>

        {isLoading && <p className="text-center font-extrabold text-gray-500">Loading...</p>}
        {error && <p className="text-center font-extrabold text-red-500">Error: {error}</p>}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 center">
          {Array.isArray(movies) &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
}
