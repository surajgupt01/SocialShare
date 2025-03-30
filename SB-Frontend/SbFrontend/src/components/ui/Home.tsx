import { Link } from "react-router"
import Logo from "./Logo"
import { useNavigate } from "react-router"





export default  function Home(){
    
    let navigate = useNavigate();
    function navigator(){

        navigate('/signup')
        
    }



    return(
        <div className="p-5 w-full h-screen backdrop-blur-lg bg-neutral-900 ">
          <div className="flex justify-between p-4 text-white ">
          <div className="flex font-bold md:text-3xl sm:text-2xl text-xl p-2 text-blue-500 cursor-pointer hover:text-blue-600"><Link to={'/'}><Logo></Logo> Social Share </Link></div>
          <button onClick={navigator} className="rounded-4xl md:p-2  sm:p-3 p-2 md:text-md sm:text-md text-sm text-center cursor-pointer  bg-gray-800 text-white  font-semibold md:w-35 sm:w-35 w-28 duration-500 ease-in-out hover:text-black hover:bg-gray-400 hover:border-1 h-12 mt-2 hover:border-blue-400">LogIn/SignUp</button>
            

          </div>  

          {/* <div className="absolute  top-0 left-0 w-full h-full -z-5 overflow-hidden ">
            <div className="absolute left-[150px] w-126 h-106 bg-blue-600 rounded-full opacity-60 mix-blend-multiply blur-3xl animate-pulse  hover:bg-blue-600 hover:opacity-70 duration-500 ease-in-out hover:left-[100px]"></div>
            <div className=" absolute top-[200px] right-[50px] w-136 h-126 bg-purple-600 rounded-full opacity-60 mix-blend-multiply blur-3xl animation-delay-2000 animate-pulse hover:bg-purple-600 hover:opacity-70 duration-500 ease-in-out hover:right-[10px]"></div>
            <div className="absolute bottom-[-150px] left-[70px] w-126 h-116 bg-green-600 rounded-full opacity-60 mix-blend-multiply blur-3xl animation-delay-4000 animate-pulse hover:bg-green-600 hover:opacity-70 duration-500 ease-in-out hover:bottom-[-100px]"></div>
         </div> */}




         <div className=" flex justify-center mt-20">

      
         <div className=" flex flex-col  items-center p-10  rounded-t-lg  md:w-4xl sm:w-xl w-xl ">

<div className="font-bold sm:text-6xl text-5xl md:text-6xl  flex  justify-center  text-blue-500 w-full  ">
   Social <span className="ml-2 md:ml-5 text-blue-600">Share</span></div>
   
   <p className="font-semibold text-md mt-8 text-center text-gray-100 sm:text-md text-sm md:text-md">"Found something interesting?"
       <br></br>
     Don't let valuable content get lost. Save it here — videos, articles, or any content that inspires you.
     Share your curated content with anyone, anywhere, anytime.

     <span className="text-blue-500 font-bold">Social Share </span> : Because good content deserves an audience.</p>

     <div className="sm:mt-10 mt-4 sm:p-5 p-2 flex ">
 
       <button type="button" className="  font-semibold rounded-md md:p-2 sm:p-2 p-3 border-1 border-gray-300 hover:outline-1  text-center mr-5 cursor-pointer bg-white md:w-30 animate-pulse shadow-sm duration-500 ease-in-out sm:w-40 w-30">Explore</button>
       <button onClick={navigator} className="rounded-md md:p-2 sm:p-2 p-3 cursor-pointer border-1 border-gray-900  bg-gray-700 text-white font-semibold md:w-30 hover:text-black hover:bg-gray-500 hover:border-gray-700 shadow-lg duration-500 ease-in-out sm:w-40 w-30 ">Get Started</button>
   </div>

   {/* <div className=" flex  justify-center   ">
       <img className="border-1 border-gray-100 h-150 rounded-lg w-2xl md:mt-10 sm:mt-10 mt-20"></img>
   </div> */}

</div>

         </div>



         
          
        </div>
    )
}