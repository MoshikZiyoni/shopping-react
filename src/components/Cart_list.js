import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
  



function Cart_list({cartlist}) {
  const [cartList, setCartList] = useState(cartlist);

 
  const cardListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0.1rem',
  };

  
  function deleteFromCart(productId) {
    // setLoading(true)
    axios.delete(`https://shopping-django-1.onrender.com/product/delete-cart/${productId}`)
    // axios.delete(`http://127.0.0.1:5512/product/delete-cart/${productId}`)
    .then(response => {
        // setLoading(false)
        console.log(response,'Successes',productId);
        // do something with the response, like showing a message to the user
    })
    .catch(error => {
        // setLoading(false)
        console.log(error,'Data not transfer',productId,);
        // do something with the error, like showing an error message
    });
}

  return (
    <div key={cartlist.id} style={cardListStyle} >
      {cartlist.map(product => (
        <Card border="secondary" key={product.id} className="card-hover" style={{ width: '18rem', background:'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
          <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.products.image}`} alt="product image" />
          <Card.Body>
            <Card.Title>{product.products.name}</Card.Title>
            <Card.Text>
              ID: {product.products.id}
              <br></br>
              {product.products.description}
              <br></br>
              Price: {product.products.price}
              <br></br>
              {product.products.created}
              <br></br>
              {product.products.updated}
              <br/>
              Quantity: {product.quantity}
            </Card.Text>
              <Button variant="danger" onClick={() => deleteFromCart(product.products.id)}>Remove</Button>
              
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}


export default Cart_list