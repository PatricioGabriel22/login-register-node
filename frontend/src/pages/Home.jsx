import axios from "axios";
import { Fragment, useEffect, useState } from "react"






export default function Home(){


    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3000/protected',{withCredentials:true}).then(res=>console.log(res))

    },[])
    
    return(
    <Fragment>

      <h1 className="bg-rose-500 text-black">Home</h1>
    </Fragment>
    )
}