import React, { useEffect, useState } from 'react';
import { WrapperHeader, WrapperContentProfile, WrapperLabel, WrapperInput } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, updateUserProfile, updateAvatar } from '../../redux/slices/UserSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { name, email, phone, address, avatar, access_token } = useSelector((state) => state.user);

    const [avatarFile, setAvatarFile] = useState(null); // Lưu trữ file ảnh thực tế để tải lên
    const [isUpdated, setIsUpdated] = useState(false);

    const handleOnchangeEmail = (value) => dispatch(updateUserProfile({ field: 'email', value }));
    const handleOnchangeName = (value) => dispatch(updateUserProfile({ field: 'name', value }));
    const handleOnchangePhone = (value) => dispatch(updateUserProfile({ field: 'phone', value }));
    const handleOnchangeAddress = (value) => dispatch(updateUserProfile({ field: 'address', value }));

    // Handling avatar file change
    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj || info.file;
        if (file instanceof Blob) {
            setAvatarFile(file);
            const previewUrl = URL.createObjectURL(file);
            dispatch(updateUserProfile({ field: 'avatar', value: previewUrl }));
            message.success(`${info.file.name} file selected successfully`);
        } else {
            message.error("Invalid file type or selection failed.");
        }
    };
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            const storedAvatar = localStorage.getItem('avatar');
            if (storedAvatar) {
                dispatch(updateAvatar(storedAvatar));
            } else if (access_token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/user/profile', {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    });
                    const userData = response.data;
                    dispatch(setUser({ ...userData, access_token }));
                } catch (error) {
                    console.error('Error fetching user profile', error);
                }
            }
        };
        fetchUserProfile();
    }, [access_token, dispatch]);

    const handleUpdateInfo = async (fieldName) => {
        if (!access_token) return;
        
        let updatedData = {};
        updatedData[fieldName] = {
            name,
            email,
            phone,
            address
        }[fieldName];
        
        try {
            await axios.patch('http://localhost:8000/api/user/profile/update', { [fieldName]: updatedData[fieldName] }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            setIsUpdated(true);
        } catch (error) {
            console.error(`Error updating ${fieldName}`, error);
            alert(`Update ${fieldName} failed`);
        }
    };

    const handleUploadAvatar = async () => {
        if (!avatarFile) {
            message.error("Please select an avatar to upload.");
            return;
        }
        if (!access_token) return;
        
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        
        try {
            const response = await axios.post('http://localhost:8000/api/user/profile/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const newAvatarUrl = `http://localhost:8000/${response.data.avatar}`;
            dispatch(updateAvatar(newAvatarUrl));
            localStorage.setItem('avatar', newAvatarUrl);
            setIsUpdated(true);
        } catch (error) {
            console.error('Error uploading avatar', error);
            alert('Avatar upload failed');
        }
    };

    useEffect(() => {
        if (isUpdated) {
            alert('Update successful');
            setIsUpdated(false);
        }
    }, [isUpdated]);

    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader> Thông tin người dùng </WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                    <InputForm style={{ width: '300px' }} value={name} onChange={handleOnchangeName} />
                    <ButtonComponent
                        onClick={() => handleUpdateInfo('name')}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                    <InputForm style={{ width: '300px' }} value={email} onChange={handleOnchangeEmail} />
                    <ButtonComponent
                        onClick={() => handleUpdateInfo('email')}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                    <InputForm style={{ width: '300px' }} value={phone} onChange={handleOnchangePhone} />
                    <ButtonComponent
                        onClick={() => handleUpdateInfo('phone')}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                    <InputForm style={{ width: '300px' }} value={address} onChange={handleOnchangeAddress} />
                    <ButtonComponent
                        onClick={() => handleUpdateInfo('address')}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                    <Upload
                        name='avatar'
                        listType='picture'
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleAvatarChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                    {avatar && <img src={avatar} alt="Avatar Preview" style={{ 
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover' }} />}
                    <ButtonComponent
                        onClick={handleUploadAvatar}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    />
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    );
};

export default ProfilePage;
