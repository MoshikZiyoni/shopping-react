import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdDateRange, MdOutlineDescription } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import ButtonSpinner from './Spinner';
import StarRating from './StarRating';

function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setSpinner(true);
    axios.get(`https://shopping-django-1.onrender.com/product/api/${productId}/`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
        setSpinner(false); // Set spinner to false when response is received
      })
      .catch(error => {
        console.error(error);
        setSpinner(false); // Set spinner to false when response is received
      });
  }, [productId]);

  if (!product) {
    return  <div className='error' >
    {spinner && <ButtonSpinner />}
      Loading...
      </div>
  }

  return (
    <div>
      <Card border="secondary"  className="card-hover " style={{ width: '18rem', background: 'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
                <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.image}`} alt="product image"   />
                <Card.Body>
                  <Card.Title style={{ textDecoration: "underline" }}>{product.name} </Card.Title>
                  <Card.Text style={{ fontFamily: 'cursive', fontStyle: 'oblique' }}>

                    <MdOutlineDescription />{product.description}
                    <br></br>
                    <ImPriceTag />price: ${product.price}
                    <br></br>
                    <MdDateRange />Create: {product.created}
                    <br></br>
                    <MdDateRange />Updated: {product.updated}
                    <StarRating/>
                  </Card.Text>
                </Card.Body>
              </Card>
    </div>
  );
}

export default SingleProduct;
