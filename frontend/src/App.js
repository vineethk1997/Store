import Footer from "./Components/Footer";
import Header from "./Components/Header";
import {Container} from 'react-bootstrap';
import Homepage from './Pages/Homepage';
import CartPage from './Pages/CartPage';
import Productpage from './Pages/Productpage';
import LoginPage from './Pages/LoginPage';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
        <Header/>
              <main className="py-3">
                    <Container>
                      <Routes>
                        <Route path='/' element={<Homepage/>} exact/>
                        <Route path='/product/:id' element={<Productpage/>}/>
                        <Route path='/cart/:id?' element={<CartPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                      </Routes>
                    </Container>
              </main>
        <Footer/>
    </Router>
  );
}

export default App;
