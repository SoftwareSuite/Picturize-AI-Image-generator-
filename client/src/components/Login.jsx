import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState("Log In");
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const {setShowLogin, backendUrl,  setToken, setUser} = useContext(AppContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            
            if(state === "Log In") {
                const {data} = await axios.post(backendUrl + '/api/user/login', {
                    email, password
                })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else {
                    toast.error(data.message)
                }
            }else {
                const {data} = await axios.post(backendUrl + '/api/user/register', {
                    name,email, password
                })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        document.body.style.overflow = "hidden";

        return ()=> {
        document.body.style.overflow = "unset";
        }

    }, [])

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm
    bg-black/30 flex justify-center items-center'>
        <form 
        onSubmit={submitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm mt-2'>Welcome back! Please sign in to continue</p>

            {state !== "Log In" && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img width={25} src={assets.profile_icon} alt="" />
                <input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                className='outline-none text-sm' type='text' placeholder='Full Name' required/>
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input 
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                className='outline-none text-sm' type='email' placeholder='Your Email' required/>
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input 
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                className='outline-none text-sm' type='password' placeholder='Password' required/>
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full '>{state === "Log In" ? "Log In" : "Create Account"}</button>

            {state === "Log In" ? <p className='mt-5 text-center'>Don't have an account? 
                <span onClick={()=>setState('Sign Up')} className='text-blue-600 cursor-pointer'>Sign Up</span></p>
                :
            <p className='mt-5 text-center'>Already have an account? 
                <span onClick={()=>setState('Log In')} className='text-blue-600 cursor-pointer'>Sign In</span></p>}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className='absolute cursor-pointer top-5 right-5'/>


        </form>
    </div>
  )
}

export default Login