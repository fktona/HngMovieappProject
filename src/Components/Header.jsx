import { useState ,useEffect } from "react"
import { MdSearch , MdClose ,MdMenu } from 'react-icons/md'
import { FaImdb } from 'react-icons/fa'
import { AiFillYoutube} from 'react-icons/ai'
import { resources} from '../assets/resources'
import { searchResult} from '../assets/resources'

import {useLoaderData , useParams}from 'react-router-dom'





export default function Header () {
  
  function getRandomNumber(min, max) {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

  return randomNumber;
}
const randomNum = getRandomNumber(1, 10);
   
const [searchTerm, setSearchTerm] = useState('');
  const [headerMovieIndex, setHeaderMovieIndex] = useState(randomNum); 
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const [MoviesList, setMoviesList] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);




console.log(randomNum);

  useEffect(() => {
    async function fetchData() {
      const MoviesListData = await resources('movie/popular', { page: 1 });
      console.log(MoviesListData);
      setMoviesList(MoviesListData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true); 

      setTimeout(() => {
        setHeaderMovieIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % (MoviesList.results ? MoviesList.results.length : 0);
          setIsFadingOut(false); 
          return nextIndex;
        });
      }, 3500); 
    }, 22000);

    return () => clearInterval(interval);
  }, [MoviesList.results]);

  const headerMovie = MoviesList.results && MoviesList.results[headerMovieIndex];
   
   
   
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
     
     <div className="relative bg-black  h-[70vh]"> 
     {MoviesList.results && MoviesList.results.length > 0 && (
  <div className= {` ${isFadingOut?'fadeOut ':'ani'} absolute w-full h-full  subhero `}>

             <img src={`https://image.tmdb.org/t/p/w780${headerMovie.poster_path}`}
          alt={headerMovie.title}
          className="absolute w-full h-[70vh]"/>

     
     <div className="text-white flex flex-col justify-end items-start  h-full w-full md:p-4 absolute  py-4 px-3 z-[2] bottom-8"> 
     <h2  className=" text-2xl   md:bottom-[40%] w-[55%] leading-[24px md:leading-normal mb-2 md:text-[35px] md:mb-4  font-bold font-geor  relative" > {headerMovie.title}</h2>
     <h2 className="w-[55%] md:bottom-[40%] md:text-[14px] text-[10px] md:leading-normal font-lato leading-[10px] font-bold relative"> {headerMovie.overview}</h2>
     <button className="relative md:bottom-[40%] md:text-lg bg-red-500 px-2 py-1 flex items-center  gap-2 mt-2 drop-shadow-lg font-geor font-bold rounded-md">     <AiFillYoutube /> Watch Trailer </button>
     </div>
     </div>)}
     
     </div> 
     )
 }