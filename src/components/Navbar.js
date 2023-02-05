import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Headers from './Headers';
import { FaShoppingCart } from "react-icons/fa";

// import './App.css';

function NavBar({ cartCount, setCartCount, logout }) {
  const location = useLocation()


  return (

    <>


      <Navbar bg="primary" variant="dark" >
        <Container>
          <Nav className="me-auto  " variant='pills'>
          
            <NavLink to="/" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >Home</NavLink>
            <NavLink to="/product" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >Product</NavLink>
            <NavLink to="/login" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >Login</NavLink>
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