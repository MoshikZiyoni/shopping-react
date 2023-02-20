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
import Cart from './components/Cart';
import Login from './components/Login';
import About from './components/About';
import Product from './components/Product';
import Error404 from './components/Error404';
import RegisterForm from './components/RegisterForm';

function App() {
  const [product, setProduct] = useState([])
  const [session, setSession] = useState(localStorage.getItem('session'))
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('session') === 'logged-in');
  const [cartlist, setCartlist] = useState([])
  const [cartCount, setCartCount] = useState(0);

  function login(user, pass) {
    axios.post('http://127.0.0.1:4434/login/', {
      username: user,
      password: pass,
    })
      .then(response => {
        console.log(response.data);
        setSession('logged-in')
        alert('Success')
        localStorage.setItem('session', 'logged-in')
        localStorage.setItem('username', user)
        setLoggedIn(true);
        window.location.replace('/product');
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
    // Logout from the server
    axios.get("https://shopping-django-1.onrender.com/logout/")
    setSession(null)
    alert('logout successful')
    // Remove the session and the username from the localstorage
    localStorage.removeItem('session')
    localStorage.removeItem('username')
    setLoggedIn(false);

  }


  useEffect(() => {
    // Fetch all the product items from the backend
    axios.get('https://shopping-django-1.onrender.com/product/api/')
      .then((response) => setProduct((response.data) ? response.data :
        []))
  }, [])



  useEffect(() => {
    // Fetch cart items from the backend and update the cartCount state variable
    const username = localStorage.getItem('username');
    axios.get(`https://shopping-django-1.onrender.com/product/cart/?username=${username}`)
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
  }, [localStorage.getItem('username')]);



  return (
    <>
      <BrowserRouter>

        <NavBar cartCount={cartCount} setCartCount={setCartCount} logout={logout} loggedIn={loggedIn} />

        <div style={{
          backgroundImage: `url(${logo})`,
          // "backgroundSize": "cover",
          position: "absolute",
          // minHeight: '92vh',
          width: "100%",
          zIndex: 1,
        }} className="App"  >

          <Headers />

          <Routes>

            <Route exact path='/' ></Route>
            <Route path='/product' element={<Product product={product} setCartCount={setCartCount} setCartlist={setCartlist} loggedIn={loggedIn} ></Product>}></Route>
            <Route path='/login' element={<Login login={login}></Login>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/cart' element={<Cart cartlist={cartlist} setCartlist={setCartlist} setCartCount={setCartCount}></Cart>}></Route>
            <Route path='/register' element={<RegisterForm/>}></Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />

        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
