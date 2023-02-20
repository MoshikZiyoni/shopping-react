import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4434/product/api/${productId}/`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={`https://shopping-django-1.onrender.com/static${product.image}`} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Created: {product.created}</p>
      <p>Updated: {product.updated}</p>
    </div>
  );
}

export default SingleProduct;
