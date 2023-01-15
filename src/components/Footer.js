import logo from '../5183000.jpg';

function Footer() {
    function LandingFrame() {
        const style = {
          "backgroundImage": `url(${logo})`,
          "backgroundRepeat": "no-repeat",
            "backgroundSize": "cover",
            position: "absolute",
            height: "100%",
            width: "100%"
        }
        return <div style={style}></div>}
  return (
    <div>
        Footer</div>
  )
}

export default Footer