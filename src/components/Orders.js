import React from 'react';
import { Card } from 'react-bootstrap';

function Orders({allOrder}) {
  return (
    <div>
      {allOrder.map(order => (
        <Card key={order.id} style={{ margin: '10px' }}>
          <Card.Body>
            <Card.Title>Order ID: {order.id}</Card.Title>
            <Card.Text>
              <strong>User:</strong> {order.user}<br />
              <strong>Order Data:</strong> {order.created_date}<br />
              <strong>Product:</strong> {order.product}<br />
              <strong>Quantity:</strong> {order.quantity}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default Orders;
