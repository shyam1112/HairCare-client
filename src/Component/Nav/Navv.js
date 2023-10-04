import React from 'react'
import './nav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';

export default function Navv() {
  const navigate = useNavigate();
  
  const logout=()=>{
    localStorage.clear();
    navigate('/shoplogin');
  }
  return (
    <div>

  
    {/* <div className='navbar'>
    
    <ul>
    <li><Link class="active" to="/shopdata">Home</Link></li>
    <li><Link to='/adddata'>Add-Shop-Data</Link></li>
    <li><Link href="#contact">Contact-us</Link></li>
    <div className='prosign'>
    <li  style={{marginRight:'4em'}} onClick={logout}><Link href="#about">signOut</Link></li>
    <li><Link to="/profile">Profile</Link></li>
    </div>
  </ul>
  </div> */}
  <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/shopdata">Hair-Care</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/shopdata' className='mt-3'>
            <Nav.Link  className="d-flex justify-content-center">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/adddata' className='mt-3'>
            <Nav.Link  className="d-flex justify-content-center">Add-Shop-Data</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/profile' className='mt-3'>
            <Nav.Link  className="d-flex justify-content-center">Profile</Nav.Link>
            </LinkContainer>

            <Nav.Link  className="d-flex justify-content-center mt-3" onClick={logout}>signOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  )
}
