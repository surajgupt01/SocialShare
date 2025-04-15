import Logo from "./Logo"
import Twitter from "./Twtter"
import Tags from "./Tags"
import Links from "./Link"
import Video from "./Video"
import Documents from "./Documents"
import { Link } from "react-router"
import { useEffect } from "react"
import { useState } from "react"




export  function Nav({menu  , setMenu ,setContentType}:any){

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  const handleClick = (event:any) => {
   
    setContentType(event.currentTarget.textContent.trim());
    
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []); // Runs only on mount
  
  // ✅ 2nd useEffect: Close menu when switching to desktop
  useEffect(() => {
    if (windowWidth > 700) {
      setMenu(false); // Auto-close menu on desktop
    }
  }, [windowWidth]); // Runs whenever `windowWidth` changes



    return(
      
      <div className={`fixed sm:translate-x-0  md:w-80 md:p-10 sm:w-70 w-60 sm:p-8 p-6 h-screen shadow-md left-0 z-40 top-0   transition-transform ${menu ? "tanslate-x-0 bg-slate-600" : "-translate-x-full bg-neutral-800"} duration-500 ease-in-out`}  >
  
      <div className="font-bold text-2xl mb-15  p-2 text-blue-500 cursor-pointer hover:text-blue-600"><Link to={'/'}><Logo></Logo> Social Share </Link></div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex text-gray-100" onClick={handleClick}><Links></Links> Links</div>
      <div className="font-semibold mb-5 hover:bg-gray-500 hover:fill-gray-100 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex text-gray-100 fill-gray-100" onClick={handleClick}><Twitter></Twitter> Twitter</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex text-gray-100" onClick={handleClick}><Video ></Video> Youtube</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex text-gray-100" onClick={handleClick}> <Documents></Documents> Docs</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex text-gray-100" onClick={handleClick}><Tags></Tags> Tags</div>

         
    </div>
  
    )
  }


  