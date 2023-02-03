import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const AlertDanger = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
          <Alert variant="danger" style={   { position:'fixed',zIndex: '9999'}} onClose={() => setShow(false) } dismissible>
            <Alert.Heading>Delete successful</Alert.Heading>
          </Alert>
        );
      }
      return <Button onClick={() => setShow(true)}> Show Alert</Button>;
}

export default AlertDanger


