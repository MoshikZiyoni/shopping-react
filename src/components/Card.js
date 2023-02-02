import React from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { MdDateRange, MdOutlineDescription, MdDeleteForever } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { IoBagCheckOutline } from "react-icons/io5";

const Card2 = (product) => {

    const [refresh, setRefresh] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [showMessage, setShowMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    function updateCart(productId, cartId, quantity) {
        setShowMessage(productId)
        setLoading(true)
        axios.put(`https://shopping-django-1.onrender.com/product/update-cart/${cartId}/`, {
            "id": cartId,
            "products": productId,
            quantity: quantity
        })
            .then(response => {
                setLoading(false)
                alert('Quantity is updated')
                setShowMessage(null)  // reset the showMessage state after the message has been displayed
                console.log(response, 'Successes', productId);
                return <div>Successes </div>
            })
            .catch(error => {
                setLoading(false)
                alert('Data not transfer')
                setShowMessage(null)  // reset the showMessage state after the message has been displayed
                console.log(error, 'Data not transfer', productId,);
                return <div>Data not transfer,please try again </div>
            });
    }


    function handlePlusClick() {
        setQuantity(quantity + 1);
    }
    function handleMinusClick() {
        setQuantity(quantity - 1);
    }





    function deleteFromCart(productId) {
        setShowMessage(productId)
        setLoading(true)
        axios.delete(`https://shopping-django-1.onrender.com/product/delete-cart/${productId}`)
            // axios.delete(`http://127.0.0.1:5512/product/delete-cart/${productId}`)
            .then(response => {
                setLoading(false)
                alert('Successes');
                setShowMessage(null)  // reset the showMessage state after the message has been displayed
                return <div>Successes </div>
            })
            .catch(error => {
                setLoading(false)
                alert('Data not transfer');
                setShowMessage(null)  // reset the showMessage state after the message has been displayed
                return <div>Data not transfer,please try again </div>
            });
    }
    return (
        <div>
            <Card border="secondary" key={product.id} className="card-hover" style={{ width: '18rem', background: 'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
                <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.products.image}`} alt="product image" />
                <Card.Body>
                    <Card.Title style={{ textDecoration: "underline" }}>{product.products.name}</Card.Title>
                    <Card.Text>
                        ID: {product.id}
                        <br></br>
                        <MdOutlineDescription />{product.products.description}
                        <br></br>
                        <ImPriceTag />Price: {product.products.price}$
                        <br></br>
                        <MdDateRange />Create:{product.products.created}
                        <br></br>
                        <MdDateRange />Updated:{product.products.updated}
                        <br />
                        Quantity: {product.quantity}
                    </Card.Text>
                    <Button variant='info' onClick={() => updateCart(product.product.id, product.id, quantity)} style={{ margin: '0.8rem' }}>Update</Button>
                    {/* {showMessage === product.id && loading && <MessageExampleIcon loading={loading} />} */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Button variant="danger" onClick={handleMinusClick}>-</Button>
                        <input type="text" value={1} onChange={e => setQuantity(e.target.value)} />
                        <Button onClick={handlePlusClick}>+</Button>
                    </div>
                    <br />
                    <div style={{ marginRight: '10px' }}>
                        <MdDeleteForever></MdDeleteForever>
                        <Button variant="danger" onClick={() => deleteFromCart(product.product.id)}>Remove</Button></div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Card2