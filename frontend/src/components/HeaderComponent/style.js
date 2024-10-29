import { Row, Menu } from "antd";
import styled from "styled-components";

export const WrrapperHeader = styled(Row)`
    padding: 10px 0 ;
    align-items: center;
    background-color: rgb(26,148,255);
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
`

export const WrrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    &: hover {
        cursor: pointer;
    }
`

export const WrrapperAcountHeader = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`

export const WrrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;    
`

export const WrrapperListHeader = styled.div`
    color: #fff;
    font-weight: bold;
    &: hover {
        cursor: pointer;
        color: #fcfcb7; // Đổi màu chữ thành màu vàng khi hover
        transform: scale(1.1); // Tăng nhẹ kích thước khi hover
    }    
`