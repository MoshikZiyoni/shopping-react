import Spinner from 'react-bootstrap/Spinner';

function ButtonSpinner() {
  return (
    <Spinner animation="border" role="status" style={{width:'300px',height:'300px',position:'fixed',zIndex: '9999',left:'calc(50% - 150px)',top:'calc(50% - 150px)' }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default ButtonSpinner;