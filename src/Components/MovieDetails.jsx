import { resources} from '../assets/resources'
import {useLoaderData , useParams}from 'react-router-dom'

export const loadingMovieDetails = async ({params}) => {
  
  const {id } = params
   const MovieDetailsList = await resources(`movie/${id}`)
  return MovieDetailsList
  
 }
 
export default function MovieDetails () {
  const {id } = useParams
const detailMovie = useLoaderData()
console.log(detailMovie)
  
  return (
    <div className="text-black"> 
         <ul className=" ">
        
          <li className="m-4  gap-1 justify-between   p-2 shadow-lg" key={detailMovie.id}
          data-testid="movie-card">
             <img src={`https://image.tmdb.org/t/p/w780${detailMovie.backdrop_path}`}
          alt={detailMovie.title}
          className={`absolute z-[-1] left-0 top-0 $ w-full h-[30vh]`}/>
            <h3 
            data-testid="movie-title"className="text-md font-semibold">{detailMovie.title}</h3>
            <p className="text-slate-500 font-semibold"data-testid="movie-release-date">Release Date: {detailMovie.release_date}</p>
            <p className="text-slate-500 font-semibold"data-testid="movie-release-date">Release Date: {detailMovie.runtime}min</p>
            <p className="text-slate-500 font-semibold"data-testid="movie-release-date">Release Date: {detailMovie.overview}</p>
            {/* Add more movie details as needed */}
          </li>
       
      </ul>
    
    </div>
    )
}

