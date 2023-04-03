import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Addbook = (props) => {
  var [input,setInput] = useState(props.data)
   console.log("add page props"+props.data)

  const inputHandler =(e)=>{
    const{name,value} = e.target 
    setInput({...input,[name]:value})
  }
   const readvalue= () =>{
    console.log("clicked")
    console.log("input");
    if (props.method === "post"){
    axios.post("http://localhost:3005/students",input)
    .then(response=>{
      console.log("post data" + response.data)
       alert("success")
    })
    .catch(err=>console.log(err))
   }else if (props.method === "put") {
    axios.put("http://localhost:3005/students" + input.id,input)
    .then((response) =>{
      console.log("put data" + response.data)
      alert("success")
      window.location.reload(false);
    })
    .catch((err) =>{
      console.log(err)
    })
    }
   }
  return (
    <div>
     <br/>
     <br/>
     <TextField label='Name' name='name' variant='outlined'
    value={input.name} onChange={inputHandler}/>
    <br/>
    <br/>
     <TextField label='Grade' name='grade' variant='outlined'
    value={input.grade} onChange={inputHandler}/>
    <br/>
    <br/>
    <Button variant='contained' color='success' onClick={readvalue}>Submit</Button>
   </div>
  )
}

export default Addbook
