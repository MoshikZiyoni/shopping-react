import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import NavBar from './Navbar';
import { MdDateRange ,MdOutlineDescription } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";




function Cart_list({cartlist}) {
  const [cartList, setCartList] = useState(cartlist);

 
  const cardListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0.1rem',
  };
  
  function updateCart(productId) {
    // setLoading(true)
    axios.put(`https://shopping-django-1.onrender.com/product/update-cart/${productId}`)
    // axios.put(`http://127.0.0.1:5512/product/update-cart/${productId}`)
    .then(response => {
        // setLoading(false)
        console.log(response,'Successes',productId);
        return <div>Successes </div>    })
    .catch(error => {
        // setLoading(false)
        console.log(error,'Data not transfer',productId,);
        return <div>Data not transfer,please try again </div>    });
}





  
  function deleteFromCart(productId) {
    // setLoading(true)
    axios.delete(`https://shopping-django-1.onrender.com/product/delete-cart/${productId}`)
    // axios.delete(`http://127.0.0.1:5512/product/delete-cart/${productId}`)
    .then(response => {
        // setLoading(false)
        console.log(response,'Successes',productId);
        return <div>Successes </div>    })
    .catch(error => {
        // setLoading(false)
        console.log(error,'Data not transfer',productId,);
        return <div>Data not transfer,please try again </div>    });
}
if (!Array.isArray(cartlist) || !cartlist.length) {
  return <div>Cart is empty</div>
}
console.log(cartlist.length);
  return (
    
    <div key={cartlist.id} style={cardListStyle} >

      {cartlist.map(product => (
        <Card border="secondary" key={product.id} className="card-hover" style={{ width: '18rem', background:'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
          <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.products.image}`} alt="product image" />
          <Card.Body>
            <Card.Title style={{ textDecoration: "underline"}}>{product.products.name}</Card.Title>
            <Card.Text>
              ID: {product.products.id}
              <br></br>
              <MdOutlineDescription/>{product.products.description}
              <br></br>
              <ImPriceTag/>Price: {product.products.price}$
              <br></br>
              <MdDateRange/>Create:{product.products.created}
              <br></br>
              <MdDateRange/>Updated:{product.products.updated}
              <br/>
              Quantity: {product.quantity}
            </Card.Text>
              <Button variant="danger" onClick={() => deleteFromCart(product.products.id)}>Remove</Button>
              <Button variant='success' onClick={() =>updateCart(product.products.id)} style={{margin:'0.8rem'}}>Update</Button>
              
          </Card.Body>
        </Card>
        
        
      ))}
    </div>
  )
}


export default Cart_list