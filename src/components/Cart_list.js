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
import { IoBagCheckOutline } from "react-icons/io5";
import MessageExampleIcon from './MessageExampleIcon';


function Cart_list({ cartlist,setCartCount,setCartlist }) {
  const [refresh, setRefresh] = useState(false)
  // const [cartList, setCartList] = useState(cartlist);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const [successfulMessage,setSuccessfulMessage]= useState(false)
  const [spinner, setSpinner] = useState(false)

  const cardListStyle = {
    display: 'flex',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0.1rem',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '80%',

  };
  function updateCart(productId, cartId, quantity) {
    setShowMessage(productId)
    setLoading(true)
    axios.put(`https://shopping-django-1.onrender.com/product/update-cart/${cartId}/`, {
      "id": cartId,
      "products": productId,
      quantity: quantity
    })
      .then(response => {
        setLoading(true)
        alert('Quantity is updated')
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

  function handleCheckout() {

    axios.post('https://shopping-django-1.onrender.com/product/order/', { cartlist: cartlist })
    // axios.post('http://127.0.0.1:4434/product/order/', { cartlist: cartlist })
      .then(response => {
        // alert('Checkout successful');
        setCartlist([]);
        setRefresh(prevState => !prevState)

      })
      .catch(error => {
        alert('Checkout failed');
      });
  }


  function deleteFromCart(productId) {
    setShowMessage(productId)
    setLoading(true)
    axios.delete(`https://shopping-django-1.onrender.com/product/delete-cart/${productId}`)
      // axios.delete(`http://127.0.0.1:5512/product/delete-cart/${productId}`)
      .then(response => {
        setCartlist(products=>{return products.filter(product=>{ 
            return product.products.id != productId
          }
        )})
        setLoading(false)
        setCartCount(cartcount=>cartcount-1)

        setShowMessage(null)  // reset the showMessage state after the message has been displayed
        // return <div>Successes </div>
      })
      .catch(error => {
        setLoading(false)
        setShowMessage(null)  // reset the showMessage state after the message has been displayed
        // return <div>Data not transfer,please try again </div>
      });
  }
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!cartlist) {
      return;
    }
    let sum = 0;
    cartlist.forEach(product => {
      if (product.products.price) {
        sum += product.products.price * product.quantity;
      }
    });
    setTotalPrice(sum);
  }, [cartlist]);



  if (!Array.isArray(cartlist) || !cartlist.length) {
    return <div>Cart is empty</div>
  }
  return (
    <>
      {spinner ? <div style={{ display: 'flex' }}> <ButtonSpinner /></div> : null}

      <div key={cartlist.id} style={cardListStyle} >


        {
          alertMessage ? <AlertDanger  /> : null
        }
        {
        successfulMessage ? <AlertSuccessful/> : null
        }

        {cartlist.map(product => (
          <Card border="secondary" key={product.id} className="card-hover" style={{ width: '18rem', background: 'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
            <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.products.image}`} alt="product image" />
            <Card.Body>
              <Card.Title style={{ textDecoration: "underline" }}>{product.products.name}</Card.Title>
              <Card.Text>
                ID: {product.products.id}
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
              <GrUpdate></GrUpdate> {showMessage === product.id && loading && (
                <div class="ui icon message">
                  <i aria-hidden="true" class="circle notched loading icon"></i>
                  <div class="content">
                    <div class="header">Just one second</div>
                    We are fetching that content for you.
                  </div>
                </div>
              )}
              {/* <Button variant='info' onClick={() => updateCart(product.products.id, product.id, quantity)} style={{ margin: '0.8rem' }}>Update</Button> */}
              <Button variant='info' onClick={() => {
                updateCart(product.products.id, product.id, quantity); setSpinner(true)
                setTimeout(() => {
                  setSpinner(false)
                }, 1000 * 3)

              }

              }
                style={{ margin: '0.8rem' }}  >Update</Button>
              {loading && <MessageExampleIcon />}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Button variant="danger" onClick={handleMinusClick}>-</Button>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <Button onClick={handlePlusClick}>+</Button>
              </div>
              <br />

              <div style={{ marginRight: '10px' }}>
                <MdDeleteForever></MdDeleteForever>
                <Button variant="danger" onClick={() => {
                  deleteFromCart(product.products.id); setAlertMessage(true)
                  setTimeout(() => {
                    setAlertMessage(false)
                  }, 1000 * 3)
                }}>Remove</Button></div>

            </Card.Body>


          </Card>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <span style={{ fontSize: "2em", fontWeight: "bold" }}>Total Price: {totalPrice}$</span>
       
        <Button variant="primary" onClick={() => {
  setSpinner(true);
  setSuccessfulMessage(true)
  handleCheckout();
  setTimeout(() => {
    setSpinner(false)
    setSuccessfulMessage(false)
  }, 1000 * 3)
}} style={{ marginLeft: "10px" }}>
  {spinner ? <div style={{ display: 'flex' }}> <ButtonSpinner /> </div> : 'Checkout'}
</Button>


      </div>

    </>
  )
}


export default Cart_list