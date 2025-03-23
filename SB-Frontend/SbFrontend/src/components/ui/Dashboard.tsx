import AddContent from "./AddContent";
import {Nav} from "./Nav"
import Card from "./Card";
import { useEffect, useState } from "react";
import ButtonComp from "./ButtonComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ShareContent from "./ShareContent";
import MenuButton from "./Menu";
import Setting from "./Setting";
import Share from "./Share";
import Plusicon from "./Plusicon";
import { useMutation } from "@tanstack/react-query";


// function samecontent(a: string , b: string){

//   if(a==b) return true;
//   else return false

// }


export default function DashBoard() {

  const [open , setOpen] = useState(false);
  const [shareOpen , setShareOpen] = useState(false)
  const [res , setRes] = useState('');
  const [contentType , setContentType] = useState('links');
  const [menu , setMenu] = useState(false)
  const [sideButton , SetsideButton] = useState(false)
  const [sideButtonActive , SetsideButtonActive] = useState(false)



  async function ShareLink(){
     
    const response = await axios.post('https://social-share-dwj6.vercel.app/api/v1/share',{share:"share"},{
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

  // console.log(contentType.toLowerCase()) 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []); 
  useEffect(() => {
    if (windowWidth < 700) {
      SetsideButton(true); 
    }
    else SetsideButton(false)
  }, [windowWidth]); // Runs whenever `windowWidth` changes




 

     
  async function shareContent() {
   
    setShareOpen(!shareOpen)
  
}

  function addContent(){
    
    setOpen(!open);

  }

  async function getContents(){
    const response = await axios.get("https://social-share-dwj6.vercel.app/api/v1/content" ,
      {
        headers:{
          'Authorization' : localStorage.getItem("token")
        }
      })
  
      return response;
  
    }



   const { data } = useQuery({
    queryKey : ["contents"],
    queryFn : getContents
  })
   let contents = data?.data.content



  ///////////////////////////////////////////////////////////


  return (

<>
    <AddContent state={open} setState={setOpen}/>
    <ShareContent setRes={setRes} Res = {res} state={shareOpen} setState={shareContent}   ></ShareContent>
      
    <div className="flex h-screen bg-gray-100">
    <MenuButton menu={menu} setMenu={setMenu}> </MenuButton>    
  {/* Sidebar / Navbar */}
  <Nav menu={menu} setMenu={setMenu} setContentType={setContentType} className="fixed md:relative w-64  text-white transition-transform duration-300 -translate-x-full md:translate-x-0" addContent={addContent} shareContent={shareContent} setRes={setRes} />

  {/* Main Content Section */}
  <div className="flex-1 p-10 transition-all md:ml-80 "  onClick={()=>{
    if(window.innerWidth < 600 && menu){
      setMenu(c=>!c)}
    }
    }>
    
    <div className="grid grid-cols-3 gap-5">
      <ButtonComp addContent={addContent} shareContent={shareContent} setRes={setRes} />

      {data &&
        (contentType.toLowerCase() !== "links"
          ? contents
              .filter((e: any) => e.type?.toLowerCase() === contentType.toLowerCase())
              .map((e: any) => <Card key={e.link} {...e} />)
          : contents.map((e: any) => <Card key={e.link} {...e} />))}



    </div>



  </div>

  { sideButton && 
  <div className=" z-100 group ">

      <div className= {`text-white flex justify-center items-center group/purple bg-purple-700 rounded-full w-12 h-12 absolute hover:bg-purple-600 bottom-[63px] right-[61px] cursor-pointer transition-all  ease-in-out duration-300 ${sideButtonActive ? '-translate-y-34' : 'translate-y-0'}`} onClick={SharingHandler}>
         <Share/>

      </div>
       
       <div className={`text-white flex justify-center items-center group/blue bg-blue-700 rounded-full w-12 h-12 absolute hover:bg-blue-600 bottom-[63px] right-[61px] cursor-pointer transition-all  ease-in-out duration-300 ${sideButtonActive ? '-translate-y-20' : 'translate-y-0'}`} onClick={addContent}>
         <Plusicon/>


       </div>
      
      <div className={`bg-slate-700 rounded-full w-17 h-17 absolute hover:bg-slate-600 bottom-[60px] right-[50px] cursor-pointer transition-all hover:scale-120 flex justify-center items-center ${sideButtonActive ? 'scale-115' : 'scale-100'}`} onClick={()=>{
         console.log('active ::: ',sideButtonActive)
         SetsideButtonActive(!sideButtonActive)
         
      }}>
        <Setting/>
      </div>
    </div>}

    
</div>


    </>
  )
}
