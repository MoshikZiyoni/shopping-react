import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Background from './Background';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
function Cart({product}) {
  const [loading, setLoading] = useState(false)


  function handleAddToCart(productId) {
    setLoading(true)
    axios.post(`http://localhost:5512/product/add-to-cart`, {
        
        product_id: productId,
        quantity: 1
    })
    .then(response => {
        setLoading(false)
        console.log(response,'Sucesess',productId);
        // do something with the response, like showing a message to the user
    })
    .catch(error => {
        setLoading(false)
        console.log(error,'Data not transfer',productId);
        // do something with the error, like showing an error message
    });
}
    if (!Array.isArray(product) || !product.length) {
      return <div>No product found</div>
    }
    const cardListStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridGap: '0.1rem',
    };
    return (
        
      <div style={cardListStyle}>
    
          {product.map((product) =>{
              console.log(product);
              return(
                <div key={product.id} style={{margin:'0.1rem'}}>
                <Card border="secondary"  className="card-hover" style={{ width: '18rem', background:'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
                <Card.Img variant="top" src={`http://localhost:5512${product.image}`} alt="product image" />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                  ID: {product.id}
                  <br></br>
                  {product.description}
                  <br></br>
                  price: {product.price}
                  <br></br>
                  {product.created}
                  <br></br>
                  {product.updated}
                  </Card.Text>
                  <Link to="/cart">
                  <Button variant="primary" onClick={() => handleAddToCart(product.id)}>Add to cart</Button>
                  </Link>
                </Card.Body>
              </Card>
              <br></br>
                </div>
     )})}          
   
      </div>
    )
  }
export default Cart