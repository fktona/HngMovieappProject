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
    <button  onClick={()=>{localStorage.removeItem("fav")
      setFavorites([])}
    }
    
    className="m-6 p-3 relative text-lg m-8 left-[30%] top-8 w-fit bg-red-600">Clear</button>
      <h1>Your Favorite Movies</h1>
      <ul>
     {favorites?.length >0 ?
        favorites?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        )):
        <p class="text-2xl shadow-md m-8 p-3 w-fit mx-auto">No Favorite found</p>}
      </ul>
    </div>
  );
}

export default FavoritesPage;
