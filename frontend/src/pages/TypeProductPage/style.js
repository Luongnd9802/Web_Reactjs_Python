import styled from "styled-components"
import { Col } from 'antd'

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
`

export const WrapperNavBar = styled(Col)`
    background: rgb(255, 255, 255);
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;
    height: fit-content;
`