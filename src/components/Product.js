import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useState } from 'react';
import { MdDateRange ,MdOutlineDescription } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";

function Product({product,setCartlist}) {
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)


  function handleAddToCart(productId) {
    // setLoading(true)
    const product = {products: productId,quantity: 1 }
    axios.post(`https://shopping-django-1.onrender.com/product/cart-list/`, product
    // axios.post(`http://127.0.0.1:4444/product/cart-list/`, product
    )
    .then(response => {
        // setLoading(false)
        setCartlist(data=>[...data , product])
        alert('Successes');
        setRefresh(prevState => !prevState)

    })
    .catch(error => {
        // setLoading(false)
        alert('Data not transfer');
    });
}
useEffect(() => {
  console.log('refreshing');
}, [refresh]);
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
              // console.log(product);
              return(
                <div key={product.id} style={{margin:'0.1rem'}}>
                <Card border="secondary"  className="card-hover" style={{ width: '18rem', background:'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
                <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.image}`} alt="product image" />
                <Card.Body>
                  <Card.Title style={{ textDecoration: "underline"}}>{product.name}</Card.Title>
                  <Card.Text>
                  ID: {product.id}
                  <br></br>
                  <MdOutlineDescription/>{product.description}
                  <br></br>
                  <ImPriceTag/>price: {product.price}
                  <br></br>
                  <MdDateRange/>Create: {product.created}
                  <br></br>
                  <MdDateRange/>Updated: {product.updated}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleAddToCart(product.id)}>Add to cart</Button>
                  
                  
                </Card.Body>
              </Card>
              <br></br>
                </div>
     )})}          
   
      </div>
    )
  }
export default Product