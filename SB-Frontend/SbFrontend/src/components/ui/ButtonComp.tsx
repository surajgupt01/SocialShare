import { ButtonProps } from "./Button"
import { Button } from "./Button"
import Share from "./Share"
import Plusicon from "./Plusicon"


export default function ButtonComp({addContent , SharingHandler}:any){

     



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
          <div className="flex w-full items-start h-25 justify-between col-span-full">
          <div className="text-4xl font-bold mt-10 ml-2 text-gray-500">All Notes</div>
          <div className=" hidden sm:flex  ">

            
          <Button hover="hover:bg-blue-700" onClick={addContent} startIcon={<Plusicon/>} text = {styling.text} variant="primary" size={styling.size} bgcolor={styling.bgcolor} color={styling.color} rounded={styling.rounded} fontWeight="font-semibold" />
          <Button startIcon={<Share/>}onClick={SharingHandler} text = "Share Brain" variant="primary" size={styling.size} bgcolor="bg-purple-200" hover="hover:bg-purple-400" color="text-purple-900" rounded={styling.rounded} fontWeight="font-semibold"/>
  
  
          </div>
        
  
          </div>
     
    )
  }