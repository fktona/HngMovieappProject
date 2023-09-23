
export default function SectionButton ({allMovies , pages ,currentPage ,setCurrentPage}){
  
  return (
         <ul className="flex flex-wrap items-center justify-center gap-2">
       { allMovies ? pages.map((o => <li key={o} onClick = { () => setCurrentPage(o)} 
       className={`p-4 min-w-[50px] shadow-md ${currentPage === o ?'border-b-2 border-red-600 rounded-b-md':null}`}>{o}</li> )):null}
      </ul>
   )
}