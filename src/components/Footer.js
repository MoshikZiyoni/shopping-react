import { Link } from 'react-router-dom';

function Footer() {
  

  return (
    <div className='footer' style={{
      position: 'fixed',
      bottom: 0,
      right: '45%',
    }}>
      <p>Logged in as: {localStorage.getItem('username')}</p>

      <Link to='/about'>About</Link>
    </div>
  )
}

export default Footer