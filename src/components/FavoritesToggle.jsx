// FavoritesToggle Component
import { useMovieStore } from "../stores/movieSearchStore";

export default function FavoritesToggle({ movie }) {
    const { addFavoriteMovie, removeFavoriteMovie } = useMovieStore();
    return (
        <div>
            <button onClick={() => { addFavoriteMovie(movie) }}>Add to Favorites</button>
            <button onClick={() => { removeFavoriteMovie(movie) }}>Remove from Favorites</button>
        </div>
    )
}