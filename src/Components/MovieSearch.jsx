import { useState , useEffect , useContext } from "react"

import {useNavigate } from "react-router-dom"
import { AppContext } from '../assets/AppContext'
import MovieCard from "./MovieCard"
import { MdWest } from 'react-icons/md';


export default function MovieSeached ()  {
  const Navigate = useNavigate()
  
  const {searched, setSearched ,searchTerm, setSearchTerm} =  useContext(AppContext)
  
  
 
 return (
   
   
   
   
   <div className="p-2 text-center relative ">                 <button
        onClick={() => {
          Navigate('/')
          
        }}
        className="p-[3px] px-3 mt-[6rem] text-center relative text-2xl bg-red-500 shadow-md text-white"
      >
        <MdWest />
      </button>

      {searchTerm ? <>
      <h2 className="m-4 text-lg font-semibold">Search Result(s):  {searchTerm}</h2>
      <ul className=" grid grid-cols-2 md:grid-cols-3 m mx-auto lg:grid-cols-4">
        {searched.map((movie) => (  
          <MovieCard movie={movie} />

        ))}
      </ul>
      </>:""}
    </div>
  );
 
 
 }