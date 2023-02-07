import React,{useState, useEffect} from 'react';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/userActions'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {search} = useLocation();
  
  const redirect = search ? search.split('=')[1]:'/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin


  useEffect(()=>{
       if(userInfo){
        navigate(redirect)
       }
  },[ redirect])


  const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          type='email'
          placeholder='email placeholder'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
          type='password'
          placeholder='password placeholder'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
         
         <br></br>
        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer ? <Link to={redirect ? '/register?redirect=${redirect}' : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage