import { useState, useEffect } from "react";
import { resources } from "../assets/resources";
import { MdNavigateNext } from "react-icons/md";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { RingLoader } from 'react-spinners';
import usePage from "../assets/usePage"
import SectionButton from "../assets/sectionButton"

export default function Trending () {
  const Navigate = useNavigate();
 const [totalPages, setTotalPages] = useState(0);
const[ trendingUrl , setTrendingUrl ] = useState("week")
  const[ trending , setTrending ] = useState()
  const [loading, setLoading] = useState(false);
  
  
  const{
    pages,
      setPages,
       setCurrentPage,
       currentPage
  } = usePage(totalPages)
  
  
  
  useEffect(() =>{
    const trend = async () => {
      setLoading(true)
  try {
    
    const response = await resources(`trending/movie/${trendingUrl}`, { page: currentPage });
    const { results, total_pages } = response;
    setTrending(results)
   setTotalPages(total_pages)
   
  } catch (error) {
    throw error;
  }finally{
    setLoading(false)
  }
      
    }
    trend()
    },[trendingUrl ,currentPage])
    
  return (
    <div className="relative">
                        {loading &&
                        <div className="fixed z-[15] left-[43%] top-[30%]">
<RingLoader color="#DC2626" loading={loading} size={100} />
     </div>}
     
      <h2 className="relative mt-[6rem] text-xl font-bold font-robo text-center"> Trending Now</h2>
      <ul className="relative  flex justify-around items-center gap-6 py-1 font-mono rounded-2xl text-black text-ml font-semibold shadow-inner m-6 px-2" >
      <li onClick ={() => setTrendingUrl("week")}
      className={`${trendingUrl==="week" ? 'bg-red-600 text-white':null} py-1 px-2 transition  duration-300 rounded-2xl drop-shadow-lg` }>This Week</li>
      <li className={`${trendingUrl==="day" ? 'bg-red-600 text-white':null} py-1 px-2 transition  duration-300 rounded-2xl drop-shadow-lg` }
      onClick ={() => setTrendingUrl("day")}>Today</li>
      </ul>
      <div className="relative p-2 opening">
        <div className="flex items-baseline justify-between">
        </div>
        <ul className="grid grid-cols-2 p-2 md:grid-cols-3 gap-3 md:place-items-center lg:grid-cols-4">
          {trending?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
           ))} </ul>
                            <ul className="flex flex-wrap items-center justify-center gap-2">

       <SectionButton 
       allMovies={trending}
       pages={pages}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}/>
      </ul>
       
      </div>
    </div>
  );
}
