import React,{useState, useEffect} from 'react';
import {Row, Col, ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Link,useParams,useLocation} from 'react-router-dom';
import Message from '../Components/Message';
import {addToCart, removeFromCart} from '../actions/cartActions';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const productId = id;
  const {search} = useLocation();
  const qty = search ? Number(search.split('=')[1]):1
  
  const dispatch =  useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart


  useEffect(()=>{
    if(productId){
        dispatch(addToCart(productId, qty))
    }
  },[dispatch, qty, productId])


  const removeFromCardHandler =(id)=>{
      dispatch(removeFromCart(id))
  }


 const checkOutHandler =()=>{
  navigate(`/login?redirect=shipping`)
 }

  
  return (
    <>
    
    <Row>
      <Col md={8}>
        <h1>SHOPPING CART</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
            ) : (
             <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded></Image>
                    </Col>
                    
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    

                    <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {
                          [...Array(item.countInStock).keys()].map((x)=>(
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }

                      </Form.Control>
                    </Col> 

                    <Col md={1}>
                      <Button
                       type='button'
                       variant='light' 
                       onClick={()=> removeFromCardHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>

                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
             </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
              
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty, 0)})</h2>
                ${cartItems.reduce((acc,item)=> acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                 type='button'
                 className='btn-block'
                 disabled={cartItems.length === 0}
                 onClick={checkOutHandler}
                >
                Checkout
                </Button>
              </ListGroup.Item>


          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default CartPage