import React from 'react';
import { Col, Badge, Dropdown, Menu } from "antd";
import { WrrapperHeader, WrrapperTextHeader, WrrapperAcountHeader, WrrapperTextHeaderSmall } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/UserSlice';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy thông tin người dùng từ Redux store
    const { email: userEmail, avatar: userAvatar, isAdmin } = useSelector((state) => state.user);

    // Xử lý đăng xuất
    const handleLogout = () => {
        dispatch(logout()); // Dispatch hành động logout để xóa thông tin trong Redux
        localStorage.removeItem('avatar');
        navigate('/sign-in');  // Điều hướng người dùng đến trang đăng nhập
    };

    // Menu cho dropdown
    const userMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => navigate('/profile-user')}>Thông tin người dùng</Menu.Item>
            <Menu.Item key="2" onClick={handleLogout}>Đăng xuất</Menu.Item>
            {isAdmin && (
                <Menu.Item key="3" onClick={() => navigate('/system/admin')}>Quản lý kho hàng</Menu.Item>
            )}
        </Menu>
    );

    return (
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center' }}>
            <WrrapperHeader>
                <Col span={5}>
                    <WrrapperTextHeader onClick={() => navigate('/')}>SHOP</WrrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size='large'
                        textButton="Tìm kiếm"
                        placeholder="Input search"
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <WrrapperAcountHeader>
                        <div>
                            {userAvatar ? (
                                    <img
                                        src={userAvatar}
                                        alt="User Avatar"
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                                    />
                                ) : (
                                    <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                )}
                        </div>
                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {userEmail ? (
                                <Dropdown overlay={userMenu} trigger={['click']}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <WrrapperTextHeaderSmall>{userEmail}</WrrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </Dropdown>
                            ) : (
                                <div onClick={() => navigate('/sign-in')}>
                                    <WrrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrrapperTextHeaderSmall>
                                    <div>
                                        <WrrapperTextHeaderSmall>Tài khoản</WrrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </div>
                    </WrrapperAcountHeader>
                    <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrrapperTextHeaderSmall> Giỏ Hàng </WrrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrrapperHeader>
        </div>
    );
};

export default HeaderComponent;



// import React, { useEffect, useState } from 'react';
// import { Col, Badge, Dropdown, Menu } from "antd";
// import { WrrapperHeader, WrrapperTextHeader, WrrapperAcountHeader, WrrapperTextHeaderSmall } from './style';
// import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
// import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const HeaderComponent = () => {
//     const navigate = useNavigate();
//     const [userEmail, setUserEmail] = useState(null);
//     const [userAvatar, setUserAvatar] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);
    
//     // Khi component được mount, kiểm tra xem có thông tin người dùng không
//     useEffect(() => {
//         const email = localStorage.getItem('userEmail');
//         const avatar = localStorage.getItem('avatar');
//         const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Chuyển đổi từ string sang boolean
//         setIsAdmin(adminStatus); // adminStatus sẽ là true hoặc false
        
//         if (email) {
//             setUserEmail(email);  // Nếu có email, đặt email vào state
//         }
//         if (avatar) {
//             setUserAvatar(avatar);  // Nếu có avatar, đặt avatar vào state
//         }

//         // Lắng nghe sự kiện cập nhật avatar
//         const handleAvatarUpdate = () => {
//             const updatedAvatar = localStorage.getItem('avatar');
//             setUserAvatar(updatedAvatar);
//         };
        
//         window.addEventListener('avatarUpdated', handleAvatarUpdate);
        
//         return () => {
//             window.removeEventListener('avatarUpdated', handleAvatarUpdate);
//         };
//     }, []);

//     // Xử lý đăng xuất
//     const handleLogout = () => {
//         localStorage.removeItem('userEmail');  // Xóa thông tin khi người dùng đăng xuất
//         localStorage.removeItem('token');  // Xóa token nếu có
//         localStorage.removeItem('avatar');
//         localStorage.removeItem('isAdmin'); // Đảm bảo xóa `isAdmin` để tránh tình trạng sai sót
//         setUserEmail(null);  // Đặt email về null
//         setUserAvatar(null);
//         setIsAdmin(false);
//         navigate('/sign-in');  // Điều hướng người dùng đến trang đăng nhập
//     };

//     // Menu cho dropdown
//     const userMenu = (
//         <Menu>
//             <Menu.Item key="1" onClick={() => navigate('/profile-user')}>Thông tin người dùng</Menu.Item>
//             <Menu.Item key="2" onClick={handleLogout}>Đăng xuất</Menu.Item>
//             {isAdmin && (
//                 <Menu.Item key="3" onClick={() => navigate('/system/admin')}>Quản lý kho hàng</Menu.Item>
//             )}
//         </Menu>
//     );

//     return (
//         <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center' }}>
//             <WrrapperHeader>
//                 <Col span={5}>
//                     <WrrapperTextHeader onClick={() => navigate('/')}>SHOP ẢO MA LAZADA</WrrapperTextHeader>
//                 </Col>
//                 <Col span={13}>
//                     <ButtonInputSearch
//                         size='large'
//                         textButton="Tìm kiếm"
//                         placeholder="Input search"
//                     />
//                 </Col>
//                 <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
//                     <WrrapperAcountHeader>
//                         <div>
//                             {userAvatar ? (
//                                     <img
//                                         src={userAvatar}
//                                         alt="User Avatar"
//                                         style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
//                                     />
//                                 ) : (
//                                     <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
//                                 )}
//                         </div>
//                         <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
//                             {userEmail ? (
//                                 <Dropdown overlay={userMenu} trigger={['click']}>
//                                     <div style = {{ display: 'flex', alignItems: 'center'}}>
//                                         <WrrapperTextHeaderSmall>{userEmail}</WrrapperTextHeaderSmall>
//                                         <CaretDownOutlined />
//                                     </div>
//                                 </Dropdown>
//                             ) : (
//                                 <div onClick={() => navigate('/sign-in')}>
//                                     <WrrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrrapperTextHeaderSmall>
//                                     <div>
//                                         <WrrapperTextHeaderSmall>Tài khoản</WrrapperTextHeaderSmall>
//                                         <CaretDownOutlined />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </WrrapperAcountHeader>
//                     <div>
//                         <Badge count={4} size="small">
//                             <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
//                         </Badge>
//                         <WrrapperTextHeaderSmall> Giỏ Hàng </WrrapperTextHeaderSmall>
//                     </div>
//                 </Col>
//             </WrrapperHeader>
//         </div>
//     );
// };

// export default HeaderComponent;
