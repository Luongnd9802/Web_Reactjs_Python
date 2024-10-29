import React, { useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from 'axios';  // To send requests to the backend
import imagelogo from '../../assets/image/logo_login.png';
import { Image } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; // Import icon hiển thị/ẩn mật khẩu

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false); // Trạng thái hiển thị mật khẩu xác nhận
    const navigate = useNavigate();

    const handleOnchangeName = (value) => setName(value);
    const handleOnchangeEmail = (value) => setEmail(value);
    const handleOnchangePassword = (value) => setPassword(value);
    const handleOnchangeConfirmPassword = (value) => setConfirmPassword(value);
    const handleOnchangePhone = (value) => setPhone(value);

    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };

    const togglePasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);  // Đổi trạng thái hiển thị/ẩn mật khẩu
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword);  // Đổi trạng thái hiển thị/ẩn mật khẩu xác nhận
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                phone: phone
            });
            console.log(response.data);
            alert("Registration successful");
            navigate('/sign-in');
        } catch (error) {
            console.error('Error during registration:', error);
            alert("Failed to register");
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
                <div style={{ width: '800px', height: '500px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                    <WrapperContainerLeft>
                        <h1>Xin chào</h1>
                        <p>Đăng ký tài khoản mới</p>
                        <InputForm style={{ marginBottom: '10px' }} placeholder="Your name" value={name} onChange={handleOnchangeName} />
                        <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                        
                        {/* Mật khẩu với nút hiển thị */}
                        <div style={{ position: 'relative' }}>
                            <InputForm
                                style={{ marginBottom: '10px' }}
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

                        {/* Xác nhận mật khẩu với nút hiển thị */}
                        <div style={{ position: 'relative' }}>
                            <InputForm
                                style={{ marginBottom: '10px' }}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                type={isShowConfirmPassword ? 'text' : 'password'}
                                onChange={handleOnchangeConfirmPassword}
                            />
                            <span
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer' }}
                            >
                                {isShowConfirmPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>

                        <InputForm style={{ marginBottom: '10px' }} placeholder="Phone number" value={phone} onChange={handleOnchangePhone} />
                        
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length || !name.length || !phone.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                margin: '26px 0 10px',
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textButton={'Đăng ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        />
                        <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
                    </WrapperContainerLeft>
                    <WrapperContainerRight>
                        <Image src={imagelogo} preview={false} alt="image-logo" height="203px" width="203px"/>
                        <h4></h4>
                    </WrapperContainerRight>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;


// import React, { useState } from "react";
// import InputForm from "../../components/InputForm/InputForm";
// import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
// import { useNavigate } from "react-router-dom";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import axios from 'axios';  // To send requests to the backend
// import imagelogo from '../../assets/image/logo_login.png';
// import { Image } from "antd";


// const SignUpPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [phone, setPhone] = useState('');
//     const [isShowPassword, setIsShowPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleOnchangeName = (value) => setName(value);
//     const handleOnchangeEmail = (value) => setEmail(value);
//     const handleOnchangePassword = (value) => setPassword(value);
//     const handleOnchangeConfirmPassword = (value) => setConfirmPassword(value);
//     const handleOnchangePhone = (value) => setPhone(value);

//     const handleNavigateSignIn = () => {
//         navigate('/sign-in');
//     };

//     const handleSignUp = async () => {
//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8000/register', {
//                 name: name,
//                 email: email,
//                 password: password,
//                 confirmPassword: confirmPassword,
//                 phone: phone
//             });
//             console.log(response.data);
//             alert("Registration successful");
//             navigate('/sign-in');
//         } catch (error) {
//             console.error('Error during registration:', error);
//             alert("Failed to register");
//         }
//     };

//     return (
//         <div>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
//                 <div style={{ width: '800px', height: '500px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
//                     <WrapperContainerLeft>
//                         <h1>Xin chào</h1>
//                         <p>Đăng ký tài khoản mới</p>
//                         <InputForm style={{ marginBottom: '10px' }} placeholder="Your name" value={name} onChange={handleOnchangeName} />
//                         <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
//                         <InputForm style={{ marginBottom: '10px' }} placeholder="password" value={password} onChange={handleOnchangePassword} />
//                         <InputForm style={{ marginBottom: '10px' }} placeholder="Confirm password" value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
//                         <InputForm style={{ marginBottom: '10px' }} placeholder="Phone number" value={phone} onChange={handleOnchangePhone} />
//                         <ButtonComponent
//                             disabled={!email.length || !password.length || !confirmPassword.length || !name.length || !phone.length}
//                             onClick={handleSignUp}
//                             size={40}
//                             styleButton={{
//                                 margin: '26px 0 10px',
//                                 background: 'rgb(255, 57, 69)',
//                                 height: '48px',
//                                 width: '100%',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                             }}
//                             textButton={'Đăng ký'}
//                             styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
//                         />
//                         <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
//                     </WrapperContainerLeft>
//                     <WrapperContainerRight>
//                         {/* You can update the image path based on your image */}
//                         <Image src = {imagelogo} preview = {false} alt = "image-logo" height = "203px" width = "203px"/>
//                         <h4></h4>
//                     </WrapperContainerRight>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;


