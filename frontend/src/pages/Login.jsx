import axios from "axios"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"



export default function Login(){


    const navigate = useNavigate()


    function handleLogin(e){
        e.preventDefault()
        console.log(e)


        axios.post('http://localhost:3000/login', {
        username:e.target[0].value,
        password:e.target[1].value,

        },{withCredentials:true})
        .then(res=>{
            if(res.status === 200){
                console.log(res.data)
                sessionStorage.setItem('auth','true')
                navigate('/home')
            }

        })



        .catch(e=>console.log(e))
    } 
    





    return (
      <Fragment>
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

          <form className=" w-80 border-4 rounded-2xl border-cyan-500 p-5 flex flex-col" onSubmit={(e)=>handleLogin(e)}>

            <input placeholder="username" type="text" />
            <input placeholder="password" type="password" />

            <button type="submit">Login</button>

          </form>

        

        </div>

      </Fragment>
    )
  
}