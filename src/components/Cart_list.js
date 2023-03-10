import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useState } from 'react';
import { MdDateRange, MdOutlineDescription, MdDeleteForever } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import AlertDanger from './AlertDanger'
import AlertSuccessful from './Succsess';
import ButtonSpinner from './Spinner';
import React from 'react';

function Cart_list({ product, cartlist, setCartlist, setCartCount }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [showMessage, setShowMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const [successfulMessage, setSuccessfulMessage] = useState(false)
  const [spinner, setSpinner] = useState(false)




  function updateCart(productId, cartId, quantity,) {
    setShowMessage(productId)
    setLoading(true)
    axios.put(`https://shopping-django-1.onrender.com/product/update-cart/${cartId}/`, {

      "id": cartId,
      "products": productId,
      quantity: quantity

    })
      .then(response => {
        setLoading(true)
        setTimeout(() => {
          setShowMessage(null)
        }, 1000)
        console.log(response, 'Successes', productId);

        const updatedCartlist = cartlist.map(product => {
          if (product.products.id === productId) {
            return {
              ...product,
              quantity: quantity,
            };
          } else {
            return product;
          }
        });
        // update the state of cartlist with the updatedCartlist
        setCartlist(updatedCartlist);
      })
      .catch(error => {
        setLoading(false)
        alert('Data not transfer')
        setTimeout(() => {
          setShowMessage(null)
        }, 1000)
        console.log(error, 'Data not transfer', productId,);

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
      .then(response => {
        setCartlist(products => {
          return products.filter(product => {
            return product.products.id !== productId
          }
          )
        })
        setCartCount(cartcount => cartcount - 1)

      })
      .catch(error => {
        alert('Failed')
      });
  }

 
  return (
    <>
      {spinner ? <div style={{ display: 'flex' }}> <ButtonSpinner /></div> : null}

      <div key={product.id}  >


        {
          alertMessage ? <AlertDanger /> : null
        }
        {
          successfulMessage ? <AlertSuccessful /> : null
        }


        <Card border="secondary " key={product.id} className="card-hover " style={{ width: '18rem', background: 'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
          <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.products.image}`} alt="product image" style={{ height: 240, width: '100%' }} />
          <Card.Body>
            <Card.Title style={{ textDecoration: "underline" }}>{product.products.name}</Card.Title>
            <Card.Text style={{ fontStyle: 'oblique' }}>

              <MdOutlineDescription />{product.products.description}
              <br></br>
              <ImPriceTag />Price: ${product.products.price}
              <br></br>
              <MdDateRange />Create:{product.products.created}
              <br></br>
              <MdDateRange />Updated:{product.products.updated}
              <br />
              Quantity: {product.quantity}
            </Card.Text>

            <div onClick={() => {
              updateCart(product.products.id, product.id, quantity); setSpinner(true); setSuccessfulMessage(true);
              console.log(quantity, 'quantity');
              setTimeout(() => {
                setSpinner(false)
                setSuccessfulMessage(false)
              }, 1000 * 3)
            }
            }
              style={{ margin: '0.8rem' }}>
              <Button className='pulse' variant='info'  >
                <GrUpdate />
                Update</Button>
            </div>


            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Button variant="danger" className='raise' onClick={handleMinusClick}>-</Button>
              <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
              <Button className='raise' onClick={handlePlusClick}>+</Button>
            </div>
            <br />
            <div style={{ marginRight: '10px' }}>
              <Button variant="danger" className='pulse ' onClick={() => {
                deleteFromCart(product.products.id); setSuccessfulMessage(true); setSpinner(true)
                setTimeout(() => {
                  setSuccessfulMessage(false)
                  setSpinner(false)
                }, 1000 * 3)
              }}>
                <MdDeleteForever />
                Remove</Button></div>

          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default Cart_list