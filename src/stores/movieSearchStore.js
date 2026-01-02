// movieSearchStore.js (Zustand store for movie search)
import { create } from "zustand";

export const useMovieStore = create((set, get) => ({
    // Movies
    movies: [],
    setMovies: (movies) => set({ movies }),
    addMovie: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
    removeMovie: (movie) => set((state) => ({ movies: state.movies.filter((m) => m.id !== movie.id) })),
    clearMovies: () => set({ movies: [] }),
    // Favorite Movies
    favoriteMovies: [],
    setFavoriteMovies: (movies) => set({ favoriteMovies: movies }),
    addFavoriteMovie: (movie) => set((state) => ({ favoriteMovies: [...state.favoriteMovies, movie] })),
    removeFavoriteMovie: (id) => set((state) => ({ favoriteMovies: state.favoriteMovies.filter((m) => m.imdbID !== id) })),
    clearFavoriteMovies: () => set({ favoriteMovies: [] }),
    // Search Query
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    // Loading
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    // Error
    error: null,
    setError: (error) => set({ error }),
    // Filters
    filters: { year: "", genre: "", rating: "" },
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),

    searchMovies: async (query) => {
        const { filters } = get();
        set({ isLoading: true, error: null });
        try {
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const apiUrl = import.meta.env.VITE_OMDB_API_URL;

            if (!apiKey || !apiUrl) {
                throw new Error("Missing OMDB API Key or URL in configuration");
            }

            let url = `${apiUrl}/?apikey=${apiKey}&s=${query}`;
            if (filters.year) {
                url += `&y=${filters.year}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "False") {
                throw new Error(data.Error || "Failed to fetch movies");
            }

            set({ movies: data.Search || [], isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false, movies: [] });
        }
    },
    // Fetch Movie Details
    fetchMovieDetails: async (id) => {
        set({ isLoading: true });
        try {
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const apiUrl = import.meta.env.VITE_OMDB_API_URL;
            const response = await fetch(`${apiUrl}/?apikey=${apiKey}&i=${id}`);
            const data = await response.json();
            set({ movieDetails: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    }
}))
