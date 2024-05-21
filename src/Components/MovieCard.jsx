import React, { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { FaImdb } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";

export default function MovieCard({ movie }) {
  const [fav, setFav] = useState([]);
  const [showNot, setShowNot] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  

  const addFav = (title) => {
  // Retrieve the existing favorites from local storage
  const storedFav = JSON.parse(localStorage.getItem('fav')) || [];

  // Check if the item is already in the favorites
  if (storedFav.includes(title)) {
    // Remove the item from the existing favorites
    const updatedFav = storedFav.filter((item) => item !== title);
    setPopupMessage(`${title} removed from favorites`);

    // Save the updatedFav array to local storages
    localStorage.setItem('fav', JSON.stringify(updatedFav));

    // Update the state with the new favorites array
    setFav(updatedFav);
  } else {
    // Item is not in favorites, add it
    const updatedFav = [...storedFav, title];
    setPopupMessage(`${title.title} added to favorites`);

    // Save the updatedFav array to local storage
    localStorage.setItem('fav', JSON.stringify(updatedFav));

    // Update the state with the new favorites array
    setFav(updatedFav);
  }

  setTimeout(() => {
    setPopupMessage('');
  }, 3000);
};


useEffect(() => {
  // Retrieve the 'fav' array from local storage when the component mounts
  const storedFav = JSON.parse(localStorage.getItem('fav'));

  if (storedFav) {
    setFav(storedFav);
  }
}, []);

  return (
    <>
      {popupMessage && (
        <div className="custom-popup bg-red-600">{popupMessage}</div>
      )}

      <li
        className="flex flex-col gap-1 relative justify-between max-w-[300px] mb-4 p-1 shadow-lg"
        key={movie.id}
        data-testid="movie-card"
      >
        <p
          onClick={() => addFav(movie)}
          className="text-2xl z-[5] absolute bg-white/[.35] p-2 top-6 right-6 text-red-600 rounded-full mx-auto"
        >
          {fav.includes(movie) ? (
            <MdFavorite />
          ) : (
            <MdFavoriteBorder />
          )}
        </p>
        <Link to={`/movies/${movie.id?.toString()}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="min-height[70] relative"
            data-testid="movie-poster"
          />

          <p className="flex gap-8 justify-between flex-row-reverse font-robo items-center">
            <span className="flex items-center gap-1 ">
              <GiTomato className="text-xl text-red-600" />
              {movie.popularity > 100 ? "100" : Math.floor(movie.popularity)}%
            </span>{" "}
            <span className="flex items-center gap-1 ">
              <FaImdb className="bg-[#F4C611] text-black text-xl" />{" "}
              {movie.vote_average}
            </span>
          </p>
          <h3
            data-testid="movie-title"
            className="text-sm font-semibold font-robo"
          >
            {" "}
            {movie.title}
          </h3>
          <p
            className="text-slate-500 font-mono text-[12px] font-semibold"
            data-testid="movie-release-date"
          >
            Release Date: {movie.release_date}
          </p>
          {/* Add more movie details as needed */}
        </Link>
      </li>
    </>
  );
}
