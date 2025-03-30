import Logo from "./Logo"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"



export default function SignUp(){


  // async function SignUp(){
  //    let response = await axios.post('http://localhost:3000/signIn')
  //    return response
  // }


  const navigate = useNavigate();



  async function getData(formData:FormData){

    let response = await axios.post('http://localhost:8000/api/v1/signup' , {
      firstname : formData.get('Fname'),
      lastname : formData.get('Lname'),
      email : formData.get('email'),
      password : formData.get('password'),
    })
     
  

  //  if(response) navigate('/signIn')
 
  //  return response;
try{

  return response.data; 
} catch (error) {
  
  throw error; 
}


  }

  const SendData  = useMutation({mutationFn:getData , onSuccess : ()=>{ 

    navigate('/signIn') 
  } } )


  return (
    <div className="bg-neutral-900 absolute w-full h-full">

         <div className="font-bold text-3xl m-10  p-2 text-blue-500 cursor-pointer hover:text-blue-600   flex items-center">
               <Link to={'/'}>
              
                <Logo></Logo> 
                Social Share
                </Link>
            </div>
            
            <div className="flex items-center justify-center h-150">
            <form action={SendData.mutate}>
            <div className="border-1 border-gray-800 text-white h-105 md:w-100 sm:w-100 w-90 rounded-lg shadow-lg shadow-gray-900">

               <div className="font-semibold text-2xl w-full p-2 flex justify-center">Sign Up</div>
               <div className=" text-md-full p-2 flex justify-center">Unlock Knowledge. Save, Share and Inspire!</div>
                  <div className="flex flex-col justify-center items-center mt-8">
                    <div>
                    <input name="Fname" type="text" className="w-40 h-10 rounded-md border-1 border-gray-300 mb-5 mr-2 p-5" placeholder="First Name"></input>
                    <input name="Lname" type="text" className="w-40 h-10 rounded-md border-1 border-gray-300 mb-5 p-5" placeholder="Last Name"></input>

                    </div>
                    <input name="email" type="email" className="w-70 h-10 rounded-md border-1 border-gray-300 mb-5 p-5" placeholder="Email"></input>
                    <input name="password" type="password" className="w-70 h-10 rounded-md border-1 border-gray-300 p-5 mb-5" placeholder="set password"></input>
                    <button type="submit" className="w-70 h-10 border-1 border-blue-500 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer ">Submit</button>
                  </div>
                  <p className="text-center mt-2 mb-2 p-2">Already have an account <Link to={'/signIn'}> <span className="cursor-pointer text-blue-400 hover:text-blue-600">SignIn</span> </Link></p>
                 </div>

                 <div>
                 
                 </div>

                 </form>

            </div>
            
      

    </div>
  )

}
