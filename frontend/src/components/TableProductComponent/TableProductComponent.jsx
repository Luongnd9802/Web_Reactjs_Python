import React, { useState} from 'react';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const TableProductComponent = ({ data, loading, onEdit, onDelete }) => {

    const renderAction = (record) => (
        <div>
            <DeleteOutlined
                style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                onClick={() => onDelete(record.id)}
            />
            <EditOutlined
                style={{ marginLeft: '10px', color: 'green', fontSize: '25px', cursor: 'pointer' }}
                onClick={() => onEdit(record.id)} // Gọi hàm onEdit khi nhấn vào Edit
            />
        </div>
    );

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>
        },
        {
            title: 'Loại',
            dataIndex: 'type',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'count_in_stock',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
        },
        {
            title: 'Action',
            render: renderAction
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Vô hiệu hóa checkbox nếu tên là 'Disabled User'
            name: record.name,
        }),
    };

    const onRow = (record) => {
        return {
            onClick: () => {
                console.log('Bạn đã nhấp vào dòng:', record);
                // Thêm logic xử lý khi nhấp vào dòng, ví dụ hiển thị chi tiết sản phẩm
            },
            onDoubleClick: () => {
                console.log('Bạn đã nhấp đúp vào dòng:', record);
                // Thêm logic xử lý khi nhấp đúp vào dòng
            },
        };
    };

    return (
        <Table
            rowSelection={{
                type: 'checkbox', // Có thể thay bằng 'radio' để chọn 1 dòng duy nhất
                ...rowSelection,
            }}
            dataSource={data}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 15 }}
            onRow={onRow}
        />
    );
};

export default TableProductComponent;
