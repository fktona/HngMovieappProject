import { resources} from '../assets/resources'
import {useLoaderData , useParams}from 'react-router-dom'
import { useState ,useEffect ,useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { MdWest } from 'react-icons/md';

export const loadingMovieDetails = async ({params}) => {
  
  const {id } = params
   const MovieDetailsList = await resources(`movie/${id}`)
  return MovieDetailsList
 }

 
export default function MovieDetails () {
  

  
  
  const {id } = useParams
const detailMovie = useLoaderData()
console.log(detailMovie)
 detailMovie.id
const dateComponents = detailMovie.release_date.split('-');
const year = parseInt(dateComponents[0]);
const month = parseInt(dateComponents[1]) - 1; 
const day = parseInt(dateComponents[2]);

const utcDate = new Date(Date.UTC(year, month, day));

 const Navigate = useNavigate()
 

  

 

  return (
    <div className="  text-black top-0 w-f"> 
         <ul className=" ">
        
          <li className="relative openng w-full " key={detailMovie.id}
          >
          <div className=" subhero relative ">
             <img src={`https://image.tmdb.org/t/p/w780${detailMovie.backdrop_path}`}
          alt={detailMovie.title}
          className={`relative z-[-1] left-0 top-0 $ w-full h-[40vh]`}/>      
          </div>
              <h3 
            data-testid="movie-title"className=" mx-auto p-3 pb-1 text-[1.5rem] mt-8  mb-8 w-fit text-red-600 font-robo font-semibold">{detailMovie.title}</h3>
          <div className='relative   flex flex-col gap-4 items-center justify-between p-2  items-center'>
        
            <p className="text-gray-600 text-sm shadow-md p-2 font-semibold font-mono "data-testid="movie-release-date">Release Date: {utcDate.toISOString()}</p>
            
            
            <p className="text-gray-600 font-mono texthsm shadow-md p-2 font-semibold"data-testid="movie-runtime">Runtime: {detailMovie.runtime}min</p> </div>
            
            
            <p className="text-slate-800 relative p-3 text-sm  m-4 font-popi shadow-md md:max-w-[70vw] mx-auto flex justify-between gap-3 font-semibold"data-testid="movie-overview">
           
           <p className="mx-auto font-robo font-semibold flex items-center  w-fit bg-red-600 text-white w-[80%] text-2xl relative left-0 p-2"><p className=" md:rotate-0 rotate-90">Overview</p>
             
             </p> {detailMovie.overview}</p>
            {/* Add more movie details as needed */}
                             <button
        onClick={() => Navigate(-1)}
        className="p-[6px] px-3 bottom-0 text-center relative text-sm bg-red-600 shadow-md left-[48%] text-white"
      >
        <MdWest />
      </button>
          </li>

      </ul>

    </div>
    )
}

