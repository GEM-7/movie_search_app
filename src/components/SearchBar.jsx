// SearchBar Component
import { useMovieStore } from "../stores/movieSearchStore";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  // Use Movie Store
  const { setSearchQuery: setStoreSearchQuery, searchMovies } = useMovieStore();
  // Handle Search
  const handleSearch = (query) => {
    if (onSearch) {
      onSearch(query);
      return;
    }
    setStoreSearchQuery(query);
    if (query.trim()) {
      searchMovies(query);
    }
  };
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };
  // Search Query
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex justify-center mt-14 w-full">
      {" "}
      <div className="relative flex items-center">
        {" "}
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          className="w-90 pl-4 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-2 rounded-4xl focus:ring-orange-500"
        />{" "}
        <button
          onClick={handleSubmit}
          className="absolute right-3 h-5 w-5 text-gray-400 hover:text-orange-500"
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {" "}
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.448 4.272l3.022 3.022a.75.75 0 11-1.06 1.06l-3.022-3.022A7 7 0 012 9z"
              clipRule="evenodd"
            />{" "}
          </svg>
        </button>{" "}
      </div>{" "}
    </div>
  );
}
