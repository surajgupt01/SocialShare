import AddContent from "./AddContent";
import {Nav} from "./Nav"
import Card from "./Card";
import { useState } from "react";
import ButtonComp from "./ButtonComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ShareContent from "./ShareContent";
import MenuButton from "./Menu";


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

  // console.log(contentType.toLowerCase()) 

 

     
  async function shareContent() {
   
    setShareOpen(!shareOpen)
  
}

  function addContent(){
    
    setOpen(!open);

  }

  async function getContents(){
    const response = await axios.get("http://localhost:3000/api/v1/content" ,
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
      
    <div className="flex h-screen">
    <MenuButton menu={menu} setMenu={setMenu}> </MenuButton>    
  {/* Sidebar / Navbar */}
  <Nav menu={menu} setMenu={setMenu} setContentType={setContentType} className="fixed md:relative w-64  text-white transition-transform duration-300 -translate-x-full md:translate-x-0" addContent={addContent} shareContent={shareContent} setRes={setRes} />

  {/* Main Content Section */}
  <div className="flex-1 p-10 transition-all md:ml-80" onClick={()=>{
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
</div>


    </>
  )
}
