import React, { useState, useEffect, useMemo } from "react";
import { resources } from "../assets/resources";
import MovieCard from "./MovieCard";
import usePage from "../assets/usePage"
import SectionButton from "../assets/sectionButton"
import { RingLoader } from 'react-spinners';

function Genre() {
  // State variables
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenre, setAllGenre] = useState([]);
  
const{
    pages,
      setPages,
       setCurrentPage,
       currentPage
  } = usePage(totalPages)
  // Fetch genres when the component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await resources("genre/movie/list", { page: 1 });
        const genreList = response.genres;
        setAllGenre(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);
  
  

 // Fetch movies when selectedGenres or currentPage changes
   useEffect(() => {
   const fetchMovies = async () => {
     try {
        setLoading(true);
        const response = await resources("discover/movie", {
          page: currentPage,
          with_genres: selectedGenres.join(","),
        });
        const { results, total_pages } = response;
        setTotalPages(total_pages)
        setAllMovies(results)
         console.log(selectedGenres.join(","))
         console.log(response)
         }finally{
           setLoading(false)
         }

    };
    fetchMovies();
  }, [selectedGenres , currentPage]);
  


  
  const addGenre = (id , name) => {
    let updatedGenres;

    if (selectedGenres.includes(id)) {
      updatedGenres = selectedGenres.filter((item) => item !== id);
     
    } else {
      updatedGenres = [...selectedGenres, id];
      setPopupMessage(`Showing Results For Movies Related To ${name}`);
    }

      setSelectedGenres(updatedGenres)
      

    setTimeout(() => {
      setPopupMessage('');
    }, 3000);
  }
  
  
  return (
    <div className="relative">

                        {loading &&
                        <div className="fixed z-[5] left-[44%] top-[40%]">
<RingLoader color="#DC2626" loading={loading} size={100} />
     </div>} <h2 className="relative mt-[6rem] text-xl font-bold font-robo text-center">
        Choose Genre
      </h2>

      <div className="relative p-2 opening">
        

        <ul className="flex p-4 items-center shadow-inner flex flex-wrap justify-center gap-3">
        
          {allGenre?.map((genre) => (
            <li
              key={genre.id}
              // Handle genre selection
              onClick={() => addGenre(genre.id , genre.name)}
              className={`px-2 py-[2px] ${
                selectedGenres.includes(genre.id)
                  ? "bg-red-600 text-white border-2 border-red-600"
                  : "bg-red-600/[.1] border-2 border-red-600 hover:text-white hover:bg-red-300"
              } rounded-3xl cursor-pointer`}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
      {allMovies.length > 0 ?
      <ul className="grid grid-cols-2 p-2 md:grid-cols-3 gap-3 md:place-items-center lg:grid-cols-4">

        {allMovies?.map((movie) => (
          <MovieCard key={`${movie.id}${movie.title}`} movie={movie} />
        ))}
      </ul>:<p className="text-3xl flex justify-center font-mono m-6"> Nothing To Show</p>}
        
       <ul className="flex flex-wrap items-center justify-center gap-2">
              <SectionButton 
       allMovies={allMovies}
       pages={pages}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}/>
      </ul>
      
    </div>
  );
}

export default Genre;
