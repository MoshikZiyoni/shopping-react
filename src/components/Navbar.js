import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineShop } from "react-icons/ai";
import { AiFillHome, AiOutlineLogin ,AiFillClockCircle} from "react-icons/ai";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../style.css';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const NavStyle = {
  display: 'flex',
  padding: '0px 15px 0px 15px',
  alignItems: 'center',
  flexDirection: 'column'
}


function NavBar({ cartCount, setCartCount, logout, loggedIn }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (

    <>


      <Navbar bg="primary" variant="dark"  >
        <Container>

          <Nav className="me-auto  " variant='pills'>
            <NavLink to="/" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} style={NavStyle} >

              <AiFillHome style={{ fontSize: '30px', color: 'black' }} />

              Home</NavLink>
            <NavLink to="/product" style={NavStyle} className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >
              <AiOutlineShop style={{ fontSize: '32px', color: 'black' }} />
              Product</NavLink>
            {/* <NavLink to="/login" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >Login</NavLink> */}
            <span className="clock-display" style={{ fontSize: '24px', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translate(-50%)' }} >
              <AiFillClockCircle/>
              Tel-Aviv GMT {time}  </span >
          </Nav>

        </Container>
        <NavLink to='/cart' style={NavStyle}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartCount === 0 ? '0' : cartCount} color="secondary">
              <ShoppingCartIcon />

            </StyledBadge>
          </IconButton>
        </NavLink>

        {loggedIn ? (
          <NavLink  style={{ color: 'black' }} to="/" onClick={logout}>
            <AiOutlineLogin />
            Logout
          </NavLink>
        ) : (
          <NavLink  style={{ color: 'black' }} to="/login">
            <AiOutlineLogin />

            Login
          </NavLink>
        )}

      </Navbar>


    </>
  )
}

export default NavBar;