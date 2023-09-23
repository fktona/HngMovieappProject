import { useState, useEffect } from "react";
import { resources } from "../assets/resources";
import { MdNavigateNext } from "react-icons/md";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import MovieCard from "./MovieCard";
import usePage from "../assets/usePage"
import SectionButton from "../assets/sectionButton"
import { RingLoader } from 'react-spinners';

export default function Upcoming () {
  const Navigate = useNavigate();
  const[ upcomingMovies , setUpcomingMovies ] = useState()
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  
  const{
    pages,
      setPages,
       setCurrentPage,
       currentPage
  } = usePage(totalPages)
  
  useEffect(() =>{
    const upcoming = async () => {
      setLoading(true)
  try {
    
    const response = await resources(`movie/upcoming`, { page: currentPage });
    
    const { results, total_pages } = response;
  //  const upcomingNow = response.results
          setTotalPages(total_pages)
    console.log(results)
    setUpcomingMovies(results)
   
   
  } catch (error) {
    throw error;
  }finally{
    setLoading(false)
  }
      
    }
    upcoming()
    },[currentPage])
    
  return (
    <div className="relative">
                        {loading &&
                        <div className="fixed z-[15] left-[43%] top-[50%]">
<RingLoader color="#DC2626" loading={loading} size={100} />
     </div>}
      <h2 className="relative mt-[6rem] mb-[2rem] text-2xl font-bold font-robo text-center"> Upcoming Movies</h2>

      <div className="relative p-2 opening">

        <ul className="grid grid-cols-2 p-2 md:grid-cols-3 gap-3 md:place-items-center lg:grid-cols-4">
          {upcomingMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
           ))} </ul>
           
                 <ul className="flex flex-wrap items-center justify-center gap-2">

       <SectionButton 
       allMovies={upcomingMovies}
       pages={pages}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}/>
      </ul>
       
      </div>
    </div>
  );
}
