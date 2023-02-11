import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDateRange, MdOutlineDescription, MdDeleteForever } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import AlertDanger from './AlertDanger'
import AlertSuccessful from './Succsess';
import ButtonSpinner from './Spinner';
import React from 'react';

function Cart_list({ product, cartlist, setCartlist, setCartCount }) {
  const [refresh, setRefresh] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const [successfulMessage, setSuccessfulMessage] = useState(false)
  const [spinner, setSpinner] = useState(false)

  
  useEffect(() => {
    axios.get('https://shopping-django-1.onrender.com/product/cart-list/')

      .then((response) => setCartlist((response.data) ? response.data :
        []))
  }, [])

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
        return <div>Successes </div>
      })
      .catch(error => {
        setLoading(false)
        alert('Data not transfer')
        setTimeout(() => {
          setShowMessage(null)
        }, 1000)
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
        setCartlist(products => {
          return products.filter(product => {
            return product.products.id !== productId
          }
          )
        })
        setLoading(false)
        setCartCount(cartcount => cartcount - 1)

        setShowMessage(null)  
      })
      .catch(error => {
        setLoading(false)
        setShowMessage(null)  
      });
  }
  
  if (!Array.isArray(cartlist) || !cartlist.length) {
    return <div>Cart is empty</div>
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


        <Card  border="secondary " key={product.id} className="card-hover " style={{ width: '18rem', background: 'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
          <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.products.image}`} alt="product image" style={{ height: 300, width: '100%' }} />
          <Card.Body>
            <Card.Title  style={{ textDecoration: "underline" }}>{product.products.name}</Card.Title>
            <Card.Text>
              <br></br>
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
            <GrUpdate></GrUpdate>
            <div onClick={() => {
              updateCart(product.products.id, product.id, quantity); setSpinner(true); setSuccessfulMessage(true);
              setTimeout(() => {
                setSpinner(false)
                setSuccessfulMessage(false)
              }, 1000 * 3)
            }
            }
              style={{ margin: '0.8rem' }}>
              <Button className='pulse' variant='info'  >Update</Button>
            </div>


            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Button variant="danger" className='raise' onClick={handleMinusClick}>-</Button>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
              <Button className='raise' onClick={handlePlusClick}>+</Button>
            </div>
            <br />
            <div style={{ marginRight: '10px' }}>
              <MdDeleteForever></MdDeleteForever>
              <Button variant="danger" className='pulse ' onClick={() => {
                deleteFromCart(product.products.id); setSuccessfulMessage(true); setSpinner(true)
                setTimeout(() => {
                  setSuccessfulMessage(false)
                  setSpinner(false)
                }, 1000 * 3)
              }}>Remove</Button></div>

          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default Cart_list