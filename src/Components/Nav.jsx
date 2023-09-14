

import { useState } from "react";
import { MdSearch, MdClose, MdMenu } from 'react-icons/md';
import { PiTelevision } from 'react-icons/pi';
import Search from "./Search";
import { NavLink, Outlet, useLocation, useRoutes } from "react-router-dom";

export default function Nav() {
  const [searched, setSearched] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full font-mono bg-black/[.5] z-[8] fixed p-1 md:p-4 flex items-baseline gap-2 justify-between font-semibold text-md text-white">
      <h4 className="z-[2] flex gap-1 text-3 xl items-center relative">
        <span className="bg-red-600 p-1 rounded-xl ">
          <PiTelevision />
        </span> MovieBox
      </h4>
      <Search />
      
      <div className="p-1 z-[2] border border-2 border-white md:m-4 hidden md:flex relative rounded-3xl">
        SignUp
      </div>
      <div className="p-1 z-[2] md:m-4 bg-red-600 top-2 relative rounded-full">
        <MdMenu />
      </div>
    </div>
  );
}
