
import { useState } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'
import Search from "./Search"
import { NavLink, Outlet, useLocation ,useRoutes } from "react-router-dom";
export default function RootLayout() {
   
   const [searched, setSearched] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   
   return(
        <div className="  w-full  z-[8] fixed  p-4 flex items-baseline justify-between  font-semibold text-md text-white">
          
     <h4 className="z-[2] relative">MovieBox</h4>
     
   <Search/>
     <div className=" p-1 z-[2]  bg-red-500 top-2 relative rounded-full">
     <MdMenu />
     </div>
     </div>

     )
 }