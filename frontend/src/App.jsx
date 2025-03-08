import { Fragment } from "react"
import { Link,Routes,Route,BrowserRouter} from "react-router-dom"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"

function App() {

  return(
    

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} /> 

      
        
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />



      </Routes>
    </BrowserRouter>
    
  )


}


export default App

