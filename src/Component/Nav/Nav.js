import React from 'react'
import './nav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Nav() {
  const navigate = useNavigate();
  
  const logout=()=>{
    localStorage.clear();
    navigate('/shoplogin');
  }
  return (
    <div className='navbar'>
    
    <ul>
    <li><Link class="active" to="/shopdata">Home</Link></li>
    <li><Link to='/adddata'>Add-Shop-Data</Link></li>
    <li><Link href="#contact">Contact-us</Link></li>
    <div className='prosign'>
    <li  style={{marginRight:'4em'}} onClick={logout}><Link href="#about">signOut</Link></li>
    <li><Link to="/profile">Profile</Link></li>
    </div>
  </ul>
  </div>
  )
}
