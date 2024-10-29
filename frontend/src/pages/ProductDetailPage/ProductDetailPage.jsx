// src/pages/ProductDetailPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

const ProductDetailPage = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin chi tiết sản phẩm:", error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Hiển thị Loading trong khi chờ dữ liệu
  }

  return (
    <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}>
      <ProductDetailComponent
        name={product.name}
        image={`http://localhost:8000/${product.image}`}
        price={product.price}
        rating={product.rating}
        sold={product.count_in_stock}
        description={product.description}
        productId={productId}
      />
    </div>
  );
};

export default ProductDetailPage;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

// const ProductDetailPage = () => {
//   const { productId } = useParams(); // Lấy productId từ URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Lỗi khi lấy thông tin chi tiết sản phẩm:", error);
//       }
//     };

//     fetchProductDetail();
//   }, [productId]);

//   if (!product) {
//     return <div>Loading...</div>; // Hiển thị Loading trong khi chờ dữ liệu
//   }

//   return (
//     <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}>
//       <ProductDetailComponent
//         name={product.name}
//         image={`http://localhost:8000/${product.image}`}
//         price={product.price}
//         rating={product.rating}
//         sold={product.count_in_stock}
//         description={product.description}
//       />
//     </div>
//   );
// };

// export default ProductDetailPage;