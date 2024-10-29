import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleNameProduct, WrapperPriceText, WrapperStyleTextSell } from './style';
import { WrapperReportText, WrapperDiscountText, WrapperCardStyle, WrapperImageStyle } from "./style";
import { StarFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import logo from '../../assets/image/logo.png';

const CardComponent = ({ id, name, image, price, rating, sold }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`); // Điều hướng đến trang chi tiết sản phẩm với productId
  };

  const handleAvatarUpdate = () => {
    
  }

  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="product" src={`http://localhost:8000/${image}`} />}
      onClick={handleCardClick} // Thêm sự kiện onClick để điều hướng
    >
      <WrapperImageStyle
        src={logo}
        alt="logo"
        style={{
          width: '68px',
          height: '14px',
          position: 'absolute',
          top: -1,
          left: -1,
          borderTopLeftRadius: '3px'
        }}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
          <WrapperStyleTextSell> | Đã bán {sold}+</WrapperStyleTextSell>
        </span>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{price.toLocaleString()}đ</span>
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

CardComponent.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  sold: PropTypes.number.isRequired,
};

export default CardComponent;