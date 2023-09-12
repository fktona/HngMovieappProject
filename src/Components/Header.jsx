import { useState ,useEffect } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'
import { resources} from '../assets/resources'
import { searchResult} from '../assets/resources'
import Search from "./Search"
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
  
  
  
 //const  showheader = location.pathname === "/" ||   location.pathname === "/search"
   
   
   const ds = location.pathname.includes('movie')
  
   return(
     
     <div className={`relative  ${ds ?' ': 'h-[40vh]'}`}> 
     
      
             <img src={`https://image.tmdb.org/t/p/w780${headerMovie.backdrop_path}`}
          alt={headerMovie.title}
          className={`absolute z-[-1] ${ds  ? 'hidden' :''} w-full h-full`}/>
     <div className=" subhero w-full   absolute h-[40vh] p-4 flex items-baseline justify-between  font-semibold text-md text-white">
          
     <h4 className="z-[2] relative">MovieBox</h4>
     
   <Search/>
     <div className=" p-1 z-[2]  bg-red-500 top-2 relative rounded-full">
     <MdMenu />
     </div>
     </div>
     { !ds?
     <div className="text-white absolute  py-4 px-3 z-1 bottom-0 w-[50%]"> 
     <h2  className=" text-xl leading-[24px] mb-2 font-bold relative" > {headerMovie.title}</h2>
     <h2 className=" text-[8px] leading-[10px] font-bold relative"> {headerMovie.overview}</h2>
     <button className="relative bg-red-500 px-2 py-1  mt-2 mx-auto drop-shadow-lg rounded-md"> watch trailer </button>
     </div>
     :null}
     </div> 
     )
 }