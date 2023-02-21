import React,{useState, useEffect} from 'react';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import {Row, Col, Button, Form} from 'react-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../actions/userActions';

const RegisterPage = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();
    
    const redirect = search ? search.split('=')[1]:'/'
  
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
  
  
    useEffect(()=>{
         if(userInfo){
          navigate(redirect)
         }
    },[ redirect])
  
  
    const submitHandler = (e) =>{
        e.preventDefault();

        if(password != confirmPassword){
          setMessage('Password do not match')
        }else{
        dispatch(register(name,email, password))
        }
    }
  return (
    
    <FormContainer>
      
      <h1>Sign In</h1>
      
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
          required
          type='name'
          placeholder='name placeholder'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          required
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
          required
          type='password'
          placeholder='Password placeholder'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
          required
          type='password'
          placeholder='confirm password'
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        
        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account ? <Link
            to={redirect ? `login?redirect=${redirect}` : `/login`}>
              Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage