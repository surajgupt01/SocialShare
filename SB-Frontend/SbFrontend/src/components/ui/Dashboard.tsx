import AddContent from "./AddContent";
import {Nav} from "./Nav"
import Card from "./Card";
import { useState } from "react";
import MainContainer from "./MainComp";
import ButtonComp from "./ButtonComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ShareContent from "./ShareContent";


// function samecontent(a: string , b: string){

//   if(a==b) return true;
//   else return false

// }


export default function DashBoard() {

  const [open , setOpen] = useState(false);
  const [shareOpen , setShareOpen] = useState(false)
  const [res , setRes] = useState('');
  const [contentType , setContentType] = useState('links');

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
  
    <div className="flex h-screen ">

    
     <Nav setContentType = {setContentType}/>
      
  
     <MainContainer>

     
     <div className="grid grid-cols-3 gap-5 p-10 ml-90 ">

     <ButtonComp addContent={addContent} shareContent={shareContent} setRes={setRes}></ButtonComp>
       

{data &&

  (contentType.toLowerCase() != "links" 
    ? contents
    .filter((e: any) => e.type && e.type.toLowerCase() === contentType.toLowerCase())
    .map((e: any) => (
      <Card key={e.link} link={e.link} type={e.type} title={e.title} tags={e.tags} />
    )) 
    
    :
    contents.map((e: any) => (
        <Card key={e.link} link={e.link} type={e.type} title={e.title} tags={e.tags} />
      ))

  )
    
}

     </div>
   
     </MainContainer>

    </div>

    </>
  )
}
