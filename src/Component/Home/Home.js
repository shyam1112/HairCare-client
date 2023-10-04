import React from 'react'
import shop from './shop.jpg'
import './home.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const cuslogin=()=>{
    navigate('/cushome');
  }
  const shoplogin=()=>{
    navigate('/shoplogin')
  }

  return (
    <div className='rott'>
        <div className='shopimage'>
            <div className='image'>
            <img src={shop} alt='image' />
            </div>
            <div className='btn'>
            <Button variant="primary"  onClick={cuslogin} style={{marginTop:'7em',display:'block',width:'95%',alignItems:'center'}}>As a Customer    </Button>
            <Button variant="primary" onClick={shoplogin}  style={{marginTop:'2em',width:'95%',alignItems:'center',marginBottom:'2em'}}>As a Shopkeeper</Button>
            </div>
        </div>
    </div>
  )
}
