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
     
     <div className=" relative z-[2] ">
     
     <MdSearch  className="absolute text-xl top-2 right-1 text-slate-400 "/>
              <input
            type="text"
            name=""
            id=""
            placeholder="what do you want to watch"
            className="shadow-md transition-all focus:bg-white  duration-[500ms] linear p-1 px-6 rounded-3xl  outline-none border-2 border-white bg-[transparent] text-black text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchClose(false)
              setSearchTerm(e.target.value)
            }
            }
        />
         { !searchClose && searched.length > 0 ? 
        <ul className= " absolute w-[300px] left-[-15%] items-start p-4  text-sm self-center z-[5] flex flex-col mt-[5rem] bg-white text-black"> 
      { loading?   <span class="loader"></span>:""}
      
       {  searched.map((movie) => (
         
        <li key={movie.id}
        onClick={() => handleMovieTitleClick(movie.title)}
        className=" border-b-[1px] px-1 py-3 hover:bg-slate-700 border-black hover:text-white w-full">
        <h3> {movie.title} </h3>
        </li>
         ))}
        </ul>
        : '' } 
        
        { searchTerm && !searchClose  ?<span className= " absolute w-[300px] items-center left-[-15%] p-4 gap-5 text-sm  flex flex-col mt-[5rem] bg-white text-black"> No Result</span>:""}
        <button 
        onClick={() => {
          setSearchClose(true)
          searched.length > 0 ?
          Navigate("search"): setSearchTerm('')}}className="bg-red-500 block  mt-2 text-sm mx-auto text-lg py-1 px-3 rounded-xl text_
          -white">{ searched.length > 0 || !searchTerm  ? 'search':'cancel'} </button>
     </div>
     )
 }