import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDateRange, MdOutlineDescription, MdDeleteForever } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { IoBagCheckOutline } from "react-icons/io5";


function Cart_list({ cartlist }) {
  const [cartList, setCartList] = useState(cartlist);

  const [quantity, setQuantity] = useState(1);

  const cardListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0.1rem',
  };
  // const producttoupdate={id: cartlist.id,products:product.products.id,quantity: 3 }
  function updateCart(productId, cartId, quantity) {
    // setLoading(true)
    axios.put(`https://shopping-django-1.onrender.com/product/update-cart/${cartId}/`, {
      "id": cartId,
      "products": productId,
      quantity: quantity
    })

      //   axios.put(`http://127.0.0.1:4444/product/update-cart/${cartId}/`, {
      //     "id": cartId,
      //     "products": productId,
      //     quantity: 3}
      // )
      .then(response => {
        // setLoading(false)
        console.log(response, 'Successes', productId);
        return <div>Successes </div>
      })
      .catch(error => {
        // setLoading(false)
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
      .then(response => {
        alert('Checkout successful');
        setCartList([]);
      })
      .catch(error => {
        alert('Checkout failed');
      });
  }


  function deleteFromCart(productId) {
    // setLoading(true)
    axios.delete(`https://shopping-django-1.onrender.com/product/delete-cart/${productId}`)
      // axios.delete(`http://127.0.0.1:5512/product/delete-cart/${productId}`)
      .then(response => {
        // setLoading(false)
        console.log(response, 'Successes', productId);
        return <div>Successes </div>
      })
      .catch(error => {
        // setLoading(false)
        console.log(error, 'Data not transfer', productId,);
        return <div>Data not transfer,please try again </div>
      });
  }
  const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
  let sum = 0;
  cartlist.forEach(product => {
    sum += product.price * product.quantity;
  });
  setTotalPrice(sum);
}, [cartlist]);




  if (!Array.isArray(cartlist) || !cartlist.length) {
    return <div>Cart is empty</div>
  }
  console.log(cartlist.length);
  return (

    <div key={cartlist.id} style={cardListStyle} >

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
            <GrUpdate></GrUpdate> <Button variant='info' onClick={() => updateCart(product.products.id, product.id, quantity)} style={{ margin: '0.8rem' }}>Update</Button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Button variant="danger" onClick={handleMinusClick}>-</Button>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
              <Button onClick={handlePlusClick}>+</Button>
            </div>
            <br />


            <div style={{ marginRight: '10px' }}>
              <MdDeleteForever></MdDeleteForever>
              <Button variant="danger" onClick={() => deleteFromCart(product.products.id)}>Remove</Button></div>


          </Card.Body>
          <IoBagCheckOutline></IoBagCheckOutline>
          <Button variant='success' onClick={() => handleCheckout(product.products.id, product.id, quantity, cartlist)}>Checkout</Button>


<div>Total Price: {totalPrice}</div>
        </Card>




      ))}

    </div>
  )
}


export default Cart_list