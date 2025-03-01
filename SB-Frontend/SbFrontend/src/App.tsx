import DashBoard from "./components/ui/Dashboard"
import Sharings from "./components/ui/Sharings"
import SignIn from "./components/ui/SignIn"
import SignUp from "./components/ui/SignUp"
import {BrowserRouter , Routes , Route} from "react-router"






function App(){

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/signIn" element={<SignIn/>}></Route>
      <Route path="/signUp" element={<SignUp/>}></Route>
      <Route path="/dashboard" element={<DashBoard/>}></Route>
      <Route path="/SocialShare/:sharelink" element={<Sharings/>}></Route>
    </Routes>
    </BrowserRouter>
   
  )

}





export default App
