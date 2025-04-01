interface CardProps{
  link : string,
  type : "youtube"|"twitter",
  title : string
  tags : []
}
import Share from "./Share"
import Bin from "./Bin"
export default function Card({type, link, title } : CardProps){
    return(
  
      <div className="border-1 rounded-md border-gray-300 md:p-4 p-2 shadow-md overflow-y-auto no-scrollbar col-span-1">
  
      <div className="md:text-2xl text-lg font-semibold flex justify-between ">Project Ideas
       <div className=" flex p-2 text-gray-500 cursor-pointer justify-between">
       <Share/>
       <Bin/>
        </div> 
      </div>
      <div className="md:text-4xl text-2xl font-semibold md:mt-5 mt-2">{title}</div>
     
  
      
     {  type==="youtube" && <iframe src = {link.replace("watch" , "embed").replace("?v=" , "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true} className="w-full md:h-50 h-35 rounded-md mt-5 border-1 border-gray-300 cursor-pointer"></iframe>}
     {type==="twitter" && <blockquote className="twitter-tweet w-full max-h-200 overflow-hidden text-ellipsis rounded-md mt-5 border border-gray-300 cursor-pointer">
    <a href={link.replace("x.com", "twitter.com")}></a>
  </blockquote>}
  
  
  
      <div className="flex md:mt-5 mt-2 ">


      <div className="mr-2 bg-blue-200 rounded-lg p-1">#Productivity</div>

        <div className="mr-2 bg-blue-200 rounded-lg p-1"> #Ideas</div>
 


           
      
      </div>
  
      <div className="text-gray-400 text-sm mt-2"> Added on - 14/04/2025</div>
  
    </div>
    )
  }