import React, { useState, useEffect } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Modal, Upload, message, Drawer, Select } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import TableProductComponent from '../TableProductComponent/TableProductComponent'
import InputComponent from '../InputComponent/InputComponent'
import axios from 'axios'  

const AdminProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [modalForm] = Form.useForm();
    const [drawerForm] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null); // Đối tượng File để upload
    const [previewImageUrl, setPreviewImageUrl] = useState(null); // URL để xem trước
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        type: '',
        description: '',
        rating: '', 
        count_in_stock: '',
    });
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        price: '',
        type: '',
        description: '',
        rating: '', 
        count_in_stock: '',
        image: '',
    });

    const resetModalForm = () => {
        modalForm.resetFields(); // Reset lại form Ant Design
        setImageFile(null); // Xóa file ảnh đã chọn
        setPreviewImageUrl(null); // Xóa URL xem trước
        setStateProduct({
            name: '',
            price: '',
            type: '',
            description: '',
            rating: '', 
            count_in_stock: '',
        }); // Đặt lại các giá trị của sản phẩm
    };

    const resetDrawerForm = () => {
        drawerForm.resetFields(); // Reset lại form Ant Design
        setImageFile(null); // Xóa file ảnh đã chọn
        setPreviewImageUrl(null); // Xóa URL xem trước
        setStateProductDetail({
            name: '',
            price: '',
            type: '',
            description: '',
            rating: '', 
            count_in_stock: '',
            image: '',
        }); // Đặt lại các giá trị của sản phẩm
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/products-info');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            message.error('Lỗi khi lấy danh sách sản phẩm');
            setLoading(false);
        }
    };

    // Lấy danh sách sản phẩm khi component được mount
    useEffect(() => {
        fetchProducts();
    }, []);


    const handleCancel = () => {
        resetModalForm();
        setIsModalOpen(false);
    };

    const onFinish = async () => {
        if (!imageFile) {
            alert("Vui lòng tải lên hình ảnh của bạn!");
            return;
        }

        console.log('finished', stateProduct);
        console.log('Image file:', imageFile);

        const formData = new FormData();
        formData.append('name', stateProduct.name);
        formData.append('type', stateProduct.type);
        formData.append('price', stateProduct.price);
        formData.append('count_in_stock', stateProduct.count_in_stock);
        formData.append('rating', stateProduct.rating);
        formData.append('description', stateProduct.description);
        formData.append('image_file', imageFile);

        try {
            const response = await axios.post('http://localhost:8000/api/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Sản phẩm đã được tạo thành công:', response.data);
            message.success("Sản phẩm đã được tạo thành công");
            setIsModalOpen(false);
            fetchProducts(); // Gọi hàm để làm mới danh sách sản phẩm
            resetModalForm();
        } catch (error) {
            console.error('Lỗi khi tạo sản phẩm:', error);
            message.error("Lỗi khi tạo sản phẩm")
        }
    };

    const handleImageChange = (info) => {
        const file = info.file.originFileObj || info.file; // Lấy đối tượng file hợp lệ
        if (file instanceof Blob) {
            // Lưu trữ file để sử dụng sau khi tải lên
            setImageFile(file);
    
            // Tạo URL để xem trước
            const previewUrl = URL.createObjectURL(file);
            setPreviewImageUrl(previewUrl); // Lưu URL để hiển thị trước
            console.log('File đã chọn:', file.name);
        }
    };

    const handleEdit = async (productId) => {
        if (!productId || typeof productId !== "number") {
            console.error("Invalid productId:", productId);
            return;
        }
        try {
            // Gọi API để lấy thông tin sản phẩm chi tiết theo productId
            const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
            const productData = response.data;

            // Cập nhật state và form với thông tin sản phẩm lấy được
            
            const updatedProductData = {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                type: productData.type,
                description: productData.description,
                rating: productData.rating,
                count_in_stock: productData.count_in_stock,
                image: productData.image,
            };
            setStateProductDetail(updatedProductData);
            drawerForm.setFieldsValue(updatedProductData);
            setIsDrawerOpen(true); 
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            message.error('Lỗi khi lấy thông tin sản phẩm');
        }
    };

    const handleDrawerClose = () => {
        resetDrawerForm();
        setIsDrawerOpen(false);
    };

    const onFinishEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', stateProductDetail.name);
            formData.append('type', stateProductDetail.type);
            formData.append('price', stateProductDetail.price);
            formData.append('count_in_stock', stateProductDetail.count_in_stock);
            formData.append('rating', stateProductDetail.rating);
            formData.append('description', stateProductDetail.description);
            
            if (imageFile) {
                formData.append('image_file', imageFile);
            }
    
            const response = await axios.patch(`http://localhost:8000/api/products/${stateProductDetail.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            message.success("Sản phẩm đã được cập nhật thành công");
            setIsDrawerOpen(false);
            fetchProducts(); // Làm mới danh sách sản phẩm sau khi cập nhật
            resetDrawerForm();
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            message.error("Lỗi khi cập nhật sản phẩm");
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${productId}`);
            message.success("Sản phẩm đã được xóa thành công");
            fetchProducts(); // Làm mới danh sách sản phẩm sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            message.error("Lỗi khi xóa sản phẩm");
        }
    };

    const handleOnchangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        });
    };

    const handleOnchangeSelectType = (value, fieldName) => {
        setStateProduct({
            ...stateProduct,
            [fieldName]: value
        });
    };

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
            <Button 
                style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} 
                onClick={() => {
                    resetModalForm(); // Reset lại form và trạng thái trước khi mở modal
                    setIsModalOpen(true);
                }}
            > 
                <PlusOutlined style={{ fontSize: '40px' }} /> 
            </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableProductComponent data={products} loading={loading} onEdit={handleEdit} onDelete={handleDelete}/>
            </div>
            <Modal
                forceRender
                title="Tạo sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>
                ]}
            >
                <Form
                    form={modalForm} // Sử dụng form được tạo từ Form.useForm()
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                > 
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Loại"
                        name="type"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập loại sản phẩm!',
                        },
                        ]}
                    >
                        {/* <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" /> */}
                        <Select
                            name = "type"
                            value={stateProduct.type}
                            onChange={(value) => handleOnchangeSelectType(value, 'type')}
                            options={[
                                { value: 'Điện thoại', label: 'Điện thoại' },
                                { value: 'Đồng hồ', label: 'Đồng hồ' },
                                { value: 'TV', label: 'TV' },
                                { value: 'Màn hình', label: 'Màn hình' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="count_in_stock"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số lượng trong kho!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProduct.count_in_stock} onChange={handleOnchange} name="count_in_stock" />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá sản phẩm!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Đánh giá"
                        name="rating"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập đánh giá!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        name="image"
                    >
                        <Upload
                            name='avatar'
                            listType='picture'
                            showUploadList={false}
                            beforeUpload={() => false} // Ngăn không cho auto upload
                            onChange={handleImageChange}
                        >
                            <Button icon={<UploadOutlined />}>Chọn Tệp</Button>
                        </Upload>
                        {previewImageUrl && (
                            <img
                                src={previewImageUrl}
                                alt="Avatar Preview"
                                style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    marginLeft: '10px',
                                    objectFit: 'cover'
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Drawer
                title="Chỉnh sửa sản phẩm"
                width={720}
                onClose={handleDrawerClose}
                open={isDrawerOpen}
            >
                <Form
                    form={drawerForm}
                    layout="vertical"
                    initialValues={stateProductDetail}
                    onFinish={onFinishEdit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProductDetail.name} onChange={handleOnchangeDetail} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Loại"
                        name="type"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập loại sản phẩm!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProductDetail.type} onChange={handleOnchangeDetail} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="count_in_stock"
                        rules={[
                        {

                            required: true,
                            message: 'Vui lòng nhập số lượng trong kho!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProductDetail.count_in_stock} onChange={handleOnchangeDetail} name="count_in_stock" />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá sản phẩm!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProductDetail.price} onChange={handleOnchangeDetail} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Đánh giá"
                        name="rating"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập đánh giá!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProductDetail.rating} onChange={handleOnchangeDetail} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                        ]}
                    >
                        <InputComponent value={stateProductDetail.description} onChange={handleOnchangeDetail} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        name="image"
                    >
                        <Upload
                            name='avatar'
                            listType='picture'
                            showUploadList={false}
                            beforeUpload={() => false} // Ngăn không cho auto upload
                            onChange={handleImageChange}
                        >
                            <Button icon={<UploadOutlined />}>Chọn Tệp</Button>
                        </Upload>
                        {previewImageUrl && (
                            <img
                                src={previewImageUrl}
                                alt="Avatar Preview"
                                style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    marginLeft: '10px',
                                    objectFit: 'cover'
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default AdminProduct;
