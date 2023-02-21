import Footer from "./Components/Footer";
import Header from "./Components/Header";
import {Container} from 'react-bootstrap';
import Homepage from './Pages/Homepage';
import CartPage from './Pages/CartPage';
import Productpage from './Pages/Productpage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import ShippingPage from './Pages/ShippingPage';
import PaymentPage from './Pages/PaymentPage';
import PlaceOrderPage from './Pages/PlaceOrderPage';
import OrderPage from './Pages/OrderPage';
import UserListPage from './Pages/UserListPage';
import ProductListPage from './Pages/ProductListPage';
import ProductEditPage from './Pages/ProductEditPage';
import UserEditPage from './Pages/UserEditPage';
import OrderListPage from './Pages/OrderListPage';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
        <Header/>
              <main className="py-3">
                    <Container>
                      <Routes>
                        <Route path='/' element={<Homepage/>} exact/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/shipping' element={<ShippingPage/>}/>
                        <Route path='/payment' element={<PaymentPage/>}/>
                        <Route path='/placeorder' element={<PlaceOrderPage/>}/>
                        <Route path='/order/:id' element={<OrderPage/>}/>
                        <Route path='/product/:id' element={<Productpage/>}/>
                        <Route path='/cart/:id?' element={<CartPage/>}/>
                        <Route path='/admin/user/:id/edit' component={<UserEditPage/>} />
                        <Route path='/admin/userlist' element={<UserListPage/>}/>
                        <Route path='/admin/productlist' element={<ProductListPage/>}/>
                        <Route path='/admin/orderlist' element={<OrderListPage/>}/>
                        <Route path='/admin/product/:id/edit' element={<ProductEditPage/>}/>
                        
                      </Routes>
                    </Container>
              </main>
        <Footer/>
    </Router>
  );
}

export default App;
