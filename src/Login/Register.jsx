import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/aunthContext';
import { cache } from 'react';

export default function register() {
  const {register}=useAuth();
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [lastName, setLastName]= useState("");
    const [email,setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const HandleSumit = async (event)=>{
        event.preventDefault();
        try{
          await register(email,passWord,name,lastName);
          console.log("antes de");
          navigate('/home');
          console.log("despues de ")

        }catch(error){
          console.log(error);
        }
        
        

    }
  return (
    <>
    <div className='login'>
    <form className='login-form' onSubmit={HandleSumit}>
        <p className='login-p'>Nombre</p>
        <input className='login-in' type="text" onChange={(e)=>{setName(e.target.value)}}/>
        <p className='login-p'>Apellido</p>
        <input className='login-in' type="text" onChange={(e)=>{setLastName(e.target.value)}} />
        <p className='login-p'>Correo Electronico</p>
        <input className='login-in' type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <p className='login-p'>Contraseña</p>
        <input className='login-in' type="password" onChange={(e)=>{setPassWord(e.target.value)}}/>
        <button type='sumit' className='sumit-button'>Registrar</button>

    </form>

    </div>
    
    </>
  )
}
