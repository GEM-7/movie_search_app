// Filter Component
import { useState } from "react";
import { useMovieStore } from "../stores/movieSearchStore";

export default function Filter() {
  const { filters, setFilters, searchMovies, searchQuery } = useMovieStore();
  const [year, setYear] = useState(filters.year || "");
  const [genre, setGenre] = useState(filters.genre || "");
  const [rating, setRating] = useState(filters.rating || "");

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Documentary",
  ];

  const handleApplyFilters = () => {
    setFilters({ year, genre, rating });
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center w-full gap-6">
      <div className="flex flex-row justify-center items-center gap-8">
        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-semibold">
            Year:
          </label>
          <input
            type="number"
            id="year"
            name="year"
            min="1900"
            max={new Date().getFullYear()}
            step="1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-1 rounded w-24 focus:ring-2 focus:ring-orange-600 outline-none"
            placeholder="YYYY"
          />
        </div>
        {/* Genre Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="genre" className="font-semibold">
            Genre:
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border p-1 rounded focus:ring-2 focus:ring-orange-600 outline-none cursor-pointer w-40"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g.toLowerCase()} className="text-black">
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="rating" className="font-semibold">
            Min Rating:
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-1 rounded w-20 focus:ring-2 focus:ring-orange-600 outline-none"
          >
            <option value="">All Ratings</option>
            {Array.from({ length: 11 }, (_, i) => i).map((i) => (
              <option key={i} value={i} className="text-black">
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-10 rounded-lg shadow-md transition-all active:scale-95"
      >
        Apply Filters
      </button>
    </div>
  );
}
