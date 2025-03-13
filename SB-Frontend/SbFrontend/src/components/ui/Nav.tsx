import Logo from "./Logo"
import Twitter from "./Twtter"
import Tags from "./Tags"
import Links from "./Link"
import Video from "./Video"
import Documents from "./Documents"
import { Link } from "react-router"
import { Button } from "./Button"
import axios from "axios"
import { ButtonProps } from "./Button"
import { useMutation } from "@tanstack/react-query"
import Plusicon from "./Plusicon"
import Share from "./Share"
import { useEffect } from "react"
import { useState } from "react"




export  function Nav({menu  , setMenu ,setContentType , addContent , shareContent , setRes}:any){

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  async function ShareLink(){
     
    const response = await axios.post('http://localhost:3000/api/v1/share',{share:"share"},{
      headers:{
        'Authorization' : localStorage.getItem('token')
      }
    })
    return response

  }

  const getLink = useMutation({
    mutationFn : ShareLink , onSuccess : (data)=>{
       setRes(data.data.link)
     
    } 
  })

  function SharingHandler(){
   
   getLink.mutate();
   shareContent()


  } 

      const styling : ButtonProps={
        variant : "primary",
        text : "Add Contents",
        
        // endIcon ?: any,
        size : "py-3 px-3",
        // onClick ?: ()=> void
        bgcolor : 'bg-blue-500',
        color : "text-white",
        rounded:'rounded-lg',
        hover:'hover:bg-blue-700'
      }

 

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
      
      <div className={`fixed sm:translate-x-0  md:w-80 md:p-10 sm:w-70 w-60 sm:p-8 p-6 h-screen shadow-md left-0 z-40 top-0   transition-transform ${menu ? "tanslate-x-0 bg-slate-600" : "-translate-x-full bg-white"} duration-500 ease-in-out`}  >
  
      <div className="font-bold text-2xl mb-15  p-2 text-blue-500 cursor-pointer hover:text-blue-600"><Link to={'/'}><Logo></Logo> Social Share </Link></div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Links></Links> Links</div>
      <div className="font-semibold mb-5 hover:bg-gray-500 hover:fill-gray-100 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Twitter></Twitter> Twitter</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Video ></Video> Youtube</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}> <Documents></Documents> Documents</div>
      <div className="font-semibold mb-5  hover:bg-gray-500 hover:text-gray-100 w-full h-10 p-2 cursor-pointer rounded-md flex" onClick={handleClick}><Tags></Tags> Tags</div>
      {menu && 
      <div className="flex flex-col mt-50">
         <Button hover="hover:bg-blue-700" onClick={addContent} startIcon={<Plusicon/>} text = {styling.text} variant="primary" size={styling.size} bgcolor={styling.bgcolor} color={styling.color} rounded={styling.rounded} fontWeight="font-semibold" />
         <Button startIcon={<Share/>}onClick={SharingHandler} text = "Share Brain" variant="primary" size={styling.size} bgcolor="bg-purple-200" hover="hover:bg-purple-400" color="text-purple-900" rounded={styling.rounded} fontWeight="font-semibold"/>
      </div>
          
      }
         
    </div>
  
    )
  }


  