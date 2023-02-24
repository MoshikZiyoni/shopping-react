import { Link } from 'react-router-dom';

function Footer() {


  return (
    <>
      <div className='footer' style={{
        position: 'fixed',
        bottom: 0,
        left: '85%',
        width: '200px'
      }}>
       

        <Link to='/about'>About</Link>
      </div>

    </>

  )
}

export default Footer