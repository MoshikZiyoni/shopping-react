import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cart_list from './Cart_list';
import Button from 'react-bootstrap/Button';
import ButtonSpinner from './Spinner';
import AlertSuccessful from './Succsess';
import AlertDanger from './AlertDanger';
import '../style.css';
import Sun from './Sun';

function Cart({ cartlist, setCartCount, setCartlist }) {
  const [alertMessage, setAlertMessage] = useState(false)
  const [successfulMessage, setSuccessfulMessage] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [showMessage, setShowMessage] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const cardListStyle = {
    display: 'flex',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0.1rem',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '80%',

  };
  useEffect(() => {
    // axios.get('https://shopping-django-1.onrender.com/product/cart-list/')
    const username = localStorage.getItem('username');
    axios.get(`https://shopping-django-1.onrender.com/product/cart/?username=${username}`)
      .then((response) => setCartlist((response.data) ? response.data :
        []))
  }, [])


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
  }, [cartlist, refresh]);

  function handleCheckout() {
    axios.post('https://shopping-django-1.onrender.com/product/order/', { cartlist: cartlist })
      .then(response => {
        setCartlist([]);
        setCartCount(0);
        setRefresh(prevState => !prevState)

      })
      .catch(error => {
        alert('Checkout failed');
        setTimeout(() => {
          setShowMessage(null)
        }, 1000)
      });
  }
 if (!Array.isArray(cartlist) || !cartlist.length) {
    return <>
    <div className="error "><span style={{minHeight:'90vh'}}>Cart is empty</span></div>
    
    <Sun/>
    </>
  }
  return (
    <>
      <div style={cardListStyle} >
      <div className="clouds2">
        
        <div />
        <div />
        <div />
      </div>
      
        {
          alertMessage ? <AlertDanger /> : null
        }
        {
          successfulMessage ? <AlertSuccessful /> : null
        }

        {cartlist.map(product => <Cart_list key={product.id} product={product} cartlist={cartlist} setCartCount={setCartCount} setCartlist={setCartlist} />)}



      </div>
      
      {
        cartlist.length === 0 ? null :
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ fontSize: "2em", fontWeight: "bold" }} className='waviy'>
              <span data-text={`Total Price: ${totalPrice}$`} >Total-Price: {totalPrice}$</span>
            </span>

            <Button variant="pulse gradient-border" onClick={() => {
              setSpinner(true);
              setSuccessfulMessage(true)
              handleCheckout();
              setTimeout(() => {
                setSpinner(false)
                setSuccessfulMessage(false)
              }, 1000 * 3)
            }} style={{ marginLeft: "10px" }}>
              {spinner ? <div style={{ display: 'flex' }}> <ButtonSpinner />  </div> : 'Checkout'}
            </Button>

          </div>}
    </>
  )
}


export default Cart