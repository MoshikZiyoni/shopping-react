import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const AlertSuccessful = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
          <Alert variant="success" style={   { position:'fixed',zIndex: '9999'}} onClose={() => setShow(false) } dismissible>
            <Alert.Heading>Well Done!! Successful</Alert.Heading>
          </Alert>
        );
      }
      return <Button onClick={() => setShow(true)}> Show Alert</Button>;
}

export default AlertSuccessful


