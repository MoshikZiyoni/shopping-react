import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Headers from './Headers';
import { FaShoppingCart } from "react-icons/fa";

// import './App.css';

function NavBar() {
    const location= useLocation()
     

  return (
    
    <>

      <Navbar bg="primary" variant="dark" >
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <Nav className="me-auto  " variant='pills'>
          {/* {location.pathname==='/'&& <div></div>} */}
            <NavLink to="/" className={({isActive})=> 'moshik-nav-link' + (isActive ? ' selected' : '')} >Home</NavLink>
            <NavLink to="/product" className={({isActive})=> 'moshik-nav-link' + (isActive ? ' selected' : '')} >Product</NavLink>
            <div className="cart-right">
        <NavLink to="/cart" className={({isActive})=> 'moshik-nav-link' + (isActive ? ' selected' : '')}><FaShoppingCart/>Cart
        </NavLink>
      </div>
          </Nav>

        </Container>
      </Navbar>

      
  </>
)}

export default NavBar;