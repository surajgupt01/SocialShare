import { useMutation } from "@tanstack/react-query"
import Logo from "./Logo"
import{ Link, useNavigate }from "react-router"
import axios from "axios"
import {toast , ToastContainer} from 'react-toastify'


export default function SignIn(){

  const navigate  = useNavigate();
  
  function IContainer(){
    return(
      <div>Invalid credentials</div>
    )
  }
  function SContainer(){
    return(
      <div>Login Successfull</div>
    )
  }




  async function signed(formData : FormData){



  const response = await axios.post('https://social-share-dwj6.vercel.app/api/v1/signIn' , {
          
       email : formData.get('email'),
        password : formData.get('password')
        
      }
    )

     return  response

      

  }

 const SignIN = useMutation({
   mutationFn : signed , onSuccess : (data)=>{
    console.log(data)
    if(data.status === 200){
    localStorage.setItem('token' , data?.data?.token)
    toast.success(<SContainer/> , { onClose: ()=> navigate('/dashboard')})
    

    }

   },
   onError : (err)=>{
    console.log(err)
    toast.error(<IContainer/>)

  }
 })

  return (
    <div className="bg-neutral-50 absolute w-full h-full">
            
            <div className="font-bold text-3xl m-10  p-2 text-blue-500 cursor-pointer hover:text-blue-600   flex items-center">
               <Link to={'/'}>
              
                <Logo></Logo> 
                Social Share
                </Link>
            </div>
            
            <div className="flex items-center justify-center h-120">
            <form action={SignIN.mutate}>
            <div className="border-1 border-gray-200 text-black h-90 md:w-95 sm:w-100 w:90 rounded-lg shadow-lg shadow-blue-200">
           
               <div className="font-semibold text-2xl w-full p-2 flex justify-center">Sign In</div>
               <div className=" text-md-full p-2 flex justify-center">Unlock Knowledge. Save, Share and Inspire!</div>
                  <div className="flex flex-col justify-center items-center mt-8">
                    {/* <div>
                    <input type="text" className="w-40 h-10 rounded-md border-1 border-gray-300 mb-5 mr-2 p-5" placeholder="First Name"></input>
                    <input type="text" className="w-40 h-10 rounded-md border-1 border-gray-300 mb-5 p-5" placeholder="Last Name"></input>

                    </div> */}
                    
                    <input name="email" type="email" className="w-70 h-10 rounded-md border-1 border-gray-300 mb-5 p-5" placeholder="Email"></input>
                    <input name="password" type="password" className="w-70 h-10 rounded-md border-1 border-gray-300 p-5 mb-5" placeholder="Password"></input>
                    <button type="submit" className="w-70 h-10 border-1 border-black bg-black hover:bg-gray-700 rounded-lg text-white cursor-pointer ">Submit</button>
                    
                  </div>
                  <p className="text-center mt-2 mb-2 p-2">Don't have a account <Link to={'/signUp'}> <span className="cursor-pointer text-blue-400 hover:text-blue-600">SignUp</span> </Link></p>

                 </div>

                 <div>
                 
                 </div>

                 </form>

            </div>

           
            <ToastContainer autoClose={2000} draggable={false} theme="dark" toastClassName='toast' />
            
      

    </div>
  )

}
