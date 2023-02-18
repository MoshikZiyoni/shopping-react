import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { AiOutlineShop } from "react-icons/ai";
import { AiFillHome, AiOutlineLogin } from "react-icons/ai";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../style.css';
import Car from './Car';

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

  return (
    <>

      <Navbar bg="primary" variant="dark"  >

        <Container>

          <Car />
          <Nav className="me-auto  " variant='pills'>
            <NavLink to="/" className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} style={NavStyle} >
              <AiFillHome style={{ fontSize: '30px', color: 'black' }} />
              Home</NavLink>
            <div className='birds2' />
            <div className="clouds2">
              <div />
              <div />
              <div />
            </div>
            <div className='sun2 ' />
            <NavLink to="/product" style={NavStyle} className={({ isActive }) => 'moshik-nav-link' + (isActive ? ' selected' : '')} >
              <AiOutlineShop style={{ fontSize: '32px', color: 'black' }} />
              Product</NavLink>
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
          <NavLink style={{ color: 'black' }} to="/" onClick={logout}>
            <AiOutlineLogin />
            Logout
          </NavLink>
        ) : (
          <NavLink style={{ color: 'black' }} to="/login">
            <AiOutlineLogin />

            Login
          </NavLink>
        )}

      </Navbar>


    </>
  )
}

export default NavBar;