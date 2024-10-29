import React, { useState } from 'react';
import { Col, Image, Row, Button, message } from 'antd';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {
  WrapperNameStyleProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperInputNumber
} from './style';
import { useDispatch, useSelector } from 'react-redux'; // Lấy thông tin người dùng từ Redux
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetailComponent = ({ name, image, price, rating, sold, description, productId }) => {
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token, id: userId } = useSelector((state) => state.user); // Lấy thông tin từ Redux store

  const onQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    if (!access_token) {
      message.warning("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate('/sign-in'); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
      return;
    }

    console.log("Dữ liệu gửi đi:", {
      user_id: userId,
      product_id: parseInt(productId),
      quantity: quantity
    });

    try {
      // Gửi request thêm sản phẩm vào giỏ hàng
      await axios.post('http://localhost:8000/api/cart/add', {
        user_id: parseInt(userId),
        product_id: parseInt(productId),
        quantity: quantity, // Số lượng sản phẩm muốn thêm
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      console.error('Chi tiết lỗi:', error.response.data);
      message.error('Có lỗi xảy ra khi thêm vào giỏ hàng.');
    }
  };

  return (
    <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
      <Col span={10} style={{ 
        borderRight: '1px solid #e5e5e5', 
        paddingRight: '8px', 
        display: 'flex',          
        justifyContent: 'center', 
        alignItems: 'center',     
        height: '100%'            
      }}>
        <Image src={image} alt="image product" preview={false} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}/>
      </Col>
      <Col span={14} style={{ paddingLeft: '10px' }}>
        <WrapperNameStyleProduct>{name}</WrapperNameStyleProduct>
        <div>
          {[...Array(Math.round(rating))].map((_, index) => (
            <StarFilled key={index} style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
          ))}
          <WrapperStyleTextSell> | Đã bán {sold}+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>{price.toLocaleString()} đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className='address'>Khương Trung, Thanh Xuân, Hà Nội </span>
          <span className='change-address'>Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ marginBottom: '10px' }}>Số lượng</div>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: '#fff' }}>
            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} size="14" />
          </button>
          <WrapperInputNumber value={quantity} onChange={onQuantityChange} min={1} size="small" />
          <button onClick={() => setQuantity(quantity + 1)} style={{ background: '#fff' }}>
            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} size="14" />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button
            size={40}
            style={{
              background: 'rgb(255, 57, 69)',
              height: '48px', width: '220px',
              border: 'none'
            }}
            onClick={handleAddToCart}
          >
            <span style={{ color: '#fff' }}>{'Chọn mua'}</span>
          </Button>
          <Button
            size={40}
            style={{
              background: 'rgb(255, 255, 255)',
              height: '48px', width: '220px',
              border: '1px solid rgb(13, 92, 182)'
            }}>
            <span style={{ color: 'rgb(13, 92, 182)' }}>{'Mua trước trả sau'}</span>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailComponent;


// import React from 'react';
// import { Col, Image, Row, Button } from 'antd';
// import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
// import {
//   WrapperStyleColImage,
//   WrapperStyleimageSmall,
//   WrapperNameStyleProduct,
//   WrapperStyleTextSell,
//   WrapperPriceProduct,
//   WrapperPriceTextProduct,
//   WrapperAddressProduct,
//   WrapperInputNumber
// } from './style';

// const ProductDetailComponent = ({ name, image, price, rating, sold, description }) => {
//   const onChange = () => {};

//   return (
//     <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
//       <Col span={10} style={{ 
//         borderRight: '1px solid #e5e5e5', 
//         paddingRight: '8px', 
//         display: 'flex',          
//         justifyContent: 'center', 
//         alignItems: 'center',     
//         height: '100%'            
//       }}>
//         <Image src={image} alt="image product" preview={false} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}/>
//       </Col>
//       <Col span={14} style={{ paddingLeft: '10px' }}>
//         <WrapperNameStyleProduct>{name}</WrapperNameStyleProduct>
//         <div>
//           {[...Array(Math.round(rating))].map((_, index) => (
//             <StarFilled key={index} style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
//           ))}
//           <WrapperStyleTextSell> | Đã bán {sold}+</WrapperStyleTextSell>
//         </div>
//         <WrapperPriceProduct>
//           <WrapperPriceTextProduct>{price.toLocaleString()} đ</WrapperPriceTextProduct>
//         </WrapperPriceProduct>
//         <WrapperAddressProduct>
//           <span>Giao đến </span>
//           <span className='address'>Khương Trung, Thanh Xuân, Hà Nội </span>
//           <span className='change-address'>Đổi địa chỉ</span>
//         </WrapperAddressProduct>
//         <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
//           <div style={{ marginBottom: '10px' }}>Số lượng</div>
//           <button style={{ background: '#fff' }}>
//             <MinusOutlined style={{ color: '#000', fontSize: '20px' }} size="14" />
//           </button>
//           <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
//           <button style={{ background: '#fff' }}>
//             <PlusOutlined style={{ color: '#000', fontSize: '20px' }} size="14" />
//           </button>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <Button
//             size={40}
//             style={{
//               background: 'rgb(255, 57, 69)',
//               height: '48px', width: '220px',
//               border: 'none'
//             }}>
//             <span style={{ color: '#fff' }}>{'Chọn mua'}</span>
//           </Button>
//           <Button
//             size={40}
//             style={{
//               background: 'rgb(255, 255, 255)',
//               height: '48px', width: '220px',
//               border: '1px solid rgb(13, 92, 182)'
//             }}>
//             <span style={{ color: 'rgb(13, 92, 182)' }}>{'Mua trước trả sau'}</span>
//           </Button>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default ProductDetailComponent;