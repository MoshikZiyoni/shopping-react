import { useLocation } from 'react-router-dom';

function Headers() {
    const location = useLocation();

  return (
    <div  className='center-items'>  
      {location.pathname === '/' && <h3 className='text-center movement change-color-animate' >Welcome to our website.<br></br>You can select a porduct and add to your cart </h3>} 
    </div>
  )
}

export default Headers