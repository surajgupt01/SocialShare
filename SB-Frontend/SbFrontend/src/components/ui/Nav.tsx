import Logo from "./Logo"
import Twitter from "./Twtter"
import Tags from "./Tags"
import Links from "./Link"
import Video from "./Video"
import Documents from "./Documents"
import { Link } from "react-router"




export  function Nav({setContentType}:any){

 

  const handleClick = (event:any) => {
   
    setContentType(event.currentTarget.textContent.trim());
    
  };


    return(
      
      <div className="fixed  w-80 p-10 h-screen shadow-md left-0 z-40 top-0" >
  
      <div className="font-bold text-2xl mb-15  p-2 text-blue-500 cursor-pointer hover:text-blue-600"><Link to={'/'}><Logo></Logo> Social Share </Link></div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Links></Links> Links</div>
      <div className="font-semibold mb-5 hover:bg-gray-500 hover:fill-gray-100 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Twitter></Twitter> Twitter</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Video ></Video> Youtube</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}> <Documents></Documents> Documents</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Tags></Tags> Tags</div>
         
    </div>
  
    )
  }


  