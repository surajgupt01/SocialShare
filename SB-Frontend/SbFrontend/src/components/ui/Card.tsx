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
import {toast } from 'react-toastify'
import axios from "axios"
import { useMutation , useQueryClient } from "@tanstack/react-query"

export default function Card({type, link, title , _id , date } : CardProps){
  
  
  const colorMap : any = {
    YOUTUBE: 'text-red-500',
    TWITTER: 'text-sky-500',
    DOCS: 'text-gray-600',
  };

  const colorClass = colorMap[type.toUpperCase()] ;
  
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
  
      <div className="border-1 rounded-md border-gray-800 md:p-4 p-2 shadow-md overflow-y-auto no-scrollbar col-span-1 max-h-100">
  
       <div className={`md:text-xl text-lg font-semibold flex justify-between ${colorClass} `} >{type.toUpperCase()}

       <div className=" flex p-2 text-gray-500 cursor-pointer justify-between">
       <button className="mr-3 cursor-pointer" onClick={()=>{
         window.navigator.clipboard.writeText(link)
         toast.success('link copied')
       }}><Share/></button>
        <button className="cursor-pointer" onClick={()=>{
          deleteHandler()
        }}><Bin/></button>
        </div> 
      </div>
      <div className="md:text-4xl text-2xl font-semibold md:mt-5 mt-2 text-gray-500">{title}</div>
     
  
      
     {  type==="youtube" && <iframe src = {link.replace("watch" , "embed").replace("?v=" , "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true} className="w-full md:h-50 h-35 rounded-md mt-5 border-1 border-gray-500 cursor-pointer"></iframe>}
     {type==="twitter" && <blockquote className="twitter-tweet w-full max-h-200 overflow-hidden text-ellipsis rounded-md mt-5 border border-gray-500 cursor-pointer">
    <a href={link.replace("x.com", "twitter.com")}></a>
  </blockquote>}
  {type==='docs' && <iframe src={link.replace('view' , 'preview')} className="w-full h-50 rounded-md mt-5 border border-gray-500 cursor-pointer" ></iframe>}

  
  
  
      <div className="flex md:mt-5 mt-2 ">


      <div className="mr-2 bg-blue-200 rounded-lg p-1">#Productivity</div>

        <div className="mr-2 bg-blue-200 rounded-lg p-1"> #Ideas</div>
 


           
      
      </div>
  
      <div className="text-gray-400 text-sm mt-2"> Added on - {date}</div>
  
    </div>
    )
  }