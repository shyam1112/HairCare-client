import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
function Cusnavbar() {
  return (
    <div className='cusnavbar'>
      <ul className="topnav">
        <li ><Link className="active" to='/cushome' >Home</Link></li>
        {/* <li><Link >News</Link></li>em
        <li><Link >Contact</Link></li> */}
        <li className="right"><Link href="#about">Contact us  </Link></li>
      </ul>

    
    </div>
  );
}

export default Cusnavbar;
