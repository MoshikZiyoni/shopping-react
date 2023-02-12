import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { AiOutlineShop } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";


function NavBar({ cartCount, setCartCount, logout }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (

    <>


      <Navbar bg="primary" variant="dark" >
        <Container>
          <Nav className="me-auto  " variant='pills'>
            <NavLink to="/" style={{ paddingRight: '30px' }} className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >
              <AiFillHome style={{ fontSize: '30px' ,color:'black'}} />
              Home</NavLink>
            <NavLink to="/product" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >
              <AiOutlineShop style={{ fontSize: '30px',color:'black' }} />
              Product</NavLink>
            <NavLink to="/login" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >Login</NavLink>
             <span  className="clock-display" style={{ fontSize: '24px', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translate(-50%)' }} >Tel-Aviv GMT {time}  </span >
            <div className="cart-right">
              <NavLink to="/cart" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')}><FaShoppingCart />Cart <span style={cartCount > 0 ? { color: "darkred" } : { color: "black" }} className="carcount">{cartCount}</span>
                <NavLink style={{ color: 'black', paddingLeft: '30px' }} to="/" onClick={logout}>Logout </NavLink>

              </NavLink>
            </div>

          </Nav>

        </Container>
      </Navbar>


    </>
  )
}

export default NavBar;