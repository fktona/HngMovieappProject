import { useState, useEffect } from "react";
import { resources } from "../assets/resources";
import { MdNavigateNext , MdOutlineKeyboardDoubleArrowDown , MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import MovieCard from "./MovieCard";
import usePage from "../assets/usePage"
import SectionButton from "../assets/sectionButton"


export const loadingTopMovie = async () => {
  
  try {
    const response = await resources("movie/top_rated", { page: 1 });
    const { results, total_pages } = response;
    return results;
  } catch (error) {
    throw error;
  }
};

export default function Homepage() {
  const [totalPages, setTotalPages] = useState(0);
  const [visibleMovies, setVisibleMovies] = useState(10);
  const Navigate = useNavigate();
  const topMovies = useLoaderData();
  
  const remainingMovies = topMovies.slice(visibleMovies);

  const loadMoreMovies = () => {
    setVisibleMovies((prevCount) => prevCount + visibleMovies);
  };
const loadLessMovies = () => {
    setVisibleMovies((prevCount) => prevCount - visibleMovies/2);
  };

  
  
  
  return (
    <div className="relative">
      <Header />

      <div className="relative p-2 opening">
        <div className="flex items-baseline justify-between">
          <h2 className="left-6 font-robo text-lg md:text-xl mt-5 font-semibold relative">
            Featured Movie
          </h2>
          <h2 className="mr-2 font-robo flex items-center text-red-600 text-lg md:text-xl mt-5 font-semibold relative">
            See More <MdNavigateNext className="text-3xl" />
          </h2>
        </div>
<ul className="grid grid-cols-2 p-2 md:grid-cols-3 gap-3 md:place-items-center lg:grid-cols-4">
        {topMovies.slice(0, visibleMovies).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className="relative w-full flex justify-center">
      {remainingMovies.length > 0 ? (
        <button className={`bg-red-600 relative px-3 py-2 text-lg font-popi flex gap-2 items-center font-semisolid text-white shadow-lg mx-auto`}
        onClick={loadMoreMovies}>show More<span className={` p-2 rounded-full shadow-lg showMore relative`}>  
        <MdOutlineKeyboardDoubleArrowDown /></span></button>
      ):        <button className={`bg-red-600 flex gap-2 relative px-3 py-2 text-lg font-popi font-semisolid text-white shadow-lg mx-auto`}
      onClick={loadLessMovies}>Show less<span className={` p-2 rounded-full shadow-lg showMore relative`}>  
        <MdOutlineKeyboardDoubleArrowUp /></span></button> }

      </div>
      </div>
    </div>
  );
}
