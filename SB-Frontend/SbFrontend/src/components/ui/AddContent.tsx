import CrossaIcon from "./CrossIcon";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface AddContentProps {
    state: boolean;
    setState: (state: boolean) => void;
  }


export default function AddContent({state , setState} : AddContentProps){

let queryClient = useQueryClient()
const [type , setType] = useState('')

const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const year = today.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

async function addData(formData:FormData){

  const response = await axios.post('https://social-share-dwj6.vercel.app/api/v1/content',{
    link :  formData.get('link'),
    tags :  formData.get('tag'),
    title :  formData.get('title'),
    type :    type,
    date :   formattedDate
    


  },
  {
    headers : {
           "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`
    }
  }


)

  return response;

}
const addContent = useMutation({
  mutationFn: addData , onSuccess : ()=>{
    queryClient.invalidateQueries({queryKey:['contents']})

  

  }
})


  
    

    return(
    
        <>

       

{state && (
  <div className="fixed inset-0 z-50 bg-slate-700 opacity-97 flex justify-center items-center">
    
    <div className="md:w-[600px] sm:w-[550px] w-[400px] h-auto bg-white border border-gray-300 rounded-2xl flex flex-col justify-center items-center shadow-md p-6 relative">
     <form action={addContent.mutate} className=" w-full p-5 flex flex-col justify-center items-center">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setState(false)}>
        <CrossaIcon />
      </div>

      <div className="font-semibold md:text-2xl sm:text-xl text-lg mb-5">Content Details</div>
      <div className="flex gap-2">
        <input
          placeholder="Enter title"
         name="title" className="md:w-[250px] sm:w-[200px] w-[150px] h-12 p-2 rounded-lg border-gray-300 border mb-5"
        />
        {/* <input
          placeholder="Enter type of content"
          name="type" className="md:w-[250px] sm:w-[200px] w-[150px] h-12 p-2 rounded-lg border-gray-300 border mb-5"
        /> */}
        <label htmlFor="type"></label>
        <select id="type"  value={type}
          onChange={(e) => setType(e.target.value)} className=" relative border-1 border-gray-300 h-12 p-2 rounded-lg focus:outline-gray-200 md:w-[200px] sm:w-[200px] w-[130px] appearance-none">
          <option className="text-sm" value=''>--choose the type of content--</option>
          <option value='youtube' className="text-sm">Youtube</option>
          <option value='twitter' className="text-sm">Twitter</option>
          <option value='docs' className="text-sm">Docs</option>
        </select>
      </div>
      <input
        placeholder="Enter tags ##"
       name="tag" className="md:w-[500px] sm:w-[550px] w-[310px] h-12 p-2 rounded-lg border-gray-300 border mb-5"
      />
      <input
        placeholder="Paste link or add details"
        name="link" className="md:w-[500px] sm:w-[550px] w-[310px] h-12 p-2 rounded-xl border-gray-300 border mb-5"
      />
      <button
        type="submit" className="font-semibold w-[200px] h-12 p-2 bg-blue-400 text-white text-xl rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Submit
      </button>
      </form>
    </div>
  </div>
)}


        </>

        


    )

    
  
}