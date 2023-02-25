import React from 'react';
import { Card } from 'react-bootstrap';

function Orders({ allOrder, product }) {
    // Calculate the total price for each order ID
    const orderTotalPrice = allOrder.reduce((acc, curr) => {
        const { id, quantity, product: productId } = curr;
        const prod = product.find((p) => p.id === productId);
        if (!prod) {
            return acc;
        }
        const prodTotalPrice = prod.price * quantity;
        if (acc[id]) {
            return { ...acc, [id]: acc[id] + prodTotalPrice };
        } else {
            return { ...acc, [id]: prodTotalPrice };
        }
    }, {});

    return (
        <div>
            {allOrder.map((order) => (
                <Card key={order.id} style={{ margin: "10px" }}>
                    <Card.Body>
                        <Card.Title>Order ID: {order.order}</Card.Title>
                        <Card.Text>
                            <strong>User:</strong> {order.user}
                            <br />
                            <strong>Order Data:</strong> {order.created_date}
                            <br />


                            <strong>Quantity:</strong> {order.quantity}
                            <br />
                            {/* Show product details if order.product matches */}
                            {product
                                .filter((prod) => prod.id === order.product)
                                .map((prod) => (
                                    <div key={prod.id}>
                                        <p>
                                            <strong>Product Name:</strong> {prod.name}
                                        </p>
                                        <p>
                                            <strong>Product Price:</strong> ${prod.price}
                                        </p>
                                        <p>
                                            <strong>Product Description:</strong>{" "}
                                            {prod.description}
                                        </p>
                                        <p> <img src={`https://shopping-django-1.onrender.com/static${prod.image}`} alt="product image" style={{width:'10vw',height:'10vh'}} />
                                        </p>
                                    </div>
                                ))}
                            {/* Show total price for orders with the same ID */}
                            {orderTotalPrice[order.id] && (
                                <p>
                                    <strong>Total Price:</strong> ${orderTotalPrice[order.id]}
                                </p>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
export default Orders;
