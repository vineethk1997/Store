import React,{useState, useEffect} from 'react';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import {Row, Col, Button, Form} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import {useDispatch, useSelector} from 'react-redux';
import {saveShippingAddress} from '../actions/cartActions';

const ShippingPage = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [country, setCountry] = useState(shippingAddress.country)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [city, setCity] = useState(shippingAddress.city)

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode,country}))
    navigate(`/payment`)
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping...</h1>
      <Form onSubmit={submitHandler}>
      
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
          required
          type='text'
          placeholder='address placeholder'
          value={address ? address : ''}
          onChange={(e)=>setAddress(e.target.value)}
          >
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
          required
          type='text'
          placeholder='city placeholder'
          value={city ? city : ''}
          onChange={(e)=>setCity(e.target.value)}
          >
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='postalCode'>
          <Form.Label>postal Code</Form.Label>
          <Form.Control
          required
          type='text'
          placeholder='postalCode placeholder'
          value={postalCode ? postalCode : ''}
          onChange={(e)=>setPostalCode(e.target.value)}
          >
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
          required
          type='text'
          placeholder='Country placeholder'
          value={country ? country : ''}
          onChange={(e)=>setCountry(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
     
      <Button type='submit' variant='primary'>
        Continue
      </Button>


     </Form>
    </FormContainer>
  )
}

export default ShippingPage