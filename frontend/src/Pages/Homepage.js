import React,{useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../Components/Product';
// import products from '../products';
import axios from 'axios';

const Homepage = () => {
  
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/products/').then(response => {
      setProducts(response.data);
    });
  },[]);

  return (
    <div>
        <h1>LATEST PRODUCTS</h1>
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default Homepage