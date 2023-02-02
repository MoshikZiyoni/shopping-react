import { useEffect, useState } from 'react';
import Headers from './components/Headers';
import logo from './5183000.jpg';
import './App.css';
import React from 'react'
import axios from 'axios';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart_list from './components/Cart_list';
import Login from './components/Login';
import About from './components/About';
import Product from './components/Product';



function App() {
  const [product, setProduct] = useState([])
  function login(user, pass) {
    axios.post('http://127.0.0.1:4444/login/', {
      username: user,
      password: pass,
    })
  }


  useEffect(() => {
    axios.get('https://shopping-django-1.onrender.com/product/api/')
      .then((response) => setProduct((response.data) ? response.data :
        []))
  }, [])

  const [cartlist, setCartlist] = useState([])

  useEffect(() => {
    // axios.get('https://shopping-django-1.onrender.com/product/cart-list/')
      axios.get('https://shopping-django-1.onrender.com/product/cart-list/')

      .then((response) => setCartlist((response.data) ? response.data :
        []))
  }, [])

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch cart items from the backend and update the cartCount state variable
    // axios.get('https://shopping-django-1.onrender.com/product/cart')
    axios.get('https://shopping-django-1.onrender.com/product/cart/')
      .then(response => {
        setCartCount(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  
    // Add an event listener to listen for changes in the cart items
    document.addEventListener('cartChanged', e => {
      setCartCount(e.detail.cartCount);
    });
  
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('cartChanged', e => {
        setCartCount(e.detail.cartCount);
      });
    };
  }, []);

  



  return (

    <BrowserRouter>

      <NavBar  cartCount={cartCount} setCartCount={setCartCount}/>

      <div style={{
        backgroundImage: `url(${logo})`,
        "backgroundSize": "cover",
        position: "absolute",
        // height: "170%",
        width: "100%",

      }} className="App"  >
      <Headers/>

        <Routes>

          <Route exact path='/' ></Route>
          <Route path='/product' element={<Product product={product} setCartlist={setCartlist}  ></Product>}></Route>
          <Route path='/cart' element={<Cart_list cartlist={cartlist} ></Cart_list>}></Route>
          <Route path='/login' element={<Login login={login}></Login>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path="*" element={<Product product={product} setCartlist={setCartlist} />} />

        </Routes>
        {/* <Footer /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
