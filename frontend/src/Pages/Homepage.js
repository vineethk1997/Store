import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'
import ProductCarousel from '../Components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';



const Homepage = () => {
    
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    const {search} = useLocation();
    
    useEffect(() => {
        dispatch(listProducts(search))

    }, [dispatch, search])
  
  
  return (
    <div>
    {!search && <ProductCarousel />}

    <h1>Latest Products</h1>
    {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
            :
            <div>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate page={page} pages={pages} search={search} />
            </div>
    }
    </div>
  )
}

export default Homepage


    {/* <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
          ))}
        </Row> */}