import React, { useState, useEffect } from 'react'
import TableUserComponent from '../TableUserComponent/TableUserComponent'
import { WrapperHeader } from './style'
import { Button, Form, Modal, Upload, message, Drawer } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import axios from 'axios'  
  
const AdminUser = () => {

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        admin: '',
    });
    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        admin: '',
    });

    const resetForm = () => {
        form.resetFields(); // Reset lại form Ant Design
        setStateUser({
            name: '',
            email: '',
            phone: '',
            address: '',
        }); // Đặt lại các giá trị của sản phẩm
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/users/information');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            message.error('Lỗi khi lấy thông tin người dùng');
            setLoading(false);
        }
    };

    // Lấy danh sách sản phẩm khi component được mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = async (userId) => {
        if (!userId || typeof userId !== "number") {
            console.error("Invalid userId:", userId);
            return;
        }
        try {
            // Gọi API để lấy thông tin sản phẩm chi tiết theo userId
            const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
            const userData = response.data;

            // Cập nhật state và form với thông tin sản phẩm lấy được
            
            const updatedUserData = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                admin: userData.is_admin,
                address: userData.address,
                phone: userData.phone
            };
            setStateUserDetail(updatedUserData);
            form.setFieldsValue(updatedUserData);
            console.log(updatedUserData.admin)
            setIsDrawerOpen(true); 
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            message.error('Lỗi khi lấy thông tin sản phẩm');
        }
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        resetForm();
    };

    const onFinishEdit = async () => {

        console.log('Edit form submitted');
        try {
            const formData = new FormData();
            formData.append('name', stateUserDetail.name);
            formData.append('email', stateUserDetail.email);
            formData.append('address', stateUserDetail.address);
            formData.append('phone', stateUserDetail.phone);
            
            const response = await axios.patch(`http://localhost:8000/api/users/${stateUserDetail.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            message.success("Người dùng đã được cập nhật thành công");
            setIsDrawerOpen(false);
            fetchUsers(); // Làm mới danh sách người dùng sau khi cập nhật
        } catch (error) {
            console.error('Lỗi khi cập nhật :', error);
            message.error("Lỗi khi cập nhật người dùng");
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`);
            message.success("Người dùng đã được xóa thành công");
            fetchUsers(); // Làm mới danh sách người dùng sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            message.error("Lỗi khi xóa người dùng");
        }
    };

    const handleOnchangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style = {{marginTop: '10px'}}>
                <Button style = {{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}> <PlusOutlined style = {{ fontSize: '40px'}}/> </Button>
            </div>
            <div style = {{ marginTop: '20px'}}>
                <TableUserComponent data={users} loading={loading} onEdit={handleEdit} onDelete={handleDelete}/>
            </div>

            <Drawer
                title="Chỉnh sửa người dùng"
                width={720}
                onClose={handleDrawerClose}
                open={isDrawerOpen}
            >
                <Form
                    name='update' 
                    form={form}
                    layout="vertical"
                    initialValues={stateUserDetail}
                    onFinish={onFinishEdit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người dùng!',
                        },
                        ]}
                    >
                        <InputComponent value={stateUserDetail.name} onChange={handleOnchangeDetail} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                        ]}
                    >
                        <InputComponent value={stateUserDetail.email} onChange={handleOnchangeDetail} name="email" />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                        {

                            required: true,
                            message: 'Vui lòng nhập địa chỉ!',
                        },
                        ]}
                    >
                        <InputComponent value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                        ]}
                    >
                        <InputComponent value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}
export default AdminUser
