import { useState , useEffect } from "react"
import { topRatedMovies} from '../assets/resources'
import { MdFavorite, MdFavoriteBorder} from 'react-icons/md'
import {useLoaderData , useNavigate , NavLink}from 'react-router-dom'


export const loadingTopMovie = async () => {
   const topMoviesList = await topRatedMovies.results
   return topMoviesList.slice(0,10)
 }

export default function Homepage ()  {
 const Navigate = useNavigate()
  const topMovies = useLoaderData()
  const [ fav , setFav ] = useState([])
  const [ showNot , setShowNot ] = useState(false)
  const [popupMessage, setPopupMessage] = useState('');
  
  
  const addFav = (title) => {
    if (fav.includes(title)) {
     
      setFav((prev) => prev.filter((item) => item !== title));
      setPopupMessage(`${title} removed from favorites`);
    } else {

      setFav((prev) => [...prev, title]);
      setPopupMessage(`${title} added to favorites`);
    }


    setTimeout(() => {
      setPopupMessage('');
    }, 3000); 
  };

 
 return (
   
   <div className="p-2 relative opening">
   {popupMessage && (
        <div className="custom-popup">
          {popupMessage}
        </div>)}
   
      <h2 className="left-6 text-lg  font-semibold relative"> Featured Movie</h2>
      <ul className=" grid  grid-cols-2 md:grid-cols-3 gap-3 md:place-items-center  lg:grid-cols-4">
        {topMovies.map((movie) => (
          <li className=" flex flex-col gap-1 justify-between  max-w-[300px] mb-4 p-2 shadow-lg" key={movie.id}
          data-testid="movie-card">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          data-testid="movie-poster" />
          <p onClick={() =>addFav(movie.title) }
          className="text-3xl text-red-500 mx-auto">
          { fav.find((o) => o === movie.title)? <MdFavorite />:<MdFavoriteBorder /> }</p>
            <h3 
            data-testid="movie-title"className="text-md font-semibold"> {movie.title}</h3>
            <p className="text-slate-500 font-semibold"data-testid="movie-release-date">Release Date: {movie.release_date}</p>
            {/* Add more movie details as needed */}
            
                 <button onClick={ () => Navigate(`movie/${movie.id}`)}
                 
                 className="relative bg-red-500 px-2 py-1  mt-2 mx-auto text-white drop-shadow-lg rounded-md"> View Details</button>
                 
          </li>
        ))}
      </ul>
    </div>
  );
 
 }