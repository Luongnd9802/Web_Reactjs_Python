import styled from "styled-components"
import Card from "antd/es/card/Card"

export const WrapperCardStyle = styled(Card)`
    width: 180px;
    hieght: 200px;
    &img: {
        height: 200px;
        width: 200px;
    },
    positions: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease; // Tạo hiệu ứng chuyển đổi mượt mà
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // Bóng cho card để có hiệu ứng nổi

    &:hover {
        transform: scale(1.05); // Khi hover, card sẽ phóng to nhẹ
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); // Bóng lớn hơn để tạo cảm giác nổi
  }
`

export const WrapperImageStyle = styled.img`
    top: -1px;
    left: -1px;
    border-top-left-radius: 3px;
    position: absolute;
    height: 14px;
    width: 68px;
`

export const StyleNameProduct = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`
export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`
export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`