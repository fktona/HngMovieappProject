import { useState ,useEffect ,useContext } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'
import { resources } from '../assets/resources'
import { AppContext } from '../assets/AppContext'
import {useNavigate } from "react-router-dom"

export default function Search () {
  const Navigate = useNavigate()
  const {searched, setSearched ,searchTerm, setSearchTerm} =  useContext(AppContext)
  
  const [searchClose, setSearchClose] = useState(true);
 
  const [loading, setLoading] = useState(false);
   
  const handleMovieTitleClick = (title) => {
    setSearchTerm(title);
    Navigate('search');
    setSearchClose(true)
  };
   
   
  useEffect(() => {
    async function tryy  () {
      setLoading(true)
    try {
      const response = await resources('search/movie', { query: searchTerm }); 
      setSearched(response.results);
      
    } catch (error) {
      
    } finally{
      setLoading(false)
      !searchTerm ? 
      Navigate('/'):null
    }
    }
    tryy()
  },[searchTerm])
  
   
   
   
  return(
     
    <div className=" relative  flex md:grow ">
              <input
            type="text"
            name=""
            id="searching"
            placeholder="what do you want to watch"
            className={`shadow-md transition-all focus:bg-white  duration-[500ms] w-[70vw] md:w-full font-mono linear p-1 pr-8 pl-2 py-2 rounded-md  outline-none border-2 text-sm  border-white bg-[transparent] ${searchTerm? 'bg-white':''} text-slate-700 `}
            value={searchTerm}
            onChange={(e) => {
              setSearchClose(false)
              setSearchTerm(e.target.value)
            }
            }
        />
        { !searchClose && searched.length > 0 ? 
       
        <ul className= " absolute font-popi max-h-[68vh] overflow-scroll w-[100%] mx-auto  items-start p-4  text-sm  bg-white z-[5] flex flex-col mt-[4rem]  text-black"> 
      { loading?   <span className="loader z-[4]"></span>:""}
      
      {  searched.map((movie) => (
         
        <li key={movie.id}
        onClick={() => handleMovieTitleClick(movie.title)}
        className=" border-b-[1px]   w-full md:w-[90%] mx-auto relative px-3 py-3 hover:bg-slate-700 bg-white border-black shadow-inner hover:text-white ">
        <h3> {movie.title} </h3>
        </li>
        ))}
        </ul>
    
        : '' } 
        
        { searchTerm && !searchClose && searched.length < 1 ?<span className= " absolute  text-center   p-4 gap-5 text-sm w-full right-0   mt-[7rem] bg-white text-black"> No Result</span>:""}
        <button 
        onClick={() => {
          setSearchClose(true)
          searched.length > 0 ?
         Navigate("search"): setSearchTerm('')}}className="bg-slate-700 block  absolute right-[0] shadow-lg self-center text-[20px] mx-auto text-lg p-2 h-full rounded-r-md border-y-2 md:px-7   border-r-2 border-white 
          -white">{ searched.length > 0 || !searchTerm  ? <MdSearch />:<MdClose />} </button>
    </div>
    )
}

