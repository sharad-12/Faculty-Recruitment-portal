import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function Navbar() {

  const auth=localStorage.getItem("user");
  const navigate=useNavigate();

  const logout=async()=>{
        localStorage.clear();
        navigate('/login');
  }

  let [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full top-0 left-0'>
    <div className='md:flex items-center justify-between bg-zinc-400 py-4 md:px-4'>
  
    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden lg:mb-20'>
    <ion-icon name={open ? 'close' : 'menu'}class={open ? 'text-white' : 'text-white'}></ion-icon>
    </div>
      <ul className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static  text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
      <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-white-400"><Link to="/profile">Profile</Link></li>
        <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-gray-400"><Link to="/application">Application</Link></li>
        <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-gray-400 "><Link to="/qualification">Qualification</Link></li>
        <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-gray-400 "><Link to="/experience">Experience</Link></li>
        <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-gray-400 "><Link to="/reference">Reference</Link></li>
        <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-gray-400 "><Link to="/final">Final</Link></li>
      </ul>
      <ul>
      <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer hover:text-gray-400"><Link onClick={logout} to="/home">Logout({auth})</Link></li>
      </ul>
      </div>
  </div>
  )
}


