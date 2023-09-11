import { useState , useEffect } from "react"
import { topRatedMovies} from '../assets/resources'
import {useLoaderData}from 'react-router-dom'
export const loadingTopMovie = async () => {
   const topMoviesList = await topRatedMovies.results
   return topMoviesList.slice(0,10)
 }

export default function Homepage ()  {
  

  const topMovies = useLoaderData()
  


 
 return (
   
   <div className="p-2 text-center">
      <h2>Popular Movies</h2>
      <ul className=" grid grid-cols-2 mx-auto lg:grid-cols-4">
        {topMovies.map((movie) => (
          <li className="m-4 flex flex-col gap-1 justify-between  max-w-[230px] p-2 shadow-lg" key={movie.id}
          data-testid="movie-card">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          data-testid="movie-poster" />
            <h3 
            data-testid="movie-title"className="text-md font-semibold">{movie.title}</h3>
            <p className="text-slate-500 font-semibold"data-testid="movie-release-date">Release Date: {movie.release_date}</p>
            {/* Add more movie details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
 
 }