import { useState ,useEffect ,useContext } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'
import { resources } from '../assets/resources'
import { AppContext } from '../assets/AppContext'
import {useNavigate } from "react-router-dom"

export default function Search () {
  const Navigate = useNavigate()
   const {searched, setSearched ,searchTerm, setSearchTerm} =  useContext(AppContext)
   //const [searchTerm, setSearchTerm] = useState('');
   const [searchClose, setSearchClose] = useState(true);
  // const [searched, setSearched] = useState('');
   const [loading, setLoading] = useState(false);
   
   const handleMovieTitleClick = (title) => {
    setSearchTerm(title); // Assuming setSearchTerms is a function in your context to update search terms
    Navigate('search'); // Navigate back to the previous page after updating search terms
    setSearchClose(true)
  };
   
   
   useEffect(() => {
     async function tryy  () {
       setLoading(true)
     try {
      const response = await resources('search/movie', { query: searchTerm }); // Fetch search results
      setSearched(response.results);
      console.log(response);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally{
      setLoading(false)
    }
     }
     tryy()
  },[searchTerm])
  
   
   
   
   return(
     
     <div className=" relative md:grow ">
     <label htmlFor="searching"
     className="absolute text-xl  md:mx-2 top-[15px] right-2 text-white ">
     <MdSearch  />
     </label>
              <input
            type="text"
            name=""
            id="searching"
            placeholder="what do you want to watch"
            className={`shadow-md transition-all focus:bg-white  duration-[500ms] md:mx-2  md:w-full font-mono linear p-1 pr-8 pl-2 py-3 rounded-lg  outline-none border-2 border-white bg-[transparent] ${searchTerm? 'bg-white':''} text-black text-sm`}
            value={searchTerm}
            onChange={(e) => {
              setSearchClose(false)
              setSearchTerm(e.target.value)
            }
            }
        />
         { !searchClose && searched.length > 0 ? 
         <div className="p-2 relative ">
        <ul className= " absolute font-popi max-h-[68vh] overflow-scroll w-[80vw] right-0 md:right-0 md:w-full mx-auto items-start p-4  text-sm  bg-white z-[5] flex flex-col mt-[4rem] text-black"> 
      { loading?   <span class="loader"></span>:""}
      
       {  searched.map((movie) => (
         
        <li key={movie.id}
        onClick={() => handleMovieTitleClick(movie.title)}
        className=" border-b-[1px]  w-full md:w-[90%] mx-auto relative px-3 py-3 hover:bg-slate-700 bg-white border-black shadow-inner hover:text-white w-full">
        <h3> {movie.title} </h3>
        </li>
         ))}
        </ul>
     </div>
        : '' } 
        
        { searchTerm && !searchClose && searched.length < 1 ?<span className= " absolute  text-center   p-4 gap-5 text-sm w-full right-0   mt-[7rem] bg-white text-black"> No Result</span>:""}
        <button 
        onClick={() => {
          setSearchClose(true)
          searched.length > 0 ?
          Navigate("search"): setSearchTerm('')}}className="bg-red-600 block  mt-2 text-sm mx-auto text-lg py-1 px-3 rounded-lg
          -white">{ searched.length > 0 || !searchTerm  ? 'search':'cancel'} </button>
     </div>
     )
 }