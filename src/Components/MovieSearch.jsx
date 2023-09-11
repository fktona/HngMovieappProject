import { useState , useEffect , useContext } from "react"
import { topRatedMovies} from '../assets/resources'
import {useNavigate } from "react-router-dom"
import { AppContext } from '../assets/AppContext'



export default function MovieSeached ()  {
  const Navigate = useNavigate()
  
  const {searched, setSearched ,searchTerm, setSearchTerm} =  useContext(AppContext)
  
  
 
 return (
   
   <div className="p-2 text-center">
             <button
        onClick={() => {
          setSearchTerm("")
          Navigate(-1)}}
        className="p-[3px] left-0  px-3 left-0 top-5 text-center relative text-sm bg-red-400 shadow-md text-white"
      >Back</button>
      {searchTerm ? <>
      <h2>Search results</h2>
      <ul className=" grid grid-cols-2  mx-auto lg:grid-cols-4">
        {searched.map((movie) => (
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
      </>:Navigate("/")}
    </div>
  );
 
 }