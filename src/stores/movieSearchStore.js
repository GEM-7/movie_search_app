// movieSearchStore.js (Zustand store for movie search)
import { create } from "zustand";

export const useMovieStore = create((set) => ({
    movies: [],
    setMovies: (movies) => set({ movies }),
    addMovie: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
    removeMovie: (movie) => set((state) => ({ movies: state.movies.filter((m) => m.id !== movie.id) })),
    clearMovies: () => set({ movies: [] }),
    favoriteMovies: [],
    setFavoriteMovies: (movies) => set({ favoriteMovies: movies }),
    addFavoriteMovie: (movie) => set((state) => ({ favoriteMovies: [...state.favoriteMovies, movie] })),
    removeFavoriteMovie: (movie) => set((state) => ({ favoriteMovies: state.favoriteMovies.filter((m) => m.id !== movie.id) })),
    clearFavoriteMovies: () => set({ favoriteMovies: [] }),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
    searchMovies: async (query) => {
        set({ isLoading: true, error: null });
        try {
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const apiUrl = import.meta.env.VITE_OMDB_API_URL;

            if (!apiKey || !apiUrl) {
                throw new Error("Missing OMDB API Key or URL in configuration");
            }

            const response = await fetch(`${apiUrl}/?apikey=${apiKey}&s=${query}`);
            const data = await response.json();

            if (data.Response === "False") {
                throw new Error(data.Error || "Failed to fetch movies");
            }

            set({ movies: data.Search || [], isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false, movies: [] });
        }
    },
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
