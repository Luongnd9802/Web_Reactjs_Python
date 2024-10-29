import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Button, Row, Col, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OrderPage = () => {
    const [cartItems, setCartItems] = useState([]); // State chứa danh sách sản phẩm trong giỏ hàng
    const [total, setTotal] = useState(0); // Tổng tiền
    const { access_token, id: userId } = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux

    // Hàm lấy danh sách sản phẩm trong giỏ hàng từ API
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/cart-items?user_id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                setCartItems(response.data); // Lưu danh sách sản phẩm trong giỏ hàng
                calculateTotal(response.data); // Tính tổng tiền
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', error);
            }
        };

        fetchCartItems();
    }, [userId, access_token]);

    // Tính tổng tiền khi có thay đổi trong giỏ hàng
    const calculateTotal = (items) => {
        let sum = 0;
        items.forEach(item => {
            sum += item.product_price * item.quantity;
        });
        setTotal(sum);
    };

    // Xử lý khi thay đổi số lượng sản phẩm
    const onQuantityChange = (value, id) => {
        const updatedCart = cartItems.map(item => 
            item.cart_item_id === id ? { ...item, quantity: value } : item
        );
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    // Xử lý khi xóa sản phẩm khỏi giỏ hàng
    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const updatedCart = cartItems.filter(item => item.cart_item_id !== id);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
            message.success('Xóa sản phẩm thành công');
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'product_price',
            render: (price) => <span>{price ? price.toLocaleString() : '0'} đ</span>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (quantity, record) => (
                <InputNumber min={1} max={100} value={quantity} onChange={(value) => onQuantityChange(value, record.cart_item_id)} />
           )
        },
        {
            title: 'Thành tiền',
            dataIndex: '',
            render: (record) => <span>{(record.product_price && record.quantity ? (record.product_price * record.quantity).toLocaleString() : '0')} đ</span>,
        },
        {
            title: '',
            dataIndex: '',
            render: (record) => (
                <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.cart_item_id)} />
            ),
        },
    ];

    return (
        <div style={{ width: '1270px', margin: '20px auto' }}>
            <Row gutter={16}>
                {/* Bảng Giỏ hàng */}
                <Col span={18}>
                    <h2>Giỏ hàng</h2>
                    <Table 
                        dataSource={cartItems} 
                        columns={columns} 
                        pagination={false} 
                        rowKey="cart_item_id" 
                        style={{ backgroundColor: '#fff' }} 
                    />
                </Col>

                {/* Bảng Thanh toán */}
                <Col span={6}>
                    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
                        <h3>Thông tin thanh toán</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tạm tính:</span>
                            <span>{total.toLocaleString()} đ</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Giảm giá:</span>
                            <span>0 đ</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Thuế:</span>
                            <span>0 đ</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Phí giao hàng:</span>
                            <span>0 đ</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
                            <span>Tổng tiền:</span>
                            <span>{total.toLocaleString()} đ</span>
                        </div>
                        <Button type="primary" style={{ width: '100%', marginTop: '10px' }}>Mua hàng</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default OrderPage;


