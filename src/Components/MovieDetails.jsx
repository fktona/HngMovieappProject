import { resources } from "../assets/resources";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdWest, MdOutlinePlayCircle ,MdClose } from "react-icons/md";
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import { FaImdb } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { RingLoader } from 'react-spinners';

export const loadingMovieDetails = async ({ params }) => {
  try {
    const { id } = params;
    const MovieDetailsList = await resources(`movie/${id}`);
   
    return MovieDetailsList;
  } finally {
    
  }
};

export default function MovieDetails() {
  const [movieUrl , setMovieUrl] = useState("")
  const [reviews , setReviews] = useState([])
  const [loading, setLoading] = useState(false);
  
  const { id } = useParams;
  const detailMovie = useLoaderData();

  console.log(detailMovie)
  const dateComponents = detailMovie.release_date.split("-");
  const year = parseInt(dateComponents[0]);
  const month = parseInt(dateComponents[1]) - 1;
  const day = parseInt(dateComponents[2]);

  const utcDate = new Date(Date.UTC(year, month, day));

  const Navigate = useNavigate();
  
  async function playMovie(id){
    setLoading(true)
    try{
      const response =  await resources(`movie/${id}/videos`)
            const response2 =  await resources(`movie/${id}/reviews`)
            const data2 = response2.results
     setReviews(data2)
     console.log(response2)
      
      const data = response.results
      const movieKey = data.find((o)=> o.type=== "Trailer")
      const youtubePath =`https://www.youtube.com/embed/${movieKey.key || data[0].key}`
      setMovieUrl(youtubePath)
     setReviews(data)

      
    }catch(err){
      return  
      
    }finally{
      setLoading(false)
    }
    
  }


  return (
    <div className="  text-black top-0 w-f">
      
      <ul className=" ">
        <div className="relative openng w-full " key={detailMovie?.id}>
          <div className=" subhero w-full relative ">
    
                        {loading &&
                        <div className="fixed z-[15] left-[43%] top-[50%]">
<RingLoader color="#DC2626" loading={loading} size={100} />
     </div>}
                     { movieUrl ?
                     <>
                   <button onClick= { () => setMovieUrl("")} className="absolute z-[50]  p-2 text-lg top-16 right-8 text-white rounded-full  bg-red-600"><MdClose /></button> 
      <ReactPlayer
      key={movieUrl}
        url={movieUrl}
        controls
        playing = {true}
       width="100%" // Set the width to 100% for full screen
        height="50vh"
        className="relative z-[30]"
      /></>:
    
    
            <img
              src={`https://image.tmdb.org/t/p/w780${
                detailMovie.backdrop_path || ""
              }`}
              alt={detailMovie?.title}
              className={`relative hiddn z-[-1] left-0 top-0 $ w-full h-[50vh] object-cover `}
            />}


            <Link
              
              onClick={ () => playMovie(detailMovie.id)}
              className="absolute w-[10rem] md:w-[15rem] flex items-center justify-center transition duration-500 rounded-full bg-white/[.46] aspect-square mx-auto top-[33%] z-[2] hover:bg-red-600/[.8] left-[35%]"
            >
              <MdOutlinePlayCircle className="text-8xl text-white" />{" "}
            </Link>
          </div>
          <div className="relative md:flex items-center justify-around p-3">
            <h3
              data-testid="movie-title"
              className="md:text-[1.5rem] text-xl flex justify-start mx-auto gap-8 w-fit text-red-600 mx-auto md:mx-0 font-mono font-semibold"
            >
              {detailMovie?.title}{" "}
              <p className="flex gap-4 hidden  md:flex-row-reverse font-lato  text-gray-600 font-normal items-center">
                <span className="flex items-center gap-1 ">
                  <GiTomato className="text-sm text-red-600" />
                  {detailMovie?.popularity > 100
                    ? "100"
                    : Math.floor(detailMovie?.popularity)}
                  %
                </span>{" "}
                <span className="flex items-center gap-1 ">
                  <FaImdb className="bg-[#F4C611]  text-black text-sm" />{" "}
                  {detailMovie?.vote_average}
                </span>
              </p>
            </h3>

            <div className="flex md:justify-between justify-center p-2 flex-wrap items-center font-robo  gap-6">
              {detailMovie?.genres.map((o) => (
                <li
                  key={o.id}
                  className="px-2 py-[2px] bg-red-600/[.1] border-2 border-red-600 rounded-3xl"
                >
                  {" "}
                  {o.name}
                </li>
              ))}
            </div>
          </div>
          <div className="relative w-fit mx-auto md:ml-[8rem]   flex md:flex-row  flex-col gap-4 items-start justify-start p-2 bottom-5 font-mono text-sm text-gray-600 font-semibold">
            <p className="shadow-sm p-2  " data-testid="movie-release-date">
              • Release Date: {utcDate?.toISOString()}
            </p>
            <p className=" shadow-sm p-2" data-testid="movie-runtime">
              • Runtime: {detailMovie?.runtime}min
            </p>{" "}
          </div>

          <div
            className="text-slate-800 relative p-3 text-sm  m-4 font-lato   shadow-md md:max-w-[70vw] mx-auto flex justify-between gap-3 "
            data-testid="movie-overview"
          >
            <div className="mx-auto font-robo font-semibold flex items-center w-[3rem] md:w-fit bg-red-600 text-white text-2xl relative h-[8rem] left-0 p-2">
              <p className=" md:rotate-0 md:left-0 left-[-2rem] relative rotate-90">
                Overview
              </p>
            </div>{" "}
            {detailMovie?.overview}
          </div>
          <div className="flex flex-col justify-center items-center w-fit mx-auto">
            <p className="flex p-3 justify-center items-center gap-2 text-xl font-mono flex-wrap font-semibold">
              {" "}
              Language:{" "}
              {detailMovie?.spoken_languages?.map((o) => (
                <li
                  key={o.iso_639_1}
                  className="text-red-600 text-sm md:text-md font-normal "
                >
                  {" "}
                  {o.name} ({o.iso_639_1}),{" "}
                </li>
              ))}
            </p>

            <p className="flex p-3 justify-center items-center gap-2 text-xl font-mono flex-wrap font-semibold">
              {" "}
              Produced by:{" "}
              {detailMovie.production_companies?.map((o) => (
                <li
                  key={o.name}
                  className="text-red-600 text-sm md:text-md font-normal "
                >
                  {" "}
                  {o.name} {o.origin_country},
                </li>
              ))}
            </p>
          </div>
          <p className="w-fit mx-auto m-4 font-2xl font-danc font-semibold">
            {" "}
            {detailMovie?.tagline}
          </p>
        </div>
        <Link to={detailMovie.homepage}
         
          className="p-[6px] px-3 my-8 grow text-center  text-xl bg-red-600 shadow-md left-[48%] text-white"
        >
          Visit Page
        </Link>
        <button
          onClick={() => Navigate(-1)}
          className="p-[6px] px-3 my-8 grow text-center relative text-xl bg-red-600 shadow-md left-[48%] text-white"
        >
          <MdWest />
        </button>
      </ul>
    </div>
  );
}
