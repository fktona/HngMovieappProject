import React, { useEffect, useState } from 'react';
import { resources } from "../assets/resources";
import MovieCard from "./MovieCard";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Retrieve the list of favorite movie titles from local storage
    const storedFav = JSON.parse(localStorage.getItem('fav'))
    setFavorites(storedFav);
  }, []);

  useEffect(() => {
    console.log(favorites)
    async function tryy() {
      setLoading(true);
      try {
        for (const title of favorites) {
        const response = await resources("search/movie", { query: title });
        setFavoriteMovies(response.results);}
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    tryy();
  }, []);
  
  
  return (
    <div>
      <h1>Your Favorite Movies</h1>
      <ul>
        {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
