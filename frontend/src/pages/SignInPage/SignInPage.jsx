import React, { useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import imagelogo from '../../assets/image/logo_login.png';
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/UserSlice";

const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangePassword = (value) => {
        setPassword(value);
    };

    const togglePasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const userData = response.data;
            
            // Dispatch action để lưu thông tin người dùng vào Redux
            dispatch(login({
                access_token: token,
                email: userData.email,
                isAdmin: userData.is_admin,
                phone: userData.phone,
                name: userData.name,
                id: userData.id,
                avatar: userData.avatar ? `http://localhost:8000/${userData.avatar}` : null
            }));
            
            console.log('Thông tin người dùng:', userData);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email: email,
                password: password
            });
            const { access_token } = response.data;

            await fetchUserProfile(access_token);
            alert("Đăng nhập thành công!");
            navigate('/');
        } catch (error) {
            console.error("Error during login:", error);
            alert("Email hoặc mật khẩu không chính xác!");
        }
    };

    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập vào tài khoản</p>
                    <InputForm 
                        style={{ marginBottom: '10px' }} 
                        placeholder="abc@gmail.com" 
                        value={email} 
                        onChange={handleOnchangeEmail} 
                    />
                    <div style={{ position: 'relative' }}>
                        <InputForm  
                            placeholder="password" 
                            value={password} 
                            type={isShowPassword ? 'text' : 'password'}
                            onChange={handleOnchangePassword}
                        />
                        <span 
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer' }}
                        >
                            {isShowPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>
                    <ButtonComponent
                        disabled={!email.length || !password.length }
                        onClick={handleSignIn}
                        size={40}   
                        styleButton={{
                            margin: '26px 0 10px',
                            background: 'rgb(255, 57, 69)',  
                            height: '48px', 
                            width: '100%', 
                            border: 'none',
                            borderRadius: '4px',
                        }}  
                        textButton={'Đăng nhập'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700'}}                   
                    />
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Chưa có tài khoản <WrapperTextLight onClick={handleNavigateSignUp} style={{ cursor: 'pointer' }}> Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imagelogo} preview={false} alt="image-logo" height="203px" width="203px"/>
                    <h4>Mua sắm tại Ảo ma</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignInPage;


// import React, { useState } from "react";
// import InputForm from "../../components/InputForm/InputForm";
// import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
// import imagelogo from '../../assets/image/logo_login.png';
// import { Image } from "antd";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

// const SignInPage = () => {
//     const navigate = useNavigate();
//     const [isShowPassword, setIsShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleOnchangeEmail = (value) => {
//         setEmail(value);
//     };
//     const handleOnchangePassword = (value) => {
//         setPassword(value);
//     };

//     const togglePasswordVisibility = () => {
//         setIsShowPassword(!isShowPassword);
//     };

//     const fetchUserProfile = async (token) => {
//         try {
//             // Gửi yêu cầu đến API lấy thông tin người dùng và đính kèm JWT token để xác thực
//             const response = await axios.get('http://127.0.0.1:8000/api/user/profile', {
//                 headers: {
//                     Authorization: `Bearer ${token}`  // Đính kèm token trong yêu cầu
//                 }
//             });
            
//             // Lưu thông tin người dùng vào localStorage hoặc Redux
//             const userData = response.data;
                    
//             localStorage.setItem('isAdmin', userData.is_admin ? 'true' : 'false');
//             if (userData.avatar) {
//                 localStorage.setItem('avatar', `http://localhost:8000/${userData.avatar}`);
//             }
            
//             // Hiển thị hoặc lưu trữ thông tin người dùng vào Redux (nếu cần)
//                 console.log('Thông tin người dùng:', userData);
//                 console.log('Is_admin:', userData.is_admin)
//         } catch (error) {
//             console.error('Lỗi khi lấy thông tin người dùng:', error);
//         }
//     };

//     const handleSignIn = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/login', {
//                 email: email,
//                 password: password
//             });
//             const { access_token } = response.data;
//             localStorage.setItem('token', access_token);
//             localStorage.setItem('userEmail', email);
//             await fetchUserProfile(access_token);
//             alert("Đăng nhập thành công!");
//             navigate('/');  
//         } catch (error) {
//             console.error("Error during login:", error);
//             alert("Email hoặc mật khẩu không chính xác!");
//         }
//     };

//     const handleNavigateSignUp = () => {
//         navigate('/sign-up');
//     };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
//             <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
//                 <WrapperContainerLeft>
//                     <h1>Xin chào</h1>
//                     <p>Đăng nhập vào tài khoản</p>
//                     <InputForm 
//                         style={{ marginBottom: '10px' }} 
//                         placeholder="abc@gmail.com" 
//                         value={email} 
//                         onChange={handleOnchangeEmail} 
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <InputForm  
//                             placeholder="password" 
//                             value={password} 
//                             type={isShowPassword ? 'text' : 'password'}
//                             onChange={handleOnchangePassword}
//                         />
//                         <span 
//                             onClick={togglePasswordVisibility}
//                             style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer' }}
//                         >
//                             {isShowPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
//                         </span>
//                     </div>
//                     <ButtonComponent
//                         disabled={!email.length || !password.length }
//                         onClick={handleSignIn}
//                         size={40}   
//                         styleButton={{
//                             margin: '26px 0 10px',
//                             background: 'rgb(255, 57, 69)',  
//                             height: '48px', 
//                             width: '100%', 
//                             border: 'none',
//                             borderRadius: '4px',
//                         }}  
//                         textButton={'Đăng nhập'}
//                         styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700'}}                   
//                     />
//                     <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
//                     <p>Chưa có tài khoản <WrapperTextLight onClick={handleNavigateSignUp} style={{ cursor: 'pointer' }}> Tạo tài khoản</WrapperTextLight></p>
//                 </WrapperContainerLeft>
//                 <WrapperContainerRight>
//                     <Image src={imagelogo} preview={false} alt="image-logo" height="203px" width="203px"/>
//                     <h4>Mua sắm tại Ảo ma</h4>
//                 </WrapperContainerRight>
//             </div>
//         </div>
//     );
// }

// export default SignInPage;

