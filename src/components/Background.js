import { BrowserRouter, Route } from 'react-router-dom';
import logo from '../5183000.jpg';
import Headers from './Headers';
import { useLocation } from 'react-router-dom';

function Background() {
  const location = useLocation();


  function LandingFrame() {
    const style = {
      "backgroundImage": `url(${logo})`,
      "backgroundRepeat": "no-repeat",
      "backgroundSize": "cover",
      position: "absolute",
      height: "100%",
      width: "100%"
    }
    return <div
      style={style} >
      {location.pathname === '/' && <h3 className='text-center movement change-color-animate' >Welcome to our website.<br></br>You can select a porduct and add to your cart </h3>



      }

    </div>
  }
  return (

    <div>
      <LandingFrame>

      </LandingFrame>
    </div>

  )
}
export default Background