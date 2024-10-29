import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from './styleHome';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
import slider4 from '../../assets/image/slider4.webp';
import CardComponent from '../../components/CardComponent/CardComponent';

const HomePage = () => {
    const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
    const arr = ['TV', 'Tu Lanh', 'Lap top'];

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products-info');
                setProducts(response.data); // Lưu danh sách sản phẩm vào state
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '1300px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                    <div style = {{ marginTop: '40px'}}>
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
                        </WrapperProducts>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <WrapperButtonMore>
                            <span style={{ color: 'rgb(11, 116, 229)', fontWeight: '530', fontSize: '14px' }}>Xem thêm</span>
                        </WrapperButtonMore>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;

