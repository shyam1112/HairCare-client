import React, { useState } from 'react';
import './adddata.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../Nav/Nav';

function Adddata() {
  
    const [owner,setOwner] = useState('');
    const [shopname,setShopname]=useState('');
    const [mobilenumber,setmobilenumber]=useState('');
    const [address,setAddress]=useState('');
    const userId=localStorage.getItem('userid');
    const handleSubmit=async(e)=>{
        e.preventDefault();
       console.log(shopname,owner,mobilenumber,address);
       try {
        const response = await fetch('http://localhost:4000/addshopdata', {
          method: 'POST',
          body: JSON.stringify({userId,shopname,owner,mobilenumber,address}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
            toast.success("Data added Successfully..done 😃!", {
                position: "top-center"
            });
        //   console.log('Data sent successfully');
        } else {
            toast.error("Data added failed. Please try again later.", {
                position: "top-center"
            });
        //   console.error('Error sending data');
        }
      } catch (error) {
        toast.error("Error sending data", {
            position: "top-center"
        });
        // console.error('Error sending data', error);
      }
    }

  return (
    <div>
       <Nav/>
      <h2 style={{textAlign:'center',marginTop:'2em'}}>Add Shop Information</h2>
      <form className="shop-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={owner}
            onChange={(e)=>setOwner(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobilenumber">Mobile Number:</label>
          <input
            type="text"
            id="mobilenumber"
            name="mobilenumber"
            value={mobilenumber}
            onChange={(e)=>setmobilenumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={shopname}
            onChange={(e)=>setShopname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='submitbtn'>

        <button type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Adddata;
