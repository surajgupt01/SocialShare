interface CardProps{
  link : string,
  type : "youtube"|"twitter"|"docs",
  title : string
  tags : [],
  _id  :  String,
  date : string  

}
import Share from "./Share"
import Bin from "./Bin"
import Triple from "./triple"
import Youtube from "./youtube"
import {toast } from 'react-toastify'
import axios from "axios"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import Twitter from "./twitter"
import { useState } from "react"
import Drive from "./drive"

export default function Card({type, link, title , _id , date } : CardProps){
  
  const [edit , setEdit] = useState(false)

  const colorMap : any = {
    youtube: <Youtube/>,
    twitter: <Twitter/>,
    docs: <Drive/>
  };



  
  let queryClient = useQueryClient()
   async function deleteContent(){


        let response = axios.delete(`https://social-share-dwj6.vercel.app/api/v1/content` ,
    
          {
            headers : {
              'Authorization' : localStorage.getItem('token')
            },

            data : {

              id : _id

            }
            
        })

        return response


   }
    
   const ContentDel = useMutation({
    mutationFn : deleteContent , onSuccess : (data)=>{
      console.log("del resp",data)
      toast.success(data.data.mssg)
      setTimeout(()=>{
        queryClient.invalidateQueries({queryKey : ['contents']})
       
      },2000)
    }
   }, 
  
  )

  function deleteHandler(){
      ContentDel.mutate()
  }



    return(
  
      <div className={`border-1 border-gray-300 w-90  h-65  rounded-xl relative flex flex-col justify-center items-center pt-10  ${type=='twitter' ? ' h-auto w-80 overflow-y-auto no-scrollbar ' : null} break-inside-avoid  mb-5`}>

      <div className='flex justify-between top-0 absolute w-full rounded-t-lg p-1 mb-5'>{colorMap[type]}
       <button 
         onClick={()=>{
          setEdit(!edit)
         }}
       ><Triple/></button>
       { <div className={`absolute right-5 flex flex-col text-gray-500 cursor-pointer justify-center items-center border-1 border-gray-200 rounded-lg divide-y w-15 z-100 bg-white  transition duration-100 ease-in-out ${edit ? 'opacity-150' : 'opacity-0'}`}>
            <button className="cursor-pointer p-2" onClick={()=>{
              window.navigator.clipboard.writeText(link)
              toast.success('link copied')
            }}><Share/></button>
             <button className="cursor-pointer" onClick={()=>{
               deleteHandler()
             }}><Bin/></button>
             </div> }
       </div>
             <div className="absolute md:text-xl text-2xl font-semibold top-0 mt-2 mb-2 text-gray-500">{title}</div> 
          
       
           
            {type==="youtube" && <iframe src = {link.replace("watch" , "embed").replace("?v=" , "/")} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}  className="absolute w-full h-52 bottom-0 rounded-b-xl"></iframe>}
            {type==="twitter" && 
              <blockquote className="absolute twitter-tweet w-full  text-ellipsis rounded-b-xl bottom-0 mt-10 border border-gray-300 cursor-pointer ">
             <a href={link.replace("x.com", "twitter.com")}></a>
             </blockquote> 
          }
            {type==='docs' && <iframe src={link.replace('view' , 'preview')} className="w-full bottom-0 rounded-b-xl h-52 border border-gray-300 cursor-pointer absolute" ></iframe>}
      
  
       <div className="text-gray-400 text-sm mt-2"> Added on - {date}</div>
  
      </div>
    )
  }