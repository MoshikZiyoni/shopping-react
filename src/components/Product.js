import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDateRange, MdOutlineDescription, MdSearch } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { Message, Icon } from 'semantic-ui-react'
import ButtonSpinner from './Spinner';
import AlertSuccessful from './Succsess';
import AlertDanger from './AlertDanger';
import AlertLogin from './AlertLogin';
import { Link } from 'react-router-dom';
import Sun from './Sun';


const MessageExampleIcon = ({ loading }) => (
  <Message icon visible={loading}>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are fetching that content for you.
    </Message.Content>
  </Message>
)
function Product({ product, setCartlist, setCartCount, loggedIn }) {
  const [refresh, setRefresh] = useState(false)
  const [showMessage, setShowMessage] = useState(null)  // add this line
  const [spinner, setSpinner] = useState(false)
  const [successfulMessage, setSuccessfulMessage] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  //##filter the products for Search
  const filteredProducts = product.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //#function for single product
  function handleCardClick(productId) {
    axios.get(`https://shopping-django-1.onrender.com/product/api/${productId}/`)
      // Do something with the response, e.g. show a modal with the product details
      .then(response => {
        console.log(response.data)
      })
  }



  function handleAddToCart(productId) {
    setShowMessage(productId)
    setSpinner(true)
    const product = { products: productId, quantity: 1, user: localStorage.getItem('username') }
    axios.post(`https://shopping-django-1.onrender.com/product/cart-list/`, product)
      .then(response => {
        axios.get(`https://shopping-django-1.onrender.com/product/api/${productId}`)
          .then(productdata => {
            setSpinner(false)
            setSuccessfulMessage(true)
            console.log("product", productdata.data)
            product.products = productdata.data
            setCartlist(carlist => [...carlist, product])
            setCartCount(cartcount => cartcount + 1)
            setRefresh(prevState => !prevState)
            setTimeout(() => {
              setShowMessage(null)
              setSuccessfulMessage(false)
            }, 1000 * 3)
          })
      })
      .catch(error => {
        setSpinner(false)
        setAlertMessage(true)
        setShowMessage(null)
        setTimeout(() => {
          setShowMessage(null)
          setAlertMessage(false)
        }, 1000 * 3)
        alert('Check maybe you have this product already in your cart')
      })
  }
  useEffect(() => {
    console.log('refreshing');
  }, [refresh]);

  if (!Array.isArray(product) || !product.length) {

    return (<div className='error'>We are fetching the data...
      <Sun />
    </div>)
  }

  const cardListStyle = {
    display: 'flex',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0.1rem',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '80%',
  };

  return (
    <>
      <div className='center-items'>
        <MdSearch style={{ fontSize: '50px' }} />
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input-field'
        />
      </div>
      <div style={cardListStyle} className="fish "><span />
        {loggedIn ? null : <AlertLogin />}
        <div className="clouds1">
          <div />
          <div />
          <div />
        </div>

        {spinner ? <div style={{ display: 'flex' }}> <ButtonSpinner /></div> : null}
        {
          successfulMessage ? <AlertSuccessful /> : null
        }
        {
          alertMessage ? <AlertDanger /> : null
        }

        {/* Starting the map with search */}
        {filteredProducts.map((product) => {
          return (

            <div key={product.id} style={{ margin: '0.1rem' }}>

              <Card border="secondary" className="card-hover " style={{ width: '18rem', background: 'powderblue', margin: '0.1rem', padding: '0.1rem' }}>
                <div title='Click for more details'>
                  <Link to={`/singleproduct/${product.id}`}>
                    <Card.Img variant="top" src={`https://shopping-django-1.onrender.com/static${product.image}`} alt="product image" style={{ height: 300, width: '100%', cursor: 'pointer' }} onClick={() => { handleCardClick(product.id) }} />
                  </Link>
                </div>
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
                  </Card.Text>
                  <Button className='close' variant="primary" onClick={() => {
                    handleAddToCart(product.id)
                    setSpinner(true)
                  }}>Add to cart</Button>
                  {showMessage === product.id && spinner && <MessageExampleIcon loading={spinner} />}
                </Card.Body>
              </Card>
              <br></br>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default Product