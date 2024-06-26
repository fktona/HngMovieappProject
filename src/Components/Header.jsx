import { useState, useEffect } from "react";
import { MdSearch, MdClose, MdMenu } from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { FaImdb } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { resources } from "../assets/resources";
import { searchResult } from "../assets/resources";
import { useLoaderData, useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { RingLoader } from 'react-spinners';

export default function Header() {
  function getRandomNumber(min, max) {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

    return randomNumber;
  }
  const randomNum = getRandomNumber(1, 10);

  const [searchTerm, setSearchTerm] = useState("");
  const [headerMovieIndex, setHeaderMovieIndex] = useState(randomNum);
  const [searched, setSearched] = useState("");
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const [MoviesList, setMoviesList] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [movieUrl, setMovieUrl] = useState("")

  async function playMovie(id) {
    setLoading(true)
    try {
      const response = await resources(`movie/${id}/videos`)
      console.log(response)
      const data = response.results
      const movieKey = data.find((o) => o.type === "Trailer")
      const youtubePath = `https://www.youtube.com/embed/${movieKey.key || data[0].key}`
      setMovieUrl(youtubePath)


    } catch (err) {
      return

    } finally {
      setLoading(false)
    }

  }


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const MoviesListData = await resources("movie/popular", { page: 1 });
        console.log(MoviesListData)

        setMoviesList(MoviesListData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);

      setTimeout(() => {
        setHeaderMovieIndex((prevIndex) => {
          const nextIndex =
            (prevIndex + 1) %
            (MoviesList.results ? MoviesList.results.length : 0);
          setIsFadingOut(false);
          return nextIndex;
        });
      }, 3500);
    }, 22000);

    return () => clearInterval(interval);
  }, [MoviesList.results]);

  const headerMovie =
    MoviesList.results && MoviesList.results[headerMovieIndex];

  useEffect(() => {
    setLoading(true);
    try {
      const searchList = searchResult.results;

      setSearched(() => searchList);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!headerMovie) {
    return null;
  }

  const isMobile = windowWidth <= 768;
  const imagePath = isMobile
    ? headerMovie.poster_path
    : headerMovie.backdrop_path;

  const src = `https://image.tmdb.org/t/p/${isMobile ? "w500" : "w780"
    }${imagePath}`;

  return (
    <div className="relative bg-black md:min-h-[80vh]  min-h-[70vh] mb-[50px] py-4">

      {loading &&
        <div className="fixed z-[15] left-[43%] top-[50%]">
          <RingLoader color="#DC2626" loading={loading} size={100} />
        </div>}
      {movieUrl ?
        <div className="">
          <button onClick={() => setMovieUrl("")} className="absolute z-[11]  p-2 text-lg top-16 right-8 text-white rounded-full  bg-red-600"><MdClose /></button>
          <ReactPlayer
            key={movieUrl}
            url={movieUrl}
            controls


            playing={true}
            width="100%" // Set the width to 100% for full screen
            height="80vh"
            className="relative min-h-full w-full z-[10]"
          /> </div> : <>
          {MoviesList.results && MoviesList.results.length > 0 && (
            <div
              className={` ${isFadingOut ? "fadeOut " : "ani"
                } absolute w-full h-full  subhero `}
            >
              {loading ? <span class="loader"></span> : ""}

            

              <div className="text-white flex flex-col justify-center mt-[30px]
               items-start h-full w-full md:px-[70px] relative gap-2  py-4 px-5 z-[2] ">
                  <img
                src={src}
                alt={headerMovie.title}
                className="absolute object-cover w-full h-full left-0"
              />
                <h2 className=" text-2xl lg:w-[50%]   w-[70%]  md:leading-normal mb-2 md:text-[35px]
                 md:mb-4  font-bold font-geor  relative">
                  {" "}
                  {headerMovie.title}
                </h2>
                <p className="flex gap-8 justify-between flex-row-reverse font-popi  items-center">
                  <span className="flex items-center gap-2 m-2 ">
                    <GiTomato className="text-3xl text-red-600" />
                    {headerMovie.popularity > 100
                      ? "100"
                      : Math.floor(headerMovie.popularity)}
                    %
                  </span>{" "}
                  <span className="flex items-center gap-2 m-2 ">
                    <FaImdb className="bg-[#F4C611]  text-black text-3xl" />{" "}
                    {headerMovie.vote_average}
                  </span>
                </p>
                <h2 className="lg:w-[50%] w-[70%] md:bottom-[5] md:text-[20px]
                 text-[16px] md:leading-normal font-lato leading-[10px]  relative">
                  {" "}
                  {headerMovie.overview}
                </h2>
                <button

                  onClick={() => playMovie(headerMovie.id)}
                  className="relative md:bottom-[5] md:text-lg bg-red-500 px-2 py-1 flex items-center  gap-2 mt-2 drop-shadow-lg font-geor font-bold rounded-md">
                  {" "}
                  <AiFillYoutube /> Watch Trailer{" "}
                </button>
              </div>
            </div>


          )}</>}
    </div>
  );
}
