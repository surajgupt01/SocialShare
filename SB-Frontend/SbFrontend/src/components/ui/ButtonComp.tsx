import { ButtonProps } from "./Button"
import { Button } from "./Button"
import Share from "./Share"
import Plusicon from "./Plusicon"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export default function ButtonComp({addContent , shareContent ,  setRes}:any){

     
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
    
    return(
          <div className="flex w-full items-start h-25 justify-between col-start-1 col-end-4">
          <div className="text-4xl font-bold mt-10 ml-2">All Notes</div>
          <div className=" hidden sm:flex  ">

            
          <Button hover="hover:bg-blue-700" onClick={addContent} startIcon={<Plusicon/>} text = {styling.text} variant="primary" size={styling.size} bgcolor={styling.bgcolor} color={styling.color} rounded={styling.rounded} fontWeight="font-semibold" />
          <Button startIcon={<Share/>}onClick={SharingHandler} text = "Share Brain" variant="primary" size={styling.size} bgcolor="bg-purple-200" hover="hover:bg-purple-400" color="text-purple-900" rounded={styling.rounded} fontWeight="font-semibold"/>
  
  
          </div>
        
  
          </div>
     
    )
  }