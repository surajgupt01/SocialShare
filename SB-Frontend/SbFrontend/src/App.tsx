import DashBoard from "./components/ui/Dashboard"
import Sharings from "./components/ui/Sharings"
import SignIn from "./components/ui/SignIn"
import SignUp from "./components/ui/SignUp"
import Home from "./components/ui/Home"
import {BrowserRouter , Routes , Route} from "react-router"






function App(){

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signIn" element={<SignIn/>}></Route>
      <Route path="/signUp" element={<SignUp/>}></Route>
      <Route path="/dashboard" element={<DashBoard/>}></Route>
      <Route path="/:sharelink" element={<Sharings/>}></Route>
    </Routes>
    </BrowserRouter>
   
  )

}





export default App
