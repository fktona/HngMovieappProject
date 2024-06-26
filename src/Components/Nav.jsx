import { useState } from "react";
import { MdSearch, MdClose, MdMenu } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import Search from "./Search";
import Menu from "./Menu";
import { NavLink, Outlet, useLocation, useRoutes } from "react-router-dom";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full max-w-[1440px] font-mono bg-black/[.5] z-[8] fixed p-1 top-0 md:p-4 flex items-center gap-2 md:gap-8 justify-between font-semibold text-md text-white">
      <div className="z-[2] flex gap-1 text-3 xl items-center relative">
        <span className="bg-red-600 p-1 text-xl rounded-xl ">
          <PiTelevision />
        </span>{" "}
        <span className="hidden md:block">MovieBox</span>
      </div>
      <Search />

      <div className="p-1 z-[2] border border-2 border-white hidden md:flex relative rounded-3xl">
        SignUp
      </div>
      <div onClick = {() => setOpenMenu(prv => !prv) }
       className="p-1 z-[2] bg-red-600  relative rounded-full">
       { openMenu ?
      <MdClose />:<MdMenu />}
      </div>
       <Menu 
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}/> 
    </div>
  );
}
