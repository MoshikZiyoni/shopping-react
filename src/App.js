import { useEffect, useState } from 'react';
import Headers from './components/Headers';
import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Homepage from './components/Homepage';
import Background from './components/Background';



function App() {
  const [product,setProduct]=useState([])
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:5512/product/api/',{mode: 'no-cors'})
    .then((response)=> setProduct((response.data) ? response.data :
     []))
    },[])

  
  

  return (
    
    <BrowserRouter>
    <NavBar></NavBar> 
    {/* <Headers/> */}
    <Background>     </Background>
    <div className="App" >
    
    {/* className='container' */}
  
  <Routes>
      <Route path='/' element={   <Homepage> </Homepage>}></Route>
      <Route path='/product' element={<Cart  product={product}></Cart>}></Route>
      {/* <Route path='/cart' element={<Cart  product={product}></Cart>}></Route> */}
    
    </Routes>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
