
import { resources} from '../assets/resources'
import {   MdNavigateNext} from 'react-icons/md'
import {useLoaderData , useNavigate , Link}from 'react-router-dom'
import Header from "./Header"
import MovieCard from "./MovieCard"


// export const loadingTopMovie = async () => {
//   const topMoviesList = await topRatedMovies.results
//   return topMoviesList.slice(0,10)
// }
 
 export const loadingTopMovie = async () => {
  try {
    const topRatedMoviesData = await resources('movie/top_rated', { page: 1 });
    const topMoviesList = topRatedMoviesData.results.slice(0, 10);
    return topMoviesList;
  } catch (error) {
    // Handle any errors that may occur during the fetch
    console.error('Error fetching top-rated movies:', error);
    throw error; // Rethrow the error to handle it further up the call stack if needed
  }
};

export default function Homepage ()  {
 const Navigate = useNavigate()
  const topMovies = useLoaderData()
  
  
  

console.log(topMovies)
 
 return (
   
   <div className=" relative ">
   <Header />

   <div className=" relative p-2 opening">
   <div className="flex items-baseline justify-between">
      <h2 className="left-6 font-robo text-lg md:text-xl mt-5  font-semibold relative"> Featured Movie</h2>
      <h2 className=" mr-2 font-robo flex items-center text-red-600 text-lg md:text-xl mt-5  font-semibold relative"> See More  <MdNavigateNext className="text-3xl" /> </h2>
   </div>
      <ul className=" grid  grid-cols-2 p-2 md:grid-cols-3 gap-3 md:place-items-center  lg:grid-cols-4">
        {topMovies.map((movie) => (
  <MovieCard movie={movie} />
        ))}
      </ul>
    </div>
    </div>
  );
 
 }