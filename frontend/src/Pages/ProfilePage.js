import React,{useState, useEffect} from 'react';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import {Row, Col, Button, Form, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderAction';

const ProfilePage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();
    
    const redirect = search ? search.split('=')[1]:'/'
  
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile
    
    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy
  
    useEffect(()=>{
         if(!userInfo){
          navigate(`/login`)
         }else{
            if(!user || !user.name || success || user.userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
         }
    },[ user, dispatch, userInfo, navigate, success])


    const submitHandler = (e) =>{
        e.preventDefault();

        if(password != confirmPassword){
          setMessage('Password do not match')
        }else{
          dispatch(updateUserProfile({
            'id':user._id,
            'name':name,
            'email':email,
            'password':password,
        }))
        }
    }

  return (
    <div>
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                                
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
                        type='password'
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader/>
                ):errorOrders ?(
                    <Message variant='danger'>{errorOrders}</Message>
                ):(
                    <Table striped responsive className='table-sm'>
                       <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                       </thead>

                       <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    </div>
  )
}

export default ProfilePage