import { useState ,useEffect } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'
import { nowPlayingMovies} from '../assets/resources'
import { searchResult} from '../assets/resources'
import Search from "./Search"
import {useLoaderData , useParams}from 'react-router-dom'

export default function Header () {
   
   const [searchTerm, setSearchTerm] = useState('');
   const [headerMovie, setHeaderMovie] = useState('');
   const [searched, setSearched] = useState('');
   const [loading, setLoading] = useState(false);
   
   
   useEffect(() => {
const MoviesList =  nowPlayingMovies.results
console.log(MoviesList)
setHeaderMovie(() => MoviesList[5] )
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
  
 const  showheader = location.pathname === "/" ||   location.pathname === "/search"
   
   
   
   return(
     <div className={`relative ${showheader?' h-[30vh]': ''}`}> 
     
             <img src={`https://image.tmdb.org/t/p/w780${headerMovie.backdrop_path}`}
          alt={headerMovie.title}
          className={`absolute z-[-1] ${showheader ? '' :'hidden'} w-full h-full`}/>
          
     <div className=" w-full bg-[#0000008b]  h-[30vh] p-4 flex items-baseline justify-between  font-semibold text-md text-white">
     <h4>Movie hub </h4>
     
   <Search/>
     <div>
     <MdMenu />
     </div>
     </div>
     
     </div> 
     )
 }