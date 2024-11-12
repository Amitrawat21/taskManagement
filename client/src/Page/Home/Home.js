import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

const Home = () => {

//     const [data , setData]= useState({})



//     console.log(data , "this is data")


// useEffect(()=>{
//   const myfun = async()=>{
//     const response = await axios.get('http://localhost:8000/user/profile')
//     if(response.data.success){
//         setData(response.data.user)
//     }
//     else{
//         console.log("no data")
//     }
//   }

//   myfun()

// } , []) 

    const token = Cookies.get('token');
    console.log(token, "this is the token cookie");

    

  return (
    <div>
      this is home
    </div>
  )
}

export default Home
