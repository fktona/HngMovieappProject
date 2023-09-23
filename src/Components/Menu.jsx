import { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder, MdEast } from "react-icons/md";
import { useLoaderData, useNavigate, Link } from "react-router-dom";

export default function Menu ({openMenu , setOpenMenu}){
  

  return (
 <div className={`bg-black/[0.9] absolute top-0 p-5 text-2xl font-robo text-semibold flex flex-col items-start  mt-[3rem] md:mt-[5rem]  gap-4 text-white w-[95vw] h-[100vh] ${openMenu? 'menuOpen':'menuClose'} `}>
 
 <Link to={'/'}
 onClick={() => setOpenMenu(false)}
 className= "border-b w-full border-white p-3 hover:bg-red-600"> Homepage </Link>
 <Link to={"/trending"}
 onClick={() => setOpenMenu(false)}
  className= "border-b w-full border-white p-3 hover:bg-red-600"> Trending </Link>
 <Link to={"/upcoming"}
 onClick={() => setOpenMenu(false)}
 className= "border-b w-full border-white p-3 hover:bg-red-600"> Upcoming </Link>
 <Link to={'/genre'}
 onClick={() => setOpenMenu(false)}
 className= "border-b border-white w-full p-3 hover:bg-red-600"> Genre </Link>
 <Link to={'favorite'}
 onClick={() => setOpenMenu(false)}
 className= "border-b border-white w-full p-3 hover:bg-red-600"> Favorite </Link>
 <Link
 onClick={() => setOpenMenu(false)}
 className= "border-b w-full border-white p-3 hover:bg-red-600"> Search History</Link>
 </div>
 
  );
}
