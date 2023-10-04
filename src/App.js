import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Component/Home/Home'
import Shoplogin from './Component/shopkeeperlogin/Shoplogin';
import Shopreg from './Component/shopkeeperlogin/Shopreg'
import Shopdata from './Component/shopinfo/Shopdata';
import Nav from './Component/Nav/Navv';
import Pvtcontex from './Component/context/Pvtcontex';
import Adddata from './Component/shopinfo/Adddata';
import Profile from './Component/profile/Profile';
import Cushome from './Component/customerlogin/Cushome/Cushome';

function App() {
  return (
    <BrowserRouter>
   <Routes>
    <Route element={<Pvtcontex/>}>
    <Route path='/shopdata' element={<Shopdata/>} />
    <Route path='/adddata' element={<Adddata/>} />
    </Route>
    <Route path='/' element={<Home/>} />
    <Route path='/shoplogin' element={<Shoplogin />} />
    <Route path='/shopreg' element={<Shopreg />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/cushome' element={<Cushome/>} />

   </Routes>
   </BrowserRouter>
  );
}

export default App;
