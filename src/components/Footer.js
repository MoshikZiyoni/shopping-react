import { Link } from 'react-router-dom';

function Footer() {
  

  return (
    <>
    <div className='footer' style={{
      position: 'fixed',
      bottom: 0,
      left: '85%',
      width:'200px'
    }}>
      Logged in as: {localStorage.getItem('username')}
      <br></br>

      <Link to='/about'>About</Link>
    </div>
    </>
  )
}

export default Footer