import { useState } from "react"
import Header from "./Components/Header"
import Homepage from "./Components/Main"
import Nav from "./Components/Nav"
import { AppContext } from './assets/AppContext'
import { NavLink, Outlet, useLocation ,useRoutes } from "react-router-dom";
export default function RootLayout() {
   
   const [searched, setSearched] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   
   return(
     <div> 
     <AppContext.Provider value={{searched, setSearched ,searchTerm, setSearchTerm}}>
     <Nav />
    
    <Outlet />
     </AppContext.Provider>
     </div> 

     )
 }