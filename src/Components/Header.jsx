import { useState ,useEffect } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'
import { resources} from '../assets/resources'
import { searchResult} from '../assets/resources'

import {useLoaderData , useParams}from 'react-router-dom'


// export const fetchNowPlayingMovies = async () => {
//   try {
//     const nowPlayingMoviesData = await resources('movie/top_rated', { page: 1 });
//     console.log(nowPlayingMoviesData.results)
//     return nowPlayingMoviesData.results;
    
//   } catch (error) {
//     // Handle any errors that may occur during the fetch
//     console.error('Error fetching now-playing movies:', error);
//     throw error; // Rethrow the error to handle it further up the call stack if needed
//   }
// };


export default function Header () {
   
   const [searchTerm, setSearchTerm] = useState('');
   const [headerMovie, setHeaderMovie] = useState('');
   const [searched, setSearched] = useState('');
   const [loading, setLoading] = useState(false);
   const [close, setClose] = useState(false);
   
  // const headMovie = useLoaderData()
  // console.log(n)
  // //setHeaderMovie(MoviesList)
   
  useEffect(() => {
   async function  ff () {
const MoviesList = await  resources('movie/popular', { page: 1 });
console.log(MoviesList)
setHeaderMovie(() => MoviesList.results[5] )
}
ff()
  },[])
   
   
   
   useEffect(() => {
     setLoading(true)
try {
const searchList =  searchResult.results
console.log(searchList)
setSearched(() => searchList )
} finally{
  setLoading(false)
}
  },[])
  
  
  

  
   return(
     
     <div className="relative  h-[40vh]"> 
     
      
             <img src={`https://image.tmdb.org/t/p/w780${headerMovie.backdrop_path}`}
          alt={headerMovie.title}
          className="absolute subhero w-full h-full"/>

     
     <div className="text-white flex flex-col justify-end items-start subhero h-full w-full absolute  py-4 px-3 z-1 bottom-0 "> 
     <h2  className=" text-xl w-[45%] leading-[24px] mb-2 font-bold relative" > {headerMovie.title}</h2>
     <h2 className="w-[45%] text-[8px] leading-[10px] font-bold relative"> {headerMovie.overview}</h2>
     <button className="relative bg-red-500 px-2 py-1  mt-2 drop-shadow-lg rounded-md"> watch trailer </button>
     </div>
     
     </div> 
     )
 }