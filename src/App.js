import { useEffect, useState } from 'react';
import Headers from './components/Headers';
import logo from './5183000.jpg';
import './App.css';
import './style.css'
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
  const [session, setSession] = useState(localStorage.getItem('session'))

  function login(user, pass) {
    axios.post('https://shopping-django-1.onrender.com/login/', {
      username: user,
      password: pass,
    })
      .then(response => {
        console.log(response.data);
        setSession('logged-in')
        alert('Success')
        localStorage.setItem('session', 'logged-in')
        localStorage.setItem('username', user)


      })
      .catch(error => {
        console.log(error);
        let status = error.message
        switch (error.code) {
          case "ERR_BAD_REQUEST":
            status = "username or password not correct"
            break
          case "ERR_NETWORK":
            status = "could not reach the server. perhaps it is down?"
            break
          case "ERR_BAD_RESPONSE":
            status = "server is up. but had an error. you can try again in a fews seconds"
            break
          default:
            break
        }
        alert("something went wrong: " + status)
      });
  }

  function logout() {
    axios.get("https://shopping-django-1.onrender.com/logout/")
    setSession(null)
    alert('logout successful')
    localStorage.removeItem('session')
    localStorage.removeItem('username')
  }


  useEffect(() => {
    axios.get('https://shopping-django-1.onrender.com/product/api/')
      .then((response) => setProduct((response.data) ? response.data :
        []))
  }, [])

  const [cartlist, setCartlist] = useState([])

  useEffect(() => {
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

      <NavBar cartCount={cartCount} setCartCount={setCartCount} logout={logout} />

      <div style={{
        backgroundImage: `url(${logo})`,
        "backgroundSize": "cover",
        position: "absolute",
        minHeight: '92vh',
        width: "100%",

      }} className="App"  >
        <Headers />

        <Routes>

          <Route exact path='/' ></Route>
          <Route path='/product' element={<Product product={product} setCartCount={setCartCount} setCartlist={setCartlist}  ></Product>}></Route>
          <Route path='/cart' element={<Cart_list cartlist={cartlist} setCartlist={setCartlist} setCartCount={setCartCount}></Cart_list>}></Route>
          <Route path='/login' element={<Login login={login}></Login>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          {/* <Route path="*" element={<Product product={product} setCartlist={setCartlist}  />} /> */}
          <Route path="*" />
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
