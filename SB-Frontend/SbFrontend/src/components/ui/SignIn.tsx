import { useMutation } from "@tanstack/react-query"
import Logo from "./Logo"
import{ Link, useNavigate }from "react-router"
import axios from "axios"

export default function SignIn(){

  const navigate  = useNavigate();



  async function signed(formData : FormData){



  const response = await axios.post('http://localhost:3000/api/v1/signIn' , {
          
        email : formData.get('email'),
        password : formData.get('password')
      })

     return  response

      

  }

 const SignIN = useMutation({
   mutationFn : signed , onSuccess : (data)=>{
    if(data.status === 200){
    localStorage.setItem('token' , data?.data?.token)
  
    navigate('/dashboard')

    }
   }
 })

  return (
    <div className="">
            
            <div className="font-bold text-3xl m-10  p-2 text-blue-500 cursor-pointer hover:text-blue-600   flex items-center">
               <Link to={'/'}>
              
                <Logo></Logo> 
                Social Share
                </Link>
            </div>
            
            <div className="flex items-center justify-center h-150">
            <form action={SignIN.mutate}>
            <div className="border-1 border-gray-300 h-90 w-100 rounded-lg shadow-md">
           
               <div className="font-semibold text-2xl w-full p-2 flex justify-center">Sign In</div>
               <div className=" text-md-full p-2 flex justify-center">Unlock Knowledge. Save, Share and Inspire!</div>
                  <div className="flex flex-col justify-center items-center mt-8">
                    {/* <div>
                    <input type="text" className="w-40 h-10 rounded-md border-1 border-gray-300 mb-5 mr-2 p-5" placeholder="First Name"></input>
                    <input type="text" className="w-40 h-10 rounded-md border-1 border-gray-300 mb-5 p-5" placeholder="Last Name"></input>

                    </div> */}
                    
                    <input name="email" type="email" className="w-70 h-10 rounded-md border-1 border-gray-300 mb-5 p-5" placeholder="Email"></input>
                    <input name="password" type="password" className="w-70 h-10 rounded-md border-1 border-gray-300 p-5 mb-5" placeholder="set password"></input>
                    <button type="submit" className="w-70 h-10 border-1 border-blue-500 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer ">Submit</button>
                    
                  </div>
                  <p className="text-center mt-2 mb-2 p-2">Don't have a account <Link to={'/signUp'}> <span className="cursor-pointer text-blue-400 hover:text-blue-600">SignUp</span> </Link></p>

                 </div>

                 <div>
                 
                 </div>

                 </form>

            </div>

           
            
      

    </div>
  )

}