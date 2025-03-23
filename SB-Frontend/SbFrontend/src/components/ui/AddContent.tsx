import CrossaIcon from "./CrossIcon";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

interface AddContentProps {
    state: boolean;
    setState: (state: boolean) => void;
  }


export default function AddContent({state , setState} : AddContentProps){
const navigate = useNavigate()

async function addData(formData:FormData){

  const response = await axios.post('https://social-share-dwj6.vercel.app/api/v1/content',{
    link :  formData.get('link'),
    tags :  formData.get('tag'),
    title :  formData.get('title'),
    type :  formData.get('type'),


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
    navigate('/dashboard')
  

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
        <input
          placeholder="Enter type of content"
          name="type" className="md:w-[250px] sm:w-[200px] w-[150px] h-12 p-2 rounded-lg border-gray-300 border mb-5"
        />
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