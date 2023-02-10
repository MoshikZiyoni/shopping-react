import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cart_list from './Cart_list';
import Button from 'react-bootstrap/Button';
import ButtonSpinner from './Spinner';
import AlertSuccessful from './Succsess';
import AlertDanger from './AlertDanger';

function Cart({cartlist, setCartCount, setCartlist}) {
    const [loading, setLoading] = useState(false)
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
        setTimeout(() => {
          setShowMessage(null)
        }, 1000)
      });
  }

        return (
            <>
            <div style={cardListStyle}>
          {
            alertMessage ? <AlertDanger /> : null
          }
          {
            successfulMessage ? <AlertSuccessful /> : null
          }
            
            {cartlist.map(product => <Cart_list key={product.id} product={product} cartlist={cartlist} setCartCount={setCartCount} setCartlist={setCartlist}/>)}

          
            
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
  
  
export default Cart