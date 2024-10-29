import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperProducts, WrapperNavBar } from './style'
import axios from 'axios'

const TypeProductPage = () => {

    const [products, setProducts] = useState([])
    const onChange = () => {}

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products-info');
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error)
            }
        }
        fetchProducts()
    }, [])
    return (
        <div style = {{ width: '100%', background: '#efefef'}}>
            <div style = {{ width: '1270px', margin: '0 auto'}}>
                <Row style = {{ flexWrap: 'nowrap', paddingTop: '10px'}}> 
                    <WrapperNavBar span={4}>
                        <NavBarComponent/>
                    </WrapperNavBar>
                    <Col span = {20}>
                    <WrapperProducts>
                        {products.map((product) => (
                            <CardComponent
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                rating={product.rating}
                                sold={product.count_in_stock}
                            />
                        ))}
                    </WrapperProducts >
                    <Pagination defaultCurrent={2} total={100} onChange={onChange} style = {{textAlign: 'center', marginTop: '20px'}}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TypeProductPage