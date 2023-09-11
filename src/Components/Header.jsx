import { useState } from "react"
import { MdSearch , MdClose ,MdMenu} from 'react-icons/md'

export default function Header () {
   
   const [searchTerm, setSearchTerm] = useState('');
   
   
   return(
     <div > 
     <div className=" w-full h-[30vh] p-4 flex items-baseline justify-between bg-slate-600 font-semibold text-md text-white">
     <h4>Movie hub </h4>
     
     <div className="relative">
     <MdSearch  className="absolute text-xl top-2 left-1 text-slate-400 z-[2]"/>
              <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="shadow-md p-1 px-6 rounded-3xl  outline-none border-2 border-white text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
     </div>
     <div>
     <MdMenu />
     </div>
     </div>
     
     </div> 
     )
 }