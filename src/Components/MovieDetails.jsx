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

const dateComponents = detailMovie.release_date.split('-');
const year = parseInt(dateComponents[0]);
const month = parseInt(dateComponents[1]) - 1; 
const day = parseInt(dateComponents[2]);

const utcDate = new Date(Date.UTC(year, month, day));

 const Navigate = useNavigate()

  return (
    <div className="  text-black top-0 w-f"> 
         <ul className=" ">
        
          <li className="absolute  openng w-full " key={detailMovie.id}
          >
          <div className=" relative subhero">
             <img src={`https://image.tmdb.org/t/p/w780${detailMovie.backdrop_path}`}
          alt={detailMovie.title}
          className={`relative z-[-1] left-0 top-0 $ w-full h-[40vh]`}/>      
          </div>
              <h3 
            data-testid="movie-title"className="text-sm mx-auto p-3 pb-1 text-xl w-fit font-semibold">{detailMovie.title}</h3>
          <div className='relative flex justify-between p-2 items-center'>
        
            <p className="text-slate-600 shadow-md p-2 font-semibold "data-testid="movie-release-date">Release Date: {utcDate.toISOString()}</p>
            <p className="text-slate-600 shadow-md p-2 font-semibold"data-testid="movie-runtime">Time: {detailMovie.runtime}min</p> </div>
            <p className="text-slate-600 p-3 text-sm leading-[15px] m-4 shadow-md font-semibold"data-testid="movie-overview"><p className="mx-auto w-fit text-xl p-2">Overview</p> {detailMovie.overview}</p>
            {/* Add more movie details as needed */}
                             <button
        onClick={() => Navigate(-1)}
        className="p-[3px] px-3 bottom-0 text-center relative text-sm bg-red-500 shadow-md left-[48%] text-white"
      >
        <MdWest />
      </button>
          </li>

      </ul>

    </div>
    )
}

