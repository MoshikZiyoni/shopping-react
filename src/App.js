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
import Cart_list from './components/Cart_list';



function App() {
  const [product,setProduct]=useState([])
  
  useEffect(()=>{
    axios.get('https://shopping-django-1.onrender.com/product/api/',{mode: 'no-cors'})
    .then((response)=> setProduct((response.data) ? response.data :
     []))
    },[])

    const [cartlist,setCartlist]=useState([])
  
  useEffect(()=>{
    axios.get('https://shopping-django-1.onrender.com/product/cart-list/',{mode: 'no-cors'})
    .then((response)=> setCartlist((response.data) ? response.data :
      []))
    },[])

  
  

  return (
    
    <BrowserRouter>
    <head>
        <base href="/" />
      </head>
    <NavBar></NavBar> 
    {/* <Headers/> */}
    <Background>     </Background>
    <div className="App" >
    
    {/* className='container' */}
  
  <Routes>
      <Route path='/' element={   <Homepage> </Homepage>}></Route>
      <Route path='/product' element={<Cart  product={product} setCartlist={setCartlist}  ></Cart>}></Route>
      <Route path='/cart' element={<Cart_list cartlist={cartlist}></Cart_list>}></Route>
      {/* <Route path='/cart' element={<Cart  product={product}></Cart>}></Route> */}
    
    </Routes>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
