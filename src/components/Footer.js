import { Link } from 'react-router-dom';

function Footer() {
  const username = localStorage.getItem('username')

  return (
    <div className='footer' style={{
      position: 'fixed',
      bottom: 0,
      right: '45%',
    }}>
      <p>Logged in as: {username}</p>

      <Link to='/about'>About</Link>
    </div>
  )
}

export default Footer