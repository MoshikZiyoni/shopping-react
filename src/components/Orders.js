import axios from 'axios';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Message, Icon } from 'semantic-ui-react'
import ButtonSpinner from './Spinner';
import AlertSuccessful from './Succsess';

function Orders({ allOrder, product, setCartlist, setCartCount }) {
    const [showMessage, setShowMessage] = useState(null)  // add this line
    const [spinner, setSpinner] = useState(false)
    const [successfulMessage, setSuccessfulMessage] = useState(false)
    const [alertMessage, setAlertMessage] = useState(false)
    const MessageExampleIcon = ({ loading }) => (
        <Message icon visible={loading}>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
            </Message.Content>
        </Message>
    )
    function handleAddToCart(productId) {
        setShowMessage(productId)
        setSpinner(true)
        const product = { products: productId, quantity: 1, user: localStorage.getItem('username') }
        axios.post(`https://shopping-django-1.onrender.com/product/cart-list/`, product)
            .then(response => {
                axios.get(`https://shopping-django-1.onrender.com/product/api/${productId}`)
                    .then(productdata => {
                        setSpinner(false)
                        setSuccessfulMessage(true)
                        console.log("product", productdata.data)
                        product.products = productdata.data
                        setCartlist(carlist => [...carlist, product])
                        setCartCount(cartcount => cartcount + 1)
                        setTimeout(() => {
                            setShowMessage(null)
                            setSuccessfulMessage(false)
                        }, 1000 * 3)
                    })
            })
            .catch(error => {
                setSpinner(false)
                setAlertMessage(true)
                setShowMessage(null)
                setTimeout(() => {
                    setShowMessage(null)
                    setAlertMessage(false)
                }, 1000 * 3)
                alert('Check maybe you have this product already in your cart')
            })
    }

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

    // Check if allOrder is empty
    if (allOrder.length === 0) {
        return <p>No orders yet.</p>;
    }

    return (
        <div>
            {spinner ? <div style={{ display: 'flex' }}> <ButtonSpinner /></div> : null}
            {
                successfulMessage ? <AlertSuccessful /> : null
            }
            {allOrder.map((order) => (
                <Card key={order.id} style={{ margin: '10px' }}>
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
                                            <strong>Product Description:</strong> {prod.description}
                                        </p>
                                        <p>
                                            {' '}
                                            <img
                                                src={`https://shopping-django-1.onrender.com/static${prod.image}`}
                                                alt="product image"
                                                style={{ width: '10vw', height: '10vh' }}
                                            />
                                            <Button className='close' variant="primary" onClick={() => {
                                                handleAddToCart(prod.id)
                                                setSpinner(true)
                                            }}>Buy again</Button>
                                            {showMessage === prod.id && spinner && <MessageExampleIcon loading={spinner} />}
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
